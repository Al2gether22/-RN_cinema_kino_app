import dataContext from './DataContext';
import _ from 'lodash';
import {computeDistance} from '../helpers/computeDistance';
import Toast from 'react-native-toast-message';
import crashlytics from '@react-native-firebase/crashlytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sortFavoritesToTop from '../helpers/sortFavoriteCinemasToTop';

const cinemaReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'get_cinemas':
      return {...state, cinemas: action.payload, isCinemasFetched: true};
    case 'update_cinemas':
      const orderCinemasWithFavoritesOnTop = sortFavoritesToTop(
        action.payload,
        state.favoriteCinemas,
      );
      return {
        ...state,
        cinemas: orderCinemasWithFavoritesOnTop,
        cinemasSorted: true,
      };

    case 'restore_fav_cinemas':
      return {...state, favoriteCinemas: action.payload};

    case 'toggle_favorite_cinema':
      //If cinema is already favorite, remove it from favorites
      if (!state.favoriteCinemas) return state;
      if (state.favoriteCinemas.includes(action.payload)) {
        const favoriteCinemas = [
          ...state.favoriteCinemas.filter(c => c !== action.payload),
        ];

        AsyncStorage.setItem(
          '@FavoriteCinemas',
          JSON.stringify(favoriteCinemas),
        );
        return {
          ...state,
          favoriteCinemas,
        };
      }

      const favoriteCinemas = [...state.favoriteCinemas, action.payload];
      const cinemas = sortFavoritesToTop([...state.cinemas], favoriteCinemas);

      AsyncStorage.setItem('@FavoriteCinemas', JSON.stringify(favoriteCinemas));

      return {
        ...state,
        favoriteCinemas: [...state.favoriteCinemas, action.payload],
        cinemas,
      };
    default:
      return state;
  }
};

const toggleFavoriteCinema = dispatch => async cinemaId => {
  try {
    dispatch({
      type: 'toggle_favorite_cinema',
      payload: parseInt(cinemaId),
    });
  } catch (err) {
    crashlytics().recordError(err);
    console.error(err);
    Toast.show({
      text1: 'Noget gik galt!',
      text2: 'Prøv at lukke appen og start den igen',
      position: 'bottom',
      bottomOffset: 300,
      type: 'error',
      autoHide: false,
    });
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with the cinemas',
    });
  }
};

const getCinemas = dispatch => async () => {
  try {
    const response = await fetch('https://www.kino.dk/appservices/cinemas', {
      mode: 'no-cors',
    });
    const cinemas = await response.json();
    dispatch({
      type: 'get_cinemas',
      payload: cinemas,
    });
  } catch (err) {
    crashlytics().recordError(err);
    Toast.show({
      text1: 'Noget gik galt!',
      text2: 'Prøv at lukke appen og start den igen',
      position: 'bottom',
      bottomOffset: 300,
      type: 'error',
      autoHide: false,
    });
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with the cinemas',
    });
  }
};

const updateCinemas = dispatch => {
  return async (cinemas, referenceLat, referenceLong) => {
    const cinemasWithDistance = cinemas.map(cinema => {
      return {
        ...cinema,
        distance: computeDistance(
          [cinema.geo.latitude, cinema.geo.longitude],
          [referenceLat, referenceLong],
        ), // Calculate the distance
      };
    });
    const orderedCinemas = _.orderBy(cinemasWithDistance, 'distance');

    dispatch({type: 'update_cinemas', payload: orderedCinemas}); //We order cinemas with favs on top in reducer later
    // Update cinemas is called with cinemas array and user coordinates
    // A distance value is added to each cinema based on user coords and cinema cords
    // cinemas are sorted by distance
    // state is updated with new cinemas array and a value of cinemaSorted to be true
  };
};

const restoreFavoriteCinemas = dispatch => async () => {
  const favoriteCinemas = await AsyncStorage.getItem('@FavoriteCinemas');
  if (favoriteCinemas) {
    dispatch({
      type: 'restore_fav_cinemas',
      payload: JSON.parse(favoriteCinemas),
    });
  }
};

export const {Context, Provider} = dataContext(
  cinemaReducer,
  {updateCinemas, getCinemas, toggleFavoriteCinema, restoreFavoriteCinemas},
  {
    cinemas: [],
    favoriteCinemas: [],
    errorMessage: '',
    cinemasSorted: false,
    isCinemasFetched: false,
  },
);

import dataContext from "./DataContext";
import Toast from 'react-native-toast-message';
import crashlytics from '@react-native-firebase/crashlytics';


const movieReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "get_movies":
      return { ...state, movies: action.payload };
    case "get_upcoming_movies":
      return { ...state, upcomingMovies: action.payload };
    case "get_versions":
      return { ...state, versions: action.payload };
    case "get_featured_movies":
      return { ...state, featuredMovies: action.payload };
    default:
      return state
  }
};

const getMovies = dispatch => async () => {
  try {
    const response = await fetch(
      "https://www.kino.dk/appservices/movies",
      { mode: "no-cors" })
    const movies = await response.json();
    dispatch({
      type: "get_movies",
      payload: movies
    });
  } catch (err) {
    crashlytics().recordError(err);
    Toast.show({
      text1: 'Noget gik galt!',
      text2: 'Prøv at lukke appen og start den igen',
      position: 'bottom',
      bottomOffset: 300,
      type: "error",
      autoHide: false,
      
    });
    dispatch({
      type: "add_error",
      payload: "Something went wrong with the movies"
    })
  }
}

const getUpcomingMovies = dispatch => async () => {
  try {
    const response = await fetch(
      "https://www.kino.dk/appservices/movies-upcoming",
      { mode: "no-cors" })
    const upcomingMovies = await response.json();
    
    dispatch({
      type: "get_upcoming_movies",
      payload: upcomingMovies
    });
  } catch (err) {
    crashlytics().recordError(err);
    Toast.show({
      text1: 'Noget gik galt!',
      text2: 'Prøv at lukke appen og start den igen',
      position: 'bottom',
      bottomOffset: 300,
      type: "error",
      autoHide: false,
    });
    dispatch({
      type: "add_error",
      payload: "Something went wrong with the movies"
    })
  }
}

const getFeaturedMovies = dispatch => async () => {
  try {
    const response = await fetch(
      "https://www.kino.dk/appservices/featured-movies",
      { mode: "no-cors" })
    const featuredMovies = await response.json();
    
    dispatch({
      type: "get_featured_movies",
      payload: featuredMovies
    });
  } catch (err) {
    crashlytics().recordError(err);
    Toast.show({
      text1: 'Noget gik galt!',
      text2: 'Prøv at lukke appen og start den igen',
      position: 'bottom',
      bottomOffset: 300,
      type: "error",
      autoHide: false,
    });
    dispatch({
      type: "add_error",
      payload: "Something went wrong with the movies"
    })
  }
}

const getVersions = dispatch => async () => {
  try {
    const response = await fetch(
      "https://www.kino.dk/appservices/movie-types",
      { mode: "no-cors" })
    const versions = await response.json();
    dispatch({
      type: "get_versions",
      payload: versions
    });
  } catch (err) {
    crashlytics().recordError(err);
    Toast.show({
      text1: 'Noget gik galt!',
      text2: 'Prøv at lukke appen og start den igen',
      position: 'bottom',
      bottomOffset: 300,
      type: "error",
      autoHide: false,
      
    });
    dispatch({
      type: "add_error",
      payload: "Something went wrong with the versions"
    })
  }
}




export const { Context, Provider } = dataContext(
  movieReducer,
  { getMovies, getVersions, getUpcomingMovies, getFeaturedMovies },
  { movies: [], upcomingMovies: [], featuredMovies: [], errorMessage: '', versions: [] }
);

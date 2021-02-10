import dataContext from "./DataContext";
import _ from "lodash";
import { computeDistance } from "../helpers/computeDistance";


const cinemaReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "get_cinemas":
      return { ...state, cinemas: action.payload };
    case "update_cinemas":
      return { ...state, cinemas: action.payload, cinemasSorted: true };
    default:
      return state
  }
};

const getCinemas = dispatch => async () => {
  try {
    const response = await fetch(
      "https://www.kino.dk/appservices/cinemas",
      { mode: "no-cors" })
    const cinemas = await response.json();
    dispatch({
      type: "get_cinemas",
      payload: cinemas
    });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with the cinemas"
    })
  }
}

const updateCinemas = (dispatch) => {

  return async (cinemas, referenceLat, referenceLong) => {
    
    const cinemasWithDistance = cinemas.map(cinema => {
      return {
        ...cinema,
        distance: computeDistance([cinema.geo.latitude, cinema.geo.longitude], [referenceLat, referenceLong]) // Calculate the distance
      };
    });    
    const orderedCinemas = _.orderBy(cinemasWithDistance, 'distance');
    dispatch({ type: "update_cinemas", payload: orderedCinemas });
    // Update cinemas is called with cinemas array and user coordinates
    // A distance value is added to each cinema based on user coords and cinema cords
    // cinemas are sorted by distance
    // state is updated with new cinemas array and a value of cinemaSorted to be true
  }
}




export const { Context, Provider } = dataContext(
  cinemaReducer,
  { updateCinemas, getCinemas },
  { cinemas: [], errorMessage: '', cinemasSorted: false }
);

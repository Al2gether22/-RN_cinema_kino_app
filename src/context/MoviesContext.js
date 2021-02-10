import dataContext from "./DataContext";

const movieReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "get_movies":
      return { ...state, movies: action.payload };
    case "get_versions":
      return { ...state, versions: action.payload };
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
    dispatch({
      type: "add_error",
      payload: "Something went wrong with the versions"
    })
  }
}




export const { Context, Provider } = dataContext(
  movieReducer,
  { getMovies, getVersions },
  { movies: [], errorMessage: '', versions: [] }
);

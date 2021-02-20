import React, { useRef, useState, useEffect, useContext } from "react";
import { AppState } from "react-native";
import getUser from "../../helpers/getUser"
import { Context as MovieContext } from "../../context/MoviesContext"
import { Context as CinemaContext } from "../../context/CinemaContext";

const FetchData = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const { getMovies, getVersions } = useContext(MovieContext)
  const { state, getCinemas } = useContext(CinemaContext)

  useEffect(() => {
    // fetches cinemas, movies and versions
    if (state.cinemas.length === 0) {
      getCinemas();
    }
    
    getMovies();
    getVersions();
    

    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // Re-fetching cinemas, movies and versions when appstate changes to active
        if (state.cinemas.length === 0) {
          getCinemas();
          
        }

        getMovies();
        getVersions();
        getUser();
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    
  };

  return null
};


export default FetchData;
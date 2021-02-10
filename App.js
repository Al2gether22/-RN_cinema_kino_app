import 'react-native-gesture-handler';
import React from 'react';
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { Provider as MovieProvider } from "./src/context/MoviesContext";
import { Provider as CinemaProvider } from "./src/context/CinemaContext";


const App = () => {
  return (
    <CinemaProvider>
      <MovieProvider>
        <BottomTabNavigator />
      </MovieProvider>
    </CinemaProvider>
  );
};

export default App;

import 'react-native-gesture-handler';
import React from 'react';
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { Provider as MovieProvider } from "./src/context/MoviesContext";


const App = () => {
  return (
    <MovieProvider>
      <BottomTabNavigator />
    </MovieProvider>
  );
};

export default App;

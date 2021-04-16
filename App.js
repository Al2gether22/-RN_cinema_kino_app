import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from "react-native";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { Provider as MovieProvider } from "./src/context/MoviesContext";
import { Provider as CinemaProvider } from "./src/context/CinemaContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import FetchData from "./src/components/shared/FetchData"

const App = () => {
  return (
    <CinemaProvider>
      <MovieProvider>
        <AuthProvider>
          <StatusBar barStyle="light-content" />
          <FetchData />
          <BottomTabNavigator />
        </AuthProvider>
      </MovieProvider>
    </CinemaProvider>
  );
};

export default App;

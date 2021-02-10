import 'react-native-gesture-handler';
import React from 'react';
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { Provider as MovieProvider } from "./src/context/MoviesContext";
import { Provider as CinemaProvider } from "./src/context/CinemaContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";


const App = () => {
  return (
    <CinemaProvider>
      <MovieProvider>
        <AuthProvider>
          <BottomTabNavigator />
        </AuthProvider>
      </MovieProvider>
    </CinemaProvider>
  );
};

export default App;

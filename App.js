import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View, Text } from "react-native";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { Provider as MovieProvider } from "./src/context/MoviesContext";
import { Provider as CinemaProvider } from "./src/context/CinemaContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import FetchData from "./src/components/shared/FetchData"
import Toast, { BaseToast } from 'react-native-toast-message';
import { SIZES, FONTS, COLORS } from "./src/constants/theme"

const App = () => {


  const toastConfig = {

    error: ({ text1, text2, props, ...rest }) => (
      <View>
        <Text>{text1}</Text>
        <Text>{text2}</Text>
      </View>
    ),
    success: () => {},
    info: () => {},
    
  };

  return (
    <CinemaProvider>
      <MovieProvider>
        <AuthProvider>
          <StatusBar barStyle="light-content" />
          <FetchData />
          <BottomTabNavigator />
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </AuthProvider>
      </MovieProvider>
    </CinemaProvider>
  );
};

export default App;

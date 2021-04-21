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
    success: ({ text1, text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: '#ff2326', height: 150, borderColor: "black", borderWidth: 0.5 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        trailingIconStyle={{ position: "absolute", top: -7, right: -7, height: 15, width: 15 }}
        onPress={() => Toast.hide()}
        onTrailingIconPress={() => Toast.hide()}
        text1Style={{
          
          ...FONTS.h2
        }}
        text2Style={{
          
          ...FONTS.h3
        }}
        text1={text1}
        text2={text2}
      />
    )
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

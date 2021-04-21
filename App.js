import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View, Text } from "react-native";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { Provider as MovieProvider } from "./src/context/MoviesContext";
import { Provider as CinemaProvider } from "./src/context/CinemaContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import FetchData from "./src/components/shared/FetchData"
import Toast, { BaseToast } from 'react-native-toast-message';


const App = () => {

  const toastConfig = {
    success: ({ text1, text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: '#ff2326', backgroundColor: "blue" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 20,
        }}
        text2Style={{
          fontSize: 16
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

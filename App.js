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
      <BaseToast
        {...rest}
        // leadingIcon={icons.error} 
        // trailingIcon={error}
        
        onLeadingIconPress={() => Toast.hide()}
        onTrailingIconPress={() => Toast.hide()}
        onPress={() => Toast.hide()}
        style={{ borderLeftColor: '#FE6301', height: 100 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          ...FONTS.h2
        }}
        text2Style={{
          ...FONTS.h3
        }}
        text1={text1}
        text2={text2}
      />
    ),
    
    /* 
      or create a completely new type - `my_custom_type`,
      building the layout from scratch
    */
    my_custom_type: ({ text1, props, ...rest }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
      </View>
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

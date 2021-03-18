import React from "react";
import { Image, View } from "react-native"
import { createStackNavigator, Header } from "@react-navigation/stack";

import Home from "../screens/Home";
import { SafeAreaView } from "react-native";

const Stack = createStackNavigator();

const ImageHeader = () => {
  return (
    <SafeAreaView style={{flexDirection: 'column', backgroundColor: "#1d1d27",
    }}>
      <Image
        source={{
          uri:
            'https://www.kino.dk/sites/all/themes/kino/img/logo-small.svg',
        }}
        style={{
          width: 60,
          height: 40,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      />
    </SafeAreaView>
  );
};

export default function HomeStackScreen(){
  return (
    <Stack.Navigator
      screenOptions={{headerLeft: () => <ImageHeader />}}>
      <Stack.Screen 
        name="Kino.dk" 
        component={Home}  
        options={() => ({ 
          header: () => <ImageHeader />,
          title: "kino",
          headerStyle: {
            backgroundColor: "#1d1d27",
            shadowColor: "transparent"
          }, 
          headerTintColor: "#fffdfd",
          headerTitleStyle: {
            fontFamily: "SourceSansPro-Bold"
          },
      })} />
    </Stack.Navigator>
  )
}


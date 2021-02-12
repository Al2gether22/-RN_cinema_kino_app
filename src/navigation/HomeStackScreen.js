import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";

const Stack = createStackNavigator();

export default function HomeStackScreen(){
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Kino.dk" 
        component={Home}  
        options={() => ({ 
          title: "Kino.dk",
          headerStyle: {
            backgroundColor: "#1d1d27"
          }, 
          headerTintColor: "#fffdfd",
          headerTitleStyle: {
            fontFamily: "SourceSansPro-Bold"
          },
      })} />
    </Stack.Navigator>
  )
}
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Cinemas from "../screens/Cinemas";

const Stack = createStackNavigator();

export default function CinemasStackScreen(){
  return (
    <Stack.Navigator
    
    >
      <Stack.Screen name="Cinemas" component={Cinemas} />
    </Stack.Navigator>
  )
}
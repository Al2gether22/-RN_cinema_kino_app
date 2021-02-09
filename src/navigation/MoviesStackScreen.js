import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Movies from "../screens/Movies";

const Stack = createStackNavigator();

export default function MoviesStackScreen(){
  return (
    <Stack.Navigator
    
    >
      <Stack.Screen name="Movies" component={Movies} />
    </Stack.Navigator>
  )
}
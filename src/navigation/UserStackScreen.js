import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import User from "../screens/User";

const Stack = createStackNavigator();

export default function UserStackScreen(){
  return (
    <Stack.Navigator
    
    >
      <Stack.Screen name="Profile" component={User} />
    </Stack.Navigator>
  )
}
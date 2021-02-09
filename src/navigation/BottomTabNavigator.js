import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackScreen from "./HomeStackScreen";
import MoviesStackScreen from "./MoviesStackScreen";
import CinemasStackScreen from "./CinemasStackScreen";
import UserStackScreen from "./UserStackScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Movies" component={MoviesStackScreen} />
        <Tab.Screen name="Cinemas" component={CinemasStackScreen} />
        <Tab.Screen name="Profile" component={UserStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStackScreen from "./HomeStackScreen";
import MoviesStackScreen from "./MoviesStackScreen";
import CinemasStackScreen from "./CinemasStackScreen";
import UserStackScreen from "./UserStackScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Movies") {
              iconName = focused ? "ticket" : "ticket-outline"
            } else if (route.name === "Cinemas") {
              iconName = focused ? "movie" : "movie-outline"
            } else if (route.name === "Profile") {
              iconName = focused ? "account" : "account-outline";
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            )
          },
        })}
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: "white",
          activeBackgroundColor: "tomato",
          inactiveBackgroundColor: "black",
          labelPosition: "below-icon",
          labelStyle: {
            paddingBottom: 5,
            fontFamily: "SourceSansPro-Bold"
          }, 
          style: styles.container
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Movies" component={MoviesStackScreen} />
        <Tab.Screen name="Cinemas" component={CinemasStackScreen} />
        <Tab.Screen name="Profile" component={UserStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0,
    backgroundColor: "black"
  }
})
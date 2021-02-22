import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Context } from "../context/AuthContext"
import HomeStackScreen from "./HomeStackScreen";
import MoviesStackScreen from "./MoviesStackScreen";
import CinemasStackScreen from "./CinemasStackScreen";
import UserStackScreen from "./UserStackScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {

  const { state } = useContext(Context)

  // Need to check if user is logged in.  If he is logged in show Green Tab icon and label "Profil"
  // If not logged in, show red icon and label "Log In"

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Hjem"
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === "Hjem") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Film") {
              iconName = focused ? "ticket" : "ticket-outline"
            } else if (route.name === "Biografer") {
              iconName = focused ? "movie" : "movie-outline"
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
        <Tab.Screen name="Hjem" component={HomeStackScreen} />
        <Tab.Screen name="Film" component={MoviesStackScreen} />
        <Tab.Screen name="Biografer" component={CinemasStackScreen} />
        <Tab.Screen name="Profil" component={UserStackScreen} 
          options={{ 
            tabBarLabel: state.user ? "Profil" : "Log ind", 
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            // check to see if logged in
            iconName = focused ? "account" : "account-outline"
            state.user ? color="#28a804" : color="#ff321e"
    
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            )
          },}} />
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
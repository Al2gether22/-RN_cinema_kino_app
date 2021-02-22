import React, { useContext } from "react";
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

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === "Kino.dk") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Film") {
              iconName = focused ? "ticket" : "ticket-outline"
            } else if (route.name === "Biografer") {
              iconName = focused ? "movie" : "movie-outline"
            } else if (route.name === "Profil") {
              // check to see if logged in
              state.user ? iconName = focused ? "account" : "account-outline" : iconName = focused ? "account" : "account-outline" ;
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
        <Tab.Screen name="Kino.dk" component={HomeStackScreen} />
        <Tab.Screen name="Film" component={MoviesStackScreen} />
        <Tab.Screen name="Biografer" component={CinemasStackScreen} />
        <Tab.Screen name="Profil" component={UserStackScreen} />
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
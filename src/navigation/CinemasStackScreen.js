import React from "react";
import { HeaderBackButton } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Cinemas from "../screens/Cinemas";
import Cinema from "../screens/Cinema";

const Stack = createSharedElementStackNavigator();


export default function CinemasStackScreen({ navigation }){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cinemas" component={Cinemas} 
        options={{
          title: "Biografer",
          headerBackTitle: "Tilbage",
          headerLeft: (props) => (
            <HeaderBackButton 
              {...props}
              onPress={navigation.goBack}
            />
          ), 
          headerStyle: {
            backgroundColor: "#1d1d27",
            shadowColor: "transparent",
          },
          headerTintColor: "#fffdfd",
          headerTitleStyle: {
            fontFamily: "SourceSansPro-Bold",
            fontSize: 18
          }, 
          headerBackTitleStyle: {
            fontSize: 18,
            color: "#fffdfd",
            fontFamily: "SourceSansPro-Bold",
          }
        }}
      />

      <Stack.Screen name="Cinema" component={Cinema}
        options={({ route }) => ({
          headerShown: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress
              }
            };
          }         
        })}
      />
    </Stack.Navigator>
  )
}
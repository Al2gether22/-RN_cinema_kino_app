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
          }, 
          headerBackTitleStyle: {
            fontSize: 15,
            color: "#fffdfd",
            fontFamily: "SourceSansPro-Bold", 
          }
        }}
      />

      <Stack.Screen name="Cinema" component={Cinema}
        options={({ route }) => ({
          title: route.params.item.name, 
          headerBackTitle: "Tilbage",
          navigationOptions: ({ navigation }) => ({
            headerLeft: (
              <HeaderBackButton 
                onPress={_ => navigation.navigate("Cinemas")} />
            )
          }),
          headerStyle: {
          backgroundColor: '#1d1d27',
          shadowColor: 'transparent',
          },
          headerTintColor: '#fffdfd',
          headerTitleStyle: {
            fontFamily: "SourceSansPro-Bold",
          },
          headerBackTitleStyle: {
            fontSize: 15,
            color: "#fffdfd",
            fontFamily: "SourceSansPro-Bold",
          },  
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
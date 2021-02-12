import React from "react";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";

import Cinemas from "../screens/Cinemas";
import Cinema from "../screens/Cinema";

const Stack = createStackNavigator();

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
          title: route.params.name, 
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
            fontFamily: "SourceSansPro-Bold"
          },
          headerBackTitleStyle: {
            fontSize: 15,
            color: "#fffdfd",
            fontFamily: "SourceSansPro-Bold"
          },           
        })}
      />
    </Stack.Navigator>
  )
}
import React from "react";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";

import User from "../screens/User";

const Stack = createStackNavigator();

export default function UserStackScreen({ navigation }){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={User}
        options={{ 
          title: 'Profil', 
          headerBackTitle: "Tilbage",
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={navigation.goBack}
            />
            ), 
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
        }}
      />
    </Stack.Navigator>
  )
}
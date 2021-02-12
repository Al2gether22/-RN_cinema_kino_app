import React from "react";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";

import Movies from "../screens/Movies";
import Movie from "../screens/Movie";

const Stack = createStackNavigator();

export default function MoviesStackScreen({ navigation }){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Movies" component={Movies} 
        options={{
          title: "Film",
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

      <Stack.Screen name="Movie" component={Movie}
        options={({ route }) => ({ 
          title: route.params.name,
          headerBackTitle: "Tilbage",
          navigationOptions: ({ navigation }) => ({
            headerLeft: (<HeaderBackButton onPress={_ => navigation.navigate("Movies")}/>)
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
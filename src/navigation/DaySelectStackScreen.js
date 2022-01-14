import React from 'react';
import {HeaderBackButton} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import Movie from '../screens/Movie';

import SelectByDateScreen from '../screens/SelectByDateScreen';

const Stack = createSharedElementStackNavigator();

export default function MoviesStackScreen({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Film oversigt"
        component={SelectByDateScreen}
        options={{
          title: 'Vælg dag',
          headerBackTitle: 'Tilbage',

          headerLeft: props => (
            <HeaderBackButton {...props} onPress={navigation.goBack} />
          ),
          headerStyle: {
            backgroundColor: '#1d1d27',
            shadowColor: 'transparent',
          },
          headerTintColor: '#fffdfd',
          headerTitleStyle: {
            fontFamily: 'SourceSansPro-Bold',
            fontSize: 18,
          },
          headerBackTitleStyle: {
            fontSize: 18,
            color: '#fffdfd',
            fontFamily: 'SourceSansPro-Bold',
          },
        }}
      />

      <Stack.Screen
        name="Vælg dag"
        component={Movie}
        options={({route}) => ({
          headerShown: false,
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
    </Stack.Navigator>
  );
}

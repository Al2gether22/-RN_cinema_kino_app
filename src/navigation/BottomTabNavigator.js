import React, {useContext, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context} from '../context/AuthContext';
import HomeStackScreen from './HomeStackScreen';
import MoviesStackScreen from './MoviesStackScreen';
import CinemasStackScreen from './CinemasStackScreen';
import UserStackScreen from './UserStackScreen';
import {COLORS, FONTS, SIZES} from '../constants/theme';
import analytics from '@react-native-firebase/analytics';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const {state} = useContext(Context);
  const navigationRef = useRef();
  const routeNameRef = useRef();

  // Need to check if user is logged in.  If he is logged in show Green Tab icon and label "Profil"
  // If not logged in, show red icon and label "Log In"

  const logRoutesToFirebaseAnalytics = navigationRef => {
    const route = navigationRef.current?.getCurrentRoute();
    const {name, params} = route;
    if (name === 'Hjem') return; //Already logged inside component
    analytics().logScreenView({
      screen_class: name,
      screen_name: name,
    });
    if (name === 'Film') {
      analytics().logEvent('Film', {
        Title: params.item.danishTitle,
        id: params.item.id,
      });
    }
    if (name === 'Biograf') {
      analytics().logEvent('Biograf', {
        Title: params.item.name,
        id: params.item.id,
      });
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        logRoutesToFirebaseAnalytics(navigationRef);
      }}>
      <Tab.Navigator
        initialRouteName="Hjem"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Hjem') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Film oversigt') {
              iconName = focused ? 'ticket' : 'ticket-outline';
            } else if (route.name === 'Biografer') {
              iconName = focused ? 'movie' : 'movie-outline';
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={SIZES.width / 18}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#ff321e',
          inactiveTintColor: 'white',
          inactiveBackgroundColor: 'black',
          labelPosition: 'below-icon',
          labelStyle: {
            paddingBottom: 5,
            fontFamily: 'SourceSansPro-Bold',
            fontSize: SIZES.width / 40,
          },
          style: styles.container,
        }}>
        <Tab.Screen
          name="Hjem"
          component={HomeStackScreen}
          options={{unmountOnBlur: true}}
        />
        <Tab.Screen
          name="Film oversigt"
          component={MoviesStackScreen}
          options={{unmountOnBlur: true, tabBarLabel: 'Film'}}
          listeners={({navigation}) => ({
            tabPress: () => {
              navigation.navigate('Film oversigt', {screen: 'Film oversigt'});
            },
          })}
        />
        <Tab.Screen
          name="Biografer"
          component={CinemasStackScreen}
          options={{unmountOnBlur: true}}
          listeners={({navigation}) => ({
            tabPress: () => {
              navigation.navigate('Biografer');
            },
          })}
        />
        <Tab.Screen
          name="Profil"
          component={UserStackScreen}
          options={{
            onmountOnBlur: true,
            tabBarLabel: state.user ? 'Profil' : 'Log ind',
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              // check to see if logged in
              iconName = state.user
                ? 'account-check-outline'
                : 'account-outline';

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={SIZES.width / 18}
                  color={color}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0,
    backgroundColor: 'black',
    height: SIZES.height / 12,
  },
});

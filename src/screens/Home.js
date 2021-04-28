import React, {useContext, useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Context as CinemaContext} from '../context/CinemaContext';
import {Context as MoviesContext} from '../context/MoviesContext';
import _ from 'lodash';
import UserInfoModal from '../modals/UserInfoModal';
import FeaturedMovie from '../components/shared/FeaturedMovie2';
import Top10Movies from '../components/shared/Top10Movies';
import TopCinemas from '../components/shared/TopCinemas';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import { COLORS, SIZES } from "../constants/theme"
import analytics from '@react-native-firebase/analytics';
import { firebase } from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

import {Platform} from 'react-native';

const Home = () => {
  const {state, updateCinemas} = useContext(CinemaContext);
  const {
    state: {movies, featuredMovies},
  } = useContext(MoviesContext);
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const platformPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  useEffect(() => {  
    checkPermissions();
  }, []);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function trackData() {
      await firebase.analytics().setAnalyticsCollectionEnabled(true),
      await analytics().logScreenView({
        screen_class: 'Hjem',
        screen_name: 'Hjem',
      })
    }
    // Execute the created function directly
    trackData();
  }, []);


  const checkPermissions = () => {
    console.log('checkPermissions()');
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            setModalVisible(true);
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            getOneTimeLocation();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
  };

  useEffect(() => {
    console.log('updateCinemas() useEffect');
    if (state.isCinemasFetched && currentLatitude !== '') {
      updateCinemas(state.cinemas, currentLatitude, currentLongitude);
    }
    console.log('Updated cinemas called from HOME');
    console.log(`currentLatitide ${currentLatitude}`);
  }, [state.isCinemasFetched, currentLatitude]);

  const requestPermissions = async () => {
    try {
      const result = await request(platformPermission);
      console.log('requestPermissions result ' + result);
      checkPermissions();
    } catch (err) {
      crashlytics().recordError(err)
      console.error(err);
    }
  };

  const getOneTimeLocation = () => {
    console.log('getOneTimeLocation');
    Geolocation.getCurrentPosition(
      position => {
        console.log('position');
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      error => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  if (state.cinemas.length === 0 || movies.length == 0) {
    return <ActivityIndicator size="large" style={{marginTop: 200}} />;
  }


  return (
    <>
      <UserInfoModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
        requestPermissions={requestPermissions}
      />

      <View style={styles.container}>
        <View style={styles.featuredMovieContainer}>
          <FeaturedMovie movies={movies} featuredMovies={featuredMovies} />
        </View>
        <View style={styles.slidersContainer}>
          <Top10Movies movies={movies} />
        </View>
        <View style={styles.slidersContainer}>
          <TopCinemas cinemas={state.cinemas} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.backgroundColor,
  },
  featuredMovieContainer: {
    maxHeight: "30%",
    width: SIZES.width
  },
  slidersContainer: {
    marginTop: 20,
    backgroundColor: '#1d1d27',
  },
});

export default Home;

import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';
import Geolocation from '@react-native-community/geolocation';
import * as Animatable from 'react-native-animatable';
import {Context as CinemaContext} from '../context/CinemaContext';
import {Context as MoviesContext} from '../context/MoviesContext';
import _ from 'lodash';
import UserInfoModal from '../modals/UserInfoModal';
import FeaturedMovie from '../components/shared/FeaturedMovie';
import Top10Movies from '../components/shared/Top10Movies';
import TopCinemas from '../components/shared/TopCinemas';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {COLORS, SIZES, FONTS} from '../constants/theme';
import analytics from '@react-native-firebase/analytics';
import {firebase} from '@react-native-firebase/analytics';
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
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;;

  useEffect(() => {
    checkPermissions();
  }, []);

  useEffect(() => {
    async function trackData() {
      await firebase.analytics().setAnalyticsCollectionEnabled(true),
        await analytics().logScreenView({
          screen_class: 'Hjem',
          screen_name: 'Hjem',
        });
    }
    trackData();
  }, []);

  const checkPermissions = () => {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            analytics().logEvent("GeoTracking", { Status: "Unavailable"});
            break;
          case RESULTS.DENIED:
            setModalVisible(true);
            analytics().logEvent("GeoTracking", { Status: "Denied"});
            break;
          case RESULTS.LIMITED:
            analytics().logEvent("GeoTracking", { Status: "Limited"});
            break;
          case RESULTS.GRANTED:
            analytics().logEvent("GeoTracking", { Status: "Granted"});
            getOneTimeLocation();
            break;
          case RESULTS.BLOCKED:
            analytics().logEvent("GeoTracking", { Status: "Blocked"});
            break;
        }
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
  };

  useEffect(() => {
    if (state.isCinemasFetched && currentLatitude !== '') {
      updateCinemas(state.cinemas, currentLatitude, currentLongitude);
    }
  }, [state.isCinemasFetched, currentLatitude]);

  const requestPermissions = async () => {
    try {
      const result = await request(platformPermission);
      checkPermissions();
    } catch (err) {
      crashlytics().recordError(err);
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      error => {
        crashlytics().recordError(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  if (state.cinemas.length == 0 || movies.length == 0) {
    return (
      <View style={{height: "100%", flex: 1, justifyContent: "center", backgroundColor: COLORS.backgroundColor }}>
        <PacmanIndicator color="white" size={75} />
        <Text style={{fontSize: 25, textAlign: "center", color: "white", flex: 1, ...FONTS.h2}}>Loading...</Text>
      </View>
    )
  }

  return (
    <>
      <UserInfoModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
        requestPermissions={requestPermissions}
      />
 

      <View style={styles.container}>
        <Animatable.View 
          style={styles.featuredMovieContainer}
          animation='fadeIn'
          duration={600}
          delay={0}
        >
          <FeaturedMovie movies={movies} featuredMovies={featuredMovies} />
        </Animatable.View>
        <Animatable.View 
          style={styles.slidersContainer}
          animation='fadeIn'
          duration={600}
          delay={200}
        >
          <Top10Movies movies={movies} />
        </Animatable.View>
        <Animatable.View 
          style={styles.slidersContainer}
          animation='fadeIn'
          duration={600}
          delay={400}
        >
          <TopCinemas cinemas={state.cinemas} />
        </Animatable.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.backgroundColor,
  },
  featuredMovieContainer: {
    maxHeight: '30%',
    width: SIZES.width,
  },
  featuredMovieContainer: {
    maxHeight: '30%',
  },
  slidersContainer: {
    marginTop: 20,
    backgroundColor: '#1d1d27',
  },
});

export default Home;

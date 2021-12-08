import React, {useContext, useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text, AppState} from 'react-native';
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
import {COLORS, SIZES} from '../constants/theme';
import analytics from '@react-native-firebase/analytics';
import {firebase} from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import {Platform} from 'react-native';
import LoadingScreen from '../components/shared/LoadingScreen';

const Home = () => {
  const {state, updateCinemas} = useContext(CinemaContext);
  const {
    state: {movies, featuredMovies},
  } = useContext(MoviesContext);
  const appState = useRef(AppState.currentState);
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
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkPermissions();
      }
      appState.current = nextAppState;
    });

    return () => {
      if (subscription && subscription.remove) {
        subscription.remove();
      }
    };
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
    check(platformPermission)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            analytics().logEvent('GeoTracking', {Status: 'Unavailable'});
            break;
          case RESULTS.DENIED:
            setModalVisible(true);
            analytics().logEvent('GeoTracking', {Status: 'Denied'});
            break;
          case RESULTS.LIMITED:
            analytics().logEvent('GeoTracking', {Status: 'Limited'});
            break;
          case RESULTS.GRANTED:
            analytics().logEvent('GeoTracking', {Status: 'Granted'});
            getOneTimeLocation();
            break;
          case RESULTS.BLOCKED:
            analytics().logEvent('GeoTracking', {Status: 'Blocked'});
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
      await request(platformPermission);
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
        maximumAge: 3600000,
      },
    );
  };

  if (state.cinemas.length == 0 || movies.length == 0) {
    return <LoadingScreen />;
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
          animation="fadeIn"
          duration={600}
          delay={0}>
          <FeaturedMovie movies={movies} featuredMovies={featuredMovies} />
        </Animatable.View>
        <Animatable.View
          style={styles.slidersContainer}
          animation="fadeIn"
          duration={600}
          delay={200}>
          <Top10Movies movies={movies} />
        </Animatable.View>
        <Animatable.View
          style={styles.slidersContainer}
          animation="fadeIn"
          duration={600}
          delay={400}>
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
    height: '30%',
    width: SIZES.width,
  },
  slidersContainer: {
    marginTop: '5%',
    height: '30%',
    backgroundColor: '#1d1d27',
  },
});

export default Home;

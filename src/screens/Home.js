import React, {useContext, useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Context as CinemaContext} from '../context/CinemaContext';
import {Context as MoviesContext} from '../context/MoviesContext';
import _ from 'lodash';
import UserInfoModal from '../modals/UserInfoModal';
import FeaturedMovie from '../components/shared/FeaturedMovie';
import Top10Movies from '../components/shared/Top10Movies';
import TopCinemas from '../components/shared/TopCinemas';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const Home = () => {
  const {state, updateCinemas} = useContext(CinemaContext);
  const {
    state: {movies},
  } = useContext(MoviesContext);
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    checkPermissions();
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
        console.error(error);
      });
  };

  useEffect(() => {
    console.log('updateCinemas() useEffect');
    if (state.cinemasFetched && currentLatitude !== '') {
      updateCinemas(state.cinemas, currentLatitude, currentLongitude);
    }
    console.log('Updated cinemas called from HOME');
    console.log(`currentLatitide ${currentLatitude}`);
  }, [state.cinemasFetched, currentLatitude]);

  const requestPermissions = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('requestPermissions result ' + result);
      checkPermissions();
    } catch (err) {
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
        enableHighAccuracy: false,
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
        <FeaturedMovie />
        <View style={styles.slidersContainer}>
          <Top10Movies movies={movies} />
          <TopCinemas cinemas={state.cinemas} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d1d27',
  },
  slidersContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 80,
  },
});

export default Home;

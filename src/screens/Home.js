import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { Context as CinemaContext } from "../context/CinemaContext";
import { Context as AuthContext } from "../context/AuthContext";
import UserInfoModal from "../modals/UserInfoModal"
import FeaturedMovie from "../components/shared/FeaturedMovie"
import Top10Movies from "../components/shared/Top10Movies"
import TopCinemas from "../components/shared/TopCinemas"
import {Context as CinemaContext} from '../context/CinemaContext';
import {Context as AuthContext} from '../context/AuthContext';
import UserInfoModal from '../modals/UserInfoModal';
import FeaturedMovie from '../components/shared/FeaturedMovie';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const Home = () => {
  const {state, updateCinemas} = useContext(CinemaContext);
  const {
    state: {user},
  } = useContext(AuthContext);
  const navigation = useNavigation();
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = () => {
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
    updateCinemas(state.cinemas, currentLatitude, currentLongitude);
  }, [state.cinemas.length && currentLatitude]);

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

  if (state.cinemas.length === 0) {
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
          <Top10Movies />
          <TopCinemas />
        </View>
        
        {/* <TouchableScale
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => {
            navigation.navigate('Film');
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Vælg Film</Text>
          </View>
        </TouchableScale>

        <TouchableScale
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => {
            navigation.navigate('Biografer');
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Vælg Biograf</Text>
          </View>
        </TouchableScale>

        <TouchableScale
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => {
            navigation.navigate('Profil');
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{ user ? "Profil" : "Login" }</Text>  
          </View>  
        </TouchableScale> */}
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
    width: "100%", 
    justifyContent: "center",
    marginBottom: 80
  },
  button: {
    alignSelf: 'center',
    fontSize: 30,
    backgroundColor: '#ff321e',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
  buttonText: {
    fontFamily: 'BureauGrotComp-Medium',
    color: 'white',
    textAlign: 'center',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
  },
});

export default Home;

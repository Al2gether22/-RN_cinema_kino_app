import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Platform, PermissionsAndroid } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Geolocation from '@react-native-community/geolocation';
import TouchableScale from 'react-native-touchable-scale';
import { Context as CinemaContext } from "../context/CinemaContext";
import { Context as AuthContext } from "../context/AuthContext";
import UserInfoModal from "../modals/UserInfoModal"
import FeaturedMovie from "../components/shared/FeaturedMovie"
import Top10Movies from "../components/shared/Top10Movies"
import TopCinemas from "../components/shared/TopCinemas"

const Home = () => {

  const { state, updateCinemas } = useContext(CinemaContext)
  const { state: { user } } = useContext(AuthContext)
  const navigation = useNavigation();
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [geo, setGeo] = useState(false)

  useEffect(() => {
    const modalVisibility = async () => {
      try {
        const value = await AsyncStorage.getItem('informationModal')

        if(value !== null) {
          setModalVisible(false)
          setGeo(true)
        } else {
          setModalVisible(true)
          await AsyncStorage.setItem('informationModal', "false")
          
        }
      } catch(e) {
        // error reading value
      }
    }
    
    modalVisibility();
  }, [])

  useEffect(() => {
    updateCinemas(state.cinemas, currentLatitude, currentLongitude)
  }, [state.cinemas.length && currentLatitude])

  
  
  useEffect(() => {
    if (!geo) return;
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, [geo]);

  

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  if (state.cinemas.length === 0) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />
  }
  
  return (
    <>
      <UserInfoModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
        setGeo={() => setGeo(true)}
      />
      <View style={styles.container} >
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
          }}
        >
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
          }}
        >
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
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{ user ? "Profil" : "Login" }</Text>  
          </View>  
        </TouchableScale> */}
      </View>
     
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#1d1d27',
    
  },
  slidersContainer: {
    flex: 1,
    width: "100%", 
    justifyContent: "center",
    marginBottom: 80
  },
  button: {
    alignSelf: "center",
    fontSize: 30,
    backgroundColor: "#ff321e",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 160,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
  buttonText: {
    fontFamily: "BureauGrotComp-Medium",
    color: "white",
    textAlign: "center",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5
  }
})

export default Home;
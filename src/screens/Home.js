import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Platform, PermissionsAndroid } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Geolocation from '@react-native-community/geolocation';
import { Context as MovieContext } from "../context/MoviesContext"
import { Context as CinemaContext } from "../context/CinemaContext";
import UserInfoModal from "../modals/UserInfoModal"


const Home = () => {

  const { getMovies, getVersions } = useContext(MovieContext)
  const { state, updateCinemas, getCinemas } = useContext(CinemaContext)
  const navigation = useNavigation();
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true)

  // Get user in auth 
  // Get cinemas movies app state
  // set modal visibility in async storage

  // Check async storage if popup has been seen
  // Show modal if he didnt say either of the 2
  // Once clicked ok change status to false
  // Run useEffect hook for coords if modalVisibility is false
  // Then request user permissin
  // Then fetch user location
  // Then update cinemas with coords

  useEffect(() => {
    const modalVisibility = async () => {
      try {
        const value = await AsyncStorage.getItem('informationModal')

        if(value !== null) {
          setModalVisible(false)
          setLoading(false)
        } else {
          setModalVisible(true)
          await AsyncStorage.setItem('informationModal', "false")
          setLoading(false)
        }
      } catch(e) {
        // error reading value
      }
    }
    
    modalVisibility();
  }, [modalVisible])



  // Check async storage for popup value
  // change loading state 
  // render requestlocation

  useEffect(() => {
    updateCinemas(state.cinemas, currentLatitude, currentLongitude)
  }, [modalVisible])


  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      //  subscribeLocationLocation();
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
          //  subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();

  }, []);
  // Set modal const inside [] to invoke this on "ok"

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

  // const subscribeLocationLocation = () => {
  //   watchID = Geolocation.watchPosition(
  //     (position) => {
  //       //Will give you the location on location change
        
  //       setLocationStatus('You are Here');
  //       console.log(position);

  //       //getting the Longitude from the location json        
  //       const currentLongitude =
  //         JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       const currentLatitude = 
  //         JSON.stringify(position.coords.latitude);

  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);

  //       //Setting Latitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     (error) => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       maximumAge: 1000
  //     },
  //   );
  // };

  // Fetch cinemas, if not fetched
  // Call the getUserCoordinates and updated cinema array with distance parameter based on user coords
  useEffect(() => {
    if (state.cinemas.length === 0) {
      getCinemas();
      console.log("Get Cinemas called")
    }
    
  }, []);
  
  // Fetches the movies
  useEffect(() => {
    getMovies();
    getVersions();
    
    console.log("Get movies called")
  }, []);

  if (state.cinemas.length === 0) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />
  }
  
  return (
    <>
      <UserInfoModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
      />
      <View style={styles.container} >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Movies');
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Vælg Film</Text>  
          </View>  
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cinemas');
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Vælg Biograf</Text>  
          </View>  
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Profil</Text>  
          </View>  
        </TouchableOpacity>
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
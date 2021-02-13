import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Context as MovieContext } from "../context/MoviesContext"
import { Context as CinemaContext } from "../context/CinemaContext";

const Home = () => {

  const { getMovies, getVersions } = useContext(MovieContext)
  const { state, updateCinemas, getCinemas } = useContext(CinemaContext)
  const navigation = useNavigation();

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
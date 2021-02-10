import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
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
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Movies');
          }}
        >
          <View>
            <Text>Vælg Film</Text>  
          </View>  
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cinemas');
          }}
        >
          <View>
            <Text>Vælg Biograf</Text>  
          </View>  
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
          <View>
            <Text>Profil</Text>  
          </View>  
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Home;
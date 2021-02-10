import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Context as MovieContext } from "../context/MoviesContext"

const Home = () => {

  const { getMovies, getVersions } = useContext(MovieContext)
  const navigation = useNavigation();
  
  // Fetches the movies
  useEffect(() => {
    getMovies();
    getVersions();
  }, []);
  
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
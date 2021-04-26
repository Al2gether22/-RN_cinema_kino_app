
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import MovieModal from "../../modals/MovieModal"
import * as Animatable from 'react-native-animatable';
import { FONTS, SIZES, COLORS} from "../../constants/theme"
import crashlytics from '@react-native-firebase/crashlytics';
import Toast from 'react-native-toast-message';

const FeaturedMovie2 = () => {

  const [featuredMovieItem, setFeaturedMovieItem] = useState({});
  const [movieModalVisible, setMovieModalVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://www.kino.dk/appservices/featured-movies");
      res
        .json()
        .then(res => setFeaturedMovieItem(res))
        .catch(error => (
          crashlytics().recordError(error),
          Toast.show({
            text1: 'Noget gik galt!',
            text2: 'Prøv at lukke appen og start den igen',
            position: 'bottom',
            bottomOffset: 300,
            type: "error",
            autoHide: false,
        })))
    }

    fetchData();
  }, [])

  return (
    featuredMovieItem[0] ? 
    <>
      <Animatable.View 
        style={styles.coverImageContainer} 
        animation='fadeIn'
        duration={900}
        delay={50}
      >
      <MovieModal 
        movieModalVisible={movieModalVisible}
        setMovieModalVisible={() => setMovieModalVisible(false)}
        passedMovie={featuredMovieItem[0]}
        />
      <ImageBackground 
        style={styles.coverImage}
        source={{ uri: "https://www.kino.dk/sites/default/files/featured-images/pagten1280_0.jpg" }}
        resizeMode="cover"
      >
        <TouchableOpacity 
            style={styles.linkContainer}
            onPress={() =>
              setMovieModalVisible(true)
            }
          >
            <Text style={styles.linkText}>Læs mere om {featuredMovieItem[0].danishTitle}</Text>
          </TouchableOpacity>

      </ImageBackground>
      </Animatable.View>
    </>
    : null 
  )
}

const styles = StyleSheet.create({

  coverImageContainer: {
    height: "100%",
    marginBottom: 50,
  },
  coverImage: {
    height: "100%",
    width: "100%",
  }, 
  
  linkContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "black",
    position: "absolute", 
    bottom: 10,
    left: 10,
  },
  linkText: {
    color: COLORS.white, 
    ...FONTS.h2
   
  }
})

export default FeaturedMovie2;

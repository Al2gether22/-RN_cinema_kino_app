import React, { useEffect, useState } from "react";
import { ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import MovieModal from "../../modals/MovieModal"
import * as Animatable from 'react-native-animatable';


const FeaturedMovie = () => {

  const [featuredMovieItem, setFeaturedMovieItem] = useState({});
  const [movieModalVisible, setMovieModalVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://www.kino.dk/appservices/featured-movies");
      res
        .json()
        .then(res => setFeaturedMovieItem(res))
        .catch(err => setErrors(err));
    }

    fetchData();
  }, [])

  return (
    featuredMovieItem[0] ? 
    <>
      <Animatable.View 
      style={styles.coverImage} 
      animation='fadeIn'
      duration={900}
      delay={50}
    >
      <ImageBackground 
        style={styles.coverImage}
        source={{ uri: featuredMovieItem[0].imageUrl }}
        resizeMode="cover"
      >


    

        <LinearGradient 
          colors={['rgba(29,29,39,1)', 'rgba(29,29,39,0)']} 
          
          style={styles.linearGradient}
        />
        
        <LinearGradient 
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} 
          
          style={styles.linearGradient}
          
        >
        
          <MovieModal 
            movieModalVisible={movieModalVisible}
            setMovieModalVisible={() => setMovieModalVisible(false)}
            passedMovie={featuredMovieItem[0]}
          />
          
        </LinearGradient>
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

  coverImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: -999
  }, 
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
   
  },
  linkContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "black",
    position: "absolute",
    bottom: 50,
    left: "50%",
  },
  linkText: {
    color: "white", 
    fontFamily: "SourceSansPro-Bold",
    fontSize: 25, 
    left: "-50%",
  }
})

export default FeaturedMovie;

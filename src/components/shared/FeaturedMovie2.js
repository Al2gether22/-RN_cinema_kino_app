import React, { useEffect, useState } from "react";
import { ImageBackground, Text, StyleSheet, TouchableOpacity, View } from "react-native"
import Video from "react-native-video"
import MovieModal from "../../modals/MovieModal"
import { FONTS, COLORS, SIZES} from "../../constants/theme"

const FeaturedMovie2 = ({ movies, featuredMovies }) => {

  const [movieModalVisible, setMovieModalVisible] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState();

  // Do a lookup in movies with the movie id and find the movie and pass it to movie modal
  // This needs to be refactored if we need more elements in the featuredMovies component
  useEffect(() => {
    const movie = movies.find(el => el.id === featuredMovies[0].id)
    setFeaturedMovie(movie)    
  }, [])
  
  return (
    featuredMovie ? 
    <View style={styles.coverImageContainer} >
      <MovieModal
        movieModalVisible={movieModalVisible}
        hideMovieModal={() => setMovieModalVisible(false)}
        passedMovie={featuredMovie ? featuredMovie : featuredMovies[0]}
      />
      {featuredMovies[0].videoUrl ? 
      <>
        <Video source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}   
          
          style={styles.coverVideo}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          controls={false}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
          poster={featuredMovies[0].imageUrl}
          posterResizeMode={"cover"}
          
        />
        <TouchableOpacity 
            style={styles.linkContainer}
            onPress={() =>
              setMovieModalVisible(true)
            }
          >
            <Text style={styles.linkText}>{featuredMovies[0].danishTitle}</Text>
        </TouchableOpacity>
      </>
      :
      <ImageBackground 
        style={styles.coverImage}
        source={{ uri: featuredMovies[0].imageUrl }}
        resizeMode="cover"
      >
        <TouchableOpacity 
            style={styles.linkContainer}
            onPress={() =>
              setMovieModalVisible(true)
            }
          >
            <Text style={styles.linkText}>{featuredMovies[0].danishTitle}</Text>
        </TouchableOpacity>

      </ImageBackground>
      }
    </View>
    : null 
  )
}

const styles = StyleSheet.create({

  coverImageContainer: {
    height: "100%",
    marginBottom: 50,
  },
  coverVideo: {
    height: "100%",
    width: SIZES.width
  },
  coverImage: {
    height: "100%",
    width: "100%",
  }, 
  
  linkContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute", 
    bottom: -15,
    left: 10,
  },
  linkText: {
    color: COLORS.white, 
    ...FONTS.h3
   
  }
})

export default FeaturedMovie2;

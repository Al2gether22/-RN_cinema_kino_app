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
      <TouchableOpacity 
        onPress={() =>
          setMovieModalVisible(true)
        }
      >
        
        <Video  
          source={{uri: `${featuredMovies[0].videoUrl}?t=qwe`}}
          style={styles.coverVideo}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          controls={false}
          rate={1.0}
          poster={featuredMovies[0].imageUrl}
          posterResizeMode={"cover"}
          onError={console.log("Error loading")}
          onBuffer={console.log("Buffing..")}
        />
        
        <View 
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>{featuredMovies[0].danishTitle}</Text>
        </View>
       
      </TouchableOpacity>
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
    : null  // Set fallback image
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

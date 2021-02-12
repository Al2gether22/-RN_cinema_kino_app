import React, { useState } from "react";
import { View, ImageBackground, Text, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MovieTrailerModal from "../../modals/MovieTrailerModal"
import styles from "../../styles/MovieBackgroundImageStyles";

const MovieBackgroundImage = ({ movie }) => {
  const [modalVisible, setModalVisible] = useState(false)
  console.log(movie)
  return (
    <View style={styles.imageContainer}>
      <ImageBackground 
        style={styles.coverImage}
        source={{ uri: movie.imageUrl }}
      ></ImageBackground>

      { !!movie.video_markup &&
        
        // checks to see if there is a trailer before rendering the play button
          <TouchableOpacity
            onPress={() => { setModalVisible(true)}} 
          >
            <View style={styles.playButtomViewWrapper}>
              <MaterialCommunityIcons  
                style={styles.playButton}
                name="play-circle" 
                size={60} 
              />
            </View>
            <MovieTrailerModal 
              modalVisible={modalVisible}
              setModalVisible={() => setModalVisible(false)}
              video_markup={movie.video_markup}
              movie={movie}
            />
          </TouchableOpacity>
        }
      
      <Text 
        style={styles.movieTitle} numberOfLines={3}>{movie.danishTitle}
      </Text>
      <Text style={styles.movieGenre} numberOfLines={2}>
        {movie.genre.join(' - ')} {"\n"}Varighed {movie.playingTime} min
      </Text>
    </View>
  )
}

export default MovieBackgroundImage
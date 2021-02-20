import React, { useState } from "react";
import { View, ImageBackground, Text, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {SharedElement} from 'react-navigation-shared-element';
import MovieTrailerModal from "../../modals/MovieTrailerModal"
import styles from "../../styles/MovieBackgroundImageStyles";


const MovieBackgroundImage = ({ movie, image, danishTitle, genre }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const genreFallback = genre ? genre : movie.genre
  const imageFallback = image ? image : movie.imageUrl

  return (
      
    <View style={styles.imageContainer}>
    
      <SharedElement id={image}>
        <ImageBackground 
          style={styles.coverImage}
          source={{ uri: imageFallback }}
          resizeMethod="auto"
          resizeMode="cover"
          //resizeMode="contain"
        >
            <LinearGradient 
              colors={['rgba(29,29,39,1)', 'rgba(29,29,39,0)']} 
              
              style={styles.LinearGradientUpper}
            />

            <LinearGradient 
              colors={['rgba(29,29,39,0)', 'rgba(29,29,39,1)']} 
              
              style={styles.LinearGradientLower}
            />
          
        
        </ImageBackground>
      </SharedElement>

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
      
      <SharedElement id={danishTitle}>
        <Text 
          style={styles.movieTitle} numberOfLines={3}>{danishTitle}
        </Text>
      </SharedElement>
      
      <Text style={styles.movieGenre} numberOfLines={2}>
        {genreFallback.join(' - ')} {"\n"}Varighed {movie.playingTime} min
      </Text>
    </View>
    
  )
}



export default MovieBackgroundImage
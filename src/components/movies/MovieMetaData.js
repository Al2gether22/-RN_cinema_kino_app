import React from "react";
import { View, Text } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from "react-native-vector-icons/Foundation"
import * as Animatable from 'react-native-animatable';

import ReadMore from "react-native-read-more-text";


import styles from "../../styles/MovieMetaDataStyles";

const MovieMetaData = ({ movie }) => {

  // Sets the movie description teaser
  const regex = /(<([^>]+)>)/ig;
  const movieDescription = movie.body.replace(regex, '');

    // This is typescript
    const _renderTruncatedFooter = (handlePress: () => void) => {
      return (
        <Text style={styles.toggleMovieBodyText} onPress={handlePress}>
          Læs mere
        </Text>
      );
    };
    
    const _renderRevealedFooter = (handlePress: () => void) => {
      return (
        <Text style={styles.toggleMovieBodyText} onPress={handlePress}>
          Vis mindre
        </Text>
      );
    };

    
    const _handleTextReady = () => {
      // ...
    };

    const renderViewMore = (onPress) => {
      return(
        <Text onPress={onPress}>View more</Text>
      )
    }

    const renderViewLess = (onPress) => {
      return(
        <Text onPress={onPress}>View less</Text>
      )
    }

  return (
 
    <Animatable.View 
      style={styles.metaDataContainer} 
      animation='fadeIn'
      duration={600}
      delay={300}
    >
      <View style={styles.movieMetaData}>
        <Text style={styles.movieCensur}>Censur: {movie.censorship.name}</Text>
        <View style={styles.movieRating}> 
          <MaterialIcons name="stars" size={34} color="#ff321e" style={styles.movieRatingIcon} />
          <Text style={styles.movieRatingRating}>{movie.average_rating? movie.average_rating.toFixed(0) : '0'} / 6</Text>
          <Text style={styles.movieRatingUsers}>Brugere ({movie.votes_count})</Text>
        </View>
        <View style={styles.movieRating}>
          <Foundation name="star" size={34} color="yellow" style={styles.movieRatingIcon} />
          <Text style={styles.movieRatingRating}>{movie.media_rating_value? parseInt(movie.media_rating_value) : 0} / 6</Text>
          <Text style={styles.movieRatingUsers}>Medier ({movie.media_rating_count})</Text>
        </View>
      </View>

      <View style={styles.movieReview}>
        <Text style={styles.movieReviewHeader}>Resume</Text> 
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}
          onReady={_handleTextReady}
        >          
          
          <Text style={styles.movieBody}>{movieDescription}</Text>
        </ReadMore>

    </View>
  </Animatable.View>
   
  )
}

export default MovieMetaData;
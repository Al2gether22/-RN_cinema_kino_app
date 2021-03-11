import React from "react";
import { View, Text } from "react-native"
import styles from "../../styles/MovieResumeStyles";


const MovieMetaData = ({ resume }) => {

  return (
    <View style={styles.movieReviewContainer}>
      <Text style={styles.movieReviewBody}>{resume}</Text>
      
    </View>
  )
}

export default MovieMetaData;
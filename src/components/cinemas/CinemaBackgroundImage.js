import React from "react";
import { View, ImageBackground, Text, StyleSheet } from "react-native"

import styles from "../../styles/CinemaBackgroundStyles";

const CinemaBackgroundImage = ({ name, img }) => {

  return (
    <>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.coverImage}
          source={{ uri: img }}
        ></ImageBackground>
      </View>
      
      <View style={styles.cinemaTitleContainer}>
        <Text style={styles.cinemaTitle}>{name}</Text>
      </View>
    </>
  )
}

export default CinemaBackgroundImage;
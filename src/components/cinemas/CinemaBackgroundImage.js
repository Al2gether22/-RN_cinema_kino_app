import React from "react";
import { View, ImageBackground, Text } from "react-native"
import LinearGradient from 'react-native-linear-gradient';


import styles from "../../styles/CinemaBackgroundStyles";

const CinemaBackgroundImage = ({ name, img }) => {

  return (
    <>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.coverImage}
          source={{ uri: img }}
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
      </View>
      
      <View style={styles.cinemaTitleContainer}>
        <Text style={styles.cinemaTitle}>{name}</Text>
      </View>
    </>
  )
}

export default CinemaBackgroundImage;
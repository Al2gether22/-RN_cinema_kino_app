import React from "react";
import { View, ImageBackground, Text, TouchableOpacity } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import styles from "../../styles/CinemaBackgroundStyles";

const CinemaBackgroundImage = ({ name, img }) => {

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.imageContainer}>

      <TouchableOpacity
        onPress={navigation.goBack}
        style={styles.goBackContainer}
      >
        <Text style={styles.goBack}>
          <MaterialCommunityIcons name="arrow-left-circle" size={35} color={"white"} />
        </Text>
      </TouchableOpacity>

        <SharedElement id={img}>
          <ImageBackground
            style={styles.coverImage}
            source={{ uri: img }}
          >
  

            <LinearGradient 
              colors={['rgba(29,29,39,0)', 'rgba(29,29,39,1)']} 
              
              style={styles.LinearGradientLower}
            />
          </ImageBackground>
        </SharedElement>

        <SharedElement id={name} style={styles.cinemaTitleContainer}>
          <Text style={styles.cinemaTitle}>{name}</Text>
        </SharedElement>
      </View>
      
      
    </>
  )
}

export default CinemaBackgroundImage;
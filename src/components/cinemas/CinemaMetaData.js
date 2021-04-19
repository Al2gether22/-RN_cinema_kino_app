import React from "react";
import { Platform } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, Linking } from "react-native"
import { createOpenLink } from 'react-native-open-maps';
import HTML from "react-native-render-html";
import { IGNORED_TAGS } from 'react-native-render-html';
import * as Animatable from 'react-native-animatable';
import { COLORS, FONTS } from "../../constants/theme";

const CinemaMetaData = ({ cinema }) => {

  callCinema = () => {
    let phoneNumber = ''

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${cinema.phone}`;
    } else {
      phoneNumber = `telprompt:${cinema.phone}`;
    }
  
    Linking.openURL(phoneNumber);
  }

  const openMap = createOpenLink({query: cinema.address});


  return (
    <>
    <Animatable.View 
      style={styles.cinemaMetaContainer} 
      animation='fadeIn'
      duration={600}
      delay={300}
    >
      <TouchableOpacity style={styles.cinemaMetaDataContainer}
        onPress={openMap}
      >
      <Text style={styles.cinemaMetaHeader} >
        <MaterialCommunityIcons
          name="map-marker"
          size={25}
          color="white"
        />
      </Text>
        
      </TouchableOpacity>

      <TouchableOpacity style={styles.cinemaMetaDataContainer}
        onPress={callCinema}
      >
      <Text style={styles.cinemaMetaHeader}>
        <MaterialCommunityIcons
          name="phone"
          size={25}
          color="white"
        />
      </Text>
        
      </TouchableOpacity>

      <TouchableOpacity style={styles.cinemaMetaDataContainer}
        onPress={() => Linking.openURL(`mailto:${cinema.email}`)}
      >
        <Text style={styles.cinemaMetaHeader}>
          <MaterialCommunityIcons
            name="email"
            size={25}
            color="white"
          />
        </Text>
        
      </TouchableOpacity>
      
    </Animatable.View>
    <Animatable.View 
      style={styles.cinemaDescriptionContainer} 
      animation='fadeIn'
      duration={600}
      delay={300}
    >
      <Text style={styles.cinemaOpeningHours}>ÅbningsTider:</Text>
      { !cinema.opening_hours ? null : 
    
      
      <HTML 
        source={{ html: cinema.opening_hours }} 
        ignoredTags={[ ...IGNORED_TAGS, 'img']}
        tagsStyles={{ p: { color: COLORS.white, ...FONTS.h4, textAlign: "center" }, a: { color: COLORS.white, textDecorationLine: "none", ...FONTS.h4, textAlign: "center" } }}
        onLinkPress={() => null}
      /> }
    </Animatable.View>
    </>
  )
}


   

const styles = StyleSheet.create({
  cinemaMetaContainer: {
    
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: "#676d7c",
  },
  cinemaMetaDataContainer: {
    flexDirection: "column", 
    flex: 3
  },
  cinemaMetaHeader: {
    textAlign: "center",
    marginBottom: 5
  },

  cinemaDescriptionContainer: {
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,

  },
  cinemaOpeningHours: {
    textDecorationLine: 'underline',
    marginBottom: 5,
    color: COLORS.white,
    ...FONTS.h2,
    lineHeight: 0,
    textAlign: "center"
  }
})

export default CinemaMetaData;
import React from "react";
import { Platform } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Linking } from "react-native"
import { createOpenLink } from 'react-native-open-maps';

const CinemaMetaData = ({ cinema }) => {

  // Sets the cinema description teaser
  const regex = /(<([^>]+)>)/ig;
  const cinemaDescription = cinema.description.replace(regex, '');
  const cinemaOpeningHours = cinema.opening_hours.replace(regex, '');

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
    <View style={styles.cinemaMetaContainer}>
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
        <Text style={styles.cinemaMetaContent}>{cinema.address}</Text>
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
        <Text style={styles.cinemaMetaContent}>{cinema.phone}</Text>
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
        <Text style={styles.cinemaMetaContent}>{cinema.email}</Text>
      </TouchableOpacity>
      
    </View>
    <View style={styles.cinemaDescriptionContainer}>
      <Text style={styles.cinemaDescription}>{cinemaDescription}</Text>
      <Text style={styles.cinemaDescription}>Åbningstider: {cinemaOpeningHours}</Text>
    </View>
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
  cinemaMetaContent: {
    fontFamily: "SourceSansPro-BlackIt",
    color: "#676d7c",
    fontSize: 12,
    textAlign: "center",
    marginLeft: 3,
    marginRight: 3, 
    
    
  },
  cinemaDescriptionContainer: {
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,

  },
  cinemaDescription: {
    fontFamily: "SourceSansPro-Bold",
    color: "#676d7c",
    marginBottom: 5
  }
})

export default CinemaMetaData;
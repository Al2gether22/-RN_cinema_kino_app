import React from "react";
import { View, Text, StyleSheet } from "react-native"

const CinemaMetaData = ({ cinema }) => {

  // Sets the cinema description teaser
  const regex = /(<([^>]+)>)/ig;
  const cinemaDescription = cinema.description.replace(regex, '');
  const cinemaOpeningHours = cinema.opening_hours.replace(regex, '');

  return (
          <>
    <View style={styles.cinemaMetaContainer}>
      <View style={styles.cinemaMetaDataContainer}>
      <Text style={styles.cinemaMetaHeader}>Adresse:</Text>
        <Text style={styles.cinemaMetaContent}>{cinema.address}</Text>
      </View>
      <View style={styles.cinemaMetaDataContainer}>
      <Text style={styles.cinemaMetaHeader}>Telefon:</Text>
        <Text style={styles.cinemaMetaContent}>{cinema.phone}</Text>
      </View>
      <View style={styles.cinemaMetaDataContainer}>
        <Text style={styles.cinemaMetaHeader}>Email:</Text>
        <Text style={styles.cinemaMetaContent}>{cinema.email}</Text>
      </View>
      
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
    fontFamily: "SourceSansPro-BlackIt",
    color: "white",
    textAlign: "center",
    marginBottom: 5
  },
  cinemaMetaContent: {
    fontFamily: "SourceSansPro-BlackIt",
    color: "#676d7c",
    textAlign: "center",
    marginLeft: 4,
    marginRight: 4
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
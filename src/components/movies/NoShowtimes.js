import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const NoShowtimes = ({ nextShowtime, onPressNextShowtime }) => {
  const dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
 
  const nextShowtimeDate = new Date(nextShowtime);

  if (!nextShowtime) {
    return null
  }

  return (
    <TouchableOpacity onPress={onPressNextShowtime}>
      <View style={styles.nextShowtimeContainer}>
        <Text style={styles.nextShowtimeText}>
          Næste spilletid er{" "}
          {nextShowtimeDate.toLocaleDateString("da", dateOptions)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextShowtimeContainer: {
    alignSelf: "center",
    backgroundColor: "black",
    padding: 10,
    borderWidth: 2,
    borderColor: "#676d7c",
    borderRadius: 6,
    marginBottom: 25,
    marginTop: 10,
  },
  nextShowtimeText: {
    color: "white",
    fontFamily: "SourceSansPro-Bold",
  },
});

export default NoShowtimes;

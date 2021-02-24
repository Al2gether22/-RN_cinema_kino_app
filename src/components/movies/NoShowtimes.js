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
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#1d1d27",
    padding: 10,
    borderWidth: 2,
    borderColor: "#676d7c",
    borderRadius: 6,
    marginBottom: 25,
    marginTop: 10,
  },
  nextShowtimeText: {
    color: "#676d7c",
    fontFamily: "SourceSansPro-Bold",
  },
});

export default NoShowtimes;

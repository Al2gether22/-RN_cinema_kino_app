import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { COLORS, FONTS} from "../../constants/theme"


const PremiereDate = ({ PremiereDate }) => {

  const dateOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  };

  const premiereDateString = PremiereDate.split(' ')[0]
  const parsedPremiereDate = new Date(premiereDateString)

  return (
    <View style={styles.PremiereDateContainer}>
      <Text style={styles.PremiereDate}>{parsedPremiereDate.toLocaleDateString('da', dateOptions).toString()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  PremiereDateContainer: {
    position: "absolute",
    top: 5,
    right: 0,
    backgroundColor: "black",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  PremiereDate: {
    color: COLORS.white,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 3,
    textTransform: "capitalize",
    ...FONTS.h4,
    fontSize: 12,
  }
})

export default PremiereDate;
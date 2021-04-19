import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { COLORS, FONTS, SIZES} from "../../constants/theme"

const TabViewComponent = ({ setActive, active, backgroundColor, primaryFontColor, secondaryFontColor, showtimes }) => {

  return (
    <View style={[styles.container, { backgroundColor: secondaryFontColor}]}>
      { showtimes === false ? null : 
      <TouchableOpacity
        style={active === 0 ? [styles.buttom, { borderBottomColor: backgroundColor }] : [styles.buttom, { borderBottomColor: primaryFontColor }] }
        onPress={() => {
          setActive(0)
        }}
      >
        <Text style={active === 0 ? [styles.buttomText, { color: backgroundColor }] : [styles.buttomText, { color: primaryFontColor }] }>Spilletider</Text>
      </TouchableOpacity>}

      <TouchableOpacity
        style={active === 1 ? [styles.buttom, { borderBottomColor: backgroundColor }] : [styles.buttom, { borderBottomColor: primaryFontColor }] }
        onPress={() => {
          setActive(1)
        }}
      >
        <Text style={active === 1 ? [styles.buttomText, { color: backgroundColor }] : [styles.buttomText, { color: primaryFontColor }] }>Resume</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={active === 2 ? [styles.buttom, { borderBottomColor: backgroundColor }] : [styles.buttom, { borderBottomColor: primaryFontColor }] }
        onPress={() => {
          setActive(2)
        }}
      >
        <Text style={active === 2 ? [styles.buttomText, { color: backgroundColor }] : [styles.buttomText, { color: primaryFontColor }] }>Medvirkende</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    
    justifyContent: "space-around",
    marginBottom: 10
  },
  buttom: {
    padding: 15,
    borderBottomColor: "transparent",
    borderBottomWidth: 2
  },

  buttomText: {
    ...FONTS.h3
  }
})

export default TabViewComponent;
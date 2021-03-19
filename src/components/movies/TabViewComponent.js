import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"

const TabViewComponent = ({ setActive, active, backgroundColor, primaryFontColor, secondaryFontColor }) => {



  return (
    <View style={[styles.container, { backgroundColor: secondaryFontColor}]}>
      <TouchableOpacity
        style={active === 0 ? [styles.buttom, { borderBottomColor: backgroundColor }] : styles.buttom }
        onPress={() => {
          setActive(0)
        }}
      >
        <Text style={[styles.buttomText, { color: backgroundColor}]}>Spilletider</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={active === 1 ? [styles.buttom, { borderBottomColor: backgroundColor }] : styles.buttom }
        onPress={() => {
          setActive(1)
        }}
      >
        <Text style={[styles.buttomText, { color: backgroundColor}]}>Resume</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={active === 2 ? [styles.buttom, { borderBottomColor: backgroundColor }] : styles.buttom }
        onPress={() => {
          setActive(2)
        }}
      >
        <Text style={[styles.buttomText, { color: backgroundColor}]}>Cast</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    
    justifyContent: "space-around",
  },
  buttom: {
    padding: 15,
    borderBottomColor: "transparent",
    borderBottomWidth: 2
  },

  buttomText: {
    fontFamily: "BureauGrotComp-Medium",
    fontSize: 18,
  }
})

export default TabViewComponent;
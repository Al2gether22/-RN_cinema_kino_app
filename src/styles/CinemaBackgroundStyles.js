import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1d1d27"
  },
  imageContainer: {

  },
  coverImage: {
    
    aspectRatio: 1,
  },
  cinemaTitleContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: "50%",
    justifyContent: "center",
    alignItems: "center"
    
  },
  cinemaTitle: {
    fontFamily: "BureauGrotComp-Medium",
    textAlign: "center",
    color: "white",
    fontSize: 25
  }
})

export default styles;
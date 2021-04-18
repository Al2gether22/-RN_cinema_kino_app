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
    top: 150,
    right: 0,
    left: 0,
  },
  cinemaTitle: {
    fontFamily: "SourceSansPro-Bold",
    textAlign: "center",
    color: "white",
    fontSize: 25,
    
  },

  goBackContainer: {
    position: "absolute", 
    zIndex: 9999,
    top: 25,
    left: 15, 
    
  },
  
  LinearGradientUpper: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },

  LinearGradientLower: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    
  }
})

export default styles;
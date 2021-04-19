import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONTS} from "../constants/theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1d1d27",
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
    textAlign: "center",
    color: COLORS.white,
    ...FONTS.h2
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
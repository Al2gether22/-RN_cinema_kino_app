import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES} from "../constants/theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    padding: 10,
  },
  cinemaOverview: {
    flex: 1,
    margin: 10,
    height: SIZES.height / 10,
  },
  cinemaImage: {
    width: "100%",
    height: "100%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  }, 

  cinemaTitleContainer: {
    flex: 1, 
    flexDirection: "column",
    justifyContent: "center", 
    
  },
  cinemaTitle: {
    color: COLORS.white,
    alignSelf: "center",
    backgroundColor: "black",
    padding: 4,
    ...FONTS.h3
  }, 
  
  cinemaDistance: {  
    color: COLORS.white,
    alignSelf: "center",
    backgroundColor: "black",
    padding: 4,
    ...FONTS.h4
  }
})

export default styles;
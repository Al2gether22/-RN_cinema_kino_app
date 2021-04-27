import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES} from "../constants/theme"


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    marginTop: "4%",
    marginLeft: "4%",
    marginRight: "4%",
    marginBottom: 60,
    padding: 5,
  },
  sectionHeader: {
    color: COLORS.white,
    marginTop: 5,
    ...FONTS.h3,
    fontSize: 18,
    
  },
  showTimesContainer: {
    marginBottom: 5,  
    
    
  },

  showTime: {
    
    backgroundColor: "limegreen",
    padding: 8,
    marginRight: 15,
    marginBottom: 15,
    borderWidth: 1, 
    borderColor: "black", 
    borderRadius: 6,
    width: 75,  
    
  },
  showTimeText: {
    textAlign: "center",
  },
  showtimeVersionLabel: {
    color: "#676d7c",
    marginBottom: 10,
    marginTop: 5,
    ...FONTS.h3
  },
  movieShowTimeContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 6,
    marginTop: 10
  },
  noShowtimesContainer: {
    marginTop: 10,
    marginBottom: 50, 
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  moviePosterContainer: {
    marginRight: 10,
    marginTop: 10
  },
  poster: {
    height: 95,
    width: 65,
    borderRadius: 6,
  },
  itemSeperator: {
    backgroundColor: "#676d7c",
    height: 1,
    marginBottom: 20,
    marginTop: 15
  }
})

export default styles;
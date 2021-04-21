import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES} from "../constants/theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "space-between",
    borderRadius: 7,
    marginBottom: 20
  },
  filterButton: {
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 7,
    paddingBottom: 8,
    flex: 1,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "black",
    margin: 5,
    backgroundColor: "black"
  },
  filterButtonText: {
    textAlign: "center",
    color: COLORS.white,
    ...FONTS.h4
  },

  card: {
    flex: 0.333,
    marginRight: 10,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
    marginBottom: 30
  },
  coverImageContainer: {
    borderRadius: 10,
  },
  coverImage: {
    aspectRatio: 2 / 3,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 7
  },
  titleContainer: {
    flex: 1,
    
  }, 
  cardTitle: {
    color: COLORS.white,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    textAlign: "center",
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
    ...FONTS.h4
  },

});

export default styles;
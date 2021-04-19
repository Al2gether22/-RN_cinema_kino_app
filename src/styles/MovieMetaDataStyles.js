import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES} from "../constants/theme"

const styles = StyleSheet.create({
  
  metaDataContainer: {
    marginLeft: "4%",
    marginRight: "4%",
    padding: 5,
    marginBottom: 20,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 0.2,
    borderTopColor: COLORS.white,
    borderTopWidth: 0.2,
    marginTop: 25
  },

  movieMetaData: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5
  },

  movieRating: {
    flex: 1,
    flexDirection: "row",
    color: COLORS.white,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  movieRatingIcon: {
    marginBottom: 5,
  },
  movieRatingRating: {
    color: COLORS.white,
    paddingBottom: 6,
    ...FONTS.h2
  },
  movieRatingUsers: {
    color: "#676d7c",
    paddingBottom: 6,
    ...FONTS.h4
  },

})

export default styles;
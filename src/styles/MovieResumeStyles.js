import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES} from "../constants/theme"

const styles = StyleSheet.create({
  
  movieReviewContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: "4%",
    marginRight: "4%",
    padding: 5,
    marginBottom: 50
  },

  movieReviewBody: {
    color: COLORS.white,
    fontWeight: "500",
    ...FONTS.body3
  },



})

export default styles;
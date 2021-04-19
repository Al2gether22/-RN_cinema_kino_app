import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES} from "../constants/theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.backgroundColor,
    
  },
  goBackContainer: {
    position: "absolute", 
    zIndex: 9999,
    top: 25,
    left: 15, 
    
  },
})

export default styles;
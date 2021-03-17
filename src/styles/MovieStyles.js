import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1d1d27"
  },
  goBackContainer: {
    position: "absolute", 
    zIndex: 9999,
    top: 25,
    left: 15, 
    
  },
})

export default styles;
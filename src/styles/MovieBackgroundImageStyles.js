import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  imageContainer: {
    
  },
  // Checkout the option to resize mode to 'contain' and size for image
  coverImage: {
    width: "100%",
    aspectRatio: 2 / 3, 
    
  },
  
  playButtomViewWrapper: {
    zIndex: 99999,
    position: "absolute",
    left: "50%",
    top: -350
  },
  playButton: {
    position: "relative",
    left: "-50%"
  },
  
  movieTitle: {
    fontFamily: "SourceSansPro-Bold",
    color: "white",
    marginTop: -30,
    marginLeft: "5%",
    marginRight: "20%",
    fontSize: 35,
    
  },
  movieGenre: {
    fontFamily: "SourceSansPro-Bold",
    color: "#676d7c",
    marginLeft: "5%",
    marginTop: 10,
    marginRight: "10%",
    fontSize: 12,
    
  },

  goBackContainer: {
    position: "absolute", 
    zIndex: 9999,
    top: 25,
    left: 15, 
    
  },

  LinearGradientLower: {
    flex: 1,
    
    
  }

})

export default styles;
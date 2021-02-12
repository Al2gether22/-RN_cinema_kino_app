import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  imageContainer: {
    
  },
  coverImage: {
    aspectRatio: 1,
  },
  
  playButtomViewWrapper: {
    display: "flex",
    alignSelf: "center",
    marginTop: "25%",
    borderRadius: 40, 
    borderWidth: .1, 
    backgroundColor: "lightgrey"
  },
  playButton: {
    color: "#1d1d27",
    
  },
  
  movieTitle: {
    fontFamily: "BureauGrotComp-Medium",
    color: "white",
    marginTop: "35%",
    marginLeft: "5%",
    marginRight: "20%",
    fontSize: 35
  },
  movieGenre: {
    fontFamily: "SourceSansPro-Bold",
    color: "#676d7c",
    marginLeft: "5%",
    marginTop: 5,
    marginRight: "10%",
    fontSize: 12,
    
  },

})

export default styles;
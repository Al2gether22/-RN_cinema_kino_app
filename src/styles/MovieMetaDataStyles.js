import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  metaDataContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: "4%",
    marginRight: "4%",
    padding: 5,
    marginBottom: 20
  },

  movieMetaData: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },

  movieRating: {
    flex: 2,
    color: "white",
    textAlign: "center",
    
  },
  movieRatingIcon: {
    textAlign: "center",
    marginBottom: 5,
    
  },
  movieRatingRating: {
    fontFamily: "SourceSansPro-Bold",
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  movieRatingUsers: {
    fontFamily: "SourceSansPro-Bold",
    color: "#676d7c",
    fontSize: 12,
    textAlign: "center",
  },

})

export default styles;
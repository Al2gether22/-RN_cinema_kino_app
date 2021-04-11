import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  metaDataContainer: {
    marginLeft: "4%",
    marginRight: "4%",
    padding: 5,
    marginBottom: 20,
    borderBottomColor: "white",
    borderBottomWidth: 0.2,
    borderTopColor: "white",
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
    color: "white",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  movieRatingIcon: {
    marginBottom: 5,
    
  },
  movieRatingRating: {
    fontFamily: "SourceSansPro-Bold",
    color: "white",
    fontSize: 20,
    paddingBottom: 6
   
  },
  movieRatingUsers: {
    fontFamily: "SourceSansPro-Bold",
    color: "#676d7c",
    fontSize: 12,
    paddingBottom: 6
  },

})

export default styles;
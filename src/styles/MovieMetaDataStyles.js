import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  metaDataContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: "4%",
    marginRight: "4%",
    padding: 5,
  },
  movieReview: {
    marginTop: 15,
    
  },
  movieReviewHeader: {
    fontFamily: "SourceSansPro-Bold",
    color: "white",
    fontSize: 20,
    
  },
  movieReviewBody: {
    
  },
  movieMetaData: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  movieCensur: {
    fontFamily: "SourceSansPro-Bold",
    flex: 2,
    color: "white",
    textAlign: "center"
  },
  movieRating: {
    
    flex: 2,
    color: "white",
    textAlign: "center"
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
  movieBody: {
    fontFamily: "SourceSansPro-Black",
    fontSize: 16, 
    fontWeight: "200",
    color: '#676d7c', 
    lineHeight: 22,
    
  },
  toggleMovieBodyText: {
    marginTop: 5,
    fontFamily: "SourceSansPro-Black", 
    fontSize: 16, 
    color: 'white',
    textAlign: "center"
  }

})

export default styles;
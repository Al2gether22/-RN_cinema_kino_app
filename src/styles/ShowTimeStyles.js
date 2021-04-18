import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d1d27",
    marginTop: "4%",
    marginLeft: "4%",
    marginRight: "4%",
    marginBottom: "7%",
    padding: 5,
  },
  sectionHeader: {
    fontFamily: "SourceSansPro-Bold",
    color: "white",
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 5
 
  },
  showTimeContainer: {
    marginBottom: 5
  },
  showTime: {
    backgroundColor: "limegreen",
    padding: 8,
    margin: 5,
    borderWidth: 1, 
    borderColor: "black", 
    borderRadius: 6,
    width: 75,  
    
  },
  showTimeText: {
    textAlign: "center",
  },
  showtimeVersionLabel: {
    fontFamily: "SourceSansPro-Bold",
    color: "#676d7c",
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 5
  },
  movieShowTimeContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 6,
    
  },
  noShowtimesContainer: {
    marginTop: 10,
    marginBottom: 50, 
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  moviePosterContainer: {
    marginRight: 10

  },
  poster: {
    height: 95,
    width: 65,
    borderRadius: 6,
  },
  itemSeperator: {
    backgroundColor: "#676d7c",
    height: 1,
    margin: 15
  }
})

export default styles;
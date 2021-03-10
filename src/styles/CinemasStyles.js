import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d27',
    padding: 10, 
  },
  cinemaOverview: {
    flex: 1,
    paddingRight: 10,
    marginLeft: 10,
    marginBottom: 15,
    flexDirection: "row",
    backgroundColor: "black",
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
  cinemaImage: {
    height: 50,
    width: 100,
    
  }, 

  cinemaTitleContainer: {
    flex: 1, 
    justifyContent: "center", 
  },
  cinemaTitle: {
    fontFamily: "BureauGrotComp-Medium",
    fontSize: 18,
    color: "white",
    marginLeft: 10,
  }, 
  
  cinemaDistance: {
    fontFamily: "SourceSansPro-BlackIt",
    fontSize: 14,
    color: "#676d7c",
    alignSelf: "center"
  }
})

export default styles;
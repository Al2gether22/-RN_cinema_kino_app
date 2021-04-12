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
    flexDirection: "column",
    
  },
  cinemaImage: {
    width: "100%",
    height: 100,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 7,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  }, 

  cinemaTitleContainer: {
    flex: 1, 
    flexDirection: "column",
    justifyContent: "center", 
    
  },
  cinemaTitle: {
    fontFamily: "SourceSansPro-Bold",
    fontSize: 16,
    color: "white",
    alignSelf: "center",
    backgroundColor: "black",
    padding: 4,
    
  }, 
  
  cinemaDistance: {
    fontFamily: "SourceSansPro-Bold",
    fontSize: 14,
    color: "white",
    alignSelf: "center",
    backgroundColor: "black",
    padding: 4,
    
  }
})

export default styles;
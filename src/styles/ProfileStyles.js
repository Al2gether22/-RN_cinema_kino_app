import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d27",
    margin: "4%",
    padding: 5,
  },
  userDataContainer: {
    flexDirection: "row",
    marginBottom: 20
  },
  profilePic: {
    height: "100%",
    width: "40%", 
    aspectRatio: 1,
    borderRadius: 400/ 2
  },
  userData: {
    width: "50%",
    justifyContent: "center",
    paddingLeft: 20,
    
  },
  userDataText: {
    color: "white",
    fontFamily: "SourceSansPro-Bold", 
    fontSize: 14, 
    color: '#676d7c', 
    paddingBottom: 10
  },
  buttonContainer: {
    flexDirection: "row",
  },
  
  button: {
    alignSelf: "center",
    fontSize: 30,
    backgroundColor: "#ff321e",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: "45%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5
  },
  purchaseHistoryContainer: {
    margin: "4%",
    padding: 5,
  },
  purchaseHistoryHeadline: {
    color: "white",
    fontSize: 20,
    marginTop: 25,
    textAlign: "center",
    fontFamily: "SourceSansPro-Bold",
    paddingBottom: 5
  },
  itemContainer: {
    flexDirection: "row",
    marginTop: 30
  },
  posterImgContainer: {
    
  },
  dataContainer: {
    marginLeft: 15,
    paddingTop: 10
  },
  posterImg: {
    height: 120,
    width: 81, 
    
  },
  title: {
    fontFamily: "SourceSansPro-Bold",
    color: "white",
    fontSize: 16,
    
  }, 
  metaData: {
    fontFamily: "SourceSansPro-Bold",
    color: "white",
    fontSize: 12,
    marginTop: 2
  }
})

export default styles;
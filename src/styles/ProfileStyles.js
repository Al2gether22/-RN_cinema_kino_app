import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES} from "../constants/theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
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
    paddingBottom: 10,
    ...FONTS.h3
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
    color: COLORS.white,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    ...FONTS.h4
  },
  editButton: {
    alignSelf: "center",
    fontSize: 30,
    backgroundColor: "black",
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
  editButtonText: {
    color: COLORS.white,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    ...FONTS.h4
  },
  purchaseHistoryContainer: {
    margin: "4%",
    padding: 5,
  },
  purchaseHistoryHeadline: {
    color: "white",
    marginTop: 25,
    textAlign: "center",
    paddingBottom: 5,
    ...FONTS.h2
  },
  itemContainer: {
    flexDirection: "row",
    marginTop: 30
  },
  posterImgContainer: {
    
  },
  dataContainer: {
    marginLeft: 15,
  },
  posterImg: {
    height: 120,
    width: 81, 
  },
  title: {
    color: COLORS.white,
    ...FONTS.h3,
    marginTop: -5
  }, 
  metaData: {
    color: COLORS.white,
    ...FONTS.body4,
  }
})

export default styles;
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
  },
  cinemaImage: {
    height: 50,
    width: 100,
  }, 
  cinemaTitle: {
    fontFamily: "BureauGrotComp-Medium",
    fontSize: 13,
    color: "white",
    textAlign: "center",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center"
  }, 
  cinemaDistance: {
    fontFamily: "SourceSansPro-BlackIt",
    fontSize: 14,
    color: "#676d7c",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 15
  }
})

export default styles;
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d27",
    padding: 10,
  },
  card: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
  coverImageContainer: {
    borderRadius: 10,
  },
  coverImage: {
    aspectRatio: 2 / 3,
    borderRadius: 10,
    
  },
  titleContainer: {
    flex: 1
  }, 
  cardTitle: {
    fontFamily: "BureauGrotComp-Medium",
    fontSize: 20,
    color: "white",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    textAlign: "center",
    paddingTop: 10,
  },
  oneliner: {
    fontFamily: "SourceSansPro-BlackIt",
    fontSize: 14,
    color: "#676d7c",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 10,
    paddingBottom: 20,
  },
});

export default styles;
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
  },
  coverImageContainer: {
    borderRadius: 10,
  },
  coverImage: {
    aspectRatio: 2 / 3,
    borderRadius: 10,
    
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
  },
  oneliner: {
    fontFamily: "SourceSansPro-BlackIt",
    fontSize: 14,
    color: "#676d7c",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 15,
  },
});

export default styles;
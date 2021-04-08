import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d27",
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "space-between",
    borderRadius: 7,
    marginBottom: 20
  },
  filterButton: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 7,
    paddingBottom: 8,
    flex: 1,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "black",
    margin: 5,
    
  },
  filterButtonText: {
    fontFamily: "SourceSansPro-Bold",
    fontSize: 14,
    textAlign: "center"
  },

  card: {
    flex: 0.3333,
    maxWidth: "28%",
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
    marginBottom: 30
  },
  coverImageContainer: {
    borderRadius: 10,
  },
  coverImage: {
    aspectRatio: 2 / 3,
    borderRadius: 10,
    
  },
  titleContainer: {
    flex: 1,
    
  }, 
  cardTitle: {
    fontFamily: "SourceSansPro-Bold",
    fontSize: 14,
    color: "white",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    textAlign: "center",
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },

});

export default styles;
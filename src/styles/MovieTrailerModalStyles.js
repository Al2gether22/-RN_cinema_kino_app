import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  MovieTrailerModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  }, 
  trailer: {
    height: "100%",
    marginTop: "30%",
    padding: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})

export default styles;
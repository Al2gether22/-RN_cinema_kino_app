import {StyleSheet} from 'react-native';
import { COLORS, FONTS, SIZES} from "../constants/theme"

const styles = StyleSheet.create({
  imageContainer: {},
  // Checkout the option to resize mode to 'contain' and size for image
  coverImage: {
    width: '100%',
    aspectRatio: 2 / 3,
  },

  playButtomViewWrapper: {
    
    position: "absolute",
    top: 250,
    width: "100%",
    
  },
  playButton: {
    textAlign: "center"
    
    
  },

  movieTitle: {
    color: COLORS.white,
    marginTop: -30,
    marginLeft: '5%',
    marginRight: '20%',
    ...FONTS.h1,
    fontSize: 35,
  },
  movieGenre: {
    color: '#676d7c',
    marginLeft: '5%',
    marginTop: 10,
    marginRight: '10%',
    ...FONTS.h4
  },

  goBackContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 25,
    left: 15,
  },

  LinearGradientLower: {
    flex: 1,
  },
});

export default styles;

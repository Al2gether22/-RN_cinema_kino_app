import ImageColors from 'react-native-image-colors';
import Toast from 'react-native-toast-message';
import crashlytics from '@react-native-firebase/crashlytics';


async function fetchImageColors(img, setImgColors) {
  try {
    if (!img) return;
    const colors = await ImageColors.getColors(img, {
      fallback: '#000000',
      quality: 'lowest',
      pixelSpacing: 5,
    });
    let result;
    result = {
      backgroundColor: colors.background,
      primaryFontColor: colors.primary,
      secondaryFontColor: colors.secondary,
    };
    if (colors.platform === 'android') {
      result = {
        backgroundColor: colors.dominant,
        primaryFontColor: colors.average,
        secondaryFontColor: colors.vibrant,
      };
    }
    if (setImgColors) setImgColors(result);
    return result;
  } catch (err) {
    crashlytics().recordError(error),
    Toast.show({
      text1: 'Noget gik galt!',
      text2: 'Prøv at lukke appen og start den igen',
      position: 'bottom',
      bottomOffset: 300,
      type: "error",
      autoHide: false,
    })
  }
}

export default fetchImageColors;

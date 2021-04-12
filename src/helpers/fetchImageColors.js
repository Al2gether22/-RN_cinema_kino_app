import ImageColors from 'react-native-image-colors';

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
    console.error(err);
  }
}

export default fetchImageColors;

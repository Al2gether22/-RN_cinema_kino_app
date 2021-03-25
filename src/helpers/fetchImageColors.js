import ImageColors from 'react-native-image-colors';

async function fetchImageColors(img, setImgColors) {
  try {
    if (!img) return;
    const colors = await ImageColors.getColors(img, {
      fallback: '#000000',
      quality: 'lowest',
      pixelSpacing: 500,
    });
    if (colors.platform === 'android') {
      setImgColors({
        backgroundColor: colors.average,
        primaryFontColor: colors.vibrant,
        secondaryFontColor: colors.darkVibrant,
      });
    } else {
      setImgColors({
        backgroundColor: colors.background,
        primaryFontColor: colors.primary,
        secondaryFontColor: colors.secondary,
      });
    }
  } catch (err) {
    console.error(err);
  }
}

export default fetchImageColors;

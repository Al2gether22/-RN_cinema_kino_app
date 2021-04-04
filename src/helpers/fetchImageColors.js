import ImageColors from 'react-native-image-colors';

async function fetchImageColors(img, setImgColors) {
  try {
    if (!img) return;
    const colors = await ImageColors.getColors(img, {
      fallback: '#000000',
      quality: 'low',
      pixelSpacing: 5,
    });
    if (colors.platform === 'android') {
      setImgColors({
        backgroundColor: colors.dominant,
        primaryFontColor: colors.average,
        secondaryFontColor: colors.vibrant,
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

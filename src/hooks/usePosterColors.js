import {useState, useEffect} from 'react';
import ImageColors from 'react-native-image-colors';

function usePosterColors(img) {
  const [imgColors, setImgColors] = useState({
    backgroundColor: '#1d1d27',
    primaryFontColor: 'white',
    secondaryFontColor: 'white',
  });

  async function fetchColors() {
    try {
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

  useEffect(() => {
    fetchColors();
  }, [img]);

  return imgColors;
}

export default usePosterColors;

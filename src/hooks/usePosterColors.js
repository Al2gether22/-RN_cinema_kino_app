import {useState, useEffect} from 'react';
import ImageColors from 'react-native-image-colors';

function usePosterColors(img) {
  const defaultState = {
    backgroundColor: '#1d1d27',
    primaryFontColor: 'white',
    secondaryFontColor: 'white',
  };
  const [imgColors, setImgColors] = useState(defaultState);

  async function fetchColors() {
    try {
      if (!img) {
        setImgColors(defaultState);
        return;
      }
      const colors = await ImageColors.getColors(img, {
        fallback: '#000000',
        quality: 'low',
        pixelSpacing: 100,
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
    console.log('useEffect fetchColors', img);
    fetchColors();
  }, [img]);

  return imgColors;
}

export default usePosterColors;

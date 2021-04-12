import {useState, useEffect} from 'react';
import fetchImageColors from '../helpers/fetchImageColors';

function usePosterColors(img) {
  const defaultState = {
    backgroundColor: '#1d1d27',
    primaryFontColor: 'white',
    secondaryFontColor: 'white',
  };
  const [imgColors, setImgColors] = useState(defaultState);
  const [isLoadingColors, setIsLoadingColors] = useState(true);

  useEffect(async () => {
    const loadColors = async () => {
      setIsLoadingColors(true);
      await fetchImageColors(img, setImgColors);
      setIsLoadingColors(false);
    };
    loadColors();
  }, [img]);

  return {imgColors, isLoadingColors};
}

export default usePosterColors;

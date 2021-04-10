import {useState, useEffect} from 'react';
import fetchImageColors from '../helpers/fetchImageColors';

function usePosterColors(img) {
  const defaultState = {
    backgroundColor: '#1d1d27',
    primaryFontColor: 'white',
    secondaryFontColor: 'white',
  };
  const [imgColors, setImgColors] = useState(defaultState);

  useEffect(() => {
    fetchImageColors(img, setImgColors);
  }, [img]);

  return {imgColors};
}

export default usePosterColors;

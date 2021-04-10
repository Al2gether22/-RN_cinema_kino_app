import {useState, useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import fetchImageColors from '../helpers/fetchImageColors';

function usePosterColors(img) {
  const defaultState = {
    backgroundColor: '#1d1d27',
    primaryFontColor: 'white',
    secondaryFontColor: 'white',
  };
  const [imgColors, setImgColors] = useState(defaultState);
  // const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  // useEffect(() => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 1500,
  //     useNativeDriver: true,
  //   }).start();
  // }, [fadeAnim]);

  useEffect(() => {
    console.log('useEffect fetchColors', img);
    fetchImageColors(img, setImgColors);
  }, [img]);

  return {imgColors};
}

export default usePosterColors;

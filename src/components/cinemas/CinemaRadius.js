import React from 'react';
import {View, Text} from 'react-native';
//import Slider from '@react-native-community/slider';
import WeightedSlider from 'react-native-weighted-slider';

export default function CinemaRadius({
  longestDistance,
  setRadius,
  radius,
  numberOfCinemasShown,
}) {
  const [displayValue, setDisplayValue] = React.useState(radius);
  const cinemaOrCinemas = numberOfCinemasShown === 1 ? 'biograf' : 'biografer';

  return (
    <View>
      <Text style={{color: 'white'}}>
        Radius {Math.floor(displayValue)} km - {numberOfCinemasShown}{' '}
        {cinemaOrCinemas}
      </Text>
      <WeightedSlider
        initialValue={radius}
        style={{width: 375, heigh: 25, marginBottom: 15, marginTop: 25}}
        minValue={1}
        maxValue={longestDistance}
        useLinearSteps={false}
        quantize={1}
        weight={1}
        onSlidingComplete={radius => setRadius(radius)}
        value={radius}
        onValueChange={radius => setDisplayValue(radius)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
}

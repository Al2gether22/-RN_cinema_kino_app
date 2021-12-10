import React from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';

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
      <Slider
        style={{width: 375, heigh: 25, marginBottom: 15, marginTop: 25}}
        minimumValue={1}
        maximumValue={longestDistance}
        onSlidingComplete={radius => setRadius(radius)}
        step={1}
        value={displayValue}
        onValueChange={radius => setDisplayValue(radius)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
}

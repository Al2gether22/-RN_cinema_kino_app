import React from 'react';
import {PacmanIndicator} from 'react-native-indicators';
import {View, Text} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';

export default function LoadingScreen() {
  return (
    <View
      style={{
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.backgroundColor,
      }}>
      <PacmanIndicator color="white" size={75} />
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          color: 'white',
          flex: 1,
          ...FONTS.h2,
        }}>
        Loading...
      </Text>
    </View>
  );
}

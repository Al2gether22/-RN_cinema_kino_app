import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const Button = ({label, onPress}) => {
  return (
    <TouchableScale
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={onPress}>
      <View style={styles.nextShowtimeContainer}>
        <Text style={styles.nextShowtimeText}>{label}</Text>
      </View>
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  nextShowtimeContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 6,
    marginBottom: 25,
    marginTop: 10,
  },
  nextShowtimeText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});

export default Button;

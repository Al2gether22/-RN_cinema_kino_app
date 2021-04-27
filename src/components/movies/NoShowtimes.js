import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { COLORS, FONTS, SIZES} from "../../constants/theme"
import 'moment/locale/da';
import moment from 'moment';
moment.locale('da');

const NoShowtimes = ({nextShowtime, onPressNextShowtime}) => {
  if (!nextShowtime) {
    return null;
  }

  return (
    <TouchableScale
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={onPressNextShowtime}>
      <View style={styles.nextShowtimeContainer}>
        <Text style={styles.nextShowtimeText}>
          Næste spilletid er {moment(nextShowtime).format('dddd Do MMM')}
        </Text>
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
    borderColor: "white",
    borderRadius: 6,
    marginBottom: 25,
    marginTop: 10,
  },
  nextShowtimeText: {
    color: COLORS.white,
    ...FONTS.h4,
    lineHeight: 0
  },
});

export default NoShowtimes;

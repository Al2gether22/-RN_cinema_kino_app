import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import 'moment/locale/da';
import moment from 'moment';
moment.locale('da');

const PremiereDate = ({PremiereDate}) => {
  return (
    <View style={styles.PremiereDateContainer}>
      <Text style={styles.PremiereDate}>
        {moment(PremiereDate).format('dddd Do MMM')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  PremiereDateContainer: {
    position: 'absolute',
    top: 5,
    right: 0,
    backgroundColor: 'black',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  PremiereDate: {
    color: COLORS.white,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 3,
    textTransform: 'capitalize',
    ...FONTS.h4,
    fontSize: 12,
  },
});

export default PremiereDate;

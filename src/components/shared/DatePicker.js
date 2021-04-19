import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { create1MonthDates } from "../../helpers/date.utils";
import "moment/locale/da";
import moment from "moment";
moment.locale("da");
import { COLORS, FONTS, SIZES} from "../../constants/theme"

function dateLabelFromNow(myDate) {
  return moment(myDate).calendar(null, {
    sameDay: "[I dag]",
    nextDay: "[I morgen]",
    nextWeek: "ddd Do MMM",
    sameElse: "ddd Do MMM",
  });
}

const defaultDates = create1MonthDates();

const DatePicker = forwardRef(
  (
    { selectedDate, setSelectedDate, dates = defaultDates, scrollToIndex },
    ref
  ) => {
    const Item = ({ item, style, color }) => (
      
      <TouchableOpacity
        onPress={() => {
          scrollToIndex(ref, dates, item);
          setSelectedDate(item);
        }}
      >
        <View style={[styles.showtimeContainer, style]}>
          <Text style={[styles.showtime, { color }]}>{dateLabelFromNow(item)}</Text>
        </View>
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
      const backgroundColor = item === selectedDate ? "white" : "black";
      const color = item === selectedDate ? "black" : "white"
      return (
        <Item key={item.toString()} item={item} color={color} style={{ backgroundColor }} />
      );
    };

    return (
      <FlatList
        keyboardShouldPersistTaps="always"
        horizontal
        ref={ref}
        keyExtractor={(item) => item.toString()}
        data={dates}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
);

const styles = StyleSheet.create({
  showtimeContainer: {
    minWidth: 80, 
    backgroundColor: "black",
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    marginRight: 7,
    marginBottom: 15,
  },
  showtime: {
    textAlign: "center",
    ...FONTS.h4,
    lineHeight: 0
  },
  dateLabel: {
    ...FONTS.h4
  },
});

DatePicker.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  dates: PropTypes.array,
  scrollToIndex: PropTypes.func.isRequired,
};

export default DatePicker;

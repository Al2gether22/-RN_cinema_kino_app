import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { create1MonthDates } from "../../helpers/date.utils";
import "moment/locale/da";
import moment from "moment";
moment.locale("da");

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
    const Item = ({ item, style }) => (
      <TouchableOpacity
        onPress={() => {
          scrollToIndex(ref, dates, item);
          setSelectedDate(item);
        }}
      >
        <View style={[styles.showtimeContainer, style]}>
          <Text style={styles.showtime}>{dateLabelFromNow(item)}</Text>
        </View>
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
      const backgroundColor = item === selectedDate ? "white" : "#1d1d27";

      return (
        <Item key={item.toString()} item={item} style={{ backgroundColor }} />
      );
    };

    return (
      <FlatList
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
    backgroundColor: "#1d1d27",
    padding: 10,
    borderWidth: 2,
    borderColor: "#676d7c",
    borderRadius: 6,
    marginRight: 7,
    marginBottom: 15,
  },
  showtime: {
    color: "#676d7c",
    fontFamily: "SourceSansPro-Bold",
    textAlign: "center"
  },
  dateLabel: {
    color: "#676d7c",
    fontFamily: "SourceSansPro-Bold",
  },
});

DatePicker.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  dates: PropTypes.array,
  scrollToIndex: PropTypes.func.isRequired,
};

export default DatePicker;

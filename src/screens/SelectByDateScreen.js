import React, {useContext, useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {Context} from '../context/MoviesContext';
import {View, Text, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import TouchableScale from 'react-native-touchable-scale';
import {SharedElement} from 'react-navigation-shared-element';
import styles from '../styles/MoviesStyles';
import PremiereDate from '../components/movies/PremiereDate';
import {scrollToIndex} from '../helpers/datepicker.utils';
import {create1MonthDates} from '../helpers/date.utils';
import FilterMovies from '../components/movies/FilterMovies';
import DatePicker from '../components/shared/DatePicker';
import fetchImageColors from '../helpers/fetchImageColors';
import analytics from '@react-native-firebase/analytics';

const now = moment();

const SelectByDateScreen = () => {
  const navigation = useNavigation();
  const {state} = useContext(Context);
  const [movies, setMovies] = useState(
    _.orderBy(state.movies, 'selling_position'),
  );
  const currentDate = new Date();
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const movieFlatListRef = useRef(null);
  const datePickerRef = useRef();
  const [monthOfDates] = useState(create1MonthDates(now));
  const [selectedDate, setSelectedDate] = useState(monthOfDates[0]);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function trackData() {
      await analytics().logScreenView({
        screen_class: 'Film oversigt',
        screen_name: 'Film oversigt',
      });
    }
    // Execute the created function directly
    trackData();
  }, []);

  useEffect(() => {
    const request = async () => {
      const response = await fetch(
        'https://www.kino.dk/appservices/date/2021-10-27',
        {
          mode: 'no-cors',
        },
      );
      const data = await response.json();
      console.log(data);
      setMovies(data);
    };
    request();
  }, []);

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={{color: 'white'}}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.danishTitle} />;

  return (
    <View style={styles.container}>
      <DatePicker
        dates={monthOfDates}
        scrollToIndex={scrollToIndex}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        ref={datePickerRef}
      />

      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default SelectByDateScreen;

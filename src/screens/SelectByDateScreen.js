import React, {useContext, useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {Context} from '../context/MoviesContext';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {PacmanIndicator} from 'react-native-indicators';
import moment from 'moment';
import styles from '../styles/MoviesStyles';
import {scrollToIndex} from '../helpers/datepicker.utils';
import {create1MonthDates} from '../helpers/date.utils';
import DatePicker from '../components/shared/DatePicker';
import analytics from '@react-native-firebase/analytics';
import {sortCinemasByDistance} from '../helpers/sortCinemasByDistance';

const now = moment();

const SelectByDateScreen = () => {
  const navigation = useNavigation();
  const {state} = useContext(Context);
  const [movies, setMovies] = useState(
    _.orderBy(state.movies, 'selling_position'),
  );
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const movieFlatListRef = useRef(null);
  const datePickerRef = useRef();
  const [monthOfDates] = useState(create1MonthDates(now));
  const [selectedDate, setSelectedDate] = useState(monthOfDates[0]);
  const [currentLocation, setCurrentLocation] = useState(null);

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
    const requestMoviesOfDay = async () => {
      const response = await fetch(
        `https://www.kino.dk/appservices/date/${selectedDate.format(
          'YYYY-MM-DD',
        )}`,
        {
          mode: 'no-cors',
        },
      );
      const data = await response.json();
      console.log(data);
      setMovies(data);
      return data;
    };
    const requestCinemasAndShowtimes = async (movie, index) => {
      const response = await fetch(
        `https://www.kino.dk/appservices/movie/${
          movie.id
        }/${selectedDate.format('YYYY-MM-DD')}`,
        {
          mode: 'no-cors',
        },
      );
      const cinemas = await response.json();
      movie.cinemas = cinemas;
      setMovies(prevState => {
        let newState = [...prevState];
        newState[index] = movie;
        return newState;
      });
    };
    requestMoviesOfDay().then(movies => {
      movies.forEach((movie, index) =>
        requestCinemasAndShowtimes(movie, index),
      );
    });
  }, [selectedDate]);

  const cinemaList = (cinemas, id) => {
    const cinemaList = cinemas.map(cinema => (
      <Text key={`${id}-${cinema.cinema_id}`} style={fontStyle.whiteText}>
        {cinema.name}
      </Text>
    ));
    return cinemaList;
  };

  const Item = ({title, cinemas, id}) => (
    <View style={styles.item}>
      <Text style={fontStyle.whiteText}>{title}</Text>
      {cinemas ? (
        cinemaList(cinemas, id)
      ) : (
        <PacmanIndicator size={25} color="white" />
      )}
    </View>
  );

  const renderItem = ({item}) => (
    <Item title={item.danishTitle} cinemas={item.cinemas} id={item.id} />
  );

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
        extraData={movies}
      />
    </View>
  );
};

const fontStyle = {
  whiteText: {
    color: 'white',
  },
};

export default SelectByDateScreen;

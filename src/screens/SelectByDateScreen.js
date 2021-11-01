import React, {useContext, useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {Context} from '../context/CinemaContext';
import {View, Text, FlatList} from 'react-native';
import {PacmanIndicator} from 'react-native-indicators';
import moment from 'moment';
import styles from '../styles/MoviesStyles';
import {scrollToIndex} from '../helpers/datepicker.utils';
import {create1MonthDates} from '../helpers/date.utils';
import DatePicker from '../components/shared/DatePicker';
import analytics from '@react-native-firebase/analytics';
import WebViewModal from '../modals/WebViewModal';
import MovieAndCinemaShowTimes from '../components/shared/MovieAndCinemaShowTimes';

const now = moment();

const SelectByDateScreen = () => {
  const {state} = useContext(Context);
  const cinemaIdsSorted = state.cinemas.map(cinema => cinema.id);
  const [movies, setMovies] = useState([]);
  const datePickerRef = useRef();
  const [monthOfDates] = useState(create1MonthDates(now));
  const [selectedDate, setSelectedDate] = useState(monthOfDates[0]);
  const [modalVisible, setWebViewModalVisible] = useState(false);
  const [movie, setMovie] = useState({});
  const [showtimeId, setShowtimeId] = useState();
  const [movieModalVisible, setMovieModalVisible] = useState(false);

  useEffect(() => {
    async function trackData() {
      await analytics().logScreenView({
        screen_class: 'Vælg dag',
        screen_name: 'Vælg dag',
      });
    }
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
      const sortedCinemas = _.sortBy(cinemas, cinema =>
        cinemaIdsSorted.indexOf(parseInt(cinema.cinema_id)),
      );
      movie.cinemas = sortedCinemas;
      setMovies(prevState => {
        let newState = [...prevState];
        newState[index] = movie;
        console.log('newState', newState);
        return newState;
      });
    };

    const fetchData = async () => {
      const movies = await requestMoviesOfDay();
      movies.forEach((movie, index) =>
        requestCinemasAndShowtimes(movie, index),
      );
    };

    fetchData();
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
      <WebViewModal
        modalVisible={modalVisible}
        setModalVisible={() => setWebViewModalVisible(false)}
        url={`https://kino.dk/ticketflow/${showtimeId}`}
      />

      <DatePicker
        dates={monthOfDates}
        scrollToIndex={scrollToIndex}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        ref={datePickerRef}
      />

      {movies.length === 0 && <PacmanIndicator size={45} color="white" />}
      {/* <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={movies}
      /> */}

      <MovieAndCinemaShowTimes
        selectedDate={selectedDate}
        cinemaMovies={movies}
        setWebViewModalVisible={setWebViewModalVisible}
        setShowtimeId={setShowtimeId}
        setMovie={setMovie}
        setMovieModalVisible={setMovieModalVisible}
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

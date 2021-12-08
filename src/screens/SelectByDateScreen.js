import React, {useContext, useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {Context} from '../context/CinemaContext';
import {View} from 'react-native';
import moment from 'moment';
import styles from '../styles/MoviesStyles';
import {scrollToIndex} from '../helpers/datepicker.utils';
import {create1MonthDates} from '../helpers/date.utils';
import DatePicker from '../components/shared/DatePicker';
import analytics from '@react-native-firebase/analytics';
import WebViewModal from '../modals/WebViewModal';
import MovieAndCinemaShowTimes from '../components/shared/MovieAndCinemaShowTimes';
import LoadingScreen from '../components/shared/LoadingScreen';

const now = moment();

const SelectByDateScreen = () => {
  const {state} = useContext(Context);
  const cinemaIdsSorted = state.cinemas.map(cinema => cinema.id);
  const [movies, setMovies] = useState({});
  const datePickerRef = useRef();
  const [monthOfDates] = useState(create1MonthDates(now));
  const [selectedDate, setSelectedDate] = useState(monthOfDates[0]);
  const [modalVisible, setWebViewModalVisible] = useState(false);
  const [, setMovie] = useState({});
  const [showtimeId, setShowtimeId] = useState();
  const [, setMovieModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        )}/all`,
        {
          mode: 'no-cors',
        },
      );
      const data = await response.json();
      const sortedByGeoAndFavorites = data.map(movie => {
        const cinemasSorted = _.sortBy(movie.cinemas, cinema =>
          cinemaIdsSorted.indexOf(parseInt(cinema.id)),
        );
        movie.cinemas = cinemasSorted;
        return movie;
      });
      setMovies(sortedByGeoAndFavorites);
      setIsLoading(false);
    };

    const fetchData = async () => {
      setIsLoading(true);
      await requestMoviesOfDay();
    };
    fetchData();
  }, [selectedDate]);

  const content = isLoading ? (
    <LoadingScreen />
  ) : (
    <MovieAndCinemaShowTimes
      selectedDate={selectedDate}
      cinemaMovies={movies}
      setWebViewModalVisible={setWebViewModalVisible}
      setShowtimeId={setShowtimeId}
      setMovie={setMovie}
      setMovieModalVisible={setMovieModalVisible}
    />
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
      {content}
    </View>
  );
};

export default SelectByDateScreen;

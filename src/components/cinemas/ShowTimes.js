import React, {useEffect, useState, useRef} from 'react';
import {View, ActivityIndicator} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import crashlytics from '@react-native-firebase/crashlytics';
import DatePicker from '../shared/DatePicker';
import WebViewModal from '../../modals/WebViewModal';
import styles from '../../styles/ShowTimeStyles';
import {scrollToIndex} from '../../helpers/datepicker.utils';
import {create1MonthDates} from '../../helpers/date.utils';
import MovieModal from '../../modals/MovieModal';
import MovieShowTimes from '../shared/MovieShowTimes';

//We need versions, they are inside item.versions
const now = moment();

const ShowTimes = ({id}) => {
  const datePickerRef = useRef();
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthOfDates] = useState(create1MonthDates(now));
  const [selectedDate, setSelectedDate] = useState(monthOfDates[0]);
  const [modalVisible, setWebViewModalVisible] = useState(false);
  const [movie, setMovie] = useState({});
  const [showtimeId, setShowtimeId] = useState();
  const [movieModalVisible, setMovieModalVisible] = useState(false);

  useEffect(() => {
    const url = `https://www.kino.dk/appservices/cinema/${id}/${selectedDate.format(
      'YYYY-MM-DD',
    )}`;
    fetch(url, {mode: 'no-cors'})
      .then(response => response.json())
      .then(json => {
        setShowtimes(json);
      })
      .catch(
        error => (
          crashlytics().recordError(error),
          Toast.show({
            text1: 'Noget gik galt!',
            text2: 'Prøv at lukke appen og start den igen',
            position: 'bottom',
            bottomOffset: 300,
            type: 'error',
            autoHide: false,
          })
        ),
      )
      .finally(() => setLoading(false));
  }, [selectedDate]);

  if (loading) {
    return <ActivityIndicator size="large" style={{marginTop: 200}} />;
  }

  return (
    <View style={styles.container}>
      <WebViewModal
        modalVisible={modalVisible}
        setModalVisible={() => setWebViewModalVisible(false)}
        url={`https://kino.dk/ticketflow/${showtimeId}`}
      />

      <MovieModal
        movieModalVisible={movieModalVisible}
        hideMovieModal={() => setMovieModalVisible(false)}
        passedMovie={movie}
        hideShowTimes={true}
      />

      <DatePicker
        dates={monthOfDates}
        scrollToIndex={scrollToIndex}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        ref={datePickerRef}
      />

      <MovieShowTimes
        selectedDate={selectedDate}
        cinemaMovies={showtimes}
        setWebViewModalVisible={setWebViewModalVisible}
        setShowtimeId={setShowtimeId}
        setMovie={setMovie}
        setMovieModalVisible={setMovieModalVisible}
      />
    </View>
  );
};

export default ShowTimes;

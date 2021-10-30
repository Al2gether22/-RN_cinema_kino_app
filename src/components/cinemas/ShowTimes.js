import React, {useEffect, useState, useRef} from 'react';
import {View, Text, FlatList, ActivityIndicator, Image} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import crashlytics from '@react-native-firebase/crashlytics';
import {useNavigation} from '@react-navigation/native';
import DatePicker from '../shared/DatePicker';
import WebViewModal from '../../modals/WebViewModal';
import styles from '../../styles/ShowTimeStyles';
import {scrollToIndex} from '../../helpers/datepicker.utils';
import {create1MonthDates} from '../../helpers/date.utils';
import MovieModal from '../../modals/MovieModal';
import MovieMultipleCinemaShowTimes from '../shared/MovieMultipleCinemaShowTimes';

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
  const [movieVersions, setMovieVersions] = useState([]);
  const navigation = useNavigation();
  const [movieModalVisible, setMovieModalVisible] = useState(false);

  useEffect(() => {
    const url = `https://www.kino.dk/appservices/cinema/${id}/${selectedDate.format(
      'YYYY-MM-DD',
    )}`;
    fetch(url, {mode: 'no-cors'})
      .then(response => response.json())
      .then(json => {
        setShowtimes(groupByVersion(json));
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

  useEffect(() => {
    fetchMovieVersions();
  }, [showtimes]);

  // Groups showtimes by version
  function groupByVersion(arr1) {
    for (let element of arr1) {
      element.showtimes = _.groupBy(element.showtimes, 'movie_version_id');
    }
    return arr1;
  }

  function fetchMovieVersions() {
    // Loop through each showtimes.version and push object values to movieVersions
    let versions = [];

    Object.entries(showtimes).forEach(([, val]) => {
      Object.values(val.versions).map(el => versions.push(el));

      // Save in variable and then once done push it to setMovieVersions
    });
    setMovieVersions(versions);
  }

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

      <MovieMultipleCinemaShowTimes
        selectedDate={selectedDate}
        showtimes={showtimes}
        movieVersions={movieVersions}
      />
    </View>
  );
};

export default ShowTimes;

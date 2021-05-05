import React, {useEffect, useState, useRef} from 'react';
import {View, Text, FlatList, ActivityIndicator, Image} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import TouchableScale from 'react-native-touchable-scale';
import MovieVersionLookup from '../shared/MovieVersionLookup';
import Toast from 'react-native-toast-message';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import {useNavigation} from '@react-navigation/native';
import DatePicker from '../shared/DatePicker';
import WebViewModal from '../../modals/WebViewModal';
import styles from '../../styles/ShowTimeStyles';
import {SIZES} from '../../constants/theme';
import {scrollToIndex} from '../../helpers/datepicker.utils';
import {create1MonthDates} from '../../helpers/date.utils';
import MovieModal from '../../modals/MovieModal';

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

      {showtimes.length === 0 ? (
        <View style={styles.noShowtimesContainer}>
          <Text style={styles.sectionHeader}>
            Der er ingen spilletider på den valgte dato
          </Text>
        </View>
      ) : (
        <FlatList
          keyboardShouldPersistTaps="always"
          keyExtractor={showtimes => showtimes.movie_id.toString()}
          listKey={showtimes => showtimes.movie_id.toString()}
          data={showtimes}
          extraData={selectedDate}
          ItemSeparatorComponent={() => {
            return <View style={styles.itemSeperator} />;
          }}
          renderItem={({item}) => (
            <View style={styles.movieShowTimeContainer}>
              <TouchableScale
                activeScale={0.9}
                tension={50}
                friction={7}
                useNativeDriver
                onPress={async () => {
                  setMovie(item); //This should not really be used,
                  //Item/Movie should be passed down to the child flatlist
                  //or else tracking below is not actual
                  setMovieModalVisible(true);
                }}>
                <View style={styles.moviePosterContainer}>
                  <Image source={{uri: item.imageUrl}} style={styles.poster} />
                </View>
              </TouchableScale>

              <View>
                <Text style={styles.sectionHeader}>{item.danishTitle}</Text>

                <FlatList
                  keyboardShouldPersistTaps="always"
                  // Here each showtime pr cinema is rendered
                  keyExtractor={item => item.toString()}
                  listKey={item => item.toString()}
                  data={Object.values(item.showtimes)}
                  renderItem={({item}) => (
                    <View style={styles.showTimesContainer}>
                      <Text style={styles.showtimeVersionLabel}>
                        <MovieVersionLookup
                          // Make check to see if item[0] exists
                          id={item[0].movie_version_id}
                          movieVersions={movieVersions}
                        />
                      </Text>
                      <FlatList
                        keyboardShouldPersistTaps="always"
                        keyExtractor={item => item.showtime_id.toString()}
                        listKey={item => item.showtime_id.toString()}
                        data={Object.values(item)}
                        numColumns={(SIZES.width / 130).toFixed(0)}
                        renderItem={({item}) => (
                          <TouchableScale
                            activeScale={0.9}
                            tension={50}
                            friction={7}
                            useNativeDriver
                            onPress={() => {
                              setWebViewModalVisible(true),
                                setShowtimeId(item.showtime_id),
                                analytics().logScreenView({
                                  screen_class: 'Spilletidsvisning_biograf',
                                  screen_name: 'Spilletidsvisning_biograf',
                                });
                              analytics().logEvent(
                                'Spilletidsvisning_biograf',
                                {
                                  //This tracking should use parent item instead,
                                  //since movie is only set if someone specifically
                                  //taps on the small movie poster
                                  Title: movie.danishTitle,
                                  id: movie.id,
                                  showtime_id: item.showtime_id,
                                  cinema_id: id,
                                },
                              );
                            }}
                            style={styles.showTime}>
                            <Text style={styles.showTimeText}>
                              {item.start_time.slice(11, 16)}
                            </Text>
                          </TouchableScale>
                        )}
                      />
                    </View>
                  )}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ShowTimes;

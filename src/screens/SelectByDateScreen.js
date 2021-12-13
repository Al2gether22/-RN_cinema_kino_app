import React, {useContext, useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {Context} from '../context/CinemaContext';
import {View} from 'react-native';
import moment from 'moment';
import styles from '../styles/MoviesStyles';
import {scrollToIndex} from '../helpers/datepicker.utils';
import {create1MonthDates} from '../helpers/date.utils';
import DatePicker from '../components/shared/DatePicker';
import WebViewModal from '../modals/WebViewModal';
import MovieModal from '../modals/MovieModal';
import MovieAndCinemaShowTimes from '../components/shared/MovieAndCinemaShowTimes';
import LoadingScreen from '../components/shared/LoadingScreen';
import CinemaRadius from '../components/cinemas/CinemaRadius';

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
  const [isLoading, setIsLoading] = useState(true);
  const [longestDistance, setLongestDistance] = useState(0);
  const [radius, setRadius] = useState(15);
  const [numberOfCinemasShown, setNumberOfCinemasShown] = useState(0);
  const [
    unfilteredSortedByGeoAndFavs,
    setUnfilteredSortedByGeoAndFavs,
  ] = useState([]);

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
      let longestDist = 0;
      const sortedByGeoAndFavorites = data.map(movie => {
        const cinemasSorted = _.sortBy(movie.cinemas, cinema =>
          cinemaIdsSorted.indexOf(parseInt(cinema.id)),
        );
        const cinemasSortedWithDistanceProp = cinemasSorted.map(cinema => {
          const indexOfCinema = cinemaIdsSorted.indexOf(parseInt(cinema.id));
          const distance = state.cinemas[indexOfCinema].distance;
          if (distance > longestDist) {
            longestDist = distance;
          }
          return {...cinema, distance};
        });
        movie.cinemas = cinemasSortedWithDistanceProp;
        return movie;
      });
      const extraBufferDist = 5;
      setLongestDistance(longestDist + extraBufferDist);
      setUnfilteredSortedByGeoAndFavs(sortedByGeoAndFavorites);
      setMovies(filterCinemasByDistance(sortedByGeoAndFavorites));
      setIsLoading(false);
    };

    const fetchData = async () => {
      setIsLoading(true);
      await requestMoviesOfDay();
    };
    fetchData();
  }, [selectedDate]);

  function filterCinemasByDistance(movies) {
    const uniqueFilteredCinemaIds = new Set();
    const filteredMovies = movies.map(movie => {
      const cinemas = movie.cinemas.filter(cinema => cinema.distance <= radius);
      cinemas.forEach(cinema => uniqueFilteredCinemaIds.add(cinema.id));
      return {...movie, cinemas};
    });

    setNumberOfCinemasShown(uniqueFilteredCinemaIds.size);

    const filteredMoviesWithShowTimes = filteredMovies.filter(
      movie => movie.cinemas.length !== 0,
    );

    return filteredMoviesWithShowTimes;
  }

  useEffect(() => {
    setMovies(filterCinemasByDistance(unfilteredSortedByGeoAndFavs));
  }, [radius]);

  const content = isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <CinemaRadius
        longestDistance={longestDistance}
        radius={radius}
        setRadius={setRadius}
        numberOfCinemasShown={numberOfCinemasShown}
      />
      <MovieAndCinemaShowTimes
        selectedDate={selectedDate}
        cinemaMovies={movies}
        setWebViewModalVisible={setWebViewModalVisible}
        setShowtimeId={setShowtimeId}
        setMovie={setMovie}
        setMovieModalVisible={setMovieModalVisible}
      />
    </>
  );

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
        hideShowTimes
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

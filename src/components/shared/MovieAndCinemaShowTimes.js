import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import analytics from '@react-native-firebase/analytics';
import styles from '../../styles/ShowTimeStyles';

export default function MovieAndCinemaShowTimes({
  cinemaMovies = [],
  selectedDate,
  setWebViewModalVisible,
  setShowtimeId,
  setMovie,
  setMovieModalVisible,
}) {
  debugger;
  const noShowTimes = (
    <View style={styles.noShowtimesContainer}>
      <Text style={styles.sectionHeader}>
        Der er ingen spilletider på den valgte dato
      </Text>
    </View>
  );

  const MoviePoster = ({movie}) => (
    <TouchableScale
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={async () => {
        setMovie(movie);
        setMovieModalVisible(true);
      }}>
      <View style={styles.moviePosterContainer}>
        <Image source={{uri: movie.imageUrl}} style={styles.poster} />
      </View>
    </TouchableScale>
  );

  const MovieVersionsAndShowtimes = ({movie, showtimes}) => {
    return Object.values(movie.versions).map(version => (
      <View key={movie.movie_id + version.version_id}>
        <Text style={styles.showtimeVersionLabel}>{version.version_name}</Text>
        <View style={styles.showTimesContainer}>
          <FlatList
            numColumns="3"
            keyboardShouldPersistTaps="always"
            keyExtractor={showtime => showtime.showtime_id}
            listKey={showtime => showtime.showtime_id}
            data={showtimes}
            renderItem={({item: showtime}) => (
              <ShowTimeButton showtime={showtime} />
            )}
          />
        </View>
      </View>
    ));
  };

  const CinemaList = ({cinemas, movie}) =>
    cinemas.map(cinema => (
      <>
        <Text style={{color: 'white', fontSize: 16}} key={cinema.cinema_id}>
          {cinema.name}
        </Text>
        <MovieVersionsAndShowtimes movie={movie} showtimes={cinema.showtimes} />
      </>
    ));

  const ShowTimeButton = ({showtime}) => (
    <TouchableScale
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={() => {
        setWebViewModalVisible(true),
          setShowtimeId(showtime.showtime_id),
          analytics().logScreenView({
            screen_class: 'Spilletidsvisning_biograf',
            screen_name: 'Spilletidsvisning_biograf',
          });
        analytics().logEvent('Spilletidsvisning_biograf', {
          Title: showtime.movie_title,
          id: showtime.movie_nid,
          showtime_date: showtime.start_time,
          showtime_id: showtime.showtime_id,
          cinema_id: id,
        });
      }}
      style={styles.showTime}>
      <Text style={styles.showTimeText}>
        {showtime.start_time.slice(11, 16)}
      </Text>
    </TouchableScale>
  );

  //I assume every movie in this list has 1 showtime
  return cinemaMovies.length === 0 ? (
    noShowTimes
  ) : (
    <FlatList
      keyboardShouldPersistTaps="always"
      keyExtractor={movie => movie.id.toString()}
      listKey={movie => movie.id.toString()}
      data={cinemaMovies}
      extraData={selectedDate}
      ItemSeparatorComponent={() => {
        return <View style={styles.itemSeperator} />;
      }}
      renderItem={({item: movie}) => (
        <View style={styles.movieShowTimeContainer}>
          <MoviePoster movie={movie} />
          <View>
            <Text numberOfLines={1} style={styles.sectionHeader}>
              {movie.danishTitle}
            </Text>
            {movie.cinemas && movie.cinemas.length !== 0 && (
              <CinemaList cinemas={movie.cinemas} movie={movie} />
            )}
          </View>
        </View>
      )}
    />
  );
}

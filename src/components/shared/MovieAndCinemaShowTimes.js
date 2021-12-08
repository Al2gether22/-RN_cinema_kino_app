import React, {useCallback, version} from 'react';
import {View, Text, FlatList, Dimensions, Alert} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import analytics from '@react-native-firebase/analytics';
import styles from '../../styles/ShowTimeStyles';
import {PacmanIndicator} from 'react-native-indicators';
import FastImage from 'react-native-fast-image';
import {uniqueId} from 'lodash';

export default function MovieAndCinemaShowTimes({
  cinemaMovies = [],
  selectedDate,
  setWebViewModalVisible,
  setShowtimeId,
  setMovie,
  setMovieModalVisible,
}) {
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');

  const [dimensions, setDimensions] = React.useState({window, screen});

  const movieVersionsAndShowtimesWidth =
    dimensions.window.width - styles.poster.width;

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  });

  const noShowTimes = (
    <View style={styles.noShowtimesContainer}>
      <Text style={styles.sectionHeader}>
        Der er ingen spilletider på den valgte dato
      </Text>
    </View>
  );

  const onPressMoviePoster = () => {
    setMovie(movie);
    setMovieModalVisible(true);
  };

  const MoviePoster = ({movie}) => (
    <TouchableScale
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={onPressMoviePoster}>
      <View style={styles.moviePosterContainer}>
        <FastImage source={{uri: movie.imageUrl}} style={styles.poster} />
      </View>
    </TouchableScale>
  );

  const MovieVersionsAndShowtimes = ({movie, cinema}) => {
    return movie.versions.map(version => {
      const versionShowTimes = cinema.showtimes.filter(
        showTime => showTime.movie_version_id === version.version_id,
      );

      if (versionShowTimes.length === 0) return null;

      return (
        <View key={movie.id + cinema.id + version.version_id}>
          <Text style={styles.showtimeVersionLabel}>
            {version.version_name}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: movieVersionsAndShowtimesWidth,
            }}>
            {versionShowTimes.map(showtime => (
              <ShowTimeButton showtime={showtime} key={showtime.showtime_id} />
            ))}
          </View>
        </View>
      );
    });
  };

  const MovieVersionsCallBack = useCallback(({movie, cinema}) => (
    <MovieVersionsAndShowtimes movie={movie} cinema={cinema} />
  ));

  const CinemaListCallBack = useCallback(({movie}) => (
    <CinemaList movie={movie} />
  ));

  const CinemaList = ({movie}) =>
    movie.cinemas.map(cinema => (
      <View key={(cinema.cinema_id ? cinema.cinema_id : uniqueId()) + movie.id}>
        <Text style={{color: 'white', fontSize: 16}}>{cinema.name}</Text>
        {!cinema.showtimes && <PacmanIndicator size={10} />}
        <MovieVersionsCallBack movie={movie} cinema={cinema} />
      </View>
    ));

  const ShowTimeButton = ({showtime}) => {
    const onPress = showtime => {
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
    };

    return (
      <TouchableScale
        activeScale={0.9}
        tension={50}
        friction={7}
        useNativeDriver
        onPress={onPress}
        style={styles.showTime}>
        <Text style={styles.showTimeText}>
          {showtime.start_time.slice(11, 16)}
        </Text>
      </TouchableScale>
    );
  };

  const keyExtractor = useCallback(movie => movie.id.toString());

  const renderItem = useCallback(({item: movie}) => (
    <View style={styles.movieShowTimeContainer}>
      <MoviePoster movie={movie} />
      <View>
        <Text numberOfLines={1} style={styles.sectionHeader}>
          {movie.danishTitle}
        </Text>
        {movie.cinemas && movie.cinemas.length !== 0 && (
          <CinemaListCallBack movie={movie} />
        )}
      </View>
    </View>
  ));

  //I assume every movie in this list has 1 showtime
  return cinemaMovies.length === 0 ? (
    noShowTimes
  ) : (
    <FlatList
      keyboardShouldPersistTaps="always"
      keyExtractor={keyExtractor}
      listKey={movie => movie.id.toString()}
      data={cinemaMovies}
      extraData={selectedDate}
      ItemSeparatorComponent={() => {
        return <View style={styles.itemSeperator} />;
      }}
      renderItem={renderItem}
    />
  );
}

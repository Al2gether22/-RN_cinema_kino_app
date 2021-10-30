import React from 'react';
import {View, Text, FlatList, ActivityIndicator, Image} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import analytics from '@react-native-firebase/analytics';
import styles from '../../styles/ShowTimeStyles';
import {SIZES} from '../../constants/theme';
import MovieVersionLookup from './MovieVersionLookup';

export default function MovieMultipleCinemaShowTimes({
  showtimes,
  selectedDate,
  movieVersions,
}) {
  const noShowTimes = (
    <View style={styles.noShowtimesContainer}>
      <Text style={styles.sectionHeader}>
        Der er ingen spilletider på den valgte dato
      </Text>
    </View>
  );

  return showtimes.length === 0 ? (
    noShowTimes
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
              setMovie(item);
              setMovieModalVisible(true);
            }}>
            <View style={styles.moviePosterContainer}>
              <Image source={{uri: item.imageUrl}} style={styles.poster} />
            </View>
          </TouchableScale>

          <View>
            <Text numberOfLines={1} style={styles.sectionHeader}>
              {item.danishTitle}
            </Text>

            <FlatList
              keyboardShouldPersistTaps="always"
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
                          analytics().logEvent('Spilletidsvisning_biograf', {
                            Title: item.movie_title,
                            id: item.movie_nid,
                            showtime_date: item.start_time,
                            showtime_id: item.showtime_id,
                            cinema_id: id,
                          });
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
  );
}

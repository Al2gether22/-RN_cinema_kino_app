import React, {useContext, useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {Context} from '../context/MoviesContext';
import {View, Text, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import TouchableScale from 'react-native-touchable-scale';
import {SharedElement} from 'react-navigation-shared-element';
import styles from '../styles/MoviesStyles';
import PremiereDate from '../components/movies/PremiereDate';
import SearchFilterFunction from '../components/shared/SearchFilterFunction';
import FilterMovies from '../components/movies/FilterMovies';
import fetchImageColors from '../helpers/fetchImageColors';
import analytics from '@react-native-firebase/analytics';

const Movies = () => {
  const navigation = useNavigation();
  const {state} = useContext(Context);
  const [movies, setMovies] = useState(
    _.orderBy(state.movies, 'selling_position'),
  );
  const currentDate = new Date();
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const movieFlatListRef = useRef(null);

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

  function scrollToIndex(index) {
    movieFlatListRef.current.scrollToIndex({index, animated: true});
  }

  function Item(item) {
    // Formatting date to compare it to date today

    const parsedDate = danishPremiere => {
      if (danishPremiere !== null) {
        const premiereDate = danishPremiere.split(' ')[0];
        const parsedDate = new Date(premiereDate);
        return parsedDate;
      } else {
        return null;
      }
    };

    return (
      <TouchableScale
        style={styles.card}
        activeScale={0.9}
        tension={50}
        friction={7}
        useNativeDriver
        onPress={async () => {
          const imgColors = await fetchImageColors(item.imageUrl);
          navigation.navigate('Film', {
            item,
            imgColors,
            lastScreen: 'Film',
          });
        }}>
        <SharedElement id={item.imageUrl}>
          <FastImage style={styles.coverImage} source={{uri: item.imageUrl}} />
        </SharedElement>

        {parsedDate(item.danishPremiere) > currentDate && (
          <PremiereDate PremiereDate={item.danishPremiere} />
        )}
        <View style={styles.titleContainer}>
          <SharedElement id={item.danishTitle}>
            <Text style={styles.cardTitle}>
              {item.danishTitle ? item.danishTitle : item.title}
            </Text>
          </SharedElement>
        </View>
      </TouchableScale>
    );
  }

  return (
    <View style={styles.container}>
      <SearchFilterFunction
        data={filteredMovies}
        filteredData={setFilteredMovies}
        filterValue="danishTitle"
      />

      <FilterMovies
        scrollToIndex={scrollToIndex}
        state={state}
        setFilteredMovies={setFilteredMovies}
      />

      <FlatList
        keyboardShouldPersistTaps="always"
        data={filteredMovies}
        extraData={filteredMovies}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => Item(item)}
        keyExtractor={item => item.id}
        ref={movieFlatListRef}
      />
    </View>
  );
};

export default Movies;

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';
import usePosterColors from '../hooks/usePosterColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/MovieStyles';
import MovieBackgroundImage from '../components/movies/MovieBackgroundImage';
import MovieMetaData from '../components/movies/MovieMetaData';
import ShowTimes from '../components/movies/ShowTimes';
import MovieResume from '../components/movies/MovieResume';
import MovieCast from '../components/movies/MovieCast';
import TabViewComponent from '../components/movies/TabViewComponent';
import GestureRecognizer from 'react-native-swipe-gestures';
import fetchImageColors from '../helpers/fetchImageColors';
import useMovieJson from '../hooks/useMovieJson';

const MovieModal = ({movieModalVisible, setMovieModalVisible, passedMovie}) => {
  const [active, setActive] = useState(0);
  const defaultState = {
    backgroundColor: '#1d1d27',
    primaryFontColor: 'white',
    secondaryFontColor: 'white',
  };
  const [imgColors, setImgColors] = useState(defaultState);
  const {movie, isLoading} = useMovieJson(passedMovie);

  useEffect(() => {
    fetchImageColors(passedMovie.imageUrl, setImgColors);
  }, [passedMovie]);

  if (isLoading) {
    return null;
  }

  const {backgroundColor, primaryFontColor, secondaryFontColor} = imgColors;

  return (
    <GestureRecognizer
      onSwipeDown={() => setMovieModalVisible(!movieModalVisible)}
      style={{
        flex: 1,
        backgroundColor: 'transparent',
      }}>
      <Modal
        animationType="fade"
        presentationStyle={'fullScreen'}
        visible={movieModalVisible}>
        <>
          <FlatList
            keyboardShouldPersistTaps="always"
            style={[styles.container, {backgroundColor: backgroundColor}]}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <StatusBar hidden={true} />
                <TouchableOpacity
                  style={styles.goBackContainer}
                  onPress={() => {
                    setMovieModalVisible(!movieModalVisible);
                    setActive(0);
                  }}>
                  <MaterialCommunityIcons
                    name="arrow-left-circle"
                    size={35}
                    color={primaryFontColor}
                  />
                </TouchableOpacity>

                <MovieBackgroundImage
                  movie={movie}
                  image={passedMovie.imageUrl}
                  danishTitle={passedMovie.title}
                  modal={true}
                  backgroundColor={backgroundColor}
                  primaryFontColor={primaryFontColor}
                  secondaryFontColor={secondaryFontColor}
                />

                <MovieMetaData
                  movie={movie}
                  backgroundColor={backgroundColor}
                  primaryFontColor={primaryFontColor}
                  secondaryFontColor={secondaryFontColor}
                />
              </>
            }
            ListFooterComponent={
              <>
                <TabViewComponent
                  setActive={setActive}
                  active={active}
                  backgroundColor={backgroundColor}
                  primaryFontColor={primaryFontColor}
                  secondaryFontColor={secondaryFontColor}
                />

                <ShowTimes
                  id={passedMovie.id}
                  movieVersions={passedMovie.versions}
                  nextShowtime={passedMovie.next_showtime}
                  backgroundColor={backgroundColor}
                  primaryFontColor={primaryFontColor}
                  secondaryFontColor={secondaryFontColor}
                  active={active === 0 ? 'flex' : 'none'}
                />

                {!movie ? null : (
                  <MovieResume
                    resume={movie.body}
                    primaryFontColor={primaryFontColor}
                    active={active === 1 ? 'flex' : 'none'}
                  />
                )}
                {!movie ? null : (
                  <MovieCast
                    movie={movie}
                    primaryFontColor={primaryFontColor}
                    secondaryFontColor={secondaryFontColor}
                    active={active === 2 ? 'flex' : 'none'}
                  />
                )}
              </>
            }
          />
        </>
      </Modal>
    </GestureRecognizer>
  );
};

export default MovieModal;

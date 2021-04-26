import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FlatList, TouchableOpacity, StatusBar, Modal} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/MovieStyles';
import MovieBackgroundImage from '../components/movies/MovieBackgroundImage';
import MovieMetaData from '../components/movies/MovieMetaData';
import ShowTimes from '../components/movies/ShowTimes';
import MovieResume from '../components/movies/MovieResume';
import MovieCast from '../components/movies/MovieCast';
import TabViewComponent from '../components/movies/TabViewComponent';
import GestureRecognizer from 'react-native-swipe-gestures';
import useMovieJson from '../hooks/useMovieJson';
import usePosterColors from '../hooks/usePosterColors';

const MovieModal = ({movieModalVisible, hideMovieModal, passedMovie}) => {
  const [active, setActive] = useState(0);
  const {movie, isLoading} = useMovieJson(passedMovie);
  const {imgColors, isLoadingColors} = usePosterColors(passedMovie.imageUrl);

  const config = {
    velocityThreshold: 0.8,
    directionalOffsetThreshold: 150,
    gestureIsClickThreshold: 10,
  };

  if (isLoading || isLoadingColors) {
    return null;
  }

  const {backgroundColor, primaryFontColor, secondaryFontColor} = imgColors;
  return (
    <GestureRecognizer
      onSwipeDown={() => hideMovieModal()}
      config={config}
      style={{
        flex: 1,
        backgroundColor: 'transparent',
      }}>
      <Modal
        onRequestClose={() => hideMovieModal()}
        animationType="fade"
        presentationStyle={'fullScreen'}
        visible={movieModalVisible}>
        <>
          <FlatList
            keyboardShouldPersistTaps="always"
            style={[styles.container, {backgroundColor}]}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <StatusBar hidden />
                <TouchableOpacity
                  style={styles.goBackContainer}
                  onPress={() => {
                    hideMovieModal();
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
                  backgroundColor={secondaryFontColor}
                  primaryFontColor={primaryFontColor}
                  secondaryFontColor={backgroundColor}
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

                {movie && (
                  <MovieResume
                    resume={movie.body}
                    primaryFontColor={primaryFontColor}
                    active={active === 1 ? 'flex' : 'none'}
                  />
                )}
                {movie && (
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

MovieModal.propTypes = {
  hideMovieModal: PropTypes.func.isRequired,
};

export default MovieModal;

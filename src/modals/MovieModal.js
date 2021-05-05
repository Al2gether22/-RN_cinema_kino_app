import React, {useState, useEffect} from 'react';
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
import useMovieJson from '../hooks/useMovieJson';
import usePosterColors from '../hooks/usePosterColors';
import analytics from '@react-native-firebase/analytics';

const MovieModal = ({
  movieModalVisible,
  hideMovieModal,
  passedMovie,
  showtimes,
}) => {
  const [active, setActive] = useState(showtimes === false ? 1 : 0);
  const {movie, isLoading} = useMovieJson(passedMovie);
  const {imgColors, isLoadingColors} = usePosterColors(passedMovie.imageUrl);

  useEffect(() => {
    // Create an scoped async function in the hook
   
    async function trackData() {
      await analytics().logScreenView({
        screen_class: 'Film',
        screen_name: 'Film',
      });
      await analytics().logEvent('Film', {
        Title: passedMovie.danishTitle,
        id: passedMovie.id,
      });
    }
    // Execute the created function directly
    movieModalVisible == true ?
    trackData() : null
    
  }, [movieModalVisible]);

  if (isLoading || isLoadingColors) {
    return null;
  }

  const {backgroundColor, primaryFontColor, secondaryFontColor} = imgColors;
  return (
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
          ListFooterComponentStyle={{marginBottom: 30}}
          ListFooterComponent={
            <>
              <TabViewComponent
                setActive={setActive}
                active={active}
                backgroundColor={secondaryFontColor}
                primaryFontColor={primaryFontColor}
                secondaryFontColor={backgroundColor}
                showtimes={showtimes}
              />
              
              { showtimes === false ? null : 
              <ShowTimes
                id={passedMovie.id}
                movieVersions={passedMovie.versions ? passedMovie.versions : null}
                nextShowtime={passedMovie.next_showtime}
                backgroundColor={backgroundColor}
                primaryFontColor={primaryFontColor}
                secondaryFontColor={secondaryFontColor}
                active={active === 0 ? 'flex' : 'none'}
              /> }

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
  );
};

MovieModal.propTypes = {
  hideMovieModal: PropTypes.func.isRequired,
};

export default MovieModal;

import React, {useState, useEffect } from 'react';
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
import analytics from '@react-native-firebase/analytics';

const MovieModal = ({movieModalVisible, setMovieModalVisible, passedMovie, showtimes}) => {
  const [active, setActive] = useState(showtimes === false ? 1 : 0);
  const {movie, isLoading} = useMovieJson(passedMovie);
  const {imgColors, isLoadingColors} = usePosterColors(passedMovie.imageUrl);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function trackData() {
      await analytics().logScreenView({
        screen_class: 'Film',
        screen_name: 'Film',
      })
      await analytics().logEvent("Film", { "Title": passedMovie.danishTitle, "id": passedMovie.id.toString()});

    }
    // Execute the created function directly
    trackData();
  }, []);
  
  const config = {
    velocityThreshold: 0.8,
    directionalOffsetThreshold: 150,
    gestureIsClickThreshold: 10
  };

  if (isLoading || isLoadingColors) {
    return null;
  }

  const {backgroundColor, primaryFontColor, secondaryFontColor} = imgColors;
  return (
    <GestureRecognizer
      onSwipeDown={() => setMovieModalVisible(!movieModalVisible)}
      config={config}
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
            style={[styles.container, {backgroundColor}]}
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
                  backgroundColor={secondaryFontColor}
                  primaryFontColor={primaryFontColor}
                  secondaryFontColor={backgroundColor}
                  showtimes={showtimes}
                />
                
                { showtimes === false ? null : 
                <ShowTimes
                  id={passedMovie.id}
                  movieVersions={passedMovie.versions}
                  nextShowtime={passedMovie.next_showtime}
                  backgroundColor={backgroundColor}
                  primaryFontColor={primaryFontColor}
                  secondaryFontColor={secondaryFontColor}
                  active={active === 0 ? 'flex' : 'none'}
                /> }

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

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

const MovieModal = ({movieModalVisible, setMovieModalVisible, passedMovie}) => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const defaultState = {
    backgroundColor: '#1d1d27',
    primaryFontColor: 'white',
    secondaryFontColor: 'white',
  };
  const [imgColors, setImgColors] = useState(defaultState);

  useEffect(() => {
    const fetchPromise = fetch(
      `https://www.kino.dk/appservices/movie/${
        passedMovie.id ? passedMovie.id : passedMovie.movie_id
      }`,
      {
        mode: 'no-cors',
      },
    )
      .then(response => response.json())
      .then(json => setMovie(json))
      .catch(error => console.error(error));
    const imageColorPromise = fetchImageColors(
      passedMovie.imageUrl,
      setImgColors,
    );
    Promise.all([fetchPromise, imageColorPromise]).then(() => {
      setLoading(false);
    });
  }, [passedMovie, backgroundColor]);

  if (loading) {
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

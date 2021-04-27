import React, {useState} from 'react';
import {StatusBar, FlatList} from 'react-native';
import MovieBackgroundImage from '../components/movies/MovieBackgroundImage';
import {useNavigation} from '@react-navigation/native';
import MovieMetaData from '../components/movies/MovieMetaData';
import ShowTimes from '../components/movies/ShowTimes';
import MovieResume from '../components/movies/MovieResume';
import MovieCast from '../components/movies/MovieCast';
import styles from '../styles/MovieStyles';
import TabViewComponent from '../components/movies/TabViewComponent';
import GestureRecognizer from 'react-native-swipe-gestures';
import useMovieJson from '../hooks/useMovieJson';

const Movie = ({route}) => {
  const {item, imgColors} = route.params;
  const {movie, isLoading} = useMovieJson(item);
  const {backgroundColor, primaryFontColor, secondaryFontColor} = imgColors;
  const [active, setActive] = useState(0);
  const navigation = useNavigation();
  const config = {
    velocityThreshold: 0.8,
    directionalOffsetThreshold: 150,
    gestureIsClickThreshold: 10,
  };

  return (
    // Need to render everything inside a flatlist because we cant nest flatlists inside a scroll view
    <FlatList
      keyboardShouldPersistTaps="always"
      style={[styles.container, {backgroundColor}]}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <GestureRecognizer
          onSwipeDown={() => navigation.goBack()}
          config={config}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            width: '100%',
            zIndex: 999999,
          }}>
          <StatusBar hidden={true} />

          <MovieBackgroundImage
            movie={movie}
            image={item.imageUrl}
            danishTitle={item.danishTitle}
            genre={item.genre}
            backgroundColor={backgroundColor}
            primaryFontColor={primaryFontColor}
            secondaryFontColor={secondaryFontColor}
          />

          {isLoading ? null : (
            <MovieMetaData
              movie={movie}
              backgroundColor={backgroundColor}
              primaryFontColor={primaryFontColor}
              secondaryFontColor={secondaryFontColor}
            />
          )}
        </GestureRecognizer>
      }
      ListFooterComponentStyle={{marginBottom: 50}}
      ListFooterComponent={
        isLoading ? null : (
          <>
            <TabViewComponent
              setActive={setActive}
              active={active}
              backgroundColor={secondaryFontColor}
              primaryFontColor={primaryFontColor}
              secondaryFontColor={backgroundColor}
            />

            <ShowTimes
              id={movie.nid}
              movieVersions={item.versions}
              nextShowtime={item.next_showtime}
              backgroundColor={backgroundColor}
              primaryFontColor={primaryFontColor}
              secondaryFontColor={secondaryFontColor}
              active={active === 0 ? 'flex' : 'none'}
              title={item.danishTitle}
            />

            <GestureRecognizer
              onSwipeLeft={() => setActive(2)}
              onSwipeRight={() => setActive(0)}
              config={config}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}>
              <MovieResume
                resume={movie.body}
                primaryFontColor={primaryFontColor}
                secondaryFontColor={backgroundColor}
                active={active === 1 ? 'flex' : 'none'}
              />
            </GestureRecognizer>

            <GestureRecognizer
              onSwipeRight={() => setActive(1)}
              config={config}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}>
              <MovieCast
                movie={movie}
                primaryFontColor={primaryFontColor}
                secondaryFontColor={secondaryFontColor}
                active={active === 2 ? 'flex' : 'none'}
              />
            </GestureRecognizer>
          </>
        )
      }
    />
  );
};

Movie.defaultProps = {
  average_rating: '0',
};

Movie.sharedElements = route => {
  const {item} = route.params;

  return [
    {
      id: item.imageUrl,
      animation: 'fade',
      resize: 'clip',
      align: 'auto',
    },
    {
      id: item.danishTitle,
      animation: 'fade',
      resize: 'none',
      align: 'auto',
    },
  ];
};

export default Movie;

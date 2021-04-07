import React, {useEffect, useState} from 'react';
import {StatusBar, FlatList} from 'react-native';
import usePosterColors from '../hooks/usePosterColors';
import MovieBackgroundImage from '../components/movies/MovieBackgroundImage';
import {useNavigation} from '@react-navigation/native';
import MovieMetaData from '../components/movies/MovieMetaData';
import ShowTimes from '../components/movies/ShowTimes';
import MovieResume from '../components/movies/MovieResume';
import MovieCast from '../components/movies/MovieCast';
import styles from '../styles/MovieStyles';
import TabViewComponent from '../components/movies/TabViewComponent';
import GestureRecognizer from 'react-native-swipe-gestures';

const Movie = ({route}) => {
  const {item} = route.params;
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const {
    backgroundColor,
    primaryFontColor,
    secondaryFontColor,
  } = usePosterColors(item.imageUrl);
  const [active, setActive] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`https://www.kino.dk/appservices/movie/${item.id}`, {
      mode: 'no-cors',
    })
      .then(response => response.json())
      .then(json => setMovie(json))
      .catch(error => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);
    

  return (
    // Need to render everything inside a flatlist because we cant nest flatlists inside a scroll view
    <>
      <FlatList
        keyboardShouldPersistTaps="always"
        style={[styles.container, {backgroundColor: backgroundColor}]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <GestureRecognizer
            onSwipeDown={() => navigation.goBack()}
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

            {loading ? null : (
              <MovieMetaData
                movie={movie}
                backgroundColor={backgroundColor}
                primaryFontColor={primaryFontColor}
                secondaryFontColor={secondaryFontColor}
              />
            )}
          </GestureRecognizer>
        }
        ListFooterComponent={
          loading ? null : (
            <>
              <TabViewComponent
                setActive={setActive}
                active={active}
                backgroundColor={backgroundColor}
                primaryFontColor={primaryFontColor}
                secondaryFontColor={secondaryFontColor}
              />

              <ShowTimes
                id={movie.nid}
                movieVersions={item.versions}
                nextShowtime={item.next_showtime}
                backgroundColor={backgroundColor}
                primaryFontColor={primaryFontColor}
                secondaryFontColor={secondaryFontColor}
                active={active === 0 ? 'flex' : 'none'}
              />

              <GestureRecognizer
                onSwipeLeft={() => setActive(2)}
                onSwipeRight={() => setActive(0)}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                }}>
                <MovieResume
                  resume={movie.body}
                  primaryFontColor={primaryFontColor}
                  active={active === 1 ? 'flex' : 'none'}
                />
              </GestureRecognizer>

              <GestureRecognizer
                onSwipeRight={() => setActive(1)}
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
    </>
    );
  }

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

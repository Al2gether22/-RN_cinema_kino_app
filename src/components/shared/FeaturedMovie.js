import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import analytics from '@react-native-firebase/analytics';
import {useNavigation} from '@react-navigation/native';
import {FONTS, COLORS, SIZES} from '../../constants/theme';
import fetchImageColors from '../../helpers/fetchImageColors';

const FeaturedMovie = ({movies, featuredMovies}) => {
  const [featuredMovie, setFeaturedMovie] = useState();
  const [videoPaused, setVideoPaused] = useState(true)
  const navigation = useNavigation();

  // Do a lookup in movies with the movie id and find the movie and pass it to movie modal
  // This needs to be refactored if we need more elements in the featuredMovies component
  useEffect(() => {
    const movie = movies.find(el => el.id === featuredMovies[0].id);
    setFeaturedMovie(movie);
  }, []);

  const goToFeaturedMovie = async () => {
    const imgColors = await fetchImageColors(featuredMovie.imageUrl);

    navigation.navigate('Film oversigt', {
      screen: 'Film',
      params: {
        item: featuredMovie,
        imgColors,
      },
    });
    analytics().logEvent('featured_movie', {
      Title: featuredMovie.danishTitle,
      id: featuredMovie.id,
    });
  };

  if (!featuredMovie)
    return (
      <ImageBackground
        style={styles.coverImage}
        source={require('../../../assets/images/featured-movie-fallback.jpg')}
        resizeMode="cover"
      />
    );

  console.log('featuredMovies[0].videoUrl', featuredMovies[0].videoUrl);


  return (
    <View style={styles.coverImageContainer}>
      {featuredMovies[0].videoUrl ? (
        <TouchableOpacity onPress={() => goToFeaturedMovie()}>
          <Video
            source={{
              uri: featuredMovies[0].videoUrl,
            }}
            style={styles.coverVideo}
            muted={true}
            repeat={true}
            paused={videoPaused}
            resizeMode={'cover'}
            controls={false}
            rate={1.0}
            poster={featuredMovies[0].imageUrl}
            posterResizeMode={'cover'}
            onLoad={() => {setVideoPaused(false)}}
          />

          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>{featuredMovies[0].danishTitle}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <ImageBackground
          style={styles.coverImage}
          source={{uri: featuredMovies[0].imageUrl}}
          resizeMode="cover">
          <TouchableOpacity onPress={() => goToFeaturedMovie()}>
            <Text style={styles.linkText}>{featuredMovies[0].danishTitle}</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  coverImageContainer: {
    height: '100%',
    marginBottom: 50,
  },
  coverVideo: {
    height: '100%',
    width: SIZES.width,
  },
  coverImage: {
    height: '100%',
    width: '100%',
  },
  linkContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    bottom: -15,
    left: 10,
  },
  linkText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default FeaturedMovie;

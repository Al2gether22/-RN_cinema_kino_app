import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import crashlytics from '@react-native-firebase/crashlytics';
import {COLORS, FONTS} from '../../constants/theme';
import fetchImageColors from '../../helpers/fetchImageColors';

const FeaturedMovie = () => {
  const [featuredMovieItem, setFeaturedMovieItem] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'https://www.kino.dk/appservices/featured-movies',
      );
      res
        .json()
        .then(res => setFeaturedMovieItem(res))
        .catch(
          error => (
            crashlytics().recordError(error),
            Toast.show({
              text1: 'Noget gik galt!',
              text2: 'Prøv at lukke appen og start den igen',
              position: 'bottom',
              bottomOffset: 300,
              type: 'error',
              autoHide: false,
            })
          ),
        );
    }
    fetchData();
  }, []);

  return featuredMovieItem[0] ? (
    <>
      <Animatable.View
        style={styles.coverImageContainer}
        animation="fadeIn"
        duration={900}
        delay={50}>
        <ImageBackground
          style={styles.coverImage}
          source={{uri: featuredMovieItem[0].imageUrl}}
          resizeMode="cover">
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => {
              const imgColors = await fetchImageColors(featuredMovieItem.imageUrl);

              navigation.navigate('Film', {
                params: {
                  item: featuredMovieItem,
                  imgColors,
                },
              })
            }
            }>
            <Text style={styles.linkText}>
              Læs mere om {featuredMovieItem[0].danishTitle}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </Animatable.View>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  coverImageContainer: {},
  coverImage: {
    height: '100%',
    width: '100%',
    zIndex: -999,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  linkContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  linkText: {
    color: COLORS.white,
    ...FONTS.h2,
  },
});

export default FeaturedMovie;

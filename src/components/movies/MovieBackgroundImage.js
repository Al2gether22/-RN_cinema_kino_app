import React, {useState} from 'react';
import {View, ImageBackground, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {SharedElement} from 'react-navigation-shared-element';
import MovieTrailerModal from '../../modals/MovieTrailerModal';
import styles from '../../styles/MovieBackgroundImageStyles';
import {Platform} from 'react-native';

const MovieBackgroundImage = ({
  movie,
  image,
  danishTitle,
  genre,
  modal,
  backgroundColor,
  primaryFontColor,
  secondaryFontColor,
}) => {
  //Not quite sure why there is both modal + modalVisible variables?
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const genreFallback = genre ? genre : movie.genre;
  const imageFallback = image ? image : movie.imageUrl;
  const titleFallback = danishTitle ? danishTitle : movie.title;

  return (
    <View style={styles.imageContainer}>
      {modal && Platform.OS === 'ios' && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.goBackContainer}>
          <Text style={styles.goBack}>
            <MaterialCommunityIcons
              name="arrow-left-circle"
              size={35}
              color={primaryFontColor}
            />
          </Text>
        </TouchableOpacity>
      )}
      <SharedElement id={image}>
        <>
          <ImageBackground
            style={styles.coverImage}
            source={{uri: imageFallback}}
            resizeMethod="auto"
            resizeMode="cover">
            <LinearGradient
              colors={[`${backgroundColor}00`, `${backgroundColor}`]}
              style={styles.LinearGradientLower}
            />
          </ImageBackground>
          {!!movie.video_markup && (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <Animatable.View
                style={styles.playButtomViewWrapper}
                animation="zoomIn"
                duration={900}
                delay={100}>
                <MaterialCommunityIcons
                  style={styles.playButton}
                  color={primaryFontColor}
                  name="play-circle"
                  size={60}
                />
              </Animatable.View>
              <MovieTrailerModal
                modalVisible={modalVisible}
                hideModal={() => setModalVisible(false)}
                video_markup={movie.video_markup}
                movie={movie}
              />
            </TouchableOpacity>
          )}
        </>
      </SharedElement>

      <SharedElement id={titleFallback}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[styles.movieTitle, {color: primaryFontColor}]}>
          {titleFallback}
        </Text>
      </SharedElement>

      <Text
        style={[styles.movieGenre, {color: secondaryFontColor}]}
        numberOfLines={3}>
        {genreFallback ? genreFallback.join(', ') : ''} {'\n'}
        {movie.playingTime ? `Varighed ${movie.playingTime} min` : null} {'\n'}
        {movie.censorship ? `${movie.censorship.name}` : null}
      </Text>
    </View>
  );
};

export default MovieBackgroundImage;

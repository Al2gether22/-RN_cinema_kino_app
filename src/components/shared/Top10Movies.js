import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import TouchableScale from 'react-native-touchable-scale';
import MovieModal from '../../modals/MovieModal';
import {useNavigation} from '@react-navigation/native';

const Top10Movies = ({movies}) => {
  const navigation = useNavigation();
  const [movieModalVisible, setMovieModalVisible] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    if (movie.title) {
      setMovieModalVisible(true);
    }
  }, [movie]);

  const Item = item => {
    return (
      <View style={styles.itemContainer}>
        <TouchableScale
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => {
            setMovie(item);
          }}>
          <Image
            style={styles.img}
            source={{
              uri: item.imageUrl,
            }}
          />
        </TouchableScale>
      </View>
    );
  };

  return (
    <Animatable.View
      style={styles.container}
      animation="fadeIn"
      duration={900}
      delay={40}>
      <MovieModal
        movieModalVisible={movieModalVisible}
        hideMovieModal={() => setMovieModalVisible(false)}
        passedMovie={movie}
      />

      <View style={styles.headLineContainer}>
        <Text style={styles.headLine}>Populære Film</Text>
        <TouchableScale
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => {
            navigation.navigate('Film');
          }}>
          <Text style={styles.headLineLink}>Alle Film</Text>
        </TouchableScale>
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={movies.slice(0, 10)}
        renderItem={({item}) => Item(item)}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headLineContainer: {
    color: 'white',
    backgroundColor: 'rgba(29,29,39,0.8)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headLine: {
    color: 'white',
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 16,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
  },
  headLineLink: {
    color: 'white',
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 13,
    marginRight: 10,
    textDecorationLine: 'underline',
  },
  itemContainer: {
    margin: 5,
    borderRadius: 7,
  },
  img: {
    height: 120,
    width: 81,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 7,
  },
});

export default Top10Movies;

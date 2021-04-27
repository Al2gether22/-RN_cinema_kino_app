import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import TouchableScale from 'react-native-touchable-scale';
import MovieModal from "../../modals/MovieModal";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../../constants/theme"

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
          }}
        >
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
    color: COLORS.white,
    backgroundColor: "rgba(29,29,39,0.8)",
    flexDirection: "row",
    alignItems: "center"
  },
  headLine: {
    color: COLORS.white,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    ...FONTS.h3
  }, 
  headLineLink: {
    color: COLORS.white,
    marginRight: 10,
    textDecorationLine: 'underline',
    ...FONTS.h4
  },
  itemContainer: {
    margin: 5,
    borderRadius: 7,
    
    height: (SIZES.width / 3),
    maxWidth: ((SIZES.height / 3 ) * (9/16)),
  },
  img: {
    //height: 120,
    //width: 81,
    aspectRatio: 2 / 3,
    height: "100%",
    width: "100%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 7,
  },
});

export default Top10Movies;

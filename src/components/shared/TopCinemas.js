import React, {useRef} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import _ from 'lodash';
import {ImageBackground} from 'react-native';
import * as Animatable from 'react-native-animatable';
import TouchableScale from 'react-native-touchable-scale';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import StarFavorite from '../cinemas/StarFavorite';

const Top10Movies = ({cinemas}) => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const Item = item => {
    return (
      <View style={styles.itemContainer}>
        <TouchableScale
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => {
            navigation.navigate('Biografer', {
              screen: 'Biograf',
              params: {item},
            });
          }}>
          <ImageBackground
            style={styles.img}
            source={{
              uri: item.imageUrl,
            }}>
            <StarFavorite flatListRef={flatListRef} cinemaId={item.id} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
          </ImageBackground>
        </TouchableScale>
      </View>
    );
  };

  return (
    <Animatable.View
      style={styles.container}
      animation="fadeIn"
      duration={900}
      delay={30}>
      <View style={styles.headLineContainer}>
        <Text style={styles.headLine}>Biografer</Text>
        <TouchableScale
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => {
            navigation.navigate('Biografer', {screen: 'Film oversigt'});
          }}>
          <Text style={styles.headLineLink}>Alle biografer</Text>
        </TouchableScale>
      </View>

      <FlatList
        ref={ref => (flatListRef.current = ref)}
        keyboardShouldPersistTaps="always"
        data={cinemas.slice(0, 5)}
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
    color: COLORS.white,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    ...FONTS.h3,
  },
  headLineLink: {
    color: COLORS.white,
    marginRight: 10,
    textDecorationLine: 'underline',
    ...FONTS.h4,
  },
  itemContainer: {
    margin: 5,
    borderRadius: 7,
    borderColor: 'black',
    borderWidth: 2,
    height: SIZES.width / 4,
    maxWidth: SIZES.height / 3,
  },
  img: {
    aspectRatio: 5 / 3,
    height: '100%',
    width: '100%',
    borderRadius: 7,
  },
  titleContainer: {
    position: 'absolute',
    bottom: -4,
    left: -2,
    borderBottomLeftRadius: 7,
    backgroundColor: 'black',
    padding: 5,
  },
  title: {
    borderRadius: 7,
    color: COLORS.white,
    ...FONTS.h5,
  },
});

export default Top10Movies;

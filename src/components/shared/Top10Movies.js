import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import TouchableScale from 'react-native-touchable-scale';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {TouchableOpacity} from 'react-native';
import fetchImageColors from '../../helpers/fetchImageColors';

const Top10Movies = ({movies}) => {
  const navigation = useNavigation();

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
          <TouchableOpacity
            onPress={async () => {
              const imgColors = await fetchImageColors(item.imageUrl);

              navigation.navigate('Film oversigt', {
                screen: 'Film',
                params: {
                  item,
                  imgColors,
                },
              });
            }}>
            <Image
              style={styles.img}
              source={{
                uri: item.imageUrl,
              }}
            />
          </TouchableOpacity>
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
      <View style={styles.headLineContainer}>
        <Text style={styles.headLine}>Populære Film</Text>
        <TouchableScale
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => {
            navigation.navigate('Film oversigt');
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
    color: COLORS.white,
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

    height: SIZES.width / 3,
    maxWidth: (SIZES.height / 3) * (9 / 16),
  },
  img: {
    //height: 120,
    //width: 81,
    aspectRatio: 2 / 3,
    height: '100%',
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 7,
  },
});

export default Top10Movies;

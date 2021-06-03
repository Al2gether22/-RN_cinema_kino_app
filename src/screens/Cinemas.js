import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Context} from '../context/CinemaContext';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';
import styles from '../styles/CinemasStyles';
import SearchFilterFunction from '../components/shared/SearchFilterFunction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context as CinemaContext} from '../context/CinemaContext';

const Cinemas = () => {
  const navigation = useNavigation();
  const {state} = useContext(Context);
  const {toggleFavoriteCinema} = useContext(CinemaContext);
  const [cinemas, setCinemas] = useState(state.cinemas);

  function Item(item) {
    return (
      <TouchableScale
        activeScale={0.9}
        tension={50}
        friction={7}
        useNativeDriver
        style={styles.cinemaOverview}
        onPress={() => {
          navigation.navigate('Biograf', {item});
        }}>
        <SharedElement id={item.imageUrl}>
          <ImageBackground
            style={styles.cinemaImage}
            source={{uri: item.imageUrl}}
            resizeMode="cover">
            <View style={styles.cinemaTitleContainer}>
              <SharedElement id={item.name}>
                <Text style={styles.cinemaTitle}>{item.name}</Text>
              </SharedElement>
              <Text style={styles.cinemaDistance}>
                {item.distance ? `${item.distance.toFixed(1)} km` : ''}
              </Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavoriteCinema(item.id)}>
              <Text>
                <MaterialCommunityIcons
                  name={
                    state.favoriteCinemas.includes(parseInt(item.id))
                      ? 'star'
                      : 'star-outline'
                  }
                  size={25}
                  color="white"
                />
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </SharedElement>
      </TouchableScale>
    );
  }

  return (
    <View style={styles.container}>
      <SearchFilterFunction
        data={cinemas}
        filteredData={setCinemas}
        filterValue="name"
      />
      <FlatList
        keyboardShouldPersistTaps="always"
        data={cinemas}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => Item(item)}
      />
    </View>
  );
};

export default Cinemas;

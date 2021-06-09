import React, {useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Context as CinemaContext} from '../../context/CinemaContext';

const StarFavorite = ({flatListRef, cinemaId, hideBackground}) => {
  const {state, toggleFavoriteCinema} = useContext(CinemaContext);
  return (
    <View
      style={{
        backgroundColor: hideBackground ? null : 'rgba(0, 0, 0, 0.55)',
        width: 28,
        height: 28,
        position: "absolute",
        right: 0,
        top: 0,
        borderRadius: 25
      }}>
      <TouchableOpacity
        onPress={() => {
          toggleFavoriteCinema(cinemaId);
          if (flatListRef) {
            flatListRef.current.scrollToIndex({index: 0, animated: true});
          }
        }}>
        <MaterialCommunityIcons
          name={
            state.favoriteCinemas.includes(parseInt(cinemaId))
              ? 'star'
              : 'star-outline'
          }
          size={25}
          color="#ff321e"
          style={{textAlignVertical: "center", textAlign: "center"}}
        />
      </TouchableOpacity>
    </View>
  );
};

StarFavorite.propTypes = {
  cinemaId: PropTypes.number.isRequired,
};

export default StarFavorite;

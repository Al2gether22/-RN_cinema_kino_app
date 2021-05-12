import React, { useState } from "react";
import { Text, View } from "react-native"
import TouchableScale from 'react-native-touchable-scale';
import _ from "lodash";
import styles from "../../styles/MoviesStyles"

const FilterMovies = ({ state, setFilteredMovies }) => {

  const [activeButton, setActiveButton] = useState(1);

  const filterByCurrent = () => {
    setFilteredMovies(state.movies.filter(movie => movie.status === "current"))
  }

  const filterByUpcoming = () => {
    setFilteredMovies(state.upcomingMovies)
  }

  return (
    <View style={styles.filterContainer}>
        <TouchableScale
          style={[styles.filterButton, activeButton === 1 ? { backgroundColor: "white" } : { backgroundColor: "black" } ]}
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => [
            setFilteredMovies(_.orderBy(state.movies, "selling_position")),
            setActiveButton(1),
          ]}

        >
          <Text style={[styles.filterButtonText, activeButton === 1 ? { color: "black" } : {}]}>Populære</Text>
        </TouchableScale>
        <TouchableScale
          style={[styles.filterButton, activeButton === 2 ? { backgroundColor: "white" } : { backgroundColor: "black" } ]}
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => [
            filterByCurrent(),
            setActiveButton(2),
          ]}
        >
          <Text style={[styles.filterButtonText, activeButton === 2 ? { color: "black" } : {}]}>Aktuelle</Text>
        </TouchableScale>
        <TouchableScale
          style={[styles.filterButton, activeButton === 3 ? { backgroundColor: "white" } : { backgroundColor: "black" } ]}
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => [
            filterByUpcoming(),
            setActiveButton(3),
          ]}
        >
          <Text style={[styles.filterButtonText, activeButton === 3 ? { color: "black" } : {}]}>Kommende</Text>
        </TouchableScale>
      </View>
  )
}

export default FilterMovies
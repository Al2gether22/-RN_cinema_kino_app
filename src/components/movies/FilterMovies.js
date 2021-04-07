import React from "react";
import { Text, View } from "react-native"
import TouchableScale from 'react-native-touchable-scale';
import _ from "lodash";
import styles from "../../styles/MoviesStyles"

const FilterMovies = ({ state, setFilteredMovies }) => {

  const filterByCurrent = () => {
    const currentMovies = state.movies.filter(movie => movie.status === "current")
    setFilteredMovies(_.orderBy(currentMovies, "danishPremiere"))
  }

  const filterByUpcoming = () => {
    setFilteredMovies(state.upcomingMovies)
  }

  return (
    <View style={styles.filterContainer}>
        <TouchableScale
          style={styles.filterButton}
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => setFilteredMovies(_.orderBy(state.movies, "selling_position"))}  
        >
          <Text style={styles.filterButtonText}>Mest Sælgende</Text>
        </TouchableScale>
        <TouchableScale
          style={styles.filterButton}
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => filterByCurrent()}  
        >
          <Text style={styles.filterButtonText}>Aktuelle Film</Text>
        </TouchableScale>
        <TouchableScale
          style={styles.filterButton} 
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => filterByUpcoming()} 
        >
          <Text style={styles.filterButtonText}>Kommende Film</Text>
        </TouchableScale>
      </View>
  )
}

export default FilterMovies
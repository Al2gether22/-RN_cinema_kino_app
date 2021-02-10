import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import { Context } from "../context/MoviesContext"
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native"
import styles from "../styles/MoviesStyles"
import PremiereDate from "../components/PremiereDate";
import SearchFilterFunction from "../components/SearchFilterFunction"

const Movies = () => {
  const navigation = useNavigation();
  const { state } = useContext(Context);
  const [movies, setMovies] = useState(
    _.orderBy(state.movies, "selling_position")
  );
  const currentDate = new Date();
   
  function Item({
    title,
    danishTitle,
    oneliner,
    imageUrl,
    id,
    next_showtime,
    versions,
    danishPremiere,
  }) {

    // Formatting date to compare it to date today

    const parsedDate = (danishPremiere) => {
      if (danishPremiere !== null) {
        const premiereDate = danishPremiere.split(" ")[0];
        const parsedDate = new Date(premiereDate);
        return parsedDate;
      } else {
        return null;
      }
    };

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("Movie", { 
              id,
              next_showtime,
              versions,
              name: danishTitle,            
          })
        
        }
      >
        <Image style={styles.coverImage} source={{ uri: imageUrl }}></Image>
        



        {parsedDate(danishPremiere) > currentDate && (
          <PremiereDate PremiereDate={danishPremiere} />
        )}

        <Text style={styles.cardTitle}>{title ? title : danishTitle}</Text>
        <Text style={styles.oneliner}>{oneliner}</Text>
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={styles.container}>
      <SearchFilterFunction
        data={movies}
        filteredData={setMovies}
        filterValue="title"
      />

      <FlatList
        data={movies}
        extraData={movies}
        numColumns={2}
        renderItem={({ item }) => Item(item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Movies;
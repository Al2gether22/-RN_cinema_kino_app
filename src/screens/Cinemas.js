import React, { useContext, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Context } from "../context/CinemaContext";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import styles from "../styles/CinemasStyles"
import SearchFilterFunction from "../components/shared/SearchFilterFunction";

const Cinemas = () => {
  const navigation = useNavigation(); 
  const { state } = useContext(Context)
  const [cinemas, setCinemas] = useState(state.cinemas)

  function Item({ id, imageUrl, name, distance }) {
    
    return (
      <TouchableOpacity 
       style={styles.cinemaOverview} 
        onPress={() => navigation.navigate("Cinema", { id: id, imageUrl: imageUrl, name: name })}
      >
        <Image style={styles.cinemaImage} source={{ uri: imageUrl }}></Image>
        <Text style={styles.cinemaTitle}>{name}</Text>
        <Text style={styles.cinemaDistance}>{distance ? `${distance.toFixed(1)} km` : ''}</Text>
    </TouchableOpacity>
    )
  }
 
  return (
    <View style={styles.container}>
      <SearchFilterFunction
        data={cinemas}
        filteredData={setCinemas}
        filterValue="name"
      />
      <FlatList
        data={cinemas}
        numColumns={1}
        keyExtractor={(item) => item.id.toString() }
        renderItem={({ item }) => Item(item)}
      />
    </View>
  )
}

export default Cinemas;
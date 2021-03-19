import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native"


const MovieCast = ({ movie, active, primaryFontColor, secondaryFontColor }) => {
  
  const Item = (item) => {

    return (

      <View style={styles.itemContainer}>
        <Image
          style={styles.img}
          source={{
          uri: item.photo,
        }}
      />
        <Text style={[styles.name, { color: secondaryFontColor}]}>{item.first_name} {item.last_name}</Text>
      </View>
     
    );
  }

  return (
    
    <View style={[ styles.container, { display: active }]}>
      
      <Text style={[styles.headline, { color: primaryFontColor}]}>{movie.directors.length === 0 ? "Ingen Instruktør at vise" : "Intruktører" }</Text>
      <FlatList 
        data={movie.directors}
        renderItem={({ item }) => Item(item)}
        keyExtractor={(item) => item.id}
        listKey={(item) => item.id}
      />

      <Text style={[styles.headline, { color: primaryFontColor}]}>{movie.actors.length === 0 ? "Ingen skuespillere at vise" : "Skuespillere" }</Text>
        <FlatList 
          data={movie.actors}
          renderItem={({ item }) => Item(item)}
          keyExtractor={(item) => item.id}
          listKey={(item) => item.id}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: "4%"
  },
  headline: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 22, 
    fontFamily: "SourceSansPro-Bold"

  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 25
  },
  name: {
    fontFamily: "SourceSansPro-Bold", 
    fontSize: 18,
    marginTop: 10,
    
  }, 
  img: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginRight: 20
  }
})

export default MovieCast;
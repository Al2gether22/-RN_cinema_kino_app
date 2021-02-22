import React, { useState } from "react";
import { StyleSheet, View } from "react-native"
import {SearchBar} from 'react-native-elements';

const SearchFilterFunction = ({ data, filteredData, filterValue }) => {
  
  const [search, setSearch] = useState('')
  const [masterData, setMasterData] = useState(data)
  
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the data
      // Update movies
      const newData = masterData.filter(
        function (item) {
          
          const itemData = item[filterValue]
            ? item[filterValue].toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      filteredData(newData);
      setSearch(text);
    } else {
      filteredData(masterData);
      setSearch(text)
    }
  };
  
  return (
    
    <View style={styles.searchFieldContainer}>   
       <SearchBar
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Søg"
          value={search}
          searchIcon={{size: 24}}
          containerStyle={{backgroundColor: 'transparent', borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, marginLeft: 1, marginRight: 1, marginBottom: 20}}
          inputContainerStyle={{height: 25, borderRadius: 10}}
          inputStyle={{fontSize: 18, fontFamily: "SourceSansPro-BlackIt"}}
          autoCapitalize="none"
          autoCorrect={false}
        />
    </View>
    )
  
}

const styles = StyleSheet.create({
  searchFieldContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
    
  },

})

export default SearchFilterFunction;
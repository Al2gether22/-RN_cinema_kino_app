import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native"
import _ from "lodash";
import { ImageBackground } from "react-native";
import * as Animatable from 'react-native-animatable';
import TouchableScale from 'react-native-touchable-scale';
import CinemaModal from "../../modals/CinemaModal"
import { useNavigation } from "@react-navigation/native";


const Top10Movies = ({ cinemas }) => {

  const navigation = useNavigation();
  const [cinemaModalVisible, setCinemaModalVisible] = useState(false);
  const [cinema, setCinema] = useState({})

  const Item = (item) => {

    return (

      <View style={styles.itemContainer}>
        <TouchableScale
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => {
            setCinemaModalVisible(true), 
            setCinema(item)
          }}
        >
          <ImageBackground
            style={styles.img}
            source={{
            uri: item.imageUrl,
            }}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
          </ImageBackground>
        </TouchableScale>
      </View>
     
    );
  }

  return (

    <Animatable.View 
      style={styles.container}
      animation='fadeIn'
      duration={900}
      delay={30}
    >

      <CinemaModal 
        cinemaModalVisible={cinemaModalVisible}
        setCinemaModalVisible={() => setCinemaModalVisible(false)}
        passedCinema={cinema}
      />  
    
      <View style={styles.headLineContainer}>
        <Text style={styles.headLine}>Biografer</Text>
        <TouchableScale
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => {
            navigation.navigate('Biografer');
          }}
        >
          <Text style={styles.headLineLink}>Alle Biografer</Text> 
        </TouchableScale>
        
      </View>
      
      <FlatList 
        keyboardShouldPersistTaps="always"
        data={cinemas.slice(0, 5)}
        renderItem={({ item }) => Item(item)}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  }, 
  headLineContainer: {
    color: "white",
    backgroundColor: "rgba(29,29,39,0.8)",
    flexDirection: "row",
  },
  headLine: {
    color: "white",
    fontFamily: "BureauGrotComp-Medium",
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 10
  }, 
  headLineLink: {
    color: "white",
    fontFamily: "BureauGrotComp-Medium",
    fontSize: 18,
    justifyContent: "flex-end",
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,  
    textDecorationLine: 'underline',
  },
  itemContainer: {
    margin: 5,
    borderRadius: 7
    
  },
  img: {
    height: 60,
    width: 120,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 7,
    
  },
  titleContainer: {
    position: "absolute",
    bottom: -4,
    left: -2,
    borderBottomLeftRadius: 7,
    backgroundColor: "black",
    padding: 5,
  },
  title: {
    borderRadius: 7,
    color: "white",
    fontSize: 10,
    fontFamily: "SourceSansPro-Bold",
  }
})

export default Top10Movies
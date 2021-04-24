import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, StatusBar } from "react-native"
import CinemaBackgroundImage from "../components/cinemas/CinemaBackgroundImage"
import CinemaMetaData from "../components/cinemas/CinemaMetaData"
import ShowTimes from "../components/cinemas/ShowTimes";
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from "@react-navigation/native";
import firebase from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';

const Cinema = ({ route }) => {
  const { item } = route.params;
  const [cinema, setCinema] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation();
  const config = {
    velocityThreshold: 0.8,
    directionalOffsetThreshold: 150,
    gestureIsClickThreshold: 10
  };

  // fetches cinema data
  useEffect(() => {
    fetch(`https://www.kino.dk/appservices/cinema/${item.id}`, {
      mode: "no-cors"
      })
      .then((response) => response.json())
      .then((json) => setCinema(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function trackData() {
      await firebase.app();
      await analytics().logScreenView({
        screen_class: 'Biograf',
        screen_name: 'Biograf',
      })
      await analytics().logSelectItem({
        content_type: "Biograf",
        item_list_name: item.name,
        item_list_id: item.id.toString()
      })
    }
    // Execute the created function directly
    trackData();
  }, []);

  return (
    <>
      <FlatList
        keyboardShouldPersistTaps="always"
        style={styles.container}
        keyExtractor={(index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <GestureRecognizer      
            onSwipeDown={() => navigation.goBack()}
            config={config}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              width: "100%",
              zIndex: 999999
            }}
          >
            <StatusBar hidden={true} />
            <CinemaBackgroundImage
              name={item.name}
              img={item.imageUrl}
            />
            { loading ? null : <CinemaMetaData cinema={cinema} />}
            
          </GestureRecognizer>
        }
        ListFooterComponentStyle={{marginBottom: 50}}
        ListFooterComponent={
          loading ? null : 
          <ShowTimes 
            id={cinema.nid} 
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1d1d27",
  },
});

Cinema.sharedElements = route => {
  const { item } = route.params;
  
  return [
    {
      id: item.imageUrl,
      animation: "fade",
      resize: "clip", 
      align: "auto"
    }, 
    {
      id: item.name,
      animation: "fade",
      resize: "none", 
      align: "auto"
    }
  ];
};

export default Cinema;
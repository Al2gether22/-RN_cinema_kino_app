import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, StatusBar } from "react-native"
import CinemaBackgroundImage from "../components/cinemas/CinemaBackgroundImage"
import CinemaMetaData from "../components/cinemas/CinemaMetaData"
import ShowTimes from "../components/cinemas/ShowTimes";
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from "@react-navigation/native";


const Cinema = ({ route }) => {
  const { item } = route.params;
  const [cinema, setCinema] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation();
  const config = {
    velocityThreshold: 0.4,
    directionalOffsetThreshold: 80
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

  return (
    <>
      <FlatList
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
          }}>
            <StatusBar hidden={true} />
            <CinemaBackgroundImage
              name={item.name}
              img={item.imageUrl}
            />
            { loading ? null : <CinemaMetaData cinema={cinema} />}
            
          </GestureRecognizer>
        }
        ListFooterComponent={
          loading ? null : 
          <ShowTimes 
            id={cinema.nid} 
            movieVersions={item.versions}
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
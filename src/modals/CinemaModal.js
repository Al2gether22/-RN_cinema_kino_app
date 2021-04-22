import React, { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CinemaBackgroundImage from "../components/cinemas/CinemaBackgroundImage"
import CinemaMetaData from "../components/cinemas/CinemaMetaData"
import ShowTimes from "../components/cinemas/ShowTimes";
import GestureRecognizer from 'react-native-swipe-gestures';
import Toast from 'react-native-toast-message';


const CinemaModal = ({ cinemaModalVisible, setCinemaModalVisible, passedCinema }) => {

  const [cinema, setCinema] = useState([]);
  const [loading, setLoading] = useState(true);
  const config = {
    velocityThreshold: 0.8,
    directionalOffsetThreshold: 150,
    gestureIsClickThreshold: 10
  };

  useEffect(() => {
    fetch(`https://www.kino.dk/appservices/cinema/${passedCinema.id}`, {
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((json) => setCinema(json))
      .catch((error) => Toast.show({
        text1: 'Noget gik galt!',
        text2: 'Prøv at lukke appen og start den igen',
        position: 'bottom',
        bottomOffset: 300,
        type: "error",
        autoHide: false,
      }))
      .finally(() => setLoading(false));
  }, [passedCinema]);


  if (loading) {
    return null
  }
   
    return (
      <GestureRecognizer      
        onSwipeDown={() => setCinemaModalVisible(!cinemaModalVisible)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: "transparent",
        }}
      >
      <Modal
        animationType="fade"
        transparent={true}
        visible={cinemaModalVisible}
        onRequestClose={() => setCinemaModalVisible(!cinemaModalVisible)}
        onDismiss={() => setCinemaModalVisible(!cinemaModalVisible)}
        presentationStyle={"overFullScreen"}
        swipeDirection="down"
        onSwipe={() => setCinemaModalVisible(!cinemaModalVisible)}
        >
          
          <>
          <FlatList
            keyboardShouldPersistTaps="always"
            style={styles.container}
            keyExtractor={(index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <StatusBar hidden={true}/>     
                <TouchableOpacity
                  style={styles.goBackContainer}
                  onPress={() => {
                    setCinemaModalVisible(!cinemaModalVisible);                    
                  }}>
                  <MaterialCommunityIcons name="arrow-left-circle" size={35} color={"white"} />
                </TouchableOpacity>

                <CinemaBackgroundImage
                  name={passedCinema.name}
                  img={passedCinema.imageUrl}
                  modal={true}
                />
                { !cinema ? null : <CinemaMetaData cinema={cinema} />}
                
              </>
            }
            ListFooterComponent={
              loading ? null : 
              <ShowTimes 
                id={cinema.nid} 
                movieVersions={cinema.versions}
              />
            }
          />
        </>
          
        
      </Modal>
      </GestureRecognizer>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#1d1d27",
    },
    goBackContainer: {
      position: "absolute", 
      zIndex: 9999,
      top: 25,
      left: 15, 
      
    },
  });

export default CinemaModal;

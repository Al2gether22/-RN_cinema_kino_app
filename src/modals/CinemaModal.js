import React, { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CinemaBackgroundImage from "../components/cinemas/CinemaBackgroundImage"
import CinemaMetaData from "../components/cinemas/CinemaMetaData"
import ShowTimes from "../components/cinemas/ShowTimes";


const CinemaModal = ({ cinemaModalVisible, setCinemaModalVisible, passedCinema }) => {

  const [cinema, setCinema] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.kino.dk/appservices/cinema/${passedCinema.id}`, {
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((json) => setCinema(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [passedCinema]);


  if (loading) {
    return null
  }
   
    return (
      
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

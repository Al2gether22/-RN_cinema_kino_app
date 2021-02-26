import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, Modal, TouchableOpacity, StatusBar } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../styles/MovieStyles";
import MovieBackgroundImage from "../components/movies/MovieBackgroundImage";
import MovieMetaData from "../components/movies/MovieMetaData";
import ShowTimes from "../components/movies/ShowTimes"


const MovieModal = ({ movieModalVisible, setMovieModalVisible, movieId, showtimes }) => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.kino.dk/appservices/movie/${movieId}`, { mode: 'no-cors', headers: { 'APIKEY': 'bGV0bWVpbgYkdWMGJXVnBiZz09'}})
      .then((response) => response.json())
      .then((json) => setMovie(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [movieId])

    if (loading) {
      return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
    }

    return (
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={movieModalVisible}
        onRequestClose={() => setMovieModalVisible(!movieModalVisible)}
        onDismiss={() => setMovieModalVisible(!movieModalVisible)}
        presentationStyle={"overFullScreen"}
        swipeDirection="down"
        onSwipe={() => setMovieModalVisible(!movieModalVisible)}
        >
          { !movie ? <ActivityIndicator /> : 
           <>
            <FlatList 
              style={styles.container}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <>
                <StatusBar hidden={true}/>     
                <TouchableOpacity
                  style={{ backgroundColor: 'transparent' }}
                  onPress={() => {
                    setMovieModalVisible(!movieModalVisible);
                  }}>
                  <MaterialCommunityIcons  
                    style={{ textAlign: "right", color: "white", marginTop: 10, marginRight: 10}}
                    name="close-circle" 
                    size={30} 
                    
                  />
                </TouchableOpacity>
                <MovieBackgroundImage 
                  movie={movie}
                />

                <MovieMetaData 
                  movie={movie}
                />
                
                </>
              } 
              ListFooterComponent={
                loading ? null : 
                showtimes ? 
                  <ShowTimes
                    id={movie.id}
                  /> : null
             }
            />
          </> 
          }
        
      </Modal>
    )
  }

export default MovieModal;

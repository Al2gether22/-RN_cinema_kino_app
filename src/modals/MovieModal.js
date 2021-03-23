import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, TouchableOpacity, StatusBar, Modal } from "react-native";
import ImageColors from "react-native-image-colors"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../styles/MovieStyles";
import MovieBackgroundImage from "../components/movies/MovieBackgroundImage";
import MovieMetaData from "../components/movies/MovieMetaData";
import ShowTimes from "../components/movies/ShowTimes"
import MovieResume from "../components/movies/MovieResume";
import MovieCast from "../components/movies/MovieCast"
import TabViewComponent from "../components/movies/TabViewComponent"
import GestureRecognizer from 'react-native-swipe-gestures';


const MovieModal = ({ movieModalVisible, setMovieModalVisible, passedMovie, showtimes }) => {

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState();
  const [backgroundColor, setBackgroundColor] = useState("#1d1d27");
  const [primaryFontColor, setPrimaryFontColor] = useState("white");
  const [secondaryFontColor, setSecondaryFontColor] = useState("white");
  const [active, setActive] = useState(0)

  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 20
  };

  // useEffect(() => {
  //   const fetchColors = async () => {
  //     const result = await ImageColors.getColors(movie.imageUrl, {
  //       fallback: '#000000',
  //       quality: 'lowest',
  //       pixelSpacing: 500,
  //     });

  //     if (result.platform === 'android') {
  //       setColors({
  //         colorOne: {value: result.average, name: 'average'},
  //         colorTwo: {value: result.dominant, name: 'dominant'},
  //         colorThree: {value: result.vibrant, name: 'vibrant'},
  //         colorFour: {value: result.darkVibrant, name: 'darkVibrant'},
  //         rawResult: JSON.stringify(result),
          
  //       });
  //       setBackgroundColor(colors.colorOne.value)
  //       setPrimaryFontColor(colors.colorThree.value)
  //       setSecondaryFontColor(colors.colorFour.value)
  //     } else {
  //       setColors({
  //         colorOne: {value: result.background, name: 'background'},
  //         colorTwo: {value: result.detail, name: 'detail'},
  //         colorThree: {value: result.primary, name: 'primary'},
  //         colorFour: {value: result.secondary, name: 'secondary'},
  //         rawResult: JSON.stringify(result),
  //       });
  //       setBackgroundColor(colors.colorOne.value)
  //       setPrimaryFontColor(colors.colorThree.value)
  //       setSecondaryFontColor(colors.colorFour.value)
  //     }
     
  //   };
    
  //   fetchColors();
  // }, []);

  useEffect(() => {
    fetch(`https://www.kino.dk/appservices/movie/${passedMovie.id ? passedMovie.id : passedMovie.movie_id}`, {
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((json) => setMovie(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [passedMovie]);


  if (loading) {
    return null
  }
   
    return (
      <GestureRecognizer      
        onSwipeDown={() => setMovieModalVisible(!movieModalVisible)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: "transparent",
        }}
      >
      <Modal
        animationType="fade"
        presentationStyle={"fullScreen"}
        visible={movieModalVisible}
      >
          
          <>  
            <FlatList 
              style={styles.container}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <>
                <StatusBar hidden={true}/>     
                <TouchableOpacity
                  style={styles.goBackContainer}
                  onPress={() => {
                    setMovieModalVisible(!movieModalVisible);
                    setActive(0)
                    
                  }}>
                  <MaterialCommunityIcons name="arrow-left-circle" size={35} color={primaryFontColor} />
                </TouchableOpacity>

                <MovieBackgroundImage 
                  movie={movie} image={passedMovie.imageUrl} danishTitle={passedMovie.title} modal={true} backgroundColor={backgroundColor} primaryFontColor={primaryFontColor} secondaryFontColor={secondaryFontColor}
                /> 
                
                <MovieMetaData 
                  movie={movie} backgroundColor={backgroundColor} primaryFontColor={primaryFontColor} secondaryFontColor={secondaryFontColor} 
                /> 
                
                </>
              } 
              ListFooterComponent={
              
                <>
                 
                   <TabViewComponent 
                     setActive={setActive}
                     active={active}
                     backgroundColor={backgroundColor ? backgroundColor : "white"}
                     primaryFontColor={primaryFontColor ? primaryFontColor : "blue"}
                     secondaryFontColor={secondaryFontColor ? secondaryFontColor : "green"}
                   />
                  
                  
                   <ShowTimes
                     id={passedMovie.id}
                     movieVersions={passedMovie.versions}
                     nextShowtime={passedMovie.next_showtime}
                     backgroundColor={backgroundColor ? backgroundColor : "white"}
                     primaryFontColor={primaryFontColor ? primaryFontColor : "blue"}
                     secondaryFontColor={secondaryFontColor ? secondaryFontColor : "green"}
                     active={ active === 0 ? "flex" : "none" }
                   />

                  { !movie ? null : 
                   <MovieResume 
                     resume={movie.body}
                     primaryFontColor={primaryFontColor ? primaryFontColor : "blue"}
                     active={active === 1 ? "flex" : "none"}
                   />}
                   { !movie ? null : 
                   <MovieCast 
                     movie={movie}
                     primaryFontColor={primaryFontColor ? primaryFontColor : "blue"}
                     secondaryFontColor={secondaryFontColor ? secondaryFontColor : "green"}
                     active={active === 2 ? "flex" : "none"}
                   />}
                    
                 </>
                
             }
           />
          </> 

      </Modal>
      </GestureRecognizer>
    )
  }

export default MovieModal;

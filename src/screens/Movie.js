import React, { useEffect, useState } from "react";
import { StatusBar, FlatList, ActivityIndicator } from "react-native"

import MovieBackgroundImage from "../components/movies/MovieBackgroundImage"
import MovieMetaData from "../components/movies/MovieMetaData"
import ShowTimes from "../components/movies/ShowTimes"
import styles from "../styles/MovieStyles";

const Movie = ({ route }) => {
  const { item } = route.params;
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(item)
  useEffect(() => {
    fetch(`https://www.kino.dk/appservices/movie/${item.id}`, {
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((json) => setMovie(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  
   
    return (
      
      // Need to render everything inside a flatlist because we cant nest flatlists inside a scroll view
      <>
        <FlatList
          style={styles.container}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <StatusBar hidden={true} />

              <MovieBackgroundImage movie={movie} image={item.imageUrl} danishTitle={item.danishTitle} genre={item.genre} />
              
              { loading ? null : <MovieMetaData movie={movie} />}
              
            </>
          }
          ListFooterComponent={
            <ShowTimes
              id={movie.nid}
              movieVersions={item.versions}
              nextShowtime={item.next_showtime}
            />
          }
        />
      </>
    );
  }


Movie.defaultProps = {
  average_rating: "0",
};

Movie.sharedElements = route => {
  const { item } = route.params;
  
  return [
    {
      id: item.imageUrl,
      animation: "move",
      resize: "clip", 
      align: "auto"
    }, 
    {
      id: item.danishTitle,
      animation: "fade",
      resize: "none", 
      align: "auto"
    }
  ];
};

export default Movie;
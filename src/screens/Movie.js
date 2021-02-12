import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { StatusBar, FlatList, ActivityIndicator } from "react-native"

import MovieBackgroundImage from "../components/movies/MovieBackgroundImage"
import MovieMetaData from "../components/movies/MovieMetaData"
import styles from "../styles/MovieStyles";

const Movie = () => {
  const route = useRoute();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.kino.dk/appservices/movie/${route.params.id}`, {
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((json) => setMovie(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

   
    return (
      // Need to render everything inside a flatlist because we cant nest flatlists inside a scroll view
      <>
        <FlatList
          style={styles.container}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <StatusBar hidden={true} />

              <MovieBackgroundImage movie={movie} />

              <MovieMetaData movie={movie} />
            </>
          }
          // ListFooterComponent={
          //   <ShowTimes
          //     id={movie.nid}
          //     movieVersions={route.params.versions}
          //     nextShowtime={route.params.next_showtime}
          //   />
          // }
        />
      </>
    );
  }


Movie.defaultProps = {
  average_rating: "0",
};

export default Movie;
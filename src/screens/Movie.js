import React, { useEffect, useState } from "react";
import { StatusBar, FlatList, Dimensions } from "react-native"
import { TabView } from 'react-native-tab-view';
import MovieBackgroundImage from "../components/movies/MovieBackgroundImage"
import MovieMetaData from "../components/movies/MovieMetaData"
import ShowTimes from "../components/movies/ShowTimes"
import MovieResume from "../components/movies/MovieResume";
import MovieCast from "../components/movies/MovieCast"
import styles from "../styles/MovieStyles";



const Movie = ({ route }) => {
  const { item } = route.params;
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialLayout = { height: 0, width: Dimensions.get('window').width };
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Spilletider' },
    { key: 'second', title: 'Resume' },
    { key: 'third', title: 'Cast' },
  ]);



  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'first':
        return <ShowTimes
          id={movie.nid}
          movieVersions={item.versions}
          nextShowtime={item.next_showtime}
          jumpTo={jumpTo}
        />;
      case 'second':
        return <MovieResume 
          resume={movie.body}
          jumpTo={jumpTo}
        />;
      case 'third':
        return <MovieCast 
          jumpTo={jumpTo}
        />;
    }
  };

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
             loading ? null : 
             <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              style={{minHeight: 500}}
              scrollEnabled={true}
            />
            // <ShowTimes
            //   id={movie.nid}
            //   movieVersions={item.versions}
            //   nextShowtime={item.next_showtime}
            // />
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
      animation: "fade",
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
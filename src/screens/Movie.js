import React, { useEffect, useState } from "react";
import { StatusBar, FlatList } from "react-native"
import ImageColors from "react-native-image-colors"
import MovieBackgroundImage from "../components/movies/MovieBackgroundImage"
import MovieMetaData from "../components/movies/MovieMetaData"
import ShowTimes from "../components/movies/ShowTimes"
import MovieResume from "../components/movies/MovieResume";
import MovieCast from "../components/movies/MovieCast"
import styles from "../styles/MovieStyles";
import TabViewComponent from "../components/movies/TabViewComponent"
import { fetchColorsFromImage } from "../helpers/fetchColorsFromImage"

const Movie = ({ route }) => {
  const { item } = route.params;
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState();
  const [colors2, setColors2] = useState();
  const [backgroundColor, setBackgroundColor] = useState("#1d1d27");
  const [primaryFontColor, setPrimaryFontColor] = useState("white");
  const [secondaryFontColor, setSecondaryFontColor] = useState("white");
  const [active, setActive] = useState(0)

  // useEffect(() => {
  //   const fetchColors = async () => {
  //     const result = await ImageColors.getColors(item.imageUrl, {
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
  // }, [movie]);
  
  useEffect(() => {
    fetch(`https://www.kino.dk/appservices/movie/${item.id}`, {
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((json) => setMovie(json))
      .then(() => setColors2(fetchColorsFromImage(item.imageUrl)))
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false)})
      
  }, []);
  
  console.log(colors2)
   
    return (
      
      // Need to render everything inside a flatlist because we cant nest flatlists inside a scroll view
      <>
        
        <FlatList
          style={[styles.container, {backgroundColor: backgroundColor}]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <StatusBar hidden={true} />

              <MovieBackgroundImage movie={movie} image={item.imageUrl} danishTitle={item.danishTitle} genre={item.genre} backgroundColor={backgroundColor} primaryFontColor={primaryFontColor} secondaryFontColor={secondaryFontColor} />
              
              { loading ? null : <MovieMetaData movie={movie} backgroundColor={backgroundColor} primaryFontColor={primaryFontColor} secondaryFontColor={secondaryFontColor} />}
              
            </>
          }
          ListFooterComponent={
             loading ? null : 
              <>
                <TabViewComponent 
                  setActive={setActive}
                  active={active}
                  backgroundColor={backgroundColor}
                  primaryFontColor={primaryFontColor}
                  secondaryFontColor={secondaryFontColor}
                />

                <ShowTimes
                  id={movie.nid}
                  movieVersions={item.versions}
                  nextShowtime={item.next_showtime}
                  backgroundColor={backgroundColor}
                  primaryFontColor={primaryFontColor}
                  secondaryFontColor={secondaryFontColor}
                  active={ active === 0 ? "flex" : "none" }
                />

                <MovieResume 
                  resume={movie.body}
                  primaryFontColor={primaryFontColor}
                  active={active === 1 ? "flex" : "none"}
                />

                <MovieCast 
                  movie={movie}
                  primaryFontColor={primaryFontColor}
                  secondaryFontColor={secondaryFontColor}
                  active={active === 2 ? "flex" : "none"}
                />
              </>
              
             
            
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
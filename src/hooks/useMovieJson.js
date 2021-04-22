import {useState, useEffect} from 'react';
import Toast from 'react-native-toast-message';

function useMovieJson(passedMovie) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://www.kino.dk/appservices/movie/${
        passedMovie.id ? passedMovie.id : passedMovie.movie_id
      }`,
      {
        mode: 'no-cors',
      },
    )
      .then(response => response.json())
      .then(json => {
        setMovie(json);
        setIsLoading(false);
      })
      .catch(error => Toast.show({
        text1: 'Noget gik galt!',
        text2: 'Prøv at lukke appen og start den igen',
        position: 'bottom',
        bottomOffset: 300,
        type: "error",
        autoHide: false,
      }));
  }, [passedMovie]);

  return {movie, isLoading};
}

export default useMovieJson;

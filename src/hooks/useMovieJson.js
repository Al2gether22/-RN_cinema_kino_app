import {useState, useEffect} from 'react';

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
      .catch(error => console.error(error));
  }, [passedMovie]);

  return {movie, isLoading};
}

export default useMovieJson;

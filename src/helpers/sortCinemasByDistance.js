import _ from 'lodash';
import {computeDistance} from './computeDistance';

const sortCinemasByDistance = (cinemas, referenceLat, referenceLong) => {
  const cinemasWithDistance = cinemas.map(cinema => {
    return {
      ...cinema,
      distance: computeDistance(
        [cinema.geo.latitude, cinema.geo.longitude],
        [referenceLat, referenceLong],
      ),
    };
  });
  const orderedCinemas = _.orderBy(cinemasWithDistance, 'distance');
  return orderedCinemas;
};

export {sortCinemasByDistance};

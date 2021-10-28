import Geolocation from '@react-native-community/geolocation';

const getOneTimeLocation = () => {
  Geolocation.getCurrentPosition(
    position => {
      const currentLongitude = JSON.stringify(position.coords.longitude);
      const currentLatitude = JSON.stringify(position.coords.latitude);
      return {currentLatitude, currentLongitude};
    },
    error => {
      crashlytics().recordError(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 3600000,
    },
  );
};

export {getOneTimeLocation};

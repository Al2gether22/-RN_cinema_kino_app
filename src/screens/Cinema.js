import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, StatusBar} from 'react-native';
import CinemaBackgroundImage from '../components/cinemas/CinemaBackgroundImage';
import CinemaMetaData from '../components/cinemas/CinemaMetaData';
import ShowTimes from '../components/cinemas/ShowTimes';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

const Cinema = ({route}) => {
  const {item} = route.params;
  const [cinema, setCinema] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const config = {
    velocityThreshold: 0.8,
    directionalOffsetThreshold: 150,
    gestureIsClickThreshold: 10,
  };

  // fetches cinema data
  useEffect(() => {
    fetch(`https://www.kino.dk/appservices/cinema/${item.id}`, {
      mode: "no-cors"
      })
      .then((response) => response.json())
      .then((json) => setCinema(json))
      .catch((error) => crashlytics().recordError(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function trackData() {
      await analytics().logScreenView({
        screen_class: 'Biograf',
        screen_name: 'Biograf',
      })
      await analytics().logEvent("Biograf", { Title: item.name, id: item.id});
    }
    // Execute the created function directly
    trackData();
  }, []);

  return (
    <>
      <FlatList
        keyboardShouldPersistTaps="always"
        style={styles.container}
        keyExtractor={index => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <GestureRecognizer
            onSwipeDown={() => navigation.goBack()}
            config={config}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              width: '100%',
              zIndex: 999999,
            }}>
            <StatusBar hidden={true} />
            <CinemaBackgroundImage name={item.name} img={item.imageUrl} />
            {loading ? null : <CinemaMetaData cinema={cinema} />}
          </GestureRecognizer>
        }
        ListFooterComponentStyle={{marginBottom: 50}}
        ListFooterComponent={
          loading ? null : (
            <ShowTimes id={cinema.nid} movieVersions={item.versions} />
          )
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1d1d27',
  },
});

Cinema.sharedElements = route => {
  const {item} = route.params;

  //For some reason android crashes with React.children error
  //if we return an array here, hence this below
  if (Platform.OS === 'android') {
    return {
      id: item.imageUrl,
      animation: 'fade',
      resize: 'clip',
      align: 'auto',
    };
  }

  return [
    {
      id: item.name,
      animation: 'fade',
      resize: 'none',
      align: 'auto',
    },
    {
      id: item.imageUrl,
      animation: 'fade',
      resize: 'clip',
      align: 'auto',
    },
  ];
};

export default Cinema;

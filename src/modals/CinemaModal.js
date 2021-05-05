import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CinemaBackgroundImage from '../components/cinemas/CinemaBackgroundImage';
import CinemaMetaData from '../components/cinemas/CinemaMetaData';
import ShowTimes from '../components/cinemas/ShowTimes';
import Toast from 'react-native-toast-message';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

const CinemaModal = ({
  cinemaModalVisible,
  setCinemaModalVisible,
  passedCinema, //Why is there both a passedCinema and cinema variable? Confusing
}) => {
  const [cinema, setCinema] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(`https://www.kino.dk/appservices/cinema/${passedCinema.id}`, {
      mode: 'no-cors',
    })
      .then(response => response.json())
      .then(json => {
        if (isMounted) {
          setCinema(json);
        }
      })
      .catch(
        error => (
          crashlytics().recordError(error),
          Toast.show({
            text1: 'Noget gik galt!',
            text2: 'Prøv at lukke appen og start den igen',
            position: 'bottom',
            bottomOffset: 300,
            type: 'error',
            autoHide: false,
          })
        ),
      )
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => (isMounted = false);
  }, [passedCinema]);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function trackData() {
      if (!passedCinema.name) return;
      console.log('cinema modal trackData', passedCinema.name);
      await analytics().logScreenView({
        screen_class: 'Biograf',
        screen_name: 'Biograf',
      });
      await analytics().logEvent('Biograf', {
        Title: passedCinema.name,
        id: passedCinema.id,
      });
    }
    // Execute the created function directly
    trackData();
  }, [passedCinema]);

  if (loading) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={cinemaModalVisible}
      onRequestClose={() => setCinemaModalVisible(!cinemaModalVisible)}
      onDismiss={() => setCinemaModalVisible(!cinemaModalVisible)}
      presentationStyle={'overFullScreen'}
      swipeDirection="down"
      onSwipe={() => setCinemaModalVisible(!cinemaModalVisible)}>
      <>
        <FlatList
          keyboardShouldPersistTaps="always"
          style={styles.container}
          keyExtractor={index => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <StatusBar hidden={true} />
              <TouchableOpacity
                style={styles.goBackContainer}
                onPress={() => {
                  setCinemaModalVisible(!cinemaModalVisible);
                }}>
                <MaterialCommunityIcons
                  name="arrow-left-circle"
                  size={35}
                  color={'white'}
                />
              </TouchableOpacity>

              <CinemaBackgroundImage
                name={passedCinema.name}
                img={passedCinema.imageUrl}
                modal={true}
              />
              {!cinema ? null : <CinemaMetaData cinema={cinema} />}
            </>
          }
          ListFooterComponent={
            loading ? null : (
              <ShowTimes id={cinema.nid} movieVersions={cinema.versions} />
            )
          }
        />
      </>
    </Modal>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1d1d27',
  },
  goBackContainer: {
    position: 'absolute',
    zIndex: 9999,
    top: 25,
    left: 15,
  },
});

export default CinemaModal;

import React, {useRef, useState} from 'react';
import {ActivityIndicator, Modal, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import YoutubePlayer from 'react-native-youtube-iframe';
import styles from "../styles/MovieTrailerModalStyles";

const MovieTrailerModal = ({ modalVisible, setModalVisible, video_markup }) => {

  const [playing, setPlaying] = useState(true);
  const playerRef = useRef();
  const [loading, setLoading] = useState(true);

  // This is suppose to take the video_markup string and extract the youtube id
  const extractVideoIdFromYouTubeUrl = video_markup => {
    const srcWithQuotes = video_markup.match(/src\=([^\s]*)\s/)[1];
    const src = srcWithQuotes.substring(1, srcWithQuotes.length - 1);

    var stepOne = src.split('?')[0];
    var stepTwo = stepOne.split('/');
    var videoId = stepTwo[stepTwo.length - 1];

    return videoId;
  };

  console.log('modalVisible MovieTrailerModal', modalVisible);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => hideModal()}
      onDismiss={() => hideModal()}
      presentationStyle={'overFullScreen'}
      swipeDirection="down"
      onSwipe={() => hideModal()}>
      <View style={styles.MovieTrailerModalContainer}>
        <TouchableOpacity
          style={{backgroundColor: 'transparent'}}
          onPress={() => {
            hideModal();
          }}>
          <MaterialCommunityIcons
            style={{
              textAlign: 'right',
              color: 'white',
              marginTop: '10%',
              marginRight: '5%',
            }}
            name="close-circle"
            size={30}
          />
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" style={{marginTop: 200}} />
        ) : null}

        <YoutubePlayer
          webViewStyle={styles.trailer}
          webViewProps={{
            allowsInlineMediaPlayback: false,
            allowsFullscreenVideo: true,
          }}
          onReady={() => {
            setLoading(false);
          }}
          ref={playerRef}
          height={'100%'}
          width={'100%'}
          videoId={extractVideoIdFromYouTubeUrl(video_markup)}
          play={playing}
          //onError={e => console.log(e)}
          onPlaybackQualityChange={q => console.log(q)}
          volume={50}
          playbackRate={1}
          initialPlayerParams={{
            cc_lang_pref: 'da',
            showClosedCaptions: true,
            preventFullScreen: false,
          }}
        />
      </View>
    </Modal>
  );
};

export default MovieTrailerModal;

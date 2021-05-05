import React, {useState, useEffect, useContext} from 'react';
import {Modal, TouchableOpacity, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {WebView} from 'react-native-webview';
import {Context as AuthContext} from '../context/AuthContext';
import CookieManager from '@react-native-cookies/cookies';

const WebViewModal = ({modalVisible, setModalVisible, url}) => {
  const [hasSetCookies, setHasSetCookies] = useState(false);
  const {state} = useContext(AuthContext);

  useEffect(() => {
    if (!state.user) {
      setHasSetCookies(true);
      return;
    }
    const user = JSON.parse(state.user);
    console.log('Setting cookies', user);
    CookieManager.set('https://kino.dk', {
      name: user.session_name,
      value: user.session_id,
      domain: '.kino.dk',
      path: '/',
      secure: true,
      httpOnly: true,
    })
      .then(done => {
        console.log('CookieManager.set =>', setHasSetCookies(true));
        CookieManager.getAll().then(cookies => {
          console.log('CookieManager.getAll =>', cookies);
        });
      })
      .catch(err => console.error(err));
  }, [state.user]);

  if (!hasSetCookies) return null;
  console.log('webview url', url);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      onDismiss={() => setModalVisible(false)}
      presentationStyle={'overFullScreen'}
      swipeDirection="down"
      onSwipe={() => setModalVisible(false)}>
      <SafeAreaView>
        <TouchableOpacity
          style={{backgroundColor: 'transparent'}}
          onPress={() => {
            setModalVisible(false);
          }}>
          <MaterialCommunityIcons
            style={{
              textAlign: 'right',
              color: 'white',
              marginRight: 10,
            }}
            name="close-circle"
            size={30}
          />
          <MaterialCommunityIcons
            style={{
              textAlign: 'right',
              color: 'black',
              marginRight: 10,
              top: 0,
              right: 0,
              position: 'absolute',
            }}
            name="close-circle-outline"
            size={30}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <WebView
        originWhitelist={['*']}
        javaScriptEnabled={true}
        source={{
          uri: `${url}`,
        }}
        sharedCookiesEnabled={true}
      />
    </Modal>
  );
};

export default WebViewModal;

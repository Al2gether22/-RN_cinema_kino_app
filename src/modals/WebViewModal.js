import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {WebView} from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';

const WebViewModal = ({
  modalVisible,
  hideModal,
  url,
  cookieName,
  cookieValue,
}) => {
  // Check out the documentation for webview: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md
  // you can use injectedJavaScript to maybe remove some html elments?

  const [hasSetCookies, setHasSetCookies] = useState(false);

  useEffect(() => {
    CookieManager.set('https://kino.dk', {
      name: cookieName ? cookieName : '',
      value: cookieValue ? cookieValue : '',
      domain: '.kino.dk',
      path: '/',
      secure: true,
      httpOnly: true,
    }).then(done => {
      console.log('CookieManager.set =>', setHasSetCookies(true));
      CookieManager.getAll().then(cookies => {
        console.log('CookieManager.getAll =>', cookies);
      });
    });
  }, []);

  if (!hasSetCookies) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => hideModal()}
      onDismiss={() => hideModal()}
      presentationStyle={'overFullScreen'}
      swipeDirection="down"
      onSwipe={() => hideModal()}>
      <SafeAreaView>
        <TouchableOpacity
          style={{backgroundColor: 'transparent'}}
          onPress={() => {
            hideModal();
          }}>
          <MaterialCommunityIcons
            style={{
              textAlign: 'right',
              color: 'white',
              marginTop: 10,
              marginRight: 10,
            }}
            name="close-circle"
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

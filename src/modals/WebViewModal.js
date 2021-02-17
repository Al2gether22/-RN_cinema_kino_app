import React, { useState, useEffect } from "react";
import { Modal, TouchableOpacity, SafeAreaView } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import styles from "../styles/ProfileStyles";


const WebViewModal = ({ modalVisible, setModalVisible, url, cookieName, cookieValue }) => {

// Check out the documentation for webview: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md
// you can use injectedJavaScript to maybe remove some html elments?

  // The headers are not passed on with http requests inside the webview.
  // Somehow I need to set the url with useState and re-render the component once it changes
  // So each request is a "new webview" 
  // The onShouldStartLoadWithRequest method should check if the request url is the same as the current and if not, rerender the component.
  // I had to disable javascript, because cookiebot cookie popup messed up the request.url value
  // I wonder if the disabled javascript will mess some other functionality up.

  const [hasSetCookies, setHasSetCookies] = useState(false);

  useEffect(() => {
    CookieManager.set('https://kino.dk', {
      name: cookieName,
      value: cookieValue,
      domain: '.kino.dk',
      path: '/',
      secure: true,
      httpOnly: true,
    }).then((done) => {
      console.log('CookieManager.set =>', setHasSetCookies(true));
      CookieManager.getAll().then((cookies) => {
        console.log('CookieManager.getAll =>', cookies);
      });
    });
  }, []);

  if (!hasSetCookies) return null;

  return(
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      onDismiss={() => setModalVisible(false)}
      presentationStyle={"overFullScreen"}
      swipeDirection="down"
      onSwipe={() => setModalVisible(false)}
    >
      <SafeAreaView>
      <TouchableOpacity
        style={{ backgroundColor: 'transparent' }}
        onPress={() => {
          setModalVisible(false);
        }}>
        <MaterialCommunityIcons  
          style={{ textAlign: "right", color: "white", marginTop: 10, marginRight: 10}}
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
    )

}

export default WebViewModal;
import React from 'react';
import {Alert, View} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';

const FbLoginButton = () => (
  <View>
    <LoginButton
      onLoginFinished={(error, result) => {
        if (error) {
          console.log('login has error: ' + result.error);
        } else if (result.isCancelled) {
          console.log('login is cancelled.');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken.toString());
            Alert.alert(data.accessToken.toString());
            console.log(data);
          });
        }
      }}
      onLogoutFinished={() => console.log('logout.')}
    />
  </View>
);

export default FbLoginButton;

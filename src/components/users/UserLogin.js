import React, {useState, useContext, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import * as Animatable from 'react-native-animatable';
import {Context} from '../../context/AuthContext';
import {COLORS, SIZES, FONTS} from '../../constants/theme';
import WebViewModal from '../../modals/WebViewModal';

const UserLogin = ({state, animation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({email: false, password: false});
  const [url, setUrl] = useState('');
  const {signin, clearErrorMessage} = useContext(Context);

  const handleInputFocus = textinput => {
    setIsFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = textinput => {
    setIsFocused({
      [textinput]: false,
    });
  };

  return (
    <View style={styles.container}>
      <WebViewModal
        modalVisible={modalVisible}
        hideModal={() => setModalVisible(false)}
        url={url}
      />
      <Text style={styles.header}>Log ind med din Kino profil</Text>

      <Animatable.View animation={animation}>
        <Text style={styles.errorMessage}>
          {state.errorMessage ? state.errorMessage : ' '}
        </Text>
        <TextInput
          style={
            isFocused.email
              ? [styles.inputField, {borderColor: 'white'}]
              : styles.inputField
          }
          placeholder={'Email'}
          placeholderTextColor="#676d7c"
          color="#676d7c"
          paddingLeft={10}
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={true}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          onFocus={() => handleInputFocus('email')}
          onBlur={() => handleInputBlur('email')}
        />
        <TextInput
          secureTextEntry
          style={
            isFocused.password
              ? [styles.inputField, {borderColor: 'white'}]
              : styles.inputField
          }
          placeholder={'Password'}
          placeholderTextColor="#676d7c"
          color="#676d7c"
          paddingLeft={10}
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={true}
          textContentType={'password'}
          onFocus={() => handleInputFocus('password')}
          onBlur={() => handleInputBlur('password')}
        />
        <TouchableScale
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => {
            signin({username, password});
            setUsername('');
            setPassword('');

            // check if sign in successfully -> Flip anition -> if user -> flip animation
            // if not -> shake animation -> if state.errormessage -> shake animation
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableScale>
      </Animatable.View>

      <View style={styles.webViewLinksContainer}>
        <TouchableOpacity
          onPress={() => [
            setModalVisible(true),
            setUrl('https://www.kino.dk/user/password/'),
          ]}>
          <Text style={styles.webViewLinksText}>
            Kan du ikke huske din kode? Tryk her
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => [
            setModalVisible(true),
            setUrl('https://www.kino.dk/user/register'),
          ]}>
          <Text style={styles.webViewLinksText}>
            Har du ingen profil? Tryk her
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '10%',
    backgroundColor: COLORS.backgroundColor,
  },
  header: {
    textAlign: 'center',
    color: COLORS.white,
    marginTop: '5%',
    marginBottom: '15%',
    ...FONTS.h2,
  },
  errorMessage: {
    color: 'tomato',
    marginLeft: '5%',
    marginBottom: 15,
    ...FONTS.h3,
  },
  inputField: {
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
    height: 40,
    borderWidth: 0.8,
    borderColor: '#676d7c',
    borderRadius: 5,
    ...FONTS.h3,
  },
  button: {
    alignSelf: 'center',
    fontSize: 30,
    backgroundColor: '#ff321e',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.h3,
  },
  webViewLinksContainer: {
    margin: '5%',
  },
  webViewLinksText: {
    color: '#676d7c',
    marginBottom: 20,
    ...FONTS.h4,
  },
});

export default UserLogin;

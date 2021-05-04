import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Context} from '../context/AuthContext';
import UserLogin from '../components/users/UserLogin';
import Profile from '../components/users/Profile';

const User = ({navigation}) => {
  const {state, clearErrorMessage} = useContext(Context);
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    handleAnimation();
  }, [state]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      clearErrorMessage();
    });

    return unsubscribe;
  }, [navigation]);

  const handleAnimation = () => {
    state.errorMessage ? setAnimation('shake') : null;
    setTimeout(() => {
      setAnimation('');
    }, 600);
  };

  return (
    <View style={styles.container}>
      {state.user ? (
        <Profile user={state.user} />
      ) : (
        <UserLogin state={state} animation={animation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d27',
  },
});

export default User;

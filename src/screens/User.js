import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Context } from "../context/AuthContext";

import UserLogin from "../components/users/UserLogin";
import Profile from "../components/users/Profile";

const User = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [loading, setLoading] = useState(true);
  const { state } = useContext(Context);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((value) => {
        setUser(value)
        setLoading(false)
        value ? setIsLoggedIn(true) : setIsLoggedIn(false)
      })
  }, [state])

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <View style={styles.container}>
      { 
         user === null ? 
          <UserLogin setIsLoggedIn={setIsLoggedIn} /> :  
          <Profile user={user} setIsLoggedIn={setIsLoggedIn} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d27",
  }, 

})

export default User;
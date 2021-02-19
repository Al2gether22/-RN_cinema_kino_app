import React, { useContext } from "react";
import { View, StyleSheet } from "react-native"
import { Context } from "../context/AuthContext";

import UserLogin from "../components/users/UserLogin";
import Profile from "../components/users/Profile";

const User = () => {
  
  const { state } = useContext(Context);
  console.log(`user - ${state.user}`)
  return (
    <View style={styles.container}>
      { 
        state.user === null ? 
        <UserLogin /> :  
        <Profile user={state.user} />
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
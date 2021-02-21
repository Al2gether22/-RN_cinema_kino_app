import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native"
import { Context } from "../context/AuthContext"

import UserLogin from "../components/users/UserLogin";
import Profile from "../components/users/Profile";

const User = () => {
  const { state } = useContext(Context)

  useEffect(() => {
    
  }, [state])
  
  return (
    <View style={styles.container}>
      { 
        state.user ? <Profile user={state.user} /> : <UserLogin />  
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
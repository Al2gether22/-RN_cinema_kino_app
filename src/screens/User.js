import React from "react";
import { View, StyleSheet } from "react-native"
import getUser from "../helpers/getUser";
import UserLogin from "../components/users/UserLogin";
import Profile from "../components/users/Profile";

const User = () => {

  const user = getUser();
  
  return (
    <View style={styles.container}>
      { 
        user ? <Profile user={user} /> : <UserLogin />  
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
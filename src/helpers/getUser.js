import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const getUser = () => {

  const [user, setUser] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userObject = await AsyncStorage.getItem('user')

        if(userObject !== null) {
  
          setUser(userObject)
          
        } else {
          setUser("")
        }
      } catch(e) {
        // error reading value
      }
    }
    
    fetchUser();
  })

  return user 
  
}

export default getUser;
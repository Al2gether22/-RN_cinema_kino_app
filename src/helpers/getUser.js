import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUser = () => {

  const [user, setUser] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetches the user from async storage
        const userObject = await AsyncStorage.getItem('user')

        // if it returns a user object
        if(userObject !== null) {
          // If a user object is returned we need to check if the tokens are valid
          console.log("user object is not null")
          // Async storage always returns string, so we need to convert it to an object
          const userObject = JSON.parse(userObject)

          const url = "https://www.kino.dk/appservices/account";
          fetch(url, {
            method: "GET",
            mode: "no-cors",
            credentials: "omit",
      
            headers: {
              cookie: `${userObject.session_name}=${userObject.session_id}`,
            },
          })
          .then((response) => response.json())
          .then((json) => {
            if (json === "false" ) {
              // delete user and and update state
              console.log("invalid token, deleting user")
            } else {
              // If response returns data then user is valid and logged in
              // remember to update state so user can be fetched from auth context
              console.log("token is valid, update state with user")
              setUser(userObject)
            }
            
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));

        // If async storage do not return an user object
        } else {
          console.log("user is not logged in")
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
import React, { useState, useEffect } from "react"
import { View, ActivityIndicator } from "react-native";

import styles from "../../styles/ProfileStyles"

const PurchaseHistory = ({ user }) => {

  const [loading, setLoading] = useState(true);
  const [userHistoryData, setUserHistoryData] = useState({});
  const userObject = JSON.parse(user)
 
  useEffect(() => {
    const url = "https://www.kino.dk/appservices/order-history"

    fetch(url, {
      method: "GET",
      mode: "no-cors",
      credentials: "omit", 
      
      headers: {
        // cookie needs to be session name + session id
        cookie: `${userObject.session_name}=${userObject.session_id}`
        //cookie: "SSESS9c4afcd7a5d130f037e96ac45cb1accc=6oFH0DhGYnGVxN5fpv3mo-Bt-HaARsQDLrIFTbNReAU"
        //cookie: "ESI_SSESS9c4afcd7a5d130f037e96ac45cb1accc=143473"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setUserHistoryData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  console.log(userHistoryData)

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  if (!userHistoryData) {
    return null
  }

  return (
    <View style={styles.container}>
      
    </View>
  )
}

export default PurchaseHistory;
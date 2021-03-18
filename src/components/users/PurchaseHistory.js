import React, { useState, useEffect } from "react"
import { View, ActivityIndicator, FlatList, Image, Text } from "react-native";

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

 
  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  if (!userHistoryData) {
    return(
      <Text>Ingen Købshistorik tilgængelig</Text>
    )
  }
  
  const Item = (item) => {
    
    return (

      <View style={styles.itemContainer}>
        <View style={styles.posterImgContainer}>
          <Image
            style={styles.posterImg}
            source={{
            uri: item.imageUrl,
            }}
          />
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.metaData}>{item.cinema}</Text>
          <Text style={styles.metaData}>{item.date}</Text>
          <Text style={styles.metaData}>{item.showtime}</Text>
          <Text style={styles.metaData}>{item.room_name} - {item.seats}</Text>
          <Text style={styles.metaData}>{item.tickets} billetter - {item.price} kr</Text>
        </View>
      </View>
     
    );
  }

  return (
    <View style={styles.purchaseHistoryContainer}>
      <Text style={styles.purchaseHistoryHeadline}>Købshistorik</Text>
      <FlatList 
        data={userHistoryData}
        renderItem={({ item }) => Item(item)}
        keyExtractor={(item) => `${item.id}${item.date}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default PurchaseHistory;
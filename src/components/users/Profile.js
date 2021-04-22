import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/AuthContext";
import { ActivityIndicator, FlatList } from "react-native";
import Toast from 'react-native-toast-message';

import UserMetaData from "../users/UserMetaData"
import PurchaseHistory from "./PurchaseHistory"


const Profile = ({ user }) => {
  const { signout } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const userObject = JSON.parse(user);

  useEffect(() => {
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
          signout
        } else {
          setUserData(json);
        }
        
      })
      .catch(error => Toast.show({
        text1: 'Noget gik galt!',
        text2: 'Prøv at lukke appen og start den igen',
        position: 'bottom',
        bottomOffset: 300,
        type: "error",
        autoHide: false,
      }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <FlatList 
      
      ListHeaderComponent={<UserMetaData userData={userData} signout={signout} userObject={userObject} />}
      ListFooterComponent={<PurchaseHistory user={user} />}
    />
  );
};

export default Profile;


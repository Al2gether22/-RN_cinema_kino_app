import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/AuthContext";
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "../../styles/ProfileStyles";

import WebViewModal from "../../modals/WebViewModal"
import PurchaseHistory from "./PurchaseHistory"


const Profile = ({ user, setIsLoggedIn }) => {
  const { signout } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState("");
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
        setUserData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <View style={styles.container}>
      <WebViewModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
        url={url}
        cookieName={userObject.session_name}
        cookieValue={userObject.session_id}
      />
      <View style={styles.userDataContainer}>
        <Image
          style={styles.profilePic}
          source={{ uri: userData.image }}
        ></Image>
        <View style={styles.userData}>
          {userData.displayname ? (
            <Text style={styles.userDataText}>{userData.displayname}</Text>
          ) : (
            <Text style={styles.userDataText}>{userData.firstname}</Text>
          )}
          <Text style={styles.userDataText}>{userData.mail}</Text>
          <Text style={styles.userDataText}>{userData.phone}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => [
            setModalVisible(true),
            setUrl(`https://www.kino.dk/user/${userData.uid}`),
          ]}
        >
          <Text style={styles.buttonText}>Rediger Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            signout();
            setIsLoggedIn(false);
          }}
        >
          <Text style={styles.buttonText}>Log ud</Text>
        </TouchableOpacity>
      </View>
      <PurchaseHistory user={user} />
    </View>
  );
};

export default Profile;

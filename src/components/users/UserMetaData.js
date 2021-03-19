import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native"
import styles from "../../styles/ProfileStyles";
import WebViewModal from "../../modals/WebViewModal"

const UserMetaData = ({ userData, userObject, signout }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState("");

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
            
          }}
        >
          <Text style={styles.buttonText}>Log ud</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default UserMetaData
import React from 'react';
import {Text, View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';
import analytics from '@react-native-firebase/analytics';

const UserInfoModal = ({modalVisible, setModalVisible, requestPermissions}) => {
  function runAfterDismiss() {
    setModalVisible(false);
    requestPermissions();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => runAfterDismiss()}
      onDismiss={() => runAfterDismiss()}
      swipeDirection="down"
      onSwipe={() => runAfterDismiss()}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTextContainer}>
            <Text style={styles.headerText}>Velkommen!</Text>
            <Text style={styles.bodyText}>
              Tak fordi du downloadede vores nye app.
            </Text>
            <Text style={styles.bodyText}>
              Vi vil rigtig gerne give dig den bedst mulige oplevelse og præsentere de mest relevante biografer for dig. Derfor vil vi om lidt spørge dig, om vi må bruge din telefons GPS. Det anbefaler vi, at du siger ja til, så vi kan vise de biografer, der er tættest på dig, først i en rangering.
            </Text>
            <Text style={styles.bodyText}>
              Din lokation og GPS-koordinater bliver ikke gemt, men bruges blot i realtid, så vi kan sortere biografern
            </Text>
            <Text style={styles.bodyText}>
              God fornøjelse med den nye kino.dk-app.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              runAfterDismiss();
              analytics().logScreenView({
                screen_class: 'UserInfoModal',
                screen_name: 'UserInfoModal',
              });
            }}>
            <View style={styles.modalOkButtonContainer}>
              <Text style={styles.modalOkButton}>OK</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    maxWidth: '80%',
    borderRadius: 15,
    justifyContent: 'space-around',
  },
  modalTextContainer: {
    padding: 15,
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 25,
    ...FONTS.h1,
  },
  bodyText: {
    fontFamily: 'SourceSansPro-Bold',
    color: 'black',
    lineHeight: 20,
    fontSize: 15,
    marginBottom: 10
  },
  modalOkButtonContainer: {
    padding: 10,
    backgroundColor: 'tomato',
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  modalOkButton: {
    fontFamily: 'SourceSansPro-Bold',
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default UserInfoModal;

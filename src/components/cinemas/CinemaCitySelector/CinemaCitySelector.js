import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import styles from '../../../styles/MovieStyles';
import CheckBox from '@react-native-community/checkbox';
import {COLORS, FONTS} from '../../../constants/theme';

export default function CinemaCitySelector({
  cinemaCityNames,
  setCinemaCityNames,
  visible,
  setIsSelectCitiesVisible,
}) {
  const [isAllDeselected, setIsAllDeselected] = useState(
    cinemaCityNames.filter(city => !city.selected).length ===
      cinemaCityNames.length,
  );
  const [isAllSelected, setIsAllSelected] = useState(
    cinemaCityNames.filter(city => city.selected).length ===
      cinemaCityNames.length,
  );

  function setToggleCheckBox(cinemaCity) {
    const index = cinemaCityNames.findIndex(c => c.name === cinemaCity.name);
    const newState = [...cinemaCityNames];
    newState[index].selected = !newState[index].selected;
    setCinemaCityNames(newState);
  }

  function toggleAllCities(value) {
    const newState = cinemaCityNames.map(cinemaCity => ({
      ...cinemaCity,
      selected: value,
    }));
    setCinemaCityNames(newState);
  }

  useEffect(() => {
    setIsAllSelected(
      cinemaCityNames.filter(city => city.selected).length ===
        cinemaCityNames.length,
    );
    setIsAllDeselected(
      cinemaCityNames.filter(city => !city.selected).length ===
        cinemaCityNames.length,
    );
  }, [cinemaCityNames]);

  const renderItem = ({item: cinemaCity}) => (
    <View
      style={{
        backgroundColor: COLORS.backgroundColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 25,
      }}>
      <CheckBox
        boxType="square"
        animationDuration={0.2}
        value={cinemaCity.selected}
        onValueChange={() => setToggleCheckBox(cinemaCity)}
      />
      {/* <TouchableWithoutFeedback
        onPress={() => setToggleCheckBox(cinemaCity)}
        key={cinemaCity.name}> */}
      <Text style={{color: 'white', fontSize: 20, marginLeft: 10}}>
        {cinemaCity.name}
      </Text>
      {/* </TouchableWithoutFeedback> */}
    </View>
  );

  return (
    <Modal
      onRequestClose={() => setIsSelectCitiesVisible(false)}
      animationType="none"
      presentationStyle={'fullScreen'}
      hardwareAccelerated
      visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: COLORS.backgroundColor,
          paddingTop: 50,
          paddingBottom: 50,
        }}>
        <TouchableOpacity
          style={styles.goBackContainer}
          onPress={() => {
            setIsSelectCitiesVisible(false);
          }}>
          <MaterialCommunityIcons
            name="arrow-left-circle"
            size={35}
            color="white"
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            {/* <TouchableWithoutFeedback onPress={() => toggleAllCities(true)}> */}
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                marginRight: 10,
              }}>
              Vælg alle
            </Text>
            {/* </TouchableWithoutFeedback> */}
            <CheckBox
              boxType="square"
              animationDuration={0.2}
              value={isAllSelected}
              onPress={() => toggleAllCities(true)}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            {/* <TouchableWithoutFeedback onPress={() => toggleAllCities(false)}> */}
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                marginRight: 10,
                marginLeft: 10,
              }}>
              Fjern alle
            </Text>
            {/* </TouchableWithoutFeedback> */}
            <CheckBox
              boxType="square"
              animationDuration={0.2}
              value={isAllDeselected}
              onPress={() => toggleAllCities(false)}
            />
          </View>
        </View>
        <FlatList
          data={cinemaCityNames}
          renderItem={renderItem}
          keyExtractor={cinemaCity => cinemaCity.name}
        />
      </View>
    </Modal>
  );
}

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
    marginBottom: 10,
    ...FONTS.h3,
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
    textAlign: 'center',
    ...FONTS.h3,
  },
});

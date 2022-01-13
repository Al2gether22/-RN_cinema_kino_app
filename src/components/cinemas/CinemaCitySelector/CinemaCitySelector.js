import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
  StyleSheet,
  Modal,
} from 'react-native';
// import styles from '../../../styles/MovieStyles';
import CheckBox from '@react-native-community/checkbox';
import {COLORS, FONTS} from '../../../constants/theme';

export default function CinemaCitySelector({
  cinemaCityNames,
  setCinemaCityNames,
  visible,
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
    <TouchableWithoutFeedback
      onPress={() => setToggleCheckBox(cinemaCity)}
      key={cinemaCity.name}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <CheckBox
          boxType="square"
          animationDuration={0.2}
          value={cinemaCity.selected}
          disabled //To avoid double value changing from touchablewithoutfeedback
        />
        <Text style={{color: 'white', fontSize: 20, marginLeft: 10}}>
          {cinemaCity.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <Modal
      onRequestClose={() => hideMovieModal()}
      animationType="fade"
      presentationStyle={'fullScreen'}
      visible={visible}>
      <StatusBar hidden />
      <View style={styles.modalContainer}>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => toggleAllCities(true)}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'white', fontSize: 20, marginLeft: 10}}>
                Vælg alle
              </Text>
              <CheckBox
                boxType="square"
                animationDuration={0.2}
                value={isAllSelected}
                disabled //To avoid double value changing from touchablewithoutfeedback
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => toggleAllCities(false)}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'white', fontSize: 20, marginLeft: 10}}>
                Fjern alle
              </Text>
              <CheckBox
                boxType="square"
                animationDuration={0.2}
                value={isAllDeselected}
                disabled //To avoid double value changing from touchablewithoutfeedback
              />
            </View>
          </TouchableWithoutFeedback>
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

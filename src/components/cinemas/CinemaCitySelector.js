import React from 'react';
import {View, Text, TouchableWithoutFeedback, FlatList} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function CinemaCitySelector({
  cinemaCityNames,
  setCinemaCityNames,
}) {
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
    <>
      <View style={{flexDirection: 'row'}}>
        <TouchableWithoutFeedback onPress={() => toggleAllCities(true)}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', fontSize: 20, marginLeft: 10}}>
              Vælg alle
            </Text>
            <CheckBox
              boxType="square"
              animationDuration={0.2}
              value={false}
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
              value={false}
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
    </>
  );
}

import React, { useState,useContext} from 'react';
import { View, Text,StyleSheet, TextInput, Image,TouchableOpacity } from 'react-native'
import AppContext from './AppContext'
const TestScreen = () => {
  const { data, setData } = useContext(AppContext);
  useEffect(() => {
    fetch(shareVarible.URLink + '/tables/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.log(error));
  }, []);
  return (
    <AppContext.Provider value={{ data, setData }}>
      
    </AppContext.Provider>
  );
};

export default TestScreen
const styles = StyleSheet.create({
  
});
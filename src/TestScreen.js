import React from 'react';
import {StyleSheet } from 'react-native'
import AppContext from './AppContext'
const TestScreen = () => {
  
  return (
    <AppContext.Provider value={{ data, setData }}>
      
    </AppContext.Provider>
  );
};

export default TestScreen
const styles = StyleSheet.create({
  
});
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
const CustomAlert = ({ isVisible, message, onConfirm }) => {
    return (
      <Modal isVisible={isVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>{message}</Text>
            <TouchableOpacity onPress={onConfirm}>
              <Text style={{ color: 'blue', marginTop: 10 }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
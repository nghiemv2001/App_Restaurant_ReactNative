import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export const EphemeralDialog = ({ isVisible, message, onClose }) => {
  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        onClose();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);
  return (
    <Modal transparent={true} visible={isVisible} animationType='fade'>
      <View style={styles.styViewEphemera}>
        <View style={styles.styViewEphemerachild}>
          <Text style={styles.styTextEphemera}>{message}</Text>
        </View>
      </View>
    </Modal>
  )
}


export const SuccessDialog = ({ isVisible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType='fade'
    >
      <View style={styles.styViewDialog}>
        <View style={styles.styViewDialogchid}>
          <View style={styles.styViewDialogchidofchid}>
            <Ionicons name='close' size={60} color={"#FFFCFF"} />
          </View>
          <TouchableOpacity
            onPress={() => { onClose(false) }}
            style={styles.touchcontinue}>
            <Text style={styles.textContinue}>{message}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

};

export const ErrorDialog = ({ isVisible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType='fade'
    >
      <View style={styles.styViewDialog}>
        <View style={styles.styViewDialogchid}>
          <View style={styles.styViewDialogchidofchid}>
            <Ionicons name='close' size={40} color={"#FFFCFF"} />
          </View>
          <Text style={{fontSize: 16, fontWeight:'500', textAlign:'center'}}>{message}</Text>
          <TouchableOpacity
            onPress={() => { onClose(false) }}
            style={styles.touchcontinue}>
            <Text style={styles.textContinue}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  styViewEphemera:{ justifyContent: 'center', alignItems: 'center', flex: 1 },
  styViewEphemerachild:{ height: 90, width: 300, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 0.3 },
  styTextEphemera:{ color: 'black', fontSize: 18, fontWeight: '700' },
  styViewDialog: {flex: 1,justifyContent: 'center',alignItems: 'center',marginTop: 22},
  styViewDialogchid: {height: 300,width: 300,backgroundColor: "white",borderRadius: 40,justifyContent: 'space-evenly',alignItems: 'center' },
  styViewDialogchidofchid: {height: 60, width: 60, backgroundColor: '#84202A', borderRadius: 70, marginTop: 20, justifyContent: 'center', alignItems: 'center'},
  touchcontinue: {height: 40, width: 140, backgroundColor: '#84202A', justifyContent: 'center', alignItems: 'center', borderRadius: 20},
  textContinue: { fontSize: 22, fontWeight: "700", color: '#FFFCFF' },
})
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
            <Ionicons name='notifications-outline' size={70} color={"black"} /> 
          </View> 
          <Text style={styles.styTextSuccess}>{message}</Text>
          <TouchableOpacity
            onPress={() => { onClose(false) }}
            style={styles.touchcontinue}>
            <Text style={styles.textContinue}>Tiếp tục</Text>
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
          <View style={styles.styViewDialogchidofchidErr}>
            <Ionicons name='close' size={40} color={"white"} />
          </View>
          <Text style={{fontSize: 16, fontWeight:'500', textAlign:'center'}}>{message}</Text>
          <TouchableOpacity
            onPress={() => { onClose(false) }}
            style={styles.touchcontinueErr}>
            <Text style={styles.textContinueErr}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
};

// export const alertDialog = ({ isVisible, message, onClose }) => {
//   return (
//     <Modal
//     transparent={true}
//     visible={showModel1}
//     animationType='fade'
//   >
//     <View style={styles.centeredView}>
//       <View style={{
//         height: 350,
//         width: 300,
//         backgroundColor: "white",
//         borderRadius: 40,
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//       }}>

//         <View style={{ height: 90, width: 90, backgroundColor: '#F6D3B3', borderRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
//           <Ionicons name='alert' size={60} color={"#FFFCFF"} />
//         </View>
//         <TouchableOpacity
//           onPress={() => {
//             setShowModal1(false)
//             setShowModalMove(true)
//           }}
//           style={{ height: 40, width: 140, backgroundColor: '#3085D6', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
//           <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Chuyển bàn</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             setShowModal1(false)
//             setShowModal2(true)
//           }}
//           style={{ height: 40, width: 140, backgroundColor: '#3085D6', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
//           <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Nhập bàn</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => { setShowModal1(false) }}
//           style={{ height: 40, width: 140, backgroundColor: '#D03737', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
//           <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Hủy</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </Modal>

//   )
// };

const styles = StyleSheet.create({
  styViewEphemera:{ justifyContent: 'center', alignItems: 'center', flex: 1 },
  styViewEphemerachild:{ height: 90, width: 300, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 0.3 },
  styTextEphemera:{ color: 'black', fontSize: 18, fontWeight: '700' },
  styTextSuccess:{ color: 'black', fontSize: 18, fontWeight: '700', textAlign:'center' },
  styViewDialog: {flex: 1,justifyContent: 'center',alignItems: 'center',marginTop: 22},
  styViewDialogchid: {height: 300,width: 300,backgroundColor: "white",borderRadius: 40,justifyContent: 'space-evenly',alignItems: 'center' },
  styViewDialogchidofchid: {height: 80, width: 80, backgroundColor: '#27A644', borderRadius: 70, marginTop: 20, justifyContent: 'center', alignItems: 'center'},
  styViewDialogchidofchidErr: {height: 80, width: 80, backgroundColor: '#701A19', borderRadius: 70, marginTop: 20, justifyContent: 'center', alignItems: 'center'},
  touchcontinue: {height: 40, width: 140, backgroundColor: '#27A644', justifyContent: 'center', alignItems: 'center', borderRadius: 20},
  textContinue: { fontSize: 22, fontWeight: "700", color: 'black' },
  touchcontinueErr: {height: 40, width: 140, backgroundColor: '#701A19', justifyContent: 'center', alignItems: 'center', borderRadius: 20},
  textContinueErr: { fontSize: 22, fontWeight: "700", color: 'white' },
})
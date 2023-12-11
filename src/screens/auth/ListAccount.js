import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import ModalDropdown from 'react-native-modal-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux';
const ListAccount = ({navigation}) => {
  const [fitem, setFItem] = useState(1)
  const [modalAjust, setModalAdjust] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [alertSuccess, setAlertSuccess] = useState(false)
  const [idUser, setIdUser] = useState(null)
  const users = useSelector(state => state.userReducer.users)
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch({ type: "GET_USER" });
    }, [])
  )
  const DeteleUser = () => {
    fetch(shareVarible.URLink + '/user/delete/' + `${idUser}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setAlertSuccess(true)
        dispatch({ type: 'GET_USER' });
      })
      .catch(error => {
        console.error('Lỗi xóa đối tượng:', error);
      }
      )
  }

  const editUser = () =>{
    fetch(shareVarible.URLink + '/user/update-role/' + `${fitem._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: fitem.role }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log('Lỗi:', data.error);
        }
        else{
          setModalAdjust(false)
          dispatch({ type: 'GET_USER' });
        }
      }).catch(error => {
        console.error('Lỗi:', error);
      });
  }
  const renderlist = ((item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalAdjust(true)
          setFItem(item)
        }}
        style={{borderWidth:1, borderColor: 'black', borderRadius:15, paddingHorizontal:10,marginTop: 5, marginHorizontal: 10}}>
        {
          item.role === '0' ? null : <View style={{ marginBottom: 3, backgroundColor: '#EDF6D8', paddingVertical: 5, paddingRight: 20, paddingLeft: 5, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ height: 70, width: 70, borderRadius: 50, }}
              source={{ uri: item.image }} />
            <View style={{ flexDirection: 'column', paddingLeft: 5, width: '75%' }}>
              <Text style={{ fontSize: 18, }}>Tên : {item.name}</Text>

              {item.role == 1 ? (
                <Text style={{ fontSize: 18 }}>Vai trò: Phục vụ</Text>
              ) : item.role == 2 ? (
                <Text style={{ fontSize: 18 }}>Vai trò: Bếp</Text>
              ) : (
                <Text style={{ fontSize: 18 }}>Vai trò: Không xác định</Text>
              )}
            </View>
            <View style={{ justifyContent: 'center', paddingLeft: 30 }}>
            </View>
            <TouchableOpacity
              style={{ left: -25 }}
              onPress={() => {
                setIdUser(item._id)
                setConfirmDelete(true)
              }}>
              <Ionicons name='remove-circle-sharp' size={35} color={"#940000"} />
            </TouchableOpacity>
          </View>
        }
      </TouchableOpacity>
    )
  })
  return (
    <View style={{ backgroundColor: '#EDF6D8', paddingTop: 40, alignItems:'center' }}>
      
      <Modal
        transparent={true}
        visible={confirmDelete}
        animationType='fade'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 300,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            justifyContent:'space-evenly',
            alignItems: 'center',
          }}>

            <View style={{height: 90, width: 90, backgroundColor: '#F6D3B3', borderRadius: 70, justifyContent: 'center', alignItems:'center'}}>
              <Ionicons  name='alert' size={60} color={"#FFFCFF"}/>
            </View>
            <Text style={{fontSize:22, fontWeight: "700", color:'black'}}>
             XÓA 
            </Text>
            <TouchableOpacity 
        onPress={() => {
          setConfirmDelete(false)
          DeteleUser()}}
            style={{height: 40, width: 140, backgroundColor:'#3085D6', justifyContent:'center', alignItems:'center', borderRadius: 20}}>
              <Text style={{fontSize:22, fontWeight: "700", color:'#FFFCFF'}}>Chấp nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity 
               onPress={() => { setConfirmDelete(false) }}
            style={{height: 40, width: 140, backgroundColor:'#D03737', justifyContent:'center', alignItems:'center', borderRadius: 20}}>
              <Text style={{fontSize:22, fontWeight: "700", color:'#FFFCFF'}}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalAjust}
        animationType='slide'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 270,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            borderWidth: 1,
            alignItems: 'center'
          }}>
            <TouchableOpacity
              style={{ left: 120, top: 20 }}
              onPress={() => { setModalAdjust(false) }}>
              <Ionicons name='close' size={35} />
            </TouchableOpacity>
            <View>
              <View style={{ flexDirection: 'column', justifyContent: 'space-between', top: 10 }}>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>Thông tin tài khoản</Text>
                <Text style={{ fontSize: 18 }}>Email : {fitem.email}</Text>
                <Text style={{ fontSize: 18 }}>Số điện thoại : {fitem.phone}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', top:20, justifyContent:'center' }}>
                  <Text style={{ fontSize: 20 }}>Vai trò : </Text>
                  <ModalDropdown
                    dropdownTextStyle={{ fontSize: 22, borderWidth: 1, width: 100, padding: 5 }}
                    defaultTextStyle={{ width: 100, padding: 5 }}
                    textStyle={{ fontSize: 22 }}
                    style={{ width: 100, borderRadius: 20, padding: 5 }}
                    defaultValue={
                      fitem.role === "1" ? 'Phục vụ' :
                        fitem.role === "2" ? 'Đầu bếp' :
                          'Giá trị không xác định'
                    }
                    onSelect={(index, value) => {
                      setFItem({ ...fitem, role: index+1 })
                    }}
                    options={["Phục vụ", "Nhà bếp"]} />
                </View>
              </View>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ top: 30, right: 10, height: 40, width: 100, backgroundColor: '#37B207', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
              onPress={() => { editUser() }}
              >
                <Text>Chấp nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ top: 30, height: 40, width: 100, backgroundColor: '#940000', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
              onPress={() => { setModalAdjust(false) }}
              >
                <Text>Hủy</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={alertSuccess}
        animationType='fade'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 300,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>

            <View style={{ height: 100, width: 100, backgroundColor: '#2D60D6', borderRadius: 70, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='checkmark-done-circle-outline' size={60} color={"#FFFCFF"} />
            </View>
            <Text style={{ fontSize: 22, fontWeight: "700", color: '#3564C1' }}>
              Thành công
            </Text>
            <TouchableOpacity
              onPress={() => { setAlertSuccess(false) }}
              style={{ height: 40, width: 140, backgroundColor: '#3564C1', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
     
      <Text style={{fontSize:25, fontWeight: '600'}}>Danh Sách Tài Khoản</Text>
      <View >
        <FlatList
          data={users}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          keyExtractor={item => item._id}
        />
      </View>
    </View>
  )
}

export default ListAccount
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  styButton: {
    height: 45, width: 100,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
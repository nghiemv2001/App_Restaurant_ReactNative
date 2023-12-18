import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import mainpicture from '../../../assets/xinchao.png'
import shareVarible from './../../AppContext'
import { LogBox } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { takeImage, pickImage } from '../../component/Cloudinary';
import { ErrorDialog, ConfirmDialog } from '../../component/CustomerAlert'
import { DeteleAPI,editAPI } from '../../component/callAPI'
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const EditTable = ({ navigation, route }) => {
  const [message, setMesage] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)
  const handleAlret = () =>{
    setIsVisible(false)
    setIsVisibleConfirm(false)
  }
  const getDetails = (type) => {
    if (route.params.item) {
      switch (type) {
        case "id":
          return route.params.item._id
        case "name":
          return route.params.item.name
        case "peoples":
          return route.params.item.peoples
        case "status":
          return route.params.item.status
        case "image":
          return route.params.item.image
      }
    }
    return ""
  }
  const [fdata, setFdata] = useState({
    id: getDetails("id"),
    name: getDetails("name"),
    peoples: getDetails("peoples"),
    status: getDetails("status"),
    image: getDetails("image")
  })
  const SendtoBackend = async () => {
    if (fdata.name == "") {
      setMesage('Tên bàn không được bỏ trống');
      setIsVisible(true)
      return;
    }
    if ((/^(?=.*[A-Z]).*$/).test(fdata.peoples)) {
      setMesage('Vui lòng nhập số !!!');
      setIsVisible(true)
      return;
    }
    if ((/^(?=.*[a-z]).*$/).test(fdata.peoples)) {
      setMesage('Vui lòng nhập số !!!');
      setIsVisible(true)
      return;
    }
    if (fdata.peoples == "") {
      setMesage('Không được bỏ trống');
      setIsVisible(true)
      return;
    }
    if (fdata.image == '') {
      setMesage('Chưa tải ảnh xong!!!')
      setIsVisible(true)
      return;
    }
    const updates = {
      name: fdata.name,
      peoples: fdata.peoples,
      status: fdata.status,
      image: fdata.image
    };
    editAPI({ URLink:shareVarible.URLink + '/table/update/' + `${fdata.id}`, updates: updates })
      .then(data => {
        navigation.navigate('HomeAdmin');
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật người dùng:', error);
      });
  }
  const deleteTable = () => {
    DeteleAPI({ URLink: shareVarible.URLink + '/table/delete/' + `${fdata.id}`}).then(data => {
      navigation.navigate("HomeAdmin")
    })
  }
  const handlePickImage = async () => {
    try {
      const imageUrl =await pickImage();
      setFdata({ ...fdata, image: imageUrl })
    } catch (error) {
      console.error('Lỗi tải ảnh: ', error);
    }
  };
  const handleTakeImage = async () => {
    try {
      const imageUrl =await takeImage();
      setFdata({ ...fdata, image: imageUrl })
    } catch (error) {
      console.error('Lỗi tải ảnh: ', error);
    }
  };
  return (
    <View
      style={styles.View1}>
        <ErrorDialog
        isVisible={isVisible}
        message={message}
        onClose={handleAlret}/>
        <ConfirmDialog
        isVisible={isVisibleConfirm}
        message={"XÓA"}
        onClose={handleAlret}
        funtionHandle={deleteTable}/>
      <View style={styles.styViewBoss}>
        <TouchableOpacity
          style={{ marginLeft: 10, marginTop: 30 }}
          onPress={() => navigation.navigate('HomeAdmin')}>
          <Ionicons name='arrow-undo-circle-outline' size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 10, marginTop: 30 }}
          onPress={() => setIsVisibleConfirm(true)}>
          <Ionicons name='close' size={35} />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.stylepicturemain}
        source={mainpicture} />
      <KeyboardAwareScrollView >
        <View style={{flexDirection: 'row',}}>
          <View
            style={{
              flexDirection: 'column',
              marginRight: 10}}>
            <Text style={styles.Tname}>Tên bàn</Text>
            <Text style={styles.Tpeoples}>Số chỗ ngồi</Text>
          </View>
          <View style={{flexDirection: 'column',marginTop: 10,}}>
            <TextInput
              value={fdata.name}
              style={styles.TIPname}
              onChangeText={(text) => setFdata({ ...fdata, name: text })}
              placeholder='Enter number name of table'>
            </TextInput>
            <TextInput
              value={`${fdata.peoples}`}
              style={styles.TIPpeoples}
              keyboardType='number-pad'
              onChangeText={(text) => setFdata({ ...fdata, peoples: text })}
              placeholder='Enter people number'>
            </TextInput>
          </View>
        </View>
        <Image style={styles.PTtable}
          source={{ uri: fdata.image }}></Image>
        <View style={styles.styGroupButtonView}>
          <Text
            style={styles.Tcamera}
            onPress={handleTakeImage}>
            Chụp ảnh
          </Text>
          <Text
            style={styles.TLibary}
            onPress={handlePickImage}>
            Thư viện
          </Text>
        </View>
        <Text
          style={styles.TAdd}
          onPress={SendtoBackend}
        >Chỉnh sửa</Text>
      </KeyboardAwareScrollView>
    </View>
  )
}
export default EditTable
const styles = StyleSheet.create({
  stylepicturemain: {
    height: 150,
    width: 150,
    borderWidth: 10,
    marginTop: -60,
    marginLeft: 130
  },
  View1: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#EDF6D8',
    marginTop: 10,
  },
  Tname: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#50663C',
    marginLeft: 5,
    marginBottom: 20
  },
  Tpeoples: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#50663C',
    marginLeft: 5,
    marginBottom: 20
  },
  Tstatus: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#50663C',
    marginLeft: 5
  },
  TIPname: {
    height: 40,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -10,
    marginBottom: 20,
    paddingLeft: 5,
    borderWidth: 1,
  },
  TIPpeoples: {
    height: 40,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -10,
    marginBottom: 20,
    paddingLeft: 5,
    borderWidth: 1,
  },
  TIPstatus: {

  },
  PTtable: {
    height: 220,
    width: '70%',
    borderRadius: 50,
    marginTop: 40,
    marginLeft: 65,
    borderWidth: 1,
    borderColor: 'black'
  },
  Tcamera: {
    height: 40,
    width: 100,
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    fontWeight: '500',
    color: '#50663C',
  },
  TLibary: {
    height: 40,
    width: 100,
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    fontWeight: '500',
    color: '#50663C',
  },
  TAdd: {
    height: 50,
    width: 200,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'white',
    marginLeft: 110,
    color: '#50663C',
    fontSize: 30,
    fontWeight: 'bold',
    borderRadius: 50,
    marginTop: 25,
    borderWidth: 1,
  },
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
  },
  styViewBoss:{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingHorizontal: 15 },
  styGroupButtonView:{
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 10
  }
})
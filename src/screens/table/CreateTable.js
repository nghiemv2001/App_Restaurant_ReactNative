import { View, Text, StyleSheet, TextInput, Image,TouchableOpacity } from 'react-native'
import React, { useState} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import mainpicture from '../../../assets/xinchao.png'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { takeImage,pickImage} from '../../component/Cloudinary';
import { ErrorDialog } from '../../component/CustomerAlert'
const CreateTable = ({ navigation}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMesage] = useState("")
  const handleAlret = () =>{
    setIsVisible(false)
  }
  const [fdata, setFdata] = useState({
    name: "",
    peoples: "",
    status: "0",
    image: ""
  })
  const [imagesrc, setImage] = useState(null);
  const SendtoBackend = () => {
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
    fetch(shareVarible.URLink + '/table/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fdata)
      }).then(res => res.json()).then(
        data => {
          if (data.error) {
            console.log(data.error);
          }
          else {
            navigation.navigate("HomeAdmin")
          }
        }
      )
  }
  const handlePickImage = async () => {
    try {
      const imageUrl =await pickImage();
      setFdata({ ...fdata, image: imageUrl })
      setImage(imageUrl)
    } catch (error) {
      console.error('Lỗi tải ảnh: ', error);
    }
  };
  const handleTakeImage = async () => {
    try {
      const imageUrl =await takeImage();
      setFdata({ ...fdata, image: imageUrl })
      setImage(imageUrl)
    } catch (error) {
      console.error('Lỗi tải ảnh: ', error);
    }
  };
  return (
    <View
      style={styles.View1}>
         <TouchableOpacity
        style={{ marginLeft: 10, marginTop: 20}}
        onPress={() => navigation.navigate('HomeAdmin')}
      >
        <Ionicons name='arrow-undo-circle-outline' size={35} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 30, justifyContent:'center', alignItems:'center' }}>
          <Image
            style={styles.stylepicturemain}
            source={mainpicture} />
      </View>
      <KeyboardAwareScrollView >
        <ErrorDialog
        isVisible={isVisible}
        message={message}
        onClose={handleAlret}/>
        <View
          style={{
            flexDirection: 'row',
            justifyContent:'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              marginRight: 10
            }}>
            <Text
              style={styles.Tname}
            >Tên bàn ăn</Text>
            <Text
              style={styles.Tpeoples}
            >Số chỗ ngồi</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginTop: 10,
            }}>
            <TextInput
              style={styles.TIPname}
              onChangeText={(text) => setFdata({ ...fdata, name: text })}
              placeholder='Nhập tên bàn'>
            </TextInput>
            <TextInput
              value={fdata.peoples}
              style={styles.TIPpeoples}
              keyboardType='number-pad'
              onChangeText={(text) => setFdata({ ...fdata, peoples: text })}
              placeholder='Nhập số chỗ ngồi'>
            </TextInput>
          </View>
        </View>
        {
          (imagesrc == null) ? 
          <View>
            <Ionicons style= {{position:'absolute', marginTop: 80, marginLeft: 170, zIndex:1}}name="images" size={35}/>
          <Image style={styles.PTtable}
            source={{ uri: imagesrc }}></Image>
          </View>
          :
             <Image style={styles.PTtable}
            source={{ uri: imagesrc }}></Image>
        }
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            width: '100%',
            justifyContent: 'space-evenly',
            marginTop: 10
          }}>
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
        >Tạo Bàn</Text>
      </KeyboardAwareScrollView>
    </View>
  )
}
export default CreateTable

const styles = StyleSheet.create({
  stylepicturemain: {
    height: 200,
    width: 200,
    borderWidth: 10,
    marginTop: -90,
  },
  View1: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#EDF6D8',
    marginTop: 10,
  },
  Tname: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#50663C',
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 10
  },
  Tpeoples: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#50663C',
    marginLeft: 5,
    marginTop: 30
  },
  Tstatus: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#50663C',
    marginLeft: 5,
    marginTop: 35
  },
  TIPname: {
    height: 50,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -10,
    marginBottom: 30,
    paddingLeft: 5,
    borderWidth: 1,
  },
  TIPpeoples: {
    height: 50,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -10,
    marginBottom: 20,
    paddingLeft: 5,
    borderWidth: 1,
  },
  PTtable: {
    height: 170,
    width: '50%',
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 90,
    borderWidth: 2,
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
    marginTop: 70,
    borderWidth: 1,
  },
})
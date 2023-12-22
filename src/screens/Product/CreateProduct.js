import { View,Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { AutoComplete } from 'react-native-element-textinput';
import iconImage from '../../../assets/iconimage2.png'
import iconCamera from '../../../assets/iccamera.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from './../../AppContext'
import { pickImage, takeImage } from '../../component/Cloudinary';
import {createAPI } from '../../component/callAPI'
import { ErrorDialog } from '../../component/CustomerAlert';
const CreateProduct = ({navigation, route}) => {
  const [isVisibleErr, setIsVisibleErr] = useState(false)
  const [message, setMesage] = useState("")
  const handleAlret = () => {
    setIsVisibleErr(false)
  }
  const [valuename, setValueName] = useState([]);
  const [valueprice, setValuePrice] = useState([]);
  const [image, setImage] = useState(null);
  const [fdata, setFdata] = useState({
    name: '',
    image: '',
    status : '0',
    price: '',
    category : route.params.idCategory
  })
  const handlePickImage = async () => {
    try {
      const imageUrl = await pickImage();
      setFdata({ ...fdata, image: imageUrl })
      setImage(imageUrl)
    } catch (error) {
      console.error('Lỗi tải ảnh: ', error);
    }
  };

  const handleTakeImage = async () => {
    try {
      const imageUrl = await takeImage();
      setFdata({ ...fdata, image: imageUrl })
      setImage(imageUrl)
    } catch (error) {
      console.error('Lỗi tải ảnh: ', error);
    }
  };
  
  const SendtoBackend=()=>{
    if (fdata.name == '' || fdata.price == '' ||fdata.image == '') {
      setMesage('Thiếu thông tin!!!');
      setIsVisibleErr(true)
      return;
    }
    createAPI({ URLink: shareVarible.URLink + '/product/create', fdata: fdata })
        .then(data => {
          navigation.navigate('HomeAdmin');
        })
        .catch(error => {
          console.error('Lỗi tạo nguyên liệu:', error);
        });
  }
  return (
    <View style={styles.viewmain}>
      <ErrorDialog
      isVisible={isVisibleErr}
      message={message}
      onClose={handleAlret}/>
      <View style={styles.containertop}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeAdmin')}>
          <Ionicons name='arrow-undo-circle-sharp' size={35} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <AutoComplete
          value={valuename}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Tên món ăn"
          placeholder="Tên của món ăn..."
          placeholderTextColor="gray"
          onChangeText={e => {
            setValueName(e);
            setFdata({ ...fdata, name: e })
          }}
        />
      </View>
      <View style={styles.containerprice}>
        <AutoComplete
          value={valueprice}
          keyboardType='number-pad'
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Giá"
          placeholder="Giá món ăn..."
          placeholderTextColor="gray"
          onChangeText={e => {
            setValuePrice(e);
            setFdata({ ...fdata, price: e })
          }}
        />
      </View>
      {image == null ? <View style={[styles.uploadimge, { justifyContent: 'center', alignItems: 'center' }]}><Ionicons name="camera-outline" size={50} />
          </View> : image && <Image source={{ uri: image }} style={styles.uploadimge}/>}
      <View style={styles.styview}>
        <TouchableOpacity onPress={handleTakeImage}>
          <Image source={iconCamera} style={styles.iconimage}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePickImage}>
          <Image source={iconImage} style={styles.iconimage} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity >
        <View style={styles.styButton}  >
          <Ionicons name='md-checkmark-sharp' size={31}
           onPress={SendtoBackend}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CreateProduct
const styles = StyleSheet.create({
  viewmain: {
    flex: 1,
    backgroundColor: "#EDF6D8",
    paddingTop: 10
  },
  container: {
    padding: 16,
    marginTop: 0
  },
  containerprice: {
    padding: 16,
    marginTop: -20
  },
  input: {
    height: 55,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputStyle: { fontSize: 16 },
  labelStyle: { fontSize: 14 },
  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },
  uploadimge: {
    position: 'absolute',
    height: 220,
    width: 220,
    borderRadius:220,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 95,
    backgroundColor: 'white',
    marginTop: 270
  },
  iconimage: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: 'black',
    zIndex: 1,
    borderRadius: 10
  },
  containertop: {
    height: 50,
    marginTop: 30,
    width: '100%',
    backgroundColor: '#EDF6D8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  styview:{
    height: "8%",
    width: '100%',
    marginTop: 275,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  styButton:{
    flexDirection: 'row',
    marginTop: 90,
    borderWidth: 3,
    borderRadius: 30,
    width: '55%',
    backgroundColor: '#fff',
    height: 55,
    marginLeft : 94,
    backgroundColor : '#6AF597',
    justifyContent : 'center',
    alignItems : 'center'
  }
})
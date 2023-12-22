import { View,Image, StyleSheet, TouchableOpacity} from 'react-native'
import { useState } from 'react'
import { AutoComplete } from 'react-native-element-textinput';
import iconImage from '../../../assets/iconimage2.png'
import iconCamera from '../../../assets/iccamera.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from './../../AppContext'
import { pickImage, takeImage } from '../../component/Cloudinary';
import CheckBox from 'react-native-check-box'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const EditProduct = ({ navigation, route }) => {
  const [valuename, setValueName] = useState([]);
  const [valueprice, setValuePrice] = useState([]);
  const [image, setImage] = useState(null);
  const [errormgs, setErrormgs] = useState(null)
  const [checkBox, setCheckBox] = useState(true)
  //get data from route
  const getDetails = (type) => {
    if (route.params.itemProduct) {
      switch (type) {
        case "id":
          return route.params.itemProduct._id
        case "name":
          return route.params.itemProduct.name
        case "status":
          return route.params.itemProduct.status
        case "category":
          return route.params.itemProduct.category
        case "price":
          return route.params.itemProduct.price
        case "image":
          return route.params.itemProduct.image
      }
    }
    return ""
  }

  const [fdata, setFdata] = useState({
    id: getDetails("id"),
    name: getDetails("name"),
    status: getDetails("status"),
    category: getDetails("category"),
    price: getDetails("price"),
    image: getDetails("image"),
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
  //sentobackend
  const SendtoBackend = () => {
    if (fdata.name == '' || fdata.price == '') {
      setErrormgs('All filed are required!!!!');
      return;
    }
    if (fdata.image == '') {
      setErrormgs('Image not foud!!!')
      return;
    }
    const updates = {
      name: fdata.name,
      price: fdata.price,
      status: fdata.status,
      image: fdata.image,
      category: fdata.category
    };
    editAPI({ URLink: shareVarible.URLink + '/product/update/' + `${fdata.id}`, updates: updates })
      .then(data => {
        navigation.navigate('HomeAdmin');
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật nguyên liệu trong bếp :', error);
      });
  }
  return (

    <KeyboardAwareScrollView
      contentContainerStyle={styles.viewmain}
    >
      <View style={styles.containertop}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeAdmin')}>
          <Ionicons name='arrow-undo-circle-sharp' size={35} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <AutoComplete
          value={fdata.name}
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
          value={fdata.price}
          keyboardType='number-pad'
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Giá món"
          placeholder="Giá món ăn..."
          placeholderTextColor="gray"
          onChangeText={e => {
            setValuePrice(e);
            setFdata({ ...fdata, price: e })
          }}
        />
      </View>
      <CheckBox
        style={{ flex: 1, paddingHorizontal: 15, paddingLeft: 260 }}
        onClick={() => {
          setCheckBox(!checkBox)
          if (checkBox) {
            setFdata({ ...fdata, status: 1 })
          }
          else {
            setFdata({ ...fdata, status: 0 })
          }
        }}
        isChecked={checkBox}
        leftText={"Hết hàng"}
      />
      {
        fdata.image == "" ? <View style={[styles.uploadimge, { justifyContent: 'center', alignItems: 'center' }]}><Ionicons name="camera-outline" size={50} />
        </View> : <Image source={{ uri: fdata.image }} style={styles.uploadimge} />
      }
      <View style={styles.styview}>
        <TouchableOpacity onPress={handleTakeImage}>
          <Image source={iconCamera} style={styles.iconimage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePickImage}>
          <Image source={iconImage} style={styles.iconimage} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.styButton}>
        <Ionicons name='md-checkmark-sharp' size={31}
          onPress={SendtoBackend} />
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  )
}

export default EditProduct
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
    borderRadius: 220,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 95,
    backgroundColor: 'white',
    marginTop: 320
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
  styview: {
    top: 550,
    height: "8%",
    width: '100%',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute'
  },
  styButton: {
    top: 650,
    borderWidth: 3,
    borderRadius: 30,
    width: '55%',
    backgroundColor: '#fff',
    height: 55,
    marginLeft: 94,
    backgroundColor: '#6AF597',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  }
})
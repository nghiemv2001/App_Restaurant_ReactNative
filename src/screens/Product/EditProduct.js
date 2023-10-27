import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useState, useEffect } from 'react'
import { AutoComplete } from 'react-native-element-textinput';
import iconImage from '../../../assets/iconimage2.png'
import iconCamera from '../../../assets/iccamera.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from './../../AppContext'
import * as ImagePicker from 'expo-image-picker';
import CheckBox from 'react-native-check-box'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const EditProduct = ({ navigation, route }) => {
  const [valuename, setValueName] = useState([]);
  const [valueprice, setValuePrice] = useState([]);
  const [image, setImage] = useState(null);
  const [errormgs, setErrormgs] = useState(null)
  const [dataapi, SetDataApi] = useState(null)
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
  //set fdata
  const [fdata, setFdata] = useState({
    id: getDetails("id"),
    name: getDetails("name"),
    status: getDetails("status"),
    category: getDetails("category"),
    price: getDetails("price"),
    image: getDetails("image"),
  })
  // take list category 
  const fetchData = () => {
    fetch(shareVarible.URLink + '/category/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => SetDataApi(data),
      )
      .catch(error => console.log(error));
  };
  useEffect(() => {
    fetchData();
    if (fdata.status) {
      setCheckBox(true)
    }
    else {
      setCheckBox(false)
    }
  }, []);
  //upload image from drive to cloudinary 
  const handleUpload = (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'restaurant')
    data.append("cloud_name", "dmsgfvp0y")
    fetch("https://api.cloudinary.com/v1_1/dmsgfvp0y/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        setImage(data.secure_url)
        setFdata({ ...fdata, image: data.secure_url })
      }).catch(err => {
        console.log(err)
      })
  }
  //take image from camera
  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      let newfile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`
      }
      handleUpload(newfile)
      setImage(result.assets[0].uri);
    }
    else {
      setImage(null);
    }
  };

  //take image from libary
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      let newfile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`
      }
      handleUpload(newfile)
      setImage(result.assets[0].uri);
    }
    else {
      setImage(null);
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

    fetch(shareVarible.URLink + '/product/update/' + `${fdata.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    }).then(res => res.json()).then(
      data => {
        if (data.error) {
          setErrormgs(data.error);
          console.log(data.error)
        }
        else {
          navigation.navigate('HomeAdmin');
        }
      }
    )
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
          label="Name"
          placeholder="name of food..."
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
          label="Price"
          placeholder="price of food..."
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
        leftText={"Sold out"}
      />
      {
        fdata.image == "" ? <View style={[styles.uploadimge, { justifyContent: 'center', alignItems: 'center' }]}><Ionicons name="camera-outline" size={50} />
        </View> : <Image source={{ uri: fdata.image }} style={styles.uploadimge} />
      }
      <View style={styles.styview}>
        <TouchableOpacity onPress={takeImage}>
          <Image source={iconCamera} style={styles.iconimage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          <Image source={iconImage} style={styles.iconimage} />
        </TouchableOpacity>
      </View>
      {
        errormgs ? <Text style={styles.styError}>
          {errormgs}</Text> : null
      }
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
  containerdropdown: {
    marginTop: 80,
    height: 40,
    width: "70%",
    backgroundColor: 'white',
    borderRadius: 50,
    marginLeft: 20,
    paddingLeft: 10
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
    top : 550,
    height: "8%",
    width: '100%',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute'
  },
  styError: {
    position: 'absolute',
    marginTop: 590,
    marginLeft: 130,
    color: 'red'
  },
  styButton: {
    top : 650,
    borderWidth: 3,
    borderRadius: 30,
    width: '55%',
    backgroundColor: '#fff',
    height: 55,
    marginLeft: 94,
    backgroundColor: '#6AF597',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute'
  }
})
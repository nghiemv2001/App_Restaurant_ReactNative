import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native'
import Reac, { useState, useEffect } from 'react'
import { AutoComplete } from 'react-native-element-textinput';
import iconImage from '../../../assets/iconimage2.png'
import iconCamera from '../../../assets/iccamera.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from './../../AppContext'
import * as ImagePicker from 'expo-image-picker';
const CreateProduct = ({navigation, route}) => {
  const [valuename, setValueName] = useState([]);
  const [valueprice, setValuePrice] = useState([]);
  const [dataapi, SetDataApi] = useState([]);
  const [image, setImage] = useState(null);
  const [errormgs, setErrormgs] = useState(null)
  const [fdata, setFdata] = useState({
    name: '',
    image: '',
    status : '0',
    price: '',
    category : route.params.idCategory
  })
  //set dropdown
  const dropdown = [
    { label: 'Còn trống', value: '0' },
    { label: 'Đã đặt', value: '1' },
  ];
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
  }, []);

  //take image from libary and image
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
        Alert.alert("An Error Occured While Uploading")
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
  //////////////////////////////////
  //call ipa 
  const SendtoBackend=()=>{
    if (fdata.name == '' || fdata.price == '' ||fdata.image == '') {
      setErrormgs('Thiếu thông tin!!!');
      return;
    }
    fetch(shareVarible.URLink + '/product/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fdata)
      }).then(res => res.json()).then(
        data => {
         
          if (data.error) {
            setErrormgs(data.error);
          }
          else {
            navigation.navigate('HomeAdmin');
          }
        }
      )
  }
  ///
  return (
    <View style={styles.viewmain}>
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

      {
          image == null ? <View style={[styles.uploadimge, { justifyContent: 'center', alignItems: 'center' }]}><Ionicons name="camera-outline" size={50} />
          </View> : image && <Image source={{ uri: image }} style={styles.uploadimge} />
        }
      <View style={styles.styview}>
        <TouchableOpacity onPress={takeImage}>
          <Image source={iconCamera} style={styles.iconimage}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          <Image source={iconImage} style={styles.iconimage} />
        </TouchableOpacity>
      </View>
      {
          errormgs ? <Text style={styles.styError}>
            {errormgs}</Text> : null
        }

      <TouchableOpacity >
        <View
          style={styles.styButton}
          
        >
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
  styview:{
    height: "8%",
    width: '100%',
    marginTop: 275,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  styError:{
    position: 'absolute',
    marginTop: 590,
    marginLeft: 130,
    color: 'red'
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
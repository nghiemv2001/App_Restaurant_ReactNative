import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native'
import Reac, { useState, useEffect } from 'react'
import mainpicture from '../../../assets/mainpicture.png'
import { AutoComplete } from 'react-native-element-textinput';
import uploadimge from '../../../assets/2.png'
import iconImage from '../../../assets/iconimage2.png'
import iconImageupload from '../../../assets/iconimage.png'
import iconCamera from '../../../assets/iccamera.png'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import shareVarible from './../../AppContext'
import * as ImagePicker from 'expo-image-picker';
const CreateProduct = ({navigation}) => {
  const [valuename, setValueName] = useState([]);
  const [valueprice, setValuePrice] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [dataapi, SetDataApi] = useState([]);
  const [image, setImage] = useState(null);
  const [errormgs, setErrormgs] = useState(null)
  const [fdata, setFdata] = useState({
    name: '',
    image: '',
    status : '0',
    price: '',
    category : ''
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
    if(fdata.category ==''){
      setErrormgs("Warning ! Category not null?")
      return;
    }
    if (fdata.name == '' || fdata.price == '') {
      setErrormgs('All filed are required!!!!');
      return;
    }
    if (fdata.image == '') {
      setErrormgs('Image not foud!!!')
      return;
    }
     console.log(fdata)
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
            alert(data.error);
          }
          else {
            alert('Create food successfully');
            navigation.navigate('HomeAdmin');
          }
        }
      )
  }
  ///
  return (
    <View style={styles.viewmain}>
      {/* <TouchableOpacity 
          onPress={() => navigation.navigate('ListProduct')}
          style={{position : 'absolute', marginLeft : 350}}
          >
            <Ionicons name='md-list-outline' size={50} />
        </TouchableOpacity> */}
      <View style={styles.containerdropdown}>
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dataapi}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={!isFocus ? 'Select category' : '...'}
          searchPlaceholder="Search..."
          // value={fdata.status}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.name);
            setFdata({ ...fdata, category: item._id })
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={{
                marginRight : 10
              }}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )} />
      </View>
      <View style={styles.container}>
        <AutoComplete
          value={valuename}
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
          value={valueprice}
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
      <Image source={{uri: image}} style={styles.uploadimge} />
      {/* {image && <Image source={{ uri: image }} style={styles.uploadimge} />} */}
      <View style={{
        height: "8%",
        width: '100%',
        marginTop: 175,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      }}>
        <TouchableOpacity onPress={takeImage}>
          
          <Image source={iconCamera} style={styles.iconimage}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          <Image source={iconImage} style={styles.iconimage} />
        </TouchableOpacity>
      </View>
      {
          errormgs ? <Text style={{
            position: 'absolute',
            marginTop: 510,
            marginLeft: 130,
            color: 'red'
          }}>
            {errormgs}</Text> : null
        }

      <TouchableOpacity >
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
            borderWidth: 3,
            borderRadius: 30,
            width: '55%',
            backgroundColor: '#fff',
            height: 55,
            marginLeft : 94,
            backgroundColor : '#6AF597',
            justifyContent : 'center',
            alignItems : 'center'
          }}
          
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
    height: 170,
    width: 220,
    borderRadius: 50,
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
})
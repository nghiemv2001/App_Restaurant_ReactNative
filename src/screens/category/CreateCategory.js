import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  Alert,
  ImagePickerIOS,
  Card,
  FlatList
} from 'react-native'
import React, { useState, useEffect } from 'react'
import uploadimge from '../../../assets/2.png'
import uploadimge2 from '../../../assets/UpLoadImage.png'
import * as ImagePicker from 'expo-image-picker';
import shareVarible from './../../AppContext'
import { Buffer } from 'buffer'
import base64 from 'base-64';
import Ionicons from 'react-native-vector-icons/Ionicons'
const CreateCategory = ({ navigation }) => {
  const [fdata, setFdata] = useState({
    name: '',
    image: ''
  })
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [errormgs, setErrormgs] = useState(null)

  //test data 
  const fetchData = () => {
    fetch(shareVarible.URLink + '/category/ ', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setData(data),
      )
      .catch(error => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);



  //lấy dữ hiện hiển thị lên list view
  // useEffect(() => {
  //   fetch(shareVarible.URLink + '/category/', {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => setData(data),
  //     )
  //     .catch(error => console.log(error));
  // }, []);

  //design and show list category
  const renderlist = ((item) => {
    return (
      <View style={{
        flexDirection: 'row'
      }}>

        <Image style={{
          width: 80, height: 80,
          borderRadius: 50, borderColor: 'black',
          borderWidth: 1, marginBottom: 15
        }} source={{ uri: item.image }} />
        <View style={{
          marginLeft: 10
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '500'
          }}>{item.name}</Text>
          <Text>{item.describe}</Text>
        </View>

      </View>

    )
  })


  //create category
  const SendtoBackend = () => {
    if (fdata.name == '' || fdata.describe == '') {
      setErrormgs('All filed are required');
      return;
    }
    if (fdata.image == '') {
      setErrormgs('Image not foud!!!')
      return;
    }
    fetch(shareVarible.URLink + '/category/creat',
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
            alert('Create Category successfully');
            fetchData();
          }
        }
      )

  }


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
        console.log(data.secure_url)
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
  return (
    <View style={styles.v1}>
      {/* View input name , descrition , image category */}
      <View style={styles.V11}>
        <TextInput
          onPressIn={() => setErrormgs(null)}
          onChangeText={(text) => setFdata({ ...fdata, name: text })}
          style={styles.inputname}
          placeholder="Category name"
        />
        <TextInput
          onPressIn={() => setErrormgs(null)}
          onChangeText={(text) => setFdata({ ...fdata, describe: text })}
          style={styles.inputdescrition}
          placeholder="Category describe"
        />
        <Image source={{ uploadimge }} style={styles.uploadimge} />
        {image && <Image source={{ uri: image }} style={styles.uploadimge} />}
        <Text style={{
          position: 'absolute',
          marginTop: 240,
          marginLeft: 220,
          backgroundColor: 'black',
          color: 'white',
          height: 35,
          width: 90,
          borderRadius: 10,
          textAlign: 'center',
          fontSize: 15,
          fontWeight: '900',
          paddingTop: 10
        }}
          onPress={takeImage}
        >
          Camera
        </Text>
        <Text style={{
          position: 'absolute',
          marginTop: 240,
          marginLeft: 320,
          backgroundColor: 'black',
          color: 'white',
          height: 35,
          width: 90,
          borderRadius: 10,
          textAlign: 'center',
          fontSize: 15,
          fontWeight: '900',
          paddingTop: 10
        }}
          onPress={pickImage}
        >
          Libary
        </Text>

        {
          errormgs ? <Text style={{
            position: 'absolute',
            marginTop: 280,
            marginLeft: 150,
            color: 'red'
          }}>
            {errormgs}</Text> : null
        }


        <TouchableOpacity onPress={SendtoBackend}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 280,
              borderWidth: 1,
              borderRadius: 30,
              width: 150,
              backgroundColor: '#fff',
              height: 55,
              marginLeft: 144,
              backgroundColor: '#6AF597',
              justifyContent: 'center',
              alignItems: 'center',
              position : 'absolute'
            }}
          >
            <Ionicons name='md-checkmark-sharp' size={31}
            />
          </View>
        </TouchableOpacity>

      </View>

      {/* View List catefory food */}
      <View style={styles.V12}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          keyExtractor={item => item._id}

        />
      </View>
    </View>
  )
}

export default CreateCategory
const styles = StyleSheet.create({
  v1: {
    height: '100%',
    width: '100%',
  },
  V11: {
    height: '60%',
    width: '100%',
    backgroundColor: '#EDF6D8'
  },
  V12: {
    height: '45%',
    width: '100%',
    backgroundColor: 'white'
  },
  inputname: {
    position: 'absolute',
    height: 40,
    width: 190,
    backgroundColor: 'white',
    marginTop: 80,
    marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10
  },
  inputdescrition: {
    position: 'absolute',
    height: 100,
    width: 190,
    backgroundColor: 'white',
    marginTop: 140,
    marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingBottom: 50
  },
  uploadimge: {
    position: 'absolute',
    height: 160,
    width: 160,
    borderRadius: 1000,
    marginTop: 40,
    marginLeft: 235,
    borderColor: 'black',
    borderWidth: 1
  }
})
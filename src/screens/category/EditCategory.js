import { View, Text,StyleSheet, TextInput, Image,TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'

const EditCategory = ({navigation, route}) => {
  const getDetails =(type)=>{
    if(route.params.item){
      switch(type){
        case "id":
          return route.params.item._id
        case "name":
          return route.params.item.name
        case "describe":
          return route.params.item.describe
        case "image":
          return route.params.item.image
      }
    }
    return ""
  }
  const [fdata, setFdata] = useState({
    id : getDetails("id"),
    name: getDetails("name"),
    image: getDetails("image"),
    describe: getDetails("describe"),
  })

  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [errormgs, setErrormgs] = useState(null)

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
///API
const EditTableBackEnd=async()=>{
  if (fdata.name == '' || fdata.describe == '') {
    setErrormgs('All filed are required!!!');
    return;
  }
  if (fdata.image == '') {
    setErrormgs('Image not foud!!!')
    return;
  }
  else{
    setErrormgs(null);
  }
  const updates =  {
    name : fdata.name,
    describe : fdata.describe,
    image : fdata.image
  };
  const response = await fetch(shareVarible.URLink + '/category/update/'+`${fdata.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  }).then(res => res.json()).then(
    data => {
      if (data.error) {
        setErrormgs(data.error);
        alert(data.error);
      }
      else {
        alert('Edit Categor successfully');
        navigation.navigate('HomeAdmin');
        // navigation.navigate('HomeAdmin');
      }
    }
  )
}
  return (
    <View>
       <View style={styles.v1}>
        
      {/* View input name , descrition , image category */}
      <View style={styles.V11}>
      <TouchableOpacity
        style={{ marginLeft: 10, marginTop: 20 }}
        onPress={() => navigation.navigate('HomeAdmin')}
      >
        <Ionicons name='arrow-back-sharp' size={35} />
      </TouchableOpacity>
        <TextInput
          value={fdata.name}
          onPressIn={() => setErrormgs(null)}
          onChangeText={(text) => setFdata({ ...fdata, name: text })}
          style={styles.inputname}
          placeholder="Category name"
        />
        <TextInput
          value={fdata.describe}
          onPressIn={() => setErrormgs(null)}
          onChangeText={(text) => setFdata({ ...fdata, describe: text })}
          style={styles.inputdescrition}
          placeholder="Category describe"
        />
        <Image source={{ uri: fdata.image }} style={styles.uploadimge} />
        {image && <Image source={{ uri: image }} style={styles.uploadimge} />}
        <Text style={{
          position: 'absolute',
          marginTop: 310,
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
          marginTop: 310,
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
            marginTop: 450,
            marginLeft: 140,
            color: 'red'
          }}>
            {errormgs}</Text> : null
        }


        <TouchableOpacity 
        onPress={EditTableBackEnd}
        >
          <View
            style={{
              flexDirection: 'row',
              marginTop: 500,
              borderWidth: 1,
              borderRadius: 100,
              width: 100,
              backgroundColor: '#fff',
              height: 100,
              marginLeft: 150,
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
      </View>

    </View>
  )
}

export default EditCategory
const styles = StyleSheet.create({
  v1: {
    height: '100%',
    width: '100%',
  },
  V11: {
    height: '100%',
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
    height: 80,
    width: 190,
    backgroundColor: 'white',
    marginTop: 80,
    marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10,
    fontWeight:'900',
    fontSize : 20
  },
  inputdescrition: {
    position: 'absolute',
    height: 150,
    width: 190,
    backgroundColor: 'white',
    marginTop: 190,
    marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingBottom: 90,
    fontWeight : '500',
    fontSize : 18
  },
  uploadimge: {
    position: 'absolute',
    height: 160,
    width: 160,
    borderRadius: 1000,
    marginTop: 80,
    marginLeft: 235,
    borderColor: 'black',
    borderWidth: 1
  }
})
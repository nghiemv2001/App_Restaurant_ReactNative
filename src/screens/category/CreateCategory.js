import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import uploadimge from '../../../assets/2.png'
import * as ImagePicker from 'expo-image-picker';
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
const CreateCategory = ({ navigation }) => {
  const [ fdata, setFdata ] = useState({
    name: "",
    describe:"",
    image: ""
  })
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [errormgs, setErrormgs] = useState(null)
  const [item, setItem] = useState(null)
  const [showModalConfirmDeleteCategory, setShowModalConfirmDeleteCategory] = useState(false)
  const [showModalConfirmAdjustCategory, setShowModalConfirmAdjustCategory] = useState(false)
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
  const EditCategory = () => {
    setFdata({ ...fdata, name: item.name , describe:item.describe})
    setImage(item.image)
    setShowModalConfirmAdjustCategory(false)
  }
  const DeteleCategory = () => {
    Alert.alert('DELETE', 'Delete this category?', [
      {
        text: 'Cancel',
      },
      {
        text: 'OK', onPress: () => fetch(shareVarible.URLink + '/category/delete/' + `${item._id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            setShowModalConfirmDeleteCategory(false)
            fetchData();
          })
          .catch(error => {
            console.error('Lỗi xóa đối tượng:', error);
          }
          )
      }
    ]);
  }
  //create category
  const SendtoBackend = () => {
    if (fdata.name === '' || fdata.describe === '') {
      setErrormgs('All fields are required!!!');
      return;
    }
    if (fdata.image === '') {
      setErrormgs('Image not found!!!');
      return;
    }
    fetch(shareVarible.URLink + '/category/creat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(fdata),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        setErrormgs(data.error);
        alert(data.error);
      } else {
        setFdata({ ...fdata, name: "" , describe:""})
        setImage(null);
        fetchData();
      }
    })
    .catch((error) => {
      console.error('Error sending data:', error);
    });
};
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
  //design and show list category
  const renderlist = ((item) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '70%', flexDirection: 'row' }}>
          <Image style={styles.styimageFlagist} source={{ uri: item.image }} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>{item.name}</Text>
            <Text>{item.describe}</Text>
          </View>
        </View>
        <View style={styles.styView1}>
          <TouchableOpacity onPress={() => {
            setShowModalConfirmAdjustCategory(true)
            setItem(item)}}>
            <Ionicons name='pencil' size={35} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setShowModalConfirmDeleteCategory(true)
            setItem(item)
          }}>
            <Ionicons name='remove-circle-sharp' size={35} />
          </TouchableOpacity>
        </View>
      </View>
    )
  })
  return (
    <View style={styles.v1}>
       <Modal
        transparent={true}
        visible={showModalConfirmDeleteCategory}
        animationType='fade'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 70,
            width: 300,
            backgroundColor: "#FDD736",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Ionicons name='help' size={70} color="white" style={{ marginTop: 3, position: 'absolute' }} />
            <Ionicons name='cloudy-outline' size={30} color="white" style={{ marginRight: 140 }} />
            <Ionicons name='cloudy-outline' size={30} color="white" style={{ marginLeft: 140 }} />
          </View>
          <View style={{
            height: 150,
            width: 300,
            backgroundColor: "white",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 22, fontWeight: '900', marginTop: -10 }}>Delete Table</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', height:'40%', alignItems:'flex-end'}}>
              <TouchableOpacity 
              onPress={()=> {setShowModalConfirmDeleteCategory(false)}}
              style={[styles.styButton,{ backgroundColor:'#D85261'}]}>
                <Text style={{fontSize:18 , fontWeight:'600'}}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=>{DeteleCategory()}}
              style={[styles.styButton, {backgroundColor:'#038857'}]}>
                <Text style={{fontSize:18 , fontWeight:'600'}}>OK</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={showModalConfirmAdjustCategory}
        animationType='fade'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 70,
            width: 300,
            backgroundColor: "#FDD736",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Ionicons name='help' size={70} color="white" style={{ marginTop: 3, position: 'absolute' }} />
            <Ionicons name='cloudy-outline' size={30} color="white" style={{ marginRight: 140 }} />
            <Ionicons name='cloudy-outline' size={30} color="white" style={{ marginLeft: 140 }} />
          </View>
          <View style={{
            height: 150,
            width: 300,
            backgroundColor: "white",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 22, fontWeight: '900', marginTop: -10 }}>Adjust Category</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', height:'40%', alignItems:'flex-end'}}>
              <TouchableOpacity 
              onPress={()=> {setShowModalConfirmAdjustCategory(false)}}
              style={[styles.styButton,{ backgroundColor:'#D85261'}]}>
                <Text style={{fontSize:18 , fontWeight:'600'}}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=>{EditCategory()}}
              style={[styles.styButton, {backgroundColor:'#038857'}]}>
                <Text style={{fontSize:18 , fontWeight:'600'}}>OK</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.V11}>
        <TextInput
          onPressIn={() => setErrormgs(null)}
          onChangeText={(text) => setFdata({ ...fdata, name: text })}
          style={styles.inputname}
          value={fdata.name}
          placeholder="Category name"
        />
        <TextInput
          onPressIn={() => setErrormgs(null)}
          value={fdata.describe}
          onChangeText={(text) => setFdata({ ...fdata, describe: text })}
          style={styles.inputdescrition}
          placeholder="Category describe"
        />
        {
          image == null ?<View style={[styles.uploadimge, {justifyContent:'center', alignItems:'center'}]}><Ionicons name="camera-outline" size={50}/></View> :image && <Image source={{ uri: image }} style={styles.uploadimge} />
        }
        {/* <Image source={{ uploadimge }} style={styles.uploadimge} />
        {} */}
        <View style={styles.styView2}>
       <Text style={styles.styTextImage}
          onPress={takeImage}>Camera</Text>
        <Text style={styles.styTextImageLibary}
          onPress={pickImage}>Libary</Text>
        </View>
          <View style={{ marginTop: 40}}>
        <TouchableOpacity onPress={SendtoBackend}
          style={styles.styButtonCreate}>
          <Ionicons name='md-checkmark-sharp' size={31} />
        </TouchableOpacity>
      </View>
        {
          errormgs ? <Text style={styles.styTextError}>
            {errormgs}</Text> : null}
      </View>
      {/* View List catefory food */}
      <View style={styles.V12}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          keyExtractor={item => item._id}/>
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
    height: '42%',
    width: '100%',
    backgroundColor: 'white',
  },
  inputname: {
    height: 40,
    width: 190,
    backgroundColor: 'white',
    marginTop: 80,
    marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10
  },
  inputdescrition: {
    height: 100,
    width: 190,
    marginTop: 20,
    backgroundColor: 'white',
    marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingBottom: 50
  },
  uploadimge: {
    position: 'absolute',
    height: 170,
    width: 170,
    borderRadius: 1000,
    marginTop: 80,
    marginLeft: 210,
    borderColor: 'black',
    borderWidth: 1
  },
  styimageFlagist: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15
  },
  styView1: {
    paddingLeft: 50,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  styTextImage: {
    backgroundColor: 'black',
    color: 'white',
    height: 35,
    width: 90,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '900',
    paddingTop: 10
  },
  styTextImageLibary: {
    backgroundColor: 'black',
    color: 'white',
    height: 35,
    width: 90,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '900',
    paddingTop: 10
  },
  styTextError: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 150,
    color: 'red'
  },
  styView2:{
    flexDirection:'row', 
        width: '100%', 
        justifyContent:'space-evenly', 
        marginTop: 40, 
        marginLeft: 90, 
        paddingHorizontal: 80
  },
  styButtonCreate:{
    flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 30,
            width: 150,
            height: 55,
            marginLeft: 144,
            backgroundColor: '#6AF597',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  styButton:{
    height : 45, width: 100, 
    borderWidth: 1, 
    borderRadius: 30, 
    justifyContent:'center', 
    alignItems:'center'
  }
})
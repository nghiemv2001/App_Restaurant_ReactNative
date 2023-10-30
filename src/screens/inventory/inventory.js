import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatGrid } from 'react-native-super-grid';
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CheckBox from 'react-native-check-box';
import ModalDropdown from 'react-native-modal-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { defaultValue } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
const Inventory = ({ route, navigation }) => {
  const [isSelected, setSelection] = useState(false);
  const [modalAjust, setModalAdjust] = useState(false)
  const [modalCreate, setModalCreate] = useState(false)
  const [apiInvetory, setAPIInventory] = useState(null)
  const [showModalAlert, setShowModalAlert] = useState(false)
  const [fitem, setFitem] = useState(1)
  const [image, setImage] = useState(null);
  const [finventory, setFInventory] = useState({
    id_ingedient: route.params.item._id,
    name: "",
    quantities:"",
    entiry:"",
    image: ""
  })
  const [cinventory, setCInventory] = useState({
    id_ingedient: route.params.item._id,
    name: "",
    quantities:"",
    entiry:"",
    image: ""
  })
  const [errormgs, setErrormgs] = useState(null)
  const [qty, setQyt] = useState(1);
  const SlowQYT = () => {
    if (qty > 1) {
      setQyt(qty - 1)
    }
  }
  const IncreasQYT = () => {
    setQyt(qty + 1);

  }
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch(shareVarible.URLink + '/inventory/'+`${route.params.item._id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setAPIInventory(data),
      )
      .catch(error => console.log(error));
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
      setFInventory({ ...finventory, image: data.secure_url })
    }).catch(err => {
      console.log(err)
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
const handleDropdownSelect = (index, value) => {
  setFInventory({ ...finventory, entiry: value })
}
const createInventory = () => {
  if(finventory.name == "" || finventory.quantities == "" || finventory.entiry =="" || finventory.image ==""){
    console.log("you need wait")
  }
  else{
    fetch(shareVarible.URLink + '/inventory/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finventory),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrormgs(data.error);
          alert(data.error);
        } else {
          setFInventory({ ...finventory, name: "", quantities: "", entiry :"trai" })
          setImage(null);
          fetchData();
          setShowModalAlert(true)
        }
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  }
}
const editInventory = () =>{
  console.log("HIII")
}

  const renderItem = ((item) => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ height: 80, marginBottom: 3, paddingVertical: 5, paddingLeft: 5, flexDirection: 'row', borderWidth: 1, borderRadius: 40, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={{ height: 40, width: 40, marginLeft: 5, borderRadius: 10 }} source={{ uri: item.image }} />
            <Text style={{ marginLeft: 10, fontSize: 18 }}>{item.name} - {item.quantities} {item.entiry}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            setFitem(item)
            setQyt(item.quantities)
            setModalAdjust(true)
          }
          }>
            <Ionicons name='caret-down-outline' size={35} />
          </TouchableOpacity>
        </View>
      </View>

    )
  })
  return (
    <View>
      <Modal
            transparent={true}
            visible={showModalAlert}
            animationType='fade'
          >
            <View style={styles.centeredView}>
              <View style={{
                height: 300,
                width: 300,
                backgroundColor: "white",
                borderRadius: 40,
                justifyContent:'space-evenly',
                alignItems: 'center',
              }}>
    
                <View style={{height: 100, width: 100, backgroundColor: '#2D60D6', borderRadius: 70, marginTop: 20, justifyContent: 'center', alignItems:'center'}}>
                  <Ionicons  name='checkmark-done-circle-outline' size={60} color={"#FFFCFF"}/>
                </View>
                <Text style={{fontSize:22, fontWeight: "700", color:'#3564C1'}}>
                 Success
                </Text>
                <TouchableOpacity 
                onPress={()=>{setShowModalAlert(false)}}
                style={{height: 40, width: 140, backgroundColor:'#3564C1', justifyContent:'center', alignItems:'center', borderRadius: 20}}>
                  <Text style={{fontSize:22, fontWeight: "700", color:'#FFFCFF'}}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
      <Modal
        transparent={true}
        visible={modalCreate}
        animationType='slide'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 450,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            borderWidth: 1,
            alignItems: 'center'
          }}>
            <TouchableOpacity
              style={{ left: 120, top: 20 }}
              onPress={() => { setModalCreate(false) }}>
              <Ionicons name='close' size={35} />
            </TouchableOpacity>
            <TextInput
              onPressIn={() => setErrormgs(null)}
              onChangeText={(text) => setFInventory({ ...finventory, name: text })}
              style={[styles.inputname, { width: 240, marginRight: 20, marginTop: 20 }]}
              value={finventory.name}
              placeholder="Inventory name"
            />
            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
              <TextInput
                onPressIn={() => setErrormgs(null)}
                onChangeText={(text) => setFInventory({ ...finventory, quantities: text })}
                style={[styles.inputname, { width: 110 }]}
                value={finventory.quantities}
                keyboardType='number-pad'
                placeholder="quantities"
              />
              <ModalDropdown
                dropdownTextStyle={{ fontSize: 22, borderWidth: 1, width: 100,borderRadius: 20, padding: 5 }}
                defaultTextStyle={{borderWidth: 1, width: 100,borderRadius: 20, padding: 5}}
                textStyle={{ fontSize: 22 }}
                style={{ marginLeft: 20, marginRight: 20}}
                defaultValue='Bulb'
                onSelect={handleDropdownSelect}
                options={['Bulb', 'Fruit', 'Liter', 'Bottle', 'Box', 'Bundle', 'Crate', 'gam', 'kilogam']} />
            </View>
            {
              image == null ? <View style={[styles.uploadimge, { justifyContent: 'center', alignItems: 'center' }]}><Ionicons name="camera-outline" size={50} /></View> : image && <Image source={{ uri: image }} style={styles.uploadimge} />
            }
            <View style={styles.styView2}>
              <TouchableOpacity
               onPress={takeImage}
              >
                <Ionicons name='logo-instagram' size={35}/>
              </TouchableOpacity>
              <TouchableOpacity
               onPress={pickImage}
              >
                <Ionicons name='image-outline' size={35}/>   
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{height: 40, width: 100, backgroundColor:'green', borderRadius: 20, justifyContent:'center', alignItems:'center', marginTop: 30}}
            onPress={()=>{
              setModalCreate(false)
              createInventory()}}
            >
                <Ionicons name='checkmark' size={35}/>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalAjust}
        animationType='slide'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 180,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            borderWidth: 1,
            alignItems: 'center'
          }}>
            <TouchableOpacity
              style={{ left: 120, top: 20 }}
              onPress={() => { setModalAdjust(false) }}>
              <Ionicons name='close' size={35} />
            </TouchableOpacity>
            <TextInput
              onPressIn={() => setErrormgs(null)}
              onChangeText={(text) => setFInventory({ ...finventory, name: text })}
              style={styles.inputname}
              value={fitem.name}
              placeholder="Inventory name"
            />
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 170 }}>
                <TouchableOpacity style={{
                }} onPress={SlowQYT}>
                  <Text style={{ fontSize: 32, }}>-</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 32, }}>{qty}</Text>
                <TouchableOpacity onPress={IncreasQYT}>
                  <Text style={{ fontSize: 32, }}>+</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30 }}>
                  <ModalDropdown
                  dropdownTextStyle={{ fontSize: 22, borderWidth: 1, width: 100,borderRadius: 20, padding: 5 }}
                  defaultTextStyle={{borderWidth: 1, width: 100,borderRadius: 20, padding: 5}}
                  textStyle={{ fontSize: 22 }}
                  style={{ width: 100,borderRadius: 20, padding: 5 }}
                    defaultValue={fitem.entiry}
                    options={['Bulb', 'Fruit', 'Liter', 'Bottle', 'Box', 'Bundle', 'Crate', 'gam', 'kilogam']} />
                </View>
              </View>
              
            </View>
            <TouchableOpacity style={{height: 40, width: 100, backgroundColor:'green', borderRadius: 20, justifyContent:'center', alignItems:'center', marginTop: 10}}
            onPress={()=>{editInventory()}}
            >
                <Ionicons name='checkmark' size={35}/>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{ top: 30, left: 20 }}
          onPress={() => navigation.navigate('HomeChef')}>
          <Ionicons name='arrow-undo-circle-sharp' size={42} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: 30, right: 20 }}
          onPress={() => { setModalCreate(true) }}>
          <Ionicons name='add' size={42} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginTop: 30, height:"90%" }}
        data={apiInvetory}
        renderItem={({ item }) => {
          return renderItem(item)
        }}
        keyExtractor={item => item._id} />
    </View>
  )
}

export default Inventory
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
    borderRadius: 50,
    paddingLeft: 10,
    borderWidth: 1,
    fontSize: 22,
    fontWeight: '600'
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
    height: 170,
    width: 170,
    borderRadius: 1000,
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
  styView2: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 80
  },
  styButtonCreate: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 30,
    width: 150,
    height: 55,
    marginLeft: 144,
    backgroundColor: '#6AF597',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
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
  }
})
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import mainpicture from '../../../assets/mainpicture.png'
import setImagenull from '../../../assets/2.png'
import { Button } from 'react-native-vector-icons/Feather'
import uploadimge from '../../../assets/2.png'
import * as ImagePicker from 'expo-image-picker';
import shareVarible from './../../AppContext'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
const CreateTable = ({ navigation , route}) => {
  const [fdata, setFdata] = useState({
    name : "",
    peoples :"",
    status :"", 
    image : ""
  })
  const datadropdown = [
    { label: 'Còn trống', value: '0' },
    { label: 'Đã đặt', value: '1' },
  ];
  const [data, setData] = useState({});
  const [imagesrc, setImage] = useState(null);
  const [errormgs, setErrormgs] = useState(null)
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  //create table
  const SendtoBackend = () => {
    if (fdata.name == "") {
      setErrormgs('Name table is not null');
      return;
    }
    if ((/^(?=.*[A-Z]).*$/).test(fdata.peoples)) {
      setErrormgs('NOTE : Peoples is number !!!');
      return;
    }
    if ((/^(?=.*[a-z]).*$/).test(fdata.peoples)) {
      setErrormgs('NOTE : Peoples is number !!!');
      return;
    }
    if (fdata.peoples == "") {
      setErrormgs('Number people is not null or is  number');
      return;
    }
    if (fdata.status == "") {
      setErrormgs('Status not select');
      return;
    }
    if (fdata.image == '') {
      setErrormgs('Image not foud!!!')
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
            setErrormgs(data.error);
            alert(data.error);
          }
          else {
            alert('Create Table successfully');
            navigation.navigate('ListTable');
            console.log(data)
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
      setErrormgs(null)

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
      setErrormgs(null)
    }
    else {
      setImage(null);
    }
  };
  return (
    <View
      style={styles.View1}>
      <Image
        style={styles.stylepicturemain}
        source={mainpicture} />
      <KeyboardAwareScrollView >
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'column',
              marginRight: 10
            }}>
            <Text
              style={styles.Tname}
            >Table name</Text>
            <Text
              style={styles.Tpeoples}
            >Peoples</Text>
            <Text
              style={styles.Tstatus}
            >Status</Text>
          </View>
          {/*View for input */}
          <View
            style={{
              flexDirection: 'column',
              marginTop: 10,
            }}>
            <TextInput
              style={styles.TIPname}
              onPressIn={() => setErrormgs(null)}
              onChangeText={(text) => setFdata({ ...fdata, name: text })}
              placeholder='Enter number name of table'>
            </TextInput>
            <TextInput
              value={fdata.peoples}
              style={styles.TIPpeoples}
              keyboardType='number-pad'
              onPressIn={() => setErrormgs(null)}
              onChangeText={(text) => setFdata({ ...fdata, peoples: text })}
              placeholder='Enter people number'>
            </TextInput>
            <View style={styles.container}>
              {/* {renderLabel()} */}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={datadropdown}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select status' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setFdata({ ...fdata, status: item.value })
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? 'blue' : 'black'}
                    name="Safety"
                    size={20}
                  />
                )} />
            </View>
          </View>
        </View>
        <Image style={styles.PTtable}
          source={{ uri: imagesrc }}></Image>
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
            onPress={takeImage}>
            CAMERA
          </Text>
          <Text
            style={styles.TLibary}
            onPress={pickImage}>
            LIBARY
          </Text>
        </View>
        {
          errormgs ? <Text
            style={styles.styleerrormgs}>
            {errormgs} !!!</Text> : null
        }
        <Text
          style={styles.TAdd}
          onPress={SendtoBackend}
        >ADD</Text>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default CreateTable

const styles = StyleSheet.create({
  v1: {
    height: '100%',
    width: '100%',
  },
  V11: {
    height: '55%',
    width: '100%',
    backgroundColor: '#EDF6D8'
  },
  V12: {
    height: '45%',
    width: '100%',
    backgroundColor: 'white'
  },
  container: {
    backgroundColor: 'white',
    marginTop: -15,
    width: 250,
    height: 40,
    borderRadius: 40,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 10

  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  stylepicturemain: {
    height: 200,
    width: 200,
    borderWidth: 10,
    marginTop: -60,
    marginLeft: 100
  },
  View1: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#EDF6D8',
    marginTop: 10,
  },
  Tname: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#50663C',
    marginLeft: 5,
    marginBottom: 20
  },
  Tpeoples: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#50663C',
    marginLeft: 5,
    marginBottom: 20
  },
  Tstatus: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#50663C',
    marginLeft: 5
  },
  TIPname: {
    height: 40,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -10,
    marginBottom: 20,
    paddingLeft: 5,
    borderWidth: 1,
  },
  TIPpeoples: {
    height: 40,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -10,
    marginBottom: 20,
    paddingLeft: 5,
    borderWidth: 1,
  },
  TIPstatus: {

  },
  PTtable: {
    height: 220,
    width: '70%',
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 65,
    borderWidth: 1,
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
    marginTop: 25,
    borderWidth: 1,
  },
  styleerrormgs: {
    width: '100%',
    position: 'absolute',
    fontSize: 17,
    marginTop: 420,
    textAlign: 'center',
    color: '#CD5C5C',
    fontWeight: '400'
  }


})
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { takeImage, pickImage } from '../../component/Cloudinary';
import { editAPI } from '../../component/callAPI';
import { ErrorDialog } from '../../component/CustomerAlert';
const EditCategory = ({ navigation, route }) => {
  const [isVisibleErr, setIsVisibleErr] = useState(false)
  const [message, setMesage] = useState("")
  const handleAlret = () =>{
    setIsVisibleErr(false)
  }
  const getDetails = (type) => {
    if (route.params.item) {
      switch (type) {
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
    id: getDetails("id"),
    name: getDetails("name"),
    image: getDetails("image"),
    describe: getDetails("describe"),
  })
  const [image, setImage] = useState(null);
  const [errormgs, setErrormgs] = useState(null)

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
  const EditTableBackEnd = async () => {
    if (fdata.name == '' || fdata.describe == '') {
      setMesage('Không được bỏ trống!!!');
      setIsVisibleErr(true)
      return;
    }
    if (fdata.image == '') {
      setMesage('Ảnh chưa được tải!!!')
      setIsVisibleErr(true)
      return;
    }
    const updates = {
      name: fdata.name,
      describe: fdata.describe,
      image: fdata.image
    };
    editAPI({ URLink: shareVarible.URLink + '/category/update/' + `${fdata.id}`, updates: updates })
      .then(data => {
        /*màn hình đã không còn sử dụng nên không sử lí*/
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật loại món :', error);
      });
  }
  return (
    <View>
      <ErrorDialog
      isVisible={isVisibleErr}
      message={message}
      onClose={handleAlret}/>
      <View style={styles.v1}>
        <View style={styles.V11}>
          <TouchableOpacity
            style={{ marginLeft: 10, marginTop: 20 }}
            onPress={() => navigation.navigate('HomeAdmin')}>
            <Ionicons name='arrow-back-sharp' size={35} />
          </TouchableOpacity>
          <TextInput
            value={fdata.name}
            onPressIn={() => setErrormgs(null)}
            onChangeText={(text) => setFdata({ ...fdata, name: text })}
            style={styles.inputname}
            placeholder="Category name" />
          <TextInput
            value={fdata.describe}
            onPressIn={() => setErrormgs(null)}
            onChangeText={(text) => setFdata({ ...fdata, describe: text })}
            style={styles.inputdescrition}
            placeholder="Category describe" />
          <Image source={{ uri: fdata.image }} style={styles.uploadimge} />
          {image && <Image source={{ uri: image }} style={styles.uploadimge} />}
          <Text style={styles.styTextButton}
            onPress={handleTakeImage}>Camera</Text>
          <Text style={styles.styTextButton}
            onPress={handlePickImage}>Libary</Text>
          <TouchableOpacity onPress={EditTableBackEnd}>
            <View style={styles.styButtonEdit}>
              <Ionicons name='md-checkmark-sharp' size={31} />
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
  inputname: {
    position: 'absolute',
    height: 80,
    width: 190,
    backgroundColor: 'white',
    marginTop: 80,
    marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10,
    fontWeight: '900',
    fontSize: 20
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
    fontWeight: '500',
    fontSize: 18
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
  },
  styTextButton: {
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
  },
  styButtonEdit: {
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
    position: 'absolute'
  }
})
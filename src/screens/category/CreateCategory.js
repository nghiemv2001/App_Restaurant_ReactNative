import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList} from 'react-native'
import React, { useState, useEffect } from 'react'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux';
import { DeteleAPI } from '../../component/callAPI';
import { SuccessDialog, ErrorDialog , ConfirmDialog} from '../../component/CustomerAlert';
import { pickImage, takeImage } from '../../component/Cloudinary';
import { editAPI, createAPI} from '../../component/callAPI';
const CreateCategory = () => {
  const categorys = useSelector(state => state.categoryReducer.categorys)
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleErr, setIsVisibleErr] = useState(false)
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)
  const [isVisibleConfirmEdit, setIsVisibleConfirmEdit] = useState(false)
  const handleAlret = () => {
    setIsVisible(false)
    setIsVisibleErr(false)
    setIsVisibleConfirm(false)
    setIsVisibleConfirmEdit(false)
  }
  useEffect(() => {
    dispatch({ type: "GET_CATEGORY" })
  }, [])
  const [fdata, setFdata] = useState({
    name: "",
    describe: "",
    image: ""
  })
  const [statusButton, setStatusButton] = useState(false)
  const [image, setImage] = useState(null);
  const [message, setMesage] = useState("")
  const [item, setItem] = useState(null)
  const EditCategory = () => {
    setFdata({ ...fdata, name: item.name, describe: item.describe })
    setImage(item.image)
    setShowModalConfirmAdjustCategory(false)
  }
  const DeteleCategory = () => {
    DeteleAPI({ URLink: shareVarible.URLink + '/category/delete/' + `${item._id}` }).then(data => {
      setShowModalConfirmDeleteCategory(false)
      setIsVisible(true)
      dispatch({ type: "GET_CATEGORY" })
    })
  }
  const SendtoBackend = () => {
    if (statusButton) {
      if (fdata.name === '' || fdata.describe === '') {
        setMesage('Thiếu thông tin!!!');
        setIsVisibleErr(true)
        return;
      }
      const updates = {
        name: fdata.name,
        describe: fdata.describe,
        image: image
      };
      editAPI({ URLink: shareVarible.URLink + '/category/update/' + `${item._id}`, updates: updates })
        .then(data => {
          setFdata({ ...fdata, name: "", describe: "" })
          setImage(null);
          setIsVisible(true)
          dispatch({ type: "GET_CATEGORY" })
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật loại món :', error);
        });
      setStatusButton(false)
    }
    else {
      if (fdata.name === '' || fdata.describe === '') {
        setMesage('Thiếu thông tin!!!');
        setIsVisibleErr(true)
        return;
      }
      if (fdata.image === '') {
        setMesage('Ảnh chưa tải lên xong!!!');
        setIsVisibleErr(true)
        return;
      }
      createAPI({ URLink: shareVarible.URLink + '/category/creat', fdata: fdata })
        .then(data => {
          setFdata({ ...fdata, name: "", describe: "" })
            setImage(null);
            setIsVisible(true)
            dispatch({ type: "GET_CATEGORY" })
        })
        .catch(error => {
          console.error('Lỗi tạo loại món:', error);
        });
    }
  };
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
           setIsVisibleConfirmEdit(true)
            setItem(item)
            setStatusButton(true)
          }}>
            <Ionicons name='pencil' size={35} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setIsVisibleConfirm(true)
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
      <SuccessDialog
        isVisible={isVisible}
        message={"Thành Công"}
        onClose={handleAlret} />
      <ErrorDialog
        isVisible={isVisibleErr}
        message={message}
        onClose={handleAlret} />
        <ConfirmDialog
        isVisible={isVisibleConfirm}
        message={"XÓA"}
        onClose={handleAlret}
        funtionHandle={DeteleCategory}/>
        <ConfirmDialog
        isVisible={isVisibleConfirmEdit}
        message={"ĐIỀU CHỈNH"}
        onClose={handleAlret}
        funtionHandle={EditCategory}/>
      <View style={styles.V11}>
        <TextInput
          onChangeText={(text) => setFdata({ ...fdata, name: text })}
          style={styles.inputname}
          value={fdata.name}
          placeholder="Tên loại món"/>
        <TextInput
          value={fdata.describe}
          onChangeText={(text) => setFdata({ ...fdata, describe: text })}
          style={styles.inputdescrition}
          placeholder="Mô tả"/>
        {image == null ? <View style={[styles.uploadimge, { justifyContent: 'center', alignItems: 'center' }]}><Ionicons name="camera-outline" size={50} /></View> : image && <Image source={{ uri: image }} style={styles.uploadimge} />}
        <View style={styles.styView2}>
          <Text style={styles.styTextImage}
            onPress={handleTakeImage}>chụp ảnh</Text>
          <Text style={styles.styTextImageLibary}
            onPress={handlePickImage}>Thư viện</Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <TouchableOpacity onPress={SendtoBackend}
            style={styles.styButtonCreate}>
            <Ionicons name='md-checkmark-sharp' size={31} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.V12}>
        <FlatList
          data={categorys}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          keyExtractor={item => item._id} />
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
  styView2: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 40,
    marginLeft: 90,
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
  }
})
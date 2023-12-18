import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import imagetop from '../../../assets/login1.png'
import user_profile from '../../../assets/user_profile.png'
import imagechangeprofile from '../../../assets/changeProfile.png'
import imageLogout from '../../../assets/imagelogout.png'
import { TextInput } from 'react-native-element-textinput';
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SuccessDialog, ErrorDialog } from '../../component/CustomerAlert'
import { pickImage } from '../../component/Cloudinary'
const ChangProfile = ({ navigation, route }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleErr, setIsVisibleErr] = useState(false);
  const [date, setDate] = useState(new Date());
  const [message, setMesage] = useState("")
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const handleConfirm = () => {
    setIsVisible(false);
    navigation.navigate('Profile', { data: route.params.dataAPI });
  };
  const handleConfirmErr = () => {
    setIsVisibleErr(false)
  };
  const getDetails = (type) => {
    if (route.params.dataAPI) {
      switch (type) {
        case "id":
          return route.params.dataAPI._id
        case "email":
          return route.params.dataAPI.email
        case "role":
          return route.params.dataAPI.role
        case "keycode":
          return route.params.dataAPI.keycode
        case "name":
          return route.params.dataAPI.name
        case "phone":
          return route.params.dataAPI.phone
        case "image":
          return route.params.dataAPI.image
        case "birthday":
          return route.params.dataAPI.birthday
        case "password":
          return route.params.dataAPI.password
      }
    }
    return ""
  }
  const [fdata, setFdata] = useState({
    id: getDetails("id"),
    email: getDetails("email"),
    name: getDetails("name"),
    phone: getDetails("phone"),
    birthday: getDetails("birthday"),
    image: getDetails("image"),
    keycode: getDetails("keycode"),
    role: getDetails("role"),
    password: getDetails("password")
  })
  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    const dateStr = currentDate.toISOString().substring(0, 10);
    setFdata({ ...fdata, birthday: dateStr })

  };
  const ChangeProfile = async () => {
    if (fdata.name == "") {
      setMesage('Không được để thiếu')
      setIsVisibleErr(true)
      return;
    }
    if (fdata.phone.length != 0) {
      for (const item of fdata.phone) {
        if (item != '0' && item != '1' && item != '2' && item != '3' && item != '4' && item != '5' && item != '6' && item != '7' && item != '8' && item != '9' || (fdata.phone.length < 9 || fdata.phone.length > 11)) {
          setMesage('Xem lại số điện thoại')
          setIsVisibleErr(true)
          return;
        }
      }
    }
    const updates = {
      name: fdata.name,
      email: fdata.email,
      phone: fdata.phone,
      password: fdata.password,
      keycode: fdata.keycode,
      role: fdata.role,
      image: fdata.image,
      birthday: fdata.birthday
    };
    fetch(shareVarible.URLink + '/user/update/' + `${fdata.id}`, {
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
          setIsVisible(true)
        }
      }
    )
  }
  
  const handlePickImage = async () => {
    try {
      const imageUrl =await  pickImage();
      setFdata({ ...fdata, image: imageUrl })
      setImage(imageUrl)
    } catch (error) {
      console.error('Lỗi tải ảnh: ', error);
    }
  };
  return (
    <View>
      <SuccessDialog
        isVisible={isVisible}
        message={"Thay đổi thông tin thành công!!!"}
        onClose={handleConfirm}
      />
      <ErrorDialog
        isVisible={isVisibleErr}
        message={message}
        onClose={handleConfirmErr}
      />
      <TouchableOpacity onPress={handlePickImage} style={{ zIndex: 1 }}>
        {
          fdata.image == "" ?
            <Image
              style={styles.styTopImage}
              source={user_profile}/>:
            <Image
              style={styles.styTopImage}
              source={{ uri: fdata.image }}/>
        }
      </TouchableOpacity>
      <View style={styles.V11}>
        <Image
          style={styles.styBackGroundImage}
          source={imagetop}/>
      </View>
      <View style={styles.V12}>
        <View>
          <Text style={styles.stextname}>
          </Text>
        </View>
        <Text style={styles.slableemail}>Name</Text>
        <TextInput
          onChangeText={(text) => setFdata({ ...fdata, name: text })}
          value={fdata.name}
          style={styles.stextemail}>
        </TextInput>
        <Text style={styles.slableemail}>Phone</Text>
        <TextInput style={styles.stextemail}
          onChangeText={(text) => setFdata({ ...fdata, phone: text })}
          value={fdata.phone}>
        </TextInput>
        <Text style={styles.slableemail}>Birthday</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textBirtday}>
            {fdata.birthday}
          </Text>
          <Ionicons
            onPress={() => {setShow(true);}}
            name='calendar-sharp' size={52} style={{ marginLeft: 30 }}/>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}/>)}
        </View>
        <TouchableOpacity
          onPress={() => ChangeProfile()}
          style={styles.styButtonChangeProfile}>
          <View
            style={styles.styBottomView}>
            <Text style={styles.styleChangPassword}>
              ChangeProfile
            </Text>
            <Image
              style={styles.ImagePassword}
              source={imagechangeprofile}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', { data: route.params.dataAPI })}>
          <View
            style={styles.styViewLogout}>
            <Image
              style={styles.ImagePassword}
              source={imageLogout}/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default ChangProfile
const styles = StyleSheet.create({

  V11: {
    height: '15%',
    width: '100%',
    backgroundColor: '#EDF6D8'
  },
  V12: {
    height: '85%',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  stextname: {
    height: 50,
    width: "100%",
    marginTop: 25,
    fontSize: 27,
    textAlign: 'center',
    marginLeft: -30
  },
  slableemail: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5
  },
  stextemail: {
    height: 50,
    width: "80%",
    marginLeft: 35,
    borderWidth: 3,
    borderRadius: 20,
    textAlignVertical: 'center',
    paddingLeft: 10
  },
  textBirtday: {
    height: 50,
    width: "60%",
    marginLeft: 35,
    borderWidth: 3,
    borderRadius: 20,
    textAlignVertical: 'center',
    paddingLeft: 10
  },
  styleChangPassword: {
    height: 50,
    width: "80%",
    textAlignVertical: 'center',
    paddingLeft: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black'
  },
  ImagePassword: {
    height: 50,
    width: 50,
    borderRadius: 40,
  },
  styTopImage:{
    position: 'absolute',
    height: 150,
    width: 150,
    zIndex: 1,
    backgroundColor: 'gray',
    marginLeft: 120,
    borderRadius: 100,
    marginTop: 40
  },
  styBackGroundImage:{
    marginLeft: -90,
    marginTop: -70
  }, 
  styBottomView:{
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 30,
    justifyContent: 'center',
    width: '80%',
    marginLeft: 35,
    backgroundColor: 'white',
  },
  styButtonChangeProfile:{
    zIndex: 1,
    marginTop: 150,
  },
  styViewLogout:{
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 3,
    borderRadius: 30,
    justifyContent: 'center',
    width: '80%',
    marginLeft: 35,
    backgroundColor: '#fff'
  }
})
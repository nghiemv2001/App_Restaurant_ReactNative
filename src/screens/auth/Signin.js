import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect, useReducer } from 'react'
import mainpicture from '../../../assets/xinchao.png'
import { buttonlogin } from '../../comon/button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal';
const Signin = ({ navigation }) => {
  //xu li data token 
  const initialState = {
    data: [],
    isLoading: false,
    error: null
  };
  const [isVisible, setIsVisible] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const CustomAlert = ({ isVisible, message, onConfirm }) => {
    return (
      <Modal isVisible={isVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>{message}</Text>
          </View>
        </View>
      </Modal>
    );
  };
  const showCustomAlert = (message) => {
    setErrorMsg(message);
    setIsVisible(true);
  };
  const handleConfirm = () => {
    setIsVisible(false);
  };
  const [dataAPI, setDataAPI] = useState([]);
  const [fdata, setFdata] = useState({
    email: '',
    password: ''
  })
  ///set Error 
  const [errormgs, setErrormsg] = useState(null);
  //
  const [data, setData] = useState({});
  /// Call API
  const SendtoBackend = () => {
    if (fdata.email == '' || fdata.password == '') {
      setErrorMsg("Không được bỏ trống")
              setShowModalAlert(true)
      return;
    }
    else {
      fetch(shareVarible.URLink + '/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fdata)
        }).then(res => res.json()).then(
          data => {
            if (data.error) {
              setErrorMsg(data.error)
              setShowModalAlert(true)
            }
            else {
              showCustomAlert('Login successfully');
              setFdata({ ...fdata, email: "", password: "" })
            }
          }
        )
    }
  }
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
        navigation.navigate('Profile', { data: fdata });
      }, 1000);
    }
  }, [isVisible, navigation]);

  //Hide or see  password
  const useTogglePasswordVisibility = () => {
    const [passwordVisibility1, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    const handlePasswordVisibility = () => {
      if (rightIcon === 'eye') {
        setRightIcon('eye-off');
        setPasswordVisibility(!passwordVisibility1);
      } else if (rightIcon === 'eye-off') {
        setRightIcon('eye');
        setPasswordVisibility(!passwordVisibility1);
      }
    };

    return {
      passwordVisibility1,
      rightIcon,
      handlePasswordVisibility
    };
  };
  const { passwordVisibility1, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [password, setPassword] = useState('');



  return (
    <KeyboardAwareScrollView style={styles.boss}>
      <Modal
        transparent={true}
        visible={showModalAlert}
        animationType='fade'
      >
        <View style={styles.centeredViewAlert}>
          <View style={{
            height: 300,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>

            <View style={{ height: 100, width: 100, backgroundColor: '#84202A', borderRadius: 70, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='close' size={60} color={"#FFFCFF"} />
            </View>
            <Text style={{ fontSize: 22, fontWeight: "700", color: '#84202A' }}>
              {errorMsg}
            </Text>
            <TouchableOpacity
              onPress={() => { setShowModalAlert(false) }}
              style={{ height: 40, width: 140, backgroundColor: '#84202A', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <CustomAlert
        isVisible={isVisible}
        message={errorMsg}
        onConfirm={handleConfirm}
      />

      <Text style={styles.loginText}>Đăng nhập</Text>
      <Image style={styles.picturemain} source={mainpicture} />
      <View style={{top: -130 }}>
        <Text style={styles.nodetextemail}>Vui lòng nhập email</Text>
        <TextInput
          value={fdata.email}
          onPressIn={() => setErrormsg(null)}
          placeholder='abc123@gmail.com' style={styles.inputemail}
          onChangeText={(text) => setFdata({ ...fdata, email: text })}>
        </TextInput>
        <Text style={styles.nodetextpass}>Vui lòng nhập mật khẩu</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={fdata.password}
            placeholder='******'
            style={styles.inputpassword}
            onChangeText={(text) => { setFdata({ ...fdata, password: text }), setPassword(text) }}
            secureTextEntry={passwordVisibility1}
            enablesReturnKeyAutomatically
          />
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
          </Pressable>
        </View>
        <Text style={styles.textForgot}
          onPress={() => navigation.navigate('ForgotPassword')}
        >Quên mật khẩu</Text>
        {
          errormgs ? <Text style={styles.errmessage}>
            {errormgs}</Text> : null
        }
        <TouchableOpacity
          onPress={() => SendtoBackend()}>
          <Text style={buttonlogin}
          >Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.Viewbottom}>
          <Text style={styles.textnormal}>Bạn đã có tài khoản ? </Text>
          <Text style={styles.textcontinue} onPress={() => navigation.navigate('Signup')}
          >Đăng ký</Text>
        </View>

      </View>

    </KeyboardAwareScrollView>

  )
}

export default Signin

const styles = StyleSheet.create({
  boss: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#EDF6D8',
  },
  screenbottom: {
    width: '100%',
    height: '70%',
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  loginText: {
    fontSize: 60,
    color: '#C29E11',
    fontWeight: '900',
    marginTop: 90,
    textAlign: 'center'
  },
  inputemail: {
    marginLeft: 30,
    position: 'relative',
    paddingLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 340,
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 18,
    fontSize: 22,
    marginRight: 0,
    borderColor: 'black',
    borderWidth: 1
  },
  nodetextemail: {
    marginLeft: 45,
    marginRight: 150,
  },
  nodetextpass: {
    marginLeft: 45,
    marginTop: 20,
    marginRight: 120,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  centeredViewAlert: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  picturemain: {
    marginTop: -150,
    right: 60,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'center',

  },
  textForgot: {
    fontSize: 18,
    color: '#FF1616',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '400',
    marginLeft: 220,
    marginTop: 5
  },
  textcontinue: {
    fontSize: 18,
    color: '#FF1616',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '400',
    marginTop: 10

  },
  inputpassword: {
    marginLeft: 30,
    fontSize: 22,
    height: 44,
    width: 250,

  },
  textnormal: {
    fontSize: 15,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '400',
    marginTop: 10,
    marginLeft: 87
  },
  Viewbottom: {
    flexDirection: 'row'
  },
  errmessage: {
    marginTop: 210,
    marginLeft: 120,
    color: 'red',
    position: 'absolute'
  },
  inputContainer: {
    backgroundColor: 'white',
    marginLeft: 30,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d7d7d7',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 18,
    height: 44,
    width: 340,
    justifyContent: 'space-between',
    paddingRight: 20,
  }
})
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native'
import React, { useState } from 'react'
import mainpicture from '../../../assets/xinchao.png'
import { buttonsignup } from '../../comon/button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Signup = ({ navigation }) => {

  const [alertSuccess, setAlertSuccess] = useState(false)
  //take data
  const [fdata, setFdata] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    keycode: '',
    role: '1'
  })
  const [password1, setPassword1] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errormsg, setErrormsg] = useState(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  //call API
  const SendtoBackend = () => {
    setFdata({ ...fdata, keycode: '0000' })
    if (fdata.name == '') {
      setErrormsg('Tên không hợp lệ');
      setShowModalAlert(true)
      return;
    }
    if ((!(/\S+@\S+\.\S+/).test(fdata.email) && !(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(fdata.email))) {
      setErrormsg('Email không hợp lệ');
      setShowModalAlert(true)
      return;
    }
    if (fdata.phone.length == 0) {
      setErrormsg('Số điện thoại không hợp lệ');
      setShowModalAlert(true)
    }
    if (fdata.phone.length != 0) {
      for (const item of fdata.phone) {
        if (item != '0' && item != '1' && item != '2' && item != '3' && item != '4' && item != '5' && item != '6' && item != '7' && item != '8' && item != '9' || (fdata.phone.length < 9 || fdata.phone.length > 11)) {
          setErrormsg('Số điện không hợp lệ');
      setShowModalAlert(true)
          return;
        }
      }
    }
    if (fdata.password.length < 6) {
      setErrormsg('Mật khẩu trên 6 kí tự');
      setShowModalAlert(true)
      return;
    }
    if (!(/^\S+$/).test(fdata.password)) {
      setErrormsg('Mật khẩu không chưa khoản trắng');
      setShowModalAlert(true)
      return;
    }
    if (!(/^(?=.*[A-Z]).*$/).test(fdata.password)) {
      setErrormsg('Mật khẩu có it nhất một ký tự in hoa');
      setShowModalAlert(true)
      return;
    }
    if (!(/^(?=.*[a-z]).*$/).test(fdata.password)) {
      setErrormsg('Mật khẩu có ít nhât một ký tự in thường');
      setShowModalAlert(true)
      return;
    }
    if (!(/^(?=.*[0-9]).*$/).test(fdata.password)) {
      setErrormsg('Mật khẩu có ít nhất một số');
      setShowModalAlert(true)
      return;
    }
    else {
      if (fdata.password != fdata.confirmpassword) {
        setErrormsg('Xác nhận mật khẩu không đúng');
        setShowModalAlert(true)
        return;
      }
      else {
        fetch(shareVarible.URLink + '/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fdata)
        })
          .then(res => res.json()).then(
            data => {
              if (data.error) {
                console.log(data.error)
              }
              else {
                setAlertSuccess(true)
              }
            }
          )
      }
    }
  };
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
              {errormsg}
            </Text>
            <TouchableOpacity
              onPress={() => { setShowModalAlert(false) }}
              style={{ height: 40, width: 140, backgroundColor: '#84202A', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={alertSuccess}
        animationType='fade'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 300,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>

            <View style={{ height: 100, width: 100, backgroundColor: '#2D60D6', borderRadius: 70, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='checkmark-done-circle-outline' size={60} color={"#FFFCFF"} />
            </View>
            <Text style={{ fontSize: 22, fontWeight: "700", color: '#3564C1' }}>
              Success
            </Text>
            <TouchableOpacity
              onPress={() => { navigation.navigate("Signin") }}
              style={{ height: 40, width: 140, backgroundColor: '#3564C1', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Image style={styles.picturemain} source={mainpicture} />
      <Text style={styles.textSignup}>Tạo tài khoản</Text>
      <Text style={styles.textSignup1}>Mới</Text>
      <Text style={styles.nodetextusername}>Vui lòng nhập tên người dùng</Text>
      <TextInput

        style={styles.inputname}
        placeholder="Tên người dùng"
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setFdata({ ...fdata, name: text })}
      ></TextInput>
      <Text style={styles.nodetextemail}>Vui lòng nhập email đăng nhập</Text>
      <TextInput placeholder='email@gmail.com' style={styles.inputemail}
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setFdata({ ...fdata, email: text })}></TextInput>
      <Text style={styles.nodetextphone}>Vui lòng nhập số điện thoại</Text>
      <TextInput placeholder='+84....' style={styles.inputemail}
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setFdata({ ...fdata, phone: text })}></TextInput>
      <Text style={styles.nodetextpassword}>Vui lòng nhập mật khẩu</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='******'
          style={styles.inputpassword}
          secureTextEntry={!showPassword} // Sử dụng secureTextEntry để ẩn/mở mật khẩu
          enablesReturnKeyAutomatically
          onPressIn={() => setErrormsg(null)}
          onChangeText={(text) => {
            setFdata({ ...fdata, password: text });
            setPassword(text);
          }}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={25} />
        </TouchableOpacity>
      </View>
      <Text style={styles.nodetextconfirm}>Xác nhận mật khẩu</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='******' style={styles.inputconfirm}
          secureTextEntry={!showConfirmPassword}
          enablesReturnKeyAutomatically
          onPressIn={() => setErrormsg(null)}
          onChangeText={(text) => { setFdata({ ...fdata, confirmpassword: text }), setPassword1(text) }} />
           <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={25} />
        </TouchableOpacity>
      </View>
      {errormsg ? <Text style={styles.errmessage}>{errormsg}</Text> : null}
      <TouchableOpacity onPress={() => {
        SendtoBackend();
      }}>
        <Text style={buttonsignup}
        >Đăng ký</Text>
      </TouchableOpacity>
      <View style={styles.Viewbottom}>
        <Text>Đã có tài khoản ? </Text>
        <Text style={styles.textAlready}
          onPress={() => navigation.navigate('Signin')}>Đăng nhập</Text>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Signup

const styles = StyleSheet.create({
  boss: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#EDF6D8',
  },
  stylepicture: {
    flex: 1,
    backgroundColor: 'red',
  },
  picturemain: {
    zIndex: -1,
    marginTop: -150,
    right: 50,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'center',
  },
  loginText: {
    position: 'absolute',
    fontSize: 60,
    color: '#C29E11',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '900',
    height: '40%',
    width: '40%'
  },
  centeredViewAlert: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  inputname: {
    marginLeft: 30,
    position: 'relative',
    paddingLeft: 10,
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
  textAlready: {
    color: 'red',
    fontSize: 18,
  },
  inputemail: {
    paddingLeft: 10,
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
    borderWidth: 1,
    marginLeft: 30
  },
  inputconfirm: {
    paddingLeft: 10,
    fontSize: 22,
    height: 44,
    width: 250,
  },
  nodetextusername: {
    marginLeft: 45,
    marginTop: 10,
  },
  nodetextemail: {
    marginLeft: 45,
    marginTop: 3,
    marginRight: 150,
  },
  nodetextphone: {
    marginLeft: 45,
    marginTop: 3,
    marginRight: 147,
  },
  nodetextpassword: {
    marginLeft: 45,
    marginTop: 3,
    marginRight: 126,
  },
  nodetextconfirm: {
    marginLeft: 45,
    marginTop: 3,
    marginRight: 146,
  },
  nodetextpass: {
    marginLeft: 45,
    marginTop: 20,
  },
  textForgot: {
    fontSize: 22,
    color: '#FF1616',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '400',
    marginLeft: 140,
    marginTop: 10
  },
  textcontinue: {
    fontSize: 22,
    color: '#FF1616',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '400',
    marginTop: 10
  },
  inputpassword: {
    paddingLeft: 10,
    fontSize: 22,
    height: 44,
    width: 250,
  },
  textSignup: {
    fontSize: 50,
    color: '#C29E11',
    fontWeight: '900',
    marginTop: -210,
    textAlign: 'center'
  },
  textSignup1: {
    fontSize: 38,
    marginTop: -15,
    color: '#C29E11',
    fontWeight: '900',
    textAlign: 'center'
  },
  Viewbottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  errmessage: {
    textAlign: 'center',
    marginTop: 40,
    color: 'red',
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
  },
  stylesdropdown: {
    width: '100%',
    height: 20,
    marginLeft: 180
  },
  dropdown: {
    width: '50%'
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
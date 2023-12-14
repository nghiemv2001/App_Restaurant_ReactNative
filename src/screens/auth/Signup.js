import {StyleSheet,Text,View,Image,TextInput,TouchableOpacity, Modal} from 'react-native'
import React, { useState } from 'react'
import mainpicture from '../../../assets/xinchao.png'
import { buttonsignup } from '../../comon/button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {ErrorDialog , EphemeralDialog} from '../../component/CustomerAlert'
const Signup = ({ navigation }) => {
  const [isVisibleSignup, setIsVisibleSignup] = useState(false);
  const [isVisibleErr, setIsVisibleErr] = useState(false);
  const [message, setMessage] = useState('');
  //take data
  const [fdata, setFdata] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    keycode: '',
    role: '1',
    confirmpassword:""
  })
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   /*Hàm xử lí đóng Dialog khi đăng ký thành công*/
   const handleConfirm = () => {
    setIsVisibleSignup(false)
    navigation.navigate('Profile', { data: fdata });
  };
  /**Hàm sử lí đóng Dialog khi có lỗi */
  const handCloseDialog = ()=>{
    setIsVisibleErr(false)
  }
  //call API
  const fSignup = () => {
    setFdata({ ...fdata, keycode: '0000' })
    if (fdata.name == '') {
      setMessage('Tên không hợp lệ');
      setIsVisibleErr(true)
      return;
    }
    if ((!(/\S+@\S+\.\S+/).test(fdata.email) && !(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(fdata.email))) {
      setMessage('Email không hợp lệ');
      setIsVisibleErr(true)
      return;
    }
    if (fdata.phone.length == 0) {
      setMessage('Số điện thoại không hợp lệ');
      setIsVisibleErr(true)
    }
    if (fdata.phone.length != 0) {
      for (const item of fdata.phone) {
        if (item != '0' && item != '1' && item != '2' && item != '3' && item != '4' && item != '5' && item != '6' && item != '7' && item != '8' && item != '9' || (fdata.phone.length < 9 || fdata.phone.length > 11)) {
          setMessage('Số điện không hợp lệ');
          setIsVisibleErr(true)
          return;
        }
      }
    }
    if (fdata.password.length < 6) {
      setMessage('Mật khẩu trên 6 kí tự');
      setIsVisibleErr(true)
      return;
    }
    if (!(/^\S+$/).test(fdata.password)) {
      setMessage('Mật khẩu không chưa khoản trắng');
      setIsVisibleErr(true)
      return;
    }
    if (!(/^(?=.*[A-Z]).*$/).test(fdata.password)) {
      setMessage('Mật khẩu có it nhất một ký tự in hoa');
      setIsVisibleErr(true)
      return;
    }
    if (!(/^(?=.*[a-z]).*$/).test(fdata.password)) {
      setMessage('Mật khẩu có ít nhât một ký tự in thường');
      setIsVisibleErr(true)
      return;
    }
    if (!(/^(?=.*[0-9]).*$/).test(fdata.password)) {
      setMessage('Mật khẩu có ít nhất một số');
      setIsVisibleErr(true)
      return;
    }
    else {
      if (fdata.password != fdata.confirmpassword) {
        setMessage('Xác nhận mật khẩu không đúng');
        setIsVisibleErr(true)
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
                setMessage(data.error)
                setIsVisibleErr(true)
              }
              else {
                setIsVisibleSignup(true)
              }
            }
          )
      }
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.boss}>
      <ErrorDialog
      isVisible={isVisibleErr}
      message={message}
      onClose={handCloseDialog}/>
      <EphemeralDialog
      isVisible={isVisibleSignup}
      message={"Đăng ký thành công....!!!"}
      onClose={handleConfirm}/>

      <Image style={styles.picturemain} source={mainpicture} />
      <Text style={styles.textSignup}>Tạo tài khoản</Text>
      <Text style={styles.textSignup1}>Mới</Text>
      <Text style={styles.nodetextusername}>Vui lòng nhập tên người dùng</Text>
      <TextInput
        style={styles.inputname}
        placeholder="Tên người dùng"
        onChangeText={(text) => setFdata({ ...fdata, name: text })}
      ></TextInput>
      <Text style={styles.nodetextemail}>Vui lòng nhập email đăng nhập</Text>
      <TextInput placeholder='email@gmail.com' style={styles.inputemail}
        onChangeText={(text) => setFdata({ ...fdata, email: text })}></TextInput>
      <Text style={styles.nodetextphone}>Vui lòng nhập số điện thoại</Text>
      <TextInput placeholder='+84....' style={styles.inputemail}
        onChangeText={(text) => setFdata({ ...fdata, phone: text })}></TextInput>
      <Text style={styles.nodetextpassword}>Vui lòng nhập mật khẩu</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='******'
          style={styles.inputpassword}
          secureTextEntry={!showPassword}
          enablesReturnKeyAutomatically
          onChangeText={(text) => {
            setFdata({ ...fdata, password: text });
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
          onChangeText={(text) => { setFdata({ ...fdata, confirmpassword: text })}} />
           <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={25} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {
        fSignup();
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
  boss: {flex: 1,height: '100%',width: '100%',backgroundColor: '#EDF6D8',},
  picturemain: {zIndex: -1,marginTop: -150,right: 50,justifyContent: 'center',alignItems: 'center',resizeMode: 'center',},
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
})
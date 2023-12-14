import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect, useReducer } from 'react'
import mainpicture from '../../../assets/xinchao.png'
import { buttonlogin } from '../../comon/button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import shareVarible from './../../AppContext'
import { EphemeralDialog, ErrorDialog } from '../../component/CustomerAlert'
const Signin = ({ navigation }) => {
  const [isVisibleSignin, setIsVisibleSignin] = useState(false);
  const [isVisibleErr, setIsVisibleErr] = useState(false);
  const [message, setMesage] = useState('');
  const [fdata, setFdata] = useState({
    email: '',
    password: ''
  })
  const [password, setPassword] = useState('');
  /*Hàm xử lí đóng Dialog khi đăng nhập thành công*/
  const handleConfirm = () => {
    setIsVisibleSignin(false)
    navigation.navigate('Profile', { data: fdata });
    setFdata({ ...fdata, email: "", password: "" })
  };
  /**Hàm sử lí đóng Dialog khi có lỗi */
  const handCloseDialog = ()=>{
    setIsVisibleErr(false)
  }
  /* Hàm đăng nhập*/
  const fSignin = () => {
    if (fdata.email == '' || fdata.password == '') {
      setMesage("Không được bỏ trống")
      setIsVisibleErr(true)
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
              setMesage("Thông tin không hợp lệ")
              setIsVisibleErr(true)
            }
            else {
              setIsVisibleSignin(true)
            }
          }
        )
    }
  }
  /* Hàm ẩn&hiện pass */
  const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const handlePasswordVisibility = () => {
      if (rightIcon === 'eye') {
        setRightIcon('eye-off');
        setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'eye-off') {
        setRightIcon('eye');
        setPasswordVisibility(!passwordVisibility);
      }
    };
    return {
      passwordVisibility,
      rightIcon,
      handlePasswordVisibility
    };
  };
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  return (
    <KeyboardAwareScrollView style={styles.boss}>
     <EphemeralDialog
      isVisible={isVisibleSignin}
      message={"Đăng nhập thành công!!!"}
      onClose={handleConfirm}
     />
      <ErrorDialog
        isVisible={isVisibleErr}
        message={message}
        onClose={handCloseDialog}
      />
      <Text style={styles.loginText}>Đăng nhập</Text>
      <Image style={styles.picturemain} source={mainpicture} />
      <View style={{ top: -130 }}>
        <Text style={styles.nodetextemail}>Vui lòng nhập email</Text>
        <TextInput
          value={fdata.email}
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
            secureTextEntry={passwordVisibility}
            enablesReturnKeyAutomatically
          />
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
          </Pressable>
        </View>
        <Text style={styles.textForgot}
          onPress={() => navigation.navigate('ForgotPassword')}
        >Quên mật khẩu</Text>
        <TouchableOpacity
          onPress={() => fSignin()}>
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
  TextErr: {
    fontSize: 22, fontWeight: "700", color: '#84202A'
  },
  boss: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#EDF6D8',
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
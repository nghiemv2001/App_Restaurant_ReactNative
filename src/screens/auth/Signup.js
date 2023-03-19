import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable
} from 'react-native'
import React, { useState } from 'react'
import mainpicture from '../../../assets/mainpicture.png'
import { buttonsignup } from '../../comon/button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import shareVarible from './../../AppContext'
const Signup = ({ navigation }) => {

  //take data
  const [fdata, setFdata] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    keycode: '',
  })
  //call API
  const SendtoBackend = () => {
    // onChangeText={(text) => setFdata({ ...fdata, email: text })
    const keycode = 0;
    setFdata({ ...fdata, keycode: '0000' })
    if (fdata.name == '') {
      setErrormsg('NOTE : Name are required !!!');
      return;
    }
    if ((!(/\S+@\S+\.\S+/).test(fdata.email) && !(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(fdata.email))) {
      setErrormsg('NOTE : Email null or warning fotmat  !!!');
      return;
    }
    if (fdata.phone.length == 0) {
      setErrormsg('NOTE : Warning fotmat phone , length phone is invalible !!!');
    }
    if (fdata.phone.length != 0) {
      for (const item of fdata.phone) {
        if (item != '0' && item != '1' && item != '2' && item != '3' && item != '4' && item != '5' && item != '6' && item != '7' && item != '8' && item != '9' || (fdata.phone.length < 9 || fdata.phone.length > 11)) {
          setErrormsg('NOTE : Warning fotmat phone , length phone is invalible !!!');
          return;
        }
      }
    }
    if (fdata.password.length < 6) {
      setErrormsg('NOTE : 6+ characters !!!');
      return;
    }
    if (!(/^\S+$/).test(fdata.password)) {
      setErrormsg('NOTE : Password mustnot contain Whitespace. !!!');
      return;
    }
    if (!(/^(?=.*[A-Z]).*$/).test(fdata.password)) {
      setErrormsg('NOTE : Password must have at least one Uppercase Character. !!!');
      return;
    }
    if (!(/^(?=.*[a-z]).*$/).test(fdata.password)) {
      setErrormsg('NOTE : Password must have at least one Lowercase Character. !!!');
      return;
    }
    if (!(/^(?=.*[0-9]).*$/).test(fdata.password)) {
      setErrormsg('NOTE : Password must have at least one Digit. !!!');
      return;
    }
    else {
      if (fdata.password != fdata.confirmpassword) {
        setErrormsg('Password confirm Password must be same');
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
                setErrormsg(data.error);
              }
              else {
                alert('register account successfully');
                navigation.navigate('Signin');
              }
            }
          )
      }
    }
  };

  // //Hide or see  password
  // const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [password, setPassword] = useState('');
  // const { passwordVisibility1, rightIcon1, handlePasswordVisibility1 } = useTogglePasswordVisibility1();
  const [password1, setPassword1] = useState('');

  // const useTogglePasswordVisibility = () => {
  //   const [passwordVisibility1, setPasswordVisibility] = useState(true);
  //   const [rightIcon, setRightIcon] = useState('eye');

  //   const handlePasswordVisibility = () => {
  //     if (rightIcon === 'eye') {
  //       setRightIcon('eye-off');
  //       setPasswordVisibility(!passwordVisibility);
  //     } else if (rightIcon === 'eye-off') {
  //       setRightIcon('eye');
  //       setPasswordVisibility(!passwordVisibility);
  //     }
  //   };

  //   return {
  //     passwordVisibility,
  //     rightIcon,
  //     handlePasswordVisibility
  //   };
  // };
  // //Hide or see  confimpassword
  // const useTogglePasswordVisibility1 = () => {
  //   const [passwordVisibility1, setPasswordVisibility1] = useState(true);
  //   const [rightIcon1, setRightIcon1] = useState('eye');
  //   const handlePasswordVisibility1 = () => {
  //     if (rightIcon1 === 'eye') {
  //       setRightIcon1('eye-off');
  //       setPasswordVisibility1(!passwordVisibility1);
  //     } else if (rightIcon1 === 'eye-off') {
  //       setRightIcon1('eye');
  //       setPasswordVisibility1(!passwordVisibility1);
  //     }
  //   };
  //   return {
  //     passwordVisibility1,
  //     rightIcon1,
  //     handlePasswordVisibility1
  //   };
  // };

  //set erorr
  const [errormsg, setErrormsg] = useState(null);
  return (
    <KeyboardAwareScrollView style={styles.boss}>
      <Image style={styles.picturemain} source={mainpicture} />
      <Text style={styles.textSignup}>Create New</Text>
      <Text style={styles.textSignup1}>Account</Text>
      <Text style={styles.nodetextusername}>Please enter your name</Text>
      <TextInput
        style={styles.inputname}
        placeholder="Your name"
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setFdata({ ...fdata, name: text })}
      ></TextInput>
      <Text style={styles.nodetextemail}>Please enter your email</Text>
      <TextInput placeholder='youremail@gmail.com' style={styles.inputemail}
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setFdata({ ...fdata, email: text })}></TextInput>
      <Text style={styles.nodetextphone}>Please enter your phone</Text>
      <TextInput placeholder='+84....' style={styles.inputemail}
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setFdata({ ...fdata, phone: text })}></TextInput>
      <Text style={styles.nodetextpassword}>Please enter your password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='******'
          style={styles.inputpassword}
          secureTextEntry={true}
          enablesReturnKeyAutomatically
          onPressIn={() => setErrormsg(null)}
          onChangeText={(text) => { setFdata({ ...fdata, password: text }), setPassword(text) }} />
      </View>
      <Text style={styles.nodetextconfirm}>Please cofirm password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='******' style={styles.inputconfirm}
          secureTextEntry={true}
          enablesReturnKeyAutomatically
          onPressIn={() => setErrormsg(null)}
          onChangeText={(text) => { setFdata({ ...fdata, confirmpassword: text }), setPassword1(text) }} />
      </View>
      {errormsg ? <Text style={styles.errmessage}>{errormsg}</Text> : null}
      <TouchableOpacity onPress={() => {
        SendtoBackend();
      }}>
        <Text style={buttonsignup}
        >Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.Viewbottom}>
        <Text>Already Registered?</Text>
        <Text style={styles.textAlready}
          onPress={() => navigation.navigate('Signin')}>Login</Text>
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
    marginTop: -420,
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
    marginTop: -390,
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
    marginTop: 5,
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
})
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import picturemain from '../../../assets/xinchao.png'
import { buttonlogin, buttonnSend } from '../../comon/button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import shareVarible from './../../AppContext'

const ForgotPassword = ({ navigation }) => {
    const [fdata, setFdata] = useState({
        email: '',
    })
    const [errormgs, setErrormsg] = useState(null);
    const SendtoBackendfogot = () => {
        if ((!(/\S+@\S+\.\S+/).test(fdata.email) && !(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(fdata.email))) {
            setErrormsg('NOTE : Email null or warning fotmat  !!!');
            return;
        }
        else{
            fetch(shareVarible.URLink + '/fogot',
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
              }).then(res => res.json()).then(
                data => {
                  if (data.message=== 'Code send succesefully') {
                    alert('Login successfully');
                    navigation.navigate('Home');
                  }
                }
        )
        }
    }
    return (
        <KeyboardAwareScrollView style={styles.boss}>
            <Image style={styles.stylepicture} source={picturemain} />
            <View style={styles.viewcenter}>
                <Text style={styles.textfogot}>Quên</Text>
                <Text style={styles.textPassword}>Mật Khẩu</Text>
            </View>
            <Text style={styles.nodetextemail}>Vùng lòng nhập email đã đăng ký tài khoản</Text>
            <TextInput
                onPressIn={()=> setErrormsg(null)}
                placeholder='abc123@gmail.com' style={styles.inputemail}
                onChangeText={(text) => setFdata({ ...fdata, email: text })}>
            </TextInput>
            {
                errormgs ? <Text style={styles.errmessage}>
                {errormgs}</Text> : null
            }
            <TouchableOpacity
                onPress={() => { SendtoBackendfogot(); }}>
                <Text style={buttonnSend}>SEND </Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    boss: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#EDF6D8',
    },
    stylepicture: {
        position: 'absolute',
        right: -120,
        width: '100%',
        height: '60%',
        zIndex: -1,
        marginBottom: 360,
        marginRight: 130,
        flex: 1,
        resizeMode: 'cover',
    },
    viewcenter: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 260
    },
    textfogot: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#C29E11"
    },
    textPassword: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#C29E11",
    },
    textNewpass: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'black',
        marginTop: 15
    },
    nodetextemail: {
        marginLeft: 40,
        marginTop: 50
    },
    inputemail: {
        paddingLeft: 15,
        height: 44,
        width: 340,
        backgroundColor: '#fff',
        color: 'black',
        borderRadius: 18,
        fontSize: 22,
        marginLeft: 30,
        borderColor: 'black',
        borderWidth: 1,
    },
    errmessage:{
        position : 'absolute',
        marginTop : 530,
        marginLeft : 73,
        color : 'red',
        fontSize : 15
    }
})
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React , {useState} from 'react'
import picturemain from '../../../assets/mainpicture.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { buttonlogin, buttonnSend } from '../../comon/button'

const ReceiverPassword = () => {
    const [errormgs, setErrormsg] = useState(null);
    // const {userdata} = router.params;
    

  return (
    <KeyboardAwareScrollView style={styles.boss}>

            <Image style={styles.stylepicture} source={picturemain} />
            <View style={styles.viewcenter}>
                <Text style={styles.textfogot}>Receiver Password</Text>
            </View>
            <Text style={styles.nodetextemail}>Please enter code</Text>
            <TextInput
                style={styles.inputemail}>
            </TextInput>
            {
                errormgs ? <Text style={styles.errmessage}>
                {errormgs}</Text> : null
            }
            <TouchableOpacity>
                <Text style={buttonnSend}>CHECK</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
  )
}

export default ReceiverPassword

const styles = StyleSheet.create({
    boss: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#EDF6D8',
    },
    stylepicture: {
        position: 'absolute',
        top: -100,
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
        marginTop: 100
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
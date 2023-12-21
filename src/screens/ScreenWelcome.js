import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import mainpicture from '../../assets/xinchao.png'
import Icon from 'react-native-vector-icons/FontAwesome';
const Welcome = ({ navigation }) => {
  return (
    <View style={styles.boss}>
      <Image style={styles.picturemain} source={mainpicture} />
      <View style={styles.top}>
        <Text style={styles.welcomeText}>Xin chào</Text>
        <View style={styles.icon}>
          <Icon.Button
          style={styles.iconarrow_right}
          name="arrow-right"
          backgroundColor="#C29E11"
          onPress={() => navigation.navigate('Signin')} >
        </Icon.Button>
        </View>
      </View>
    </View>
  )
}
export default Welcome
const styles = StyleSheet.create({
  boss: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#EDF6D8',
    justifyContent: 'flex-end'
  },
  picturemain: {
    position: 'absolute',
    top: 40,
    right: -120,
    width: '100%',
    height: '60%',
    zIndex: -1,
    marginBottom: 360,
    marginRight: 130,
    flex: 1,
    resizeMode: 'cover',
  },
  top: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  welcomeText: {
    position: 'absolute',
    fontSize: 60,
    color: '#C29E11',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '900',
    height: '10%',
    width: '61%'
  },
  picturei_con: {
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
    height: '54%',
  },
  iconarrow_right:{
    height : 60,
    width : 120 ,
    alignItems : 'center',
    justifyContent: 'center',
    borderTopEndRadius : 2
  },

  icon:{
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 390,
  }
})


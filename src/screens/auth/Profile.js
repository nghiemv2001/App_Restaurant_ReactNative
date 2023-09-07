import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import imagetop from '../../../assets/login1.png'
import penimage from '../../../assets/pen.png'
import user_profile from '../../../assets/user_profile.png'
import imageLogout from '../../../assets/imagelogout.png'
import imageHome from '../../../assets/imghome.png'
import { useRoute } from '@react-navigation/native';
import shareVarible from './../../AppContext'
import { useFocusEffect } from '@react-navigation/native'
const Profile = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data.email;
  const [dataAPI, setDataAPI] = useState([]);
  const fetchData = async () => {
    fetch(shareVarible.URLink + '/user/' + `${data}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setDataAPI(data),
      )
      .catch(error => console.log(error));
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  //Function change home 
  const changeHome=()=>{
    if(dataAPI.role == '0'){
      navigation.navigate('HomeAdmin');
    }
    else if(dataAPI.role =='1'){
      navigation.navigate('HomeWaitress');
    }
    else if (dataAPI.role =='3'){
      navigation.navigate('HomeChef');
    }
  }

  //change Profile
  return (
    <View style={styles.V1}>
      <View>
      <Image
      style={{
        position: 'absolute',
        height: 150,
        width: 150,
        zIndex: 1,
        backgroundColor: 'gray',
        marginLeft: 120,
        borderRadius: 100,
        marginTop: 40
      }}
      source={user_profile}
      />
      {
        dataAPI.image == ""?
        <Image
          style={{
            position: 'absolute',
            height: 150,
            width: 150,
            zIndex: 1,
            backgroundColor: 'gray',
            marginLeft: 120,
            borderRadius: 100,
            marginTop: 40
          }}
          source={user_profile}
        /> :
        <Image
        style={{
          position: 'absolute',
          height: 150,
          width: 150,
          zIndex: 1,
          backgroundColor: 'gray',
          marginLeft: 120,
          borderRadius: 100,
          marginTop: 40
        }}
        source={{uri: dataAPI.image}}
      /> 
      }
        
        <TouchableOpacity
        onPress={() => changeHome()}
        style={{
          zIndex: 1
        }}>
          <Image
          
          style={{
            position: 'absolute',
            height: 70,
            width: 70,
            zIndex: 1,
            backgroundColor: 'gray',
            marginLeft: 300,
            borderRadius: 50,
            marginTop: 20
          }}
          source={imageHome}
        />
        </TouchableOpacity>
         
        <TouchableOpacity
         onPress={() => navigation.navigate('ChangProfile',{dataAPI})}
          style={{
            zIndex: 1,
          }}>
          <Image
            style={{
              height: 30,
              width: 30,
              position: 'absolute',
              zIndex: 1,
              marginLeft: 210,
              marginTop: 150,
              borderRadius: 40,
            }}
            source={penimage}
          />
        </TouchableOpacity>

      </View>

      <View style={styles.V11}>
        <Image
          style={{
            marginLeft: -90,
            marginTop: -70
          }}
          source={imagetop}
        />
      </View>

      <View style={styles.V12}>
        <View style={{
          alignItems: 'center'
        }}>
          <Text style={styles.stextname}>
            {dataAPI.name}
          </Text>
        </View>
        <Text style={styles.slableemail}>Email</Text>
        <Text   
        style={styles.stextemail}>
        {dataAPI.email}  
        </Text>
        <Text style={styles.slableemail}>Phone</Text>
        <Text style={styles.stextemail}>
          {dataAPI.phone}
        </Text>
        <Text style={styles.slableemail}>Birthday</Text>
        <Text style={styles.stextemail}>
        {dataAPI.birthday}
        </Text>

        <TouchableOpacity
        onPress={() => navigation.navigate('Signin')}
          style={{
            zIndex: 1,
            marginTop: 190,
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: 30,
              justifyContent: 'center',
              width: '80%',
              marginLeft: 35,
              backgroundColor: '#fff'
            }}
          >
            <Text style={styles.styleLogout}>
              Logout
            </Text>
            <Image
              style={styles.ImagePassword}
              source={imageLogout}
            />
          </View>

        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Profile
const styles = StyleSheet.create({
  v1: {
    height: '100%',
    width: '100%',
  },
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
    marginTop: 85,
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
  styleChangPassword: {
    height: 50,
    width: "80%",
    textAlignVertical: 'center',
    paddingLeft: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  ImagePassword: {
    height: 50,
    width: 50,
    borderRadius: 40,
    marginLeft: -50
  },
  styleLogout: {
    height: 50,
    width: "80%",
    textAlignVertical: 'center',
    paddingLeft: 10,
    fontSize: 25,
    fontWeight: 'bold',
  }
})
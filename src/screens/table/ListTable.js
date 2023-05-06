import { View, Text, FlatList, Image, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Swipeble } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view';
import img_food_ic from '../../../assets/foods.png'
import img_edit_ic from '../../../assets/edit.png'
import img_plus_image from '../../../assets/plus_image.jpg'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
//import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from '../../component/CustomDrawerWaitress'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import CustomDrawerWaitress from '../../component/CustomDrawerWaitress';
import CreateCategory from '../category/CreateCategory'
import ListCategory from '../category/ListCategory';
import ListProductByCategogy from '../Product/ListProductByCategogy';
import ListProduct from '../Product/ListProduct';
import Profile from '../auth/Profile'
const Drawer = createDrawerNavigator();
const ListTable = ({ fdata, navigation, props }) => {
  //read data
  const fetchData = () => {
    fetch(shareVarible.URLink + '/tables/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setData(data),
      )
      .catch(error => console.log(error));

    //lấy toàn bộ bills
    fetch(shareVarible.URLink + '/bills/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setDataBills(data),
      )
      .catch(error => console.log(error));
  }
  useEffect(() => {
    fetchData();
  }, [])

  //kiem tra bill do co hay chua 
  const [datatenban, setDataTEnBan] = useState({
    id_ban_an: "",
    ten_ban_an: ''
  })
  const CheckNullTable = (data) => {
    setDataTEnBan({ id_ban_an: data._id })
    // gia tri ten_ban_an và data_id không giống nhau
    const arrbills = Object.values(databills);
    const table = arrbills.find(t => t.id_ban_an === data._id);
    if (table != undefined) {
      navigation.navigate('Bill', { data })
    }
    else {
      Alert.alert('BILL', 'Table empty ! Create bill ?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () =>
            CreateBillabdEditTable(data)
        },
      ]);
    }
  }
  //createBill and EditTable
  const CreateBillabdEditTable = async (data) => {
    //edit table
    const updates = {
      name: data.name,
      peoples: data.peoples,
      status: 1,
      image: data.image
    };
    const response = await fetch(shareVarible.URLink + '/table/update/' + `${data._id}`, {
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
          fetchData();
          console.log("ok")
        }
      }
    )
    fetch(shareVarible.URLink + '/hoa-don',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_ban_an: data._id, ten_ban_an: data.name })
      }).then(res => res.json()).then(
        data => {
          if (data.error) {
            setErrormgs(data.error);
            alert(data.error);
          }
          else {
            alert('Create Bill successfully');
            fetchData();
          }
        }
      )
  }
  const [data, setData] = useState(null);
  const [databills, setDataBills] = useState(null);
  const renderlist = ((item) => {
    return (
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#EDF6D8',
        marginBottom: 10
      }}>

        <Image style={{
          width: 120, height: 120,
          borderRadius: 50, borderColor: 'black',
          borderWidth: 1, marginBottom: 15,
          marginLeft: 10
        }} source={{ uri: item.image }} />
        <View style={{
          marginLeft: 10
        }}>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
          }}>{item.name}</Text>
          {
                  item.status === "0" ? <Text
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'red',
                      zIndex: 1,
                      borderRadius: 30,
                      marginTop : 3
                    }}>
                  </Text> : item.status === "1" ? <Text
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'green',
                      zIndex: 1,
                      borderRadius: 30,
                      marginTop : 3
                    }}>
                  </Text> :<Text
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'yellow',
                      zIndex: 1,
                      borderRadius: 30,
                      marginTop:3
                    }}>
                  </Text>
                }
                <View style ={{flexDirection : 'row'}}>
                <Ionicons name='people' size={28} />
                <Text >{item.peoples}</Text>
                </View>
        </View>
      </View>
    )
  })
  return (
    <SafeAreaView style={{
      height: '100%',
      width: '100%',
      backgroundColor: '#EDF6D8'
    }}>
      <View>
        <SwipeListView
          data={data}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          renderHiddenItem={(data, rowMap) => (
            <View style={{
              flexDirection: 'row',
              height: 135,
              width: 200,
              marginLeft: 250,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#808080',
            }}>
              <View style={{
                height: '100%',
                justifyContent: 'center',
                alignContent: 'center'
              }}>
                <TouchableOpacity
                  onPress={() => CheckNullTable(data.item)}
                >
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                      marginRight: 20,
                    }}
                    source={img_food_ic}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-150}
          keyExtractor={item => item._id}
        />
      </View>
    </SafeAreaView>
  )
}

export default ListTable
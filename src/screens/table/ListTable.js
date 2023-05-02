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
  useEffect(() => {
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
  },[])
const [checknull, setCheckNull] = useState(null);
  const CheckNullTable=(data)=>{
    // console.log(shareVarible.URLink + '/bill/hoadon/'+data.item._id)
    fetch(shareVarible.URLink + '/bill/hoadon/'+data.item._id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setCheckNull(data),
      )
      .catch(error => console.log(error));
  }
  console.log(checknull)
  const [data, setData] = useState(null);
  
  const renderlist = ((item) => {
    return (
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#EDF6D8',
        marginBottom : 10
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
          {item.status === "0" ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >Status : Empty table</Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >Status : occupied table</Text>
          )}
          <Text >Peoples : {item.peoples}</Text>
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
                  onPress={()=> CheckNullTable(data)}
                    // onPress={() => navigation.navigate('Bill', {data})}
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
                {/* <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Bill', { data })}>
                    <Image
                      style={{
                        height: 50,
                        width: 50,
                        marginLeft: 20
                      }}
                      source={img_edit_ic}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-150}
            keyExtractor={item => item._id}
          />
        </View> 
        {/* <TouchableOpacity onPress={() => navigation.navigate('CreateTable')}>
          <Image
            style={{
              height : 50,
              width: 50,
              marginLeft : 340,
              borderRadius: 60,
              position :'absolute',
              zIndex : 1,
              marginTop : 250
            }}
            source={img_plus_image}
          />
        </TouchableOpacity> */}
      </SafeAreaView>
  )
}

export default ListTable
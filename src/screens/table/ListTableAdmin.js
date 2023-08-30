import { View, Text, FlatList, Image, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Swipeble } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view';
import img_food_ic from '../../../assets/foods.png'
import img_edit_ic from '../../../assets/edit.png'
import img_plus_image from '../../../assets/plus_image.jpg'
import img_salenumber from '../../../assets/salenumber.png'
import img_movetable from '../../../assets/table_bar.png'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ListTableAdmin = ({navigation}) => {
  const [databills, setDataBills] = useState(null);
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

      ////lấy toàn bộ bills
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


     //read data
  useEffect(() => {
   fetchData()
  },[])
  const [data, setData] = useState(null);
  ///checktablenull
  const CheckNullTable = (data) => 
  {
    const arrbills = Object.values(databills);
    const table = arrbills.find(t => t.id_ban_an === data._id);
    if (table != undefined) {
      navigation.navigate('BillAdmin', {data})
    }
    else {
      alert("Table have't Bill !")
    }
  }
  const renderlist = ((item) => {
    return (
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#EDF6D8'
      }}>
        <View style={{width : "70%",flexDirection: 'row',}}>
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
          <View style ={{flexDirection : 'row'}}>
                <Ionicons name='people' size={28} />
                <Text >{item.peoples}</Text>
                </View>
          {
                  item.status === "0" ? <Text
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'red',
                      zIndex: 1,
                      borderRadius: 30,
                      marginTop : 8
                    }}>
                  </Text> : item.status === "1" ? <Text
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'green',
                      zIndex: 1,
                      borderRadius: 30,
                      marginTop : 8
                    }}>
                  </Text> :<Text
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'yellow',
                      zIndex: 1,
                      borderRadius: 30,
                      marginTop:8
                    }}>
                  </Text>
                }
          
        </View>
        </View>
        <View style={{width : "10%", justifyContent : 'space-evenly', marginLeft : 30, paddingVertical:25}}>
        <TouchableOpacity
          style={{ marginLeft: 10, }}
          onPress={() => navigation.navigate('EditTable',{item})}
        >
          <Ionicons name='pencil' size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 10, }}
          onPress={() => CheckNullTable(item)}
        >
          <Ionicons name='logo-bitcoin' size={35} />
        </TouchableOpacity>
        </View>
        
      </View>
    )
  })
  return (
<SafeAreaView style ={{
      height : '100%',
      width : '100%',
      backgroundColor : '#EDF6D8'
    }}>
      <View>
        {/* <SwipeListView
          data={data}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          renderHiddenItem={(data, rowMap) => (
            <View style={{
              flexDirection: 'row',
              height: 135,
              width: 200,
              marginLeft: 211,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#808080',
            }}>
              <View style={{
                borderRightWidth: 3,
                height: '100%',
                justifyContent: 'center',
                alignContent: 'center'
              }}>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('EditTable',{ data })}
                > 
                  <Ionicons name='md-pencil' size={55} style={{marginRight : 10}} />
                </TouchableOpacity>
                
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('BillAdmin')}
                >
                  <Image
                  style={{
                    height: 60,
                    width: 60,
                    marginLeft: 20
                  }}
                  
                  source={img_salenumber}
                />
                </TouchableOpacity>
                
              </View>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-200}
          keyExtractor={item => item._id}
        /> */}
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          keyExtractor={item => item._id}/>
        
      </View>
    </SafeAreaView>
  )
}

export default ListTableAdmin
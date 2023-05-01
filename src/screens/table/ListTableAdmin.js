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

const ListTableAdmin = ({navigation}) => {

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
  })
  const [data, setData] = useState(null);
  const renderlist = ((item) => {
    return (
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#EDF6D8'
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
            >Status : Còn Trống</Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >Status : Đã đặt</Text>
          )}
          <Text >Peoples : {item.peoples}</Text>
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
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: '#EDF6D8',
            flexDirection: 'row',
            justifyContent :'flex-end'
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('CreateTable')}>
            <Image
              style={{
                height: '100%',
                width: 45,
                marginRight: 15,
                borderRadius: 60,
              }}
              source={img_plus_image}
            />
          </TouchableOpacity>
        </View>
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
                > 
                  <Image
                  style={{
                    height: 50,
                    width: 50,
                    marginRight: 20,
                  }}
                  source={img_movetable}
                />
                </TouchableOpacity>
                
              </View>
              <View>
                <TouchableOpacity >
                  <Image
                  style={{
                    height: 50,
                    width: 50,
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
        />
      </View>
    </SafeAreaView>
  )
}

export default ListTableAdmin
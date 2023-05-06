import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
const ListProductStep1 = () => {
  const [dataproduct, SetDataProduct] = useState(null)
  const [dataproduct2, SetDataProduct2] = useState({
    id_product : '',
    name : '',
    image :'',
    status :'',
    quantity :'',
    second :'',
    minute:'',
    hour :'',

  })
  const fetchData = () => {
    fetch(shareVarible.URLink + '/productchef/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => SetDataProduct(data),
      )
      .catch(error => console.log(error));  
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []) 
  );

  //Edit Product 
  const EditProduct=async(item)=>{
    console.log(item)
    const now = new Date();
    dataproduct2.id_product = item.id_product
    dataproduct2.name = item.name,
    dataproduct2.image = item.image,
    dataproduct2.status = 1,
    dataproduct2.quantity = item.quantity,
    dataproduct2.second = now.getSeconds(),
    dataproduct2.minute = now.getMinutes(),
    dataproduct2.hour = now.getHours()
    const response = await fetch(shareVarible.URLink + '/productchef/update/'+`${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataproduct2),
    }).then(res => res.json()).then(
      data => {
        if (data.error) {
          setErrormgs(data.error);
          alert(data.error);
        }
        else {
          fetchData()
          alert("OK");
        }
      }
    )
  }
  //render Faglist
  const renderlist = ((item) => {
    return (
      <View>
        {
        item.status == "0" ? <View style={{marginBottom : 3, backgroundColor: '#EDF6D8', paddingVertical : 5, paddingRight : 200,paddingLeft : 5,flexDirection : 'row'}}>
        <Image style={{height : 100, width : 100}}  source={{ uri: item.image }}/>
          <View style={{flexDirection : 'column', justifyContent :'space-between', paddingLeft : 5, width :'100%'}}>
            <Text style={{fontSize : 22}}>{item.name}</Text>
            <Text style={{fontSize : 19}}>X{item.quantity}</Text>
            <Text style={{fontSize : 16}}>Time : ( {item.hour.toString().padStart(2, '0')} : {item.minute.toString().padStart(2, '0')}':{item.second.toString().padStart(2, '0')}s )</Text>
          </View>
          <View style={{justifyContent : 'center', paddingLeft : 30}}>
            <TouchableOpacity  
            onPress={() => EditProduct(item)}
            >
                        <Ionicons name='checkmark-circle-outline' size={55} />
                    </TouchableOpacity>
          </View>
          
        </View> : null
      }
      </View>
      
        
    )
})

  return (
    <View style={{backgroundColor :'black'}}>
            <FlatList
                data={dataproduct}
                renderItem={({ item }) => {
                    return renderlist(item)
                }}
                keyExtractor={item => item._id}

            />
        </View>
  )
}
export default ListProductStep1
const styles = StyleSheet.create({})
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
const ListProductStep1 = () => {
  const [dataproduct, SetDataProduct] = useState(null)
  const [dataproduct2, SetDataProduct2] = useState({
    name: '',
    image: '',
    status: '',
    quantity: '',
    second: '',
    minute: '',
    hour: '',

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
  const sortDataByStatus = (data) => {
    if (data && Array.isArray(data)) {
      const status0 = data.filter(item => item.status === 0);
      const status1 = data.filter(item => item.status === 1);
      const status2 = data.filter(item => item.status === 2);
      return [...status0, ...status1, ...status2];
    } else {
      return [];
    }
  };
  const renderlist = ((item) => {
    return (
      <View style={{ marginBottom: 3, borderBottomWidth: 1, borderColor: 'gray', backgroundColor: '#EDF6D8', paddingVertical: 5, paddingRight: 200, paddingLeft: 5, flexDirection: 'row' }}>
        <Image style={{ height: 100, width: 100 }} source={{ uri: item.image }} />
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 5, width: '100%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 22 }}>{item.name}</Text>
            {
              item.status == 0 ? <Text style={{ height: 15, width: 15, backgroundColor: 'red', marginTop: 10, marginLeft: 10, borderRadius: 20 }}></Text>
                : item.status == 1 ? <Text style={{ height: 15, width: 15, backgroundColor: 'yellow', marginTop: 10, marginLeft: 10, borderRadius: 20 }}></Text>
                  : <Text style={{ height: 15, width: 15, backgroundColor: 'green', marginTop: 10, marginLeft: 10, borderRadius: 20 }}></Text>
            }
          </View>

          <Text style={{ fontSize: 19 }}>X{item.quantity}</Text>
          <Text style={{ fontSize: 16 }}>Time : ( {item.hour.toString().padStart(2, '0')} : {item.minute.toString().padStart(2, '0')}':{item.second.toString().padStart(2, '0')}s )</Text>
        </View>
        <View style={{ justifyContent: 'center', paddingLeft: 30 }}>
          {/* <TouchableOpacity  
            onPress={() => EditProduct(item)}
            >
                        <Ionicons name='checkmark-circle-outline' size={55} />
                    </TouchableOpacity> */}
        </View>

      </View>



    )
  })

  return (
    <View style={{ justifyContent: "center", alignItems: 'center', backgroundColor:'#EDF6D8' }}>
      <Text style={{fontSize: 25, fontWeight:'bold', marginTop: 20}}>FOODS</Text>
      <FlatList
        data={sortDataByStatus(dataproduct)}
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
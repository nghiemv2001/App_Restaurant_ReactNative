import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ListProductInInvoice = ({ navigation, route }) => {
  const dataFaglist = route.params.item.product_list
  const total = dataFaglist.reduce((acc, item) => acc + item.gia*item.so_luong, 0);
  //Design FatList
  const renderlist = ((item) => {
    return (
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#EDF6D8'
      }}>
        <View style={{
          marginLeft: 10,
          flexDirection: 'row',
          height: 105,
          width: '100%',
          padding: 5
        }}>
          <Image style={{
            width: '30%',
            borderRadius: 10
          }}
            source={{ uri: item.hinh_mon }}
          /><View
            style={{
              flexDirection: 'column',
              marginLeft: 10,
              borderWidth: 1,
              borderRadius: 10
            }}
          >
            <Text style={{
              width: '100%',
              height: 50,
              paddingLeft: 10,
              fontSize: 23,
              textAlignVertical: 'center',

            }}>{item.ten_mon}</Text>
            <View style={{
              flexDirection: 'row'
            }}>

              <Text
                style={{
                  width: '25%',
                  fontSize: 18,
                  textAlignVertical: 'center',
                  marginLeft: 10
                }}
              >{item.gia} $</Text>
              <Text
                style={{
                  width: '20%',
                  fontSize: 18,
                  textAlignVertical: 'center',

                }}
              >x {item.so_luong}</Text>
              <Text
                style={{
                  width: '50%',
                  fontSize: 18,
                  textAlignVertical: 'center',

                }}
              >=   {item.gia * item.so_luong} $</Text>
            </View>
          </View>
        </View>
      </View>
    )
  })
  return (
    <View style={styles.V1}>
      <View style={{ marginTop: 30, justifyContent: 'space-between', paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
        onPress={() => navigation.navigate('HomeAdmin')}
      >
        <Ionicons name='arrow-back-sharp' size={35} />
        
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Products In Invoice</Text>
        <Text></Text> 
      </View>
      
   
        <FlatList
          style={{ height: 100 }}
          data={dataFaglist}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          keyExtractor={item => item._id}
        />
        <View style={{height: 70, width:"100%" , borderWidth:1 ,alignItems:'center'}}>
        <Text style={{fontSize: 22, color:"#989898", fontWeight: '500'}}>Total</Text>
          <Text style={{fontSize: 22, color:"#9CE6A9", fontWeight: 'bold'}}>{total}$</Text>
        </View>
    </View>
  )
}

export default ListProductInInvoice
const styles = StyleSheet.create({
  V1: {
    width: '100%',
    height: '100%',
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: 20,
    backgroundColor: '#EDF6D8',
  },
  V11: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  V12: {
    paddingTop: 12,
  },
  V13: {

    flexDirection: 'column',
    marginLeft: 40
  }

})
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ListProductInInvoice = ({ navigation, route }) => {
  const currentHour = route.params.item.hour;
  const hour12Format = currentHour >= 12 ? ' PM' : ' AM';
  const hourIn12HourFormat = currentHour % 12 || 12;
  const formattedHour = `${hourIn12HourFormat.toString().padStart(2, '0')}${hour12Format}`;
  const dataFaglist = route.params.item.product_list
  const itemFlagList = route.params.item;

  const total = dataFaglist.reduce((acc, item) => acc + item.gia * item.so_luong, 0);
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
          onPress={() => navigation.navigate('HomeAdmin')}>
          <Ionicons name='arrow-back-sharp' size={35} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: "700" }}>Chi Tiết Hóa Đơn</Text>
        <Text></Text>
      </View>
      <View style={{ marginTop: 10, paddingLeft: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
          <Ionicons name='fast-food-sharp' size={35} />
          <Text style={{ fontSize: 22, color: "black", fontWeight: '500' }}> {itemFlagList.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
          <Ionicons name='time-outline' size={35} />
          <Text style={{ fontSize: 22, color: "black", fontWeight: '500' }}> {formattedHour} : {itemFlagList.minute} - {itemFlagList.day}/{itemFlagList.month}/{itemFlagList.year}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
          <Ionicons name='person-outline' size={35} />
          <Text style={{ fontSize: 22, color: "black", fontWeight: '500' }}> {itemFlagList.nhan_vien}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 22, color: "black", fontWeight: '700', marginTop: 20, paddingLeft: 10 }}>Danh Sách món</Text>
      <FlatList
        style={{ flex: 1, color: 'red' }}
        data={dataFaglist}
        renderItem={({ item }) => {
          return renderlist(item)
        }}
        keyExtractor={item => item._id}
      />
      <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 32, color: "black", fontWeight:'bold', color:'#37B207' }}> Tổng : {total}đ</Text>
      </View>

    </View>
  )
}

export default ListProductInInvoice
const styles = StyleSheet.create({
  V1: {
    flex: 1,
    flexDirection: 'column',
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
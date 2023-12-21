import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
const ListProductInInvoice = ({ navigation, route }) => {
  const currentHour = route.params.item.hour;
  const hour12Format = currentHour >= 12 ? ' PM' : ' AM';
  const hourIn12HourFormat = currentHour % 12 || 12;
  const formattedHour = `${hourIn12HourFormat.toString().padStart(2, '0')}${hour12Format}`;
  const dataFaglist = route.params.item.product_list
  const itemFlagList = route.params.item;
  const total = dataFaglist.reduce((acc, item) => acc + item.gia * item.so_luong, 0);
  const renderlist = ((item) => {
    return (
      <View style={styles.bossView}>
        <View style={styles.secondView}>
          <Image style={styles.styImage}source={{ uri: item.hinh_mon }}/>
          <View
            style={styles.thirView}>
            <Text style={styles.styName}>{item.ten_mon}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.styPrice}>{item.gia} $</Text>
              <Text
                style={styles.styButton}>x {item.so_luong}</Text>
              <Text
                style={styles.styTotal}>={item.gia * item.so_luong} $</Text>
            </View>
          </View>
        </View>
      </View>
    )
  })
  return (
    <View style={styles.V1}>
      <View style={styles.styView}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeAdmin')}>
          <Ionicons name='arrow-back-sharp' size={35} />
        </TouchableOpacity>
        <Text style={styles.styDetail}>Chi Tiết Hóa Đơn</Text>
        <Text></Text>
      </View>
      <View style={styles.styBottomView}>
        <View style={styles.styViewsmall}>
          <Ionicons name='fast-food-sharp' size={35} />
          <Text style={styles.styText}> {itemFlagList.name}</Text>
        </View>
        <View style={styles.styViewsmall}>
          <Ionicons name='time-outline' size={35} />
          <Text style={styles.styText}> {formattedHour} : {itemFlagList.minute} - {itemFlagList.day}/{itemFlagList.month}/{itemFlagList.year}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
          <Ionicons name='person-outline' size={35} />
          <Text style={styles.styText}> {itemFlagList.nhan_vien}</Text>
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
  styTotal:{
    width: '50%',
    fontSize: 18,
    textAlignVertical: 'center',
  },
  styButton:{
    width: '20%',
    fontSize: 18,
    textAlignVertical: 'center',
  },
  styName:{
    width: '100%',
    height: 50,
    paddingLeft: 10,
    fontSize: 23,
    textAlignVertical: 'center',
  },
  styPrice:{
    width: '25%',
    fontSize: 18,
    textAlignVertical: 'center',
    marginLeft: 10
  },
  styImage:{
    width: '30%',
    borderRadius: 10
  },
  secondView:{
    marginLeft: 10,
    flexDirection: 'row',
    height: 105,
    width: '100%',
    padding: 5
  },
  thirView:{
    flexDirection: 'column',
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 10
  },
  bossView:{
    flexDirection: 'row',
    backgroundColor: '#EDF6D8'
  },
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
  },
  styView:{ marginTop: 30, justifyContent: 'space-between', paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' },
  styDetail:{ fontSize: 22, fontWeight: "700" },
  styBottomView:{ marginTop: 10, paddingLeft: 10 },
  styViewsmall:{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },
  styText:{ fontSize: 22, color: "black", fontWeight: '500' }
})
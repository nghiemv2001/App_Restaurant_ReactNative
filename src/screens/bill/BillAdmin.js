import { View, Text, FlatList, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getAPI, DeteleAPI, editAPI, createAPI } from '../../component/callAPI'
import { SuccessDialog } from '../../component/CustomerAlert'
const BillAdmin = ({ navigation, route }) => {
  const [isVisibleSucc, setIsVisibleSuccc] = useState(false)
  const handleAlret = () =>{
    setIsVisibleSuccc(false)
    navigation.navigate("HomeAdmin")
  }
  const [dataipa, setDataApi] = useState([]);
  const idtable = route.params.data._id
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  var total = 0;
  if (dataipa && dataipa.danh_sach_mon_an && dataipa.danh_sach_mon_an.length !== 0) {
    total = dataipa.danh_sach_mon_an.reduce((acc, danh_sach_mon_an) => {
      return acc + (danh_sach_mon_an.gia * danh_sach_mon_an.so_luong);
    }, 0);
  }
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const formattedTotal = formatNumberWithCommas(total);
  const fetchData = () => {
    getAPI({ linkURL: shareVarible.URLink + '/bill/' + `${idtable}`, }).then(data => {
      setDataApi(data)
    }).catch(error => {
      console.log("Lỗi get API: ", error)
    });
  };
  const CreateInvoice = async () => {
    const updates = {
      name: route.params.data.name,
      peoples: route.params.data.peoples,
      status: 0,
      image: route.params.data.image
    };
    editAPI({ URLink: shareVarible.URLink + '/table/update/' + `${route.params.data._id}`, updates: updates })
    .catch(error => {
      console.error('Lỗi khi cập nhật loại món :', error);
    });
    const now = new Date();
    createAPI({ URLink: shareVarible.URLink + '/invoice/create', fdata: {
      name: dataipa.ten_ban_an,
      total: total,
      nhan_vien: dataipa.ten_nhan_vien,
      id_nhan_vien: dataipa.id_nhan_vien,
      day: now.getDate(),
      month: now.getMonth() + 1,
      minute: now.getMinutes(),
      hour: now.getHours(),
      year: now.getFullYear(),
      product_list: dataipa.danh_sach_mon_an
    } })
    .catch(error => {
      console.error('Lỗi tạo loại món:', error);
    });
    DeteleAPI({ URLink:shareVarible.URLink + '/bill/delete/' + `${dataipa._id}`}).then(data => {
      setIsVisibleSuccc(true)
    })
  }
  const renderlist = ((item) => {
    return (
      <View style={styles.itemBossView}>
        <View style={styles.itemSecondView}>
          <Image style={styles.itemImage}source={{ uri: item.hinh_mon }}/>
          <View style={styles.styView}>
            <Text style={styles.styTextName}>{item.ten_mon}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.styPrices}>{item.gia}đ</Text>
              <Text style={styles.styQuatity}>x{item.so_luong}</Text>
              <Text style={styles.styTotal}>= {item.gia * item.so_luong} đ</Text>
            </View>
          </View>
        </View>
      </View>
    )
  })
  return (
    <SafeAreaView style={styles.styAreView}>
      <SuccessDialog
      isVisible={isVisibleSucc}
      message={"Thành công"}
      onClose={handleAlret}/>
      <View style={styles.styBossView}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeAdmin')}>
          <Ionicons name='arrow-undo-circle-outline' size={45} />
        </TouchableOpacity>
        <Text style={{ fontSize: 32, fontWeight: '700' }}>{route.params.data.name}</Text>
        <Text></Text>
      </View>
      {(dataipa !== null && typeof dataipa === 'object') ?
          <FlatList
            data={dataipa.danh_sach_mon_an}
            renderItem={({ item }) => {
              return renderlist(item)
            }}
            keyExtractor={item => item._id} />
          :
          <Text style={{
          }}>Chưa có bất kì món ăn nào</Text>}
      <View style={styles.styButtonBoss}>
        <View
          style={styles.styText1}>
          <Text style={styles.styText2}>{formattedTotal} </Text>
          <TouchableOpacity onPress={CreateInvoice}>
            <Text
              style={styles.styTextButton}
            >$</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BillAdmin
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  styButton: {
    height: 45, width: 100,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemBossView:{
    flexDirection: 'row',
    backgroundColor: '#EDF6D8'
  },
  itemSecondView:{
    marginLeft: 10,
    flexDirection: 'row',
    height: 105,
    width: '100%',
    padding: 5
  },
  itemImage:{
    width: '30%',
    borderRadius: 10
  },
  styView:{
    flexDirection: 'column',
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 10
  },
  styTextName:{
    width: '105%',
    height: 50,
    paddingLeft: 10,
    fontSize: 23,
    textAlignVertical: 'center',
  },
  styPrices:{
    width: '30%',
    fontSize: 18,
    textAlignVertical: 'center',
    marginLeft: 10
  },
  styQuatity:{
    width: '9%',
    fontSize: 18,
  },
  styTotal:{
    width: '50%',
    fontSize: 18,
    textAlignVertical: 'center',
  },
  styAreView:{
    height: '100%',
    width: '100%',
    backgroundColor: '#EDF6D8'
  },
  styBossView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  styButtonBoss:{
    height: 150,
    width: "100%",
    borderWidth: 1,
    padding: 5,
    marginLeft: 15,
    marginTop: 5,
    borderTopLeftRadius: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  styText1:{
    flexDirection: 'row',
    marginTop: 10
  },
  styText2:{
    fontSize: 32,
    fontWeight: 'bold'
  },
  styTextButton:{
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 100
  }
})
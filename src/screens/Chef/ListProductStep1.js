import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getAPI,DeteleAPI } from '../../component/callAPI'
import { SuccessDialog } from '../../component/CustomerAlert'
const ListProductStep1 = () => {
  const [isVisible, setIsVisible] = useState(false)
  const handleAlret = () =>{
    setIsVisible(false)
  }
  const [dataproduct, SetDataProduct] = useState(null)
  const [modelChooseDelete, setModalChooseDelete] = useState(false)
  const [itemProduct, setItemProduct] = useState(null)
  const [dataproduct2, SetDataProduct2] = useState({
    id_product: '',
    name: '',
    image: '',
    status: '',
    quantity: '',
    second: '',
    minute: '',
    hour: '',

  })
  useFocusEffect(
    React.useCallback(() => {
      getAPI({ linkURL: shareVarible.URLink + '/productchef/'}).then(data => {
        SetDataProduct(data)
    }).catch(error => {
        console.log("Lỗi get API chế biến dưới bếp: ", error)
    });
    }, [])
  );
  const DeleteProduct = () =>{
    DeteleAPI({ URLink:shareVarible.URLink + '/productchef/delete/' + `${itemProduct._id}`}).then(data => {
      fetchData()
     setIsVisible(true)
    })
  }
  const DeletAll = () =>{
    DeteleAPI({ URLink:shareVarible.URLink + '/productchef/status2'}).then(data => {
      fetchData()
      setIsVisible(true)
    })
  }
  const EditProduct =  (item) => {
    if (item.status == 0) {
      dataproduct2.status = 1
    }
    else {
      dataproduct2.status = 2
    }
    const now = new Date();
    dataproduct2.id_product = item.id_product
    dataproduct2.name = item.name,
      dataproduct2.image = item.image,
      dataproduct2.quantity = item.quantity,
      dataproduct2.second = now.getSeconds(),
      dataproduct2.minute = now.getMinutes(),
      dataproduct2.hour = now.getHours()
      editAPI({ URLink: shareVarible.URLink + '/productchef/update/' + `${item._id}`, updates: dataproduct2 })
      .then(data => {
        fetchData()
          setIsVisible(true)
      })    
      .catch(error => {
            console.error('Lỗi khi cập nhật món ăn :', error);
          });
  }
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
    const backgroundColor = item.status === 0 ? '#EEEEEE' : item.status === 1 ? '#FFFF99' : '#99FF66';
    return (
      <View style={{paddingHorizontal: 5}}>
        <View style={{ marginBottom: 3, backgroundColor: backgroundColor, paddingVertical: 5, paddingRight: 200, paddingLeft: 5, flexDirection: 'row', borderWidth: 1, borderRadius: 40 }}>
          <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={{ uri: item.image }} />
          <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 5, width: '130%' }}>
            <Text style={{ fontSize: 22 }}>{item.name}</Text>
            <Text style={{ fontSize: 19 }}>Số lượng : x{item.quantity}</Text>
            <Text style={{ fontSize: 16 }}>Thời gian : ( {item.hour.toString().padStart(2, '0')} : {item.minute.toString().padStart(2, '0')}':{item.second.toString().padStart(2, '0')}s )</Text>
          </View>
          <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
            {item.status === 0 || item.status === 1 ?
              <TouchableOpacity
                onPress={() => EditProduct(item)}>
                <Ionicons name='checkmark-circle-outline' size={45} />
              </TouchableOpacity>
              :  <TouchableOpacity
              onPress={() => {
                setItemProduct(item)
                setModalChooseDelete(true)
              }}>
              <Ionicons name='close' size={45} />
            </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    )
  })

  return (
    <View style={{ backgroundColor: '#EDF6D8', height: '100%' }}>
      
      <Modal
        transparent={true}
        visible={modelChooseDelete}
        animationType='slide'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 100,
            width: 300,
            backgroundColor: "#FDD736",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <TouchableOpacity
              onPress={() => { setModalChooseDelete(false) }}
              style={{ left: 100, top: 10 }}>
              <Ionicons name='close' size={35}/>
            </TouchableOpacity>
            <Ionicons name='cloudy-outline' size={30} color="white" style={{ marginRight: 100 }} />
            <Ionicons name='cloudy-outline' size={30} color="white" style={{ marginLeft: 100 }} />
          </View>
          <View style={{
            height: 200,
            width: 300,
            backgroundColor: "white",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{textAlign:'center', paddingHorizontal: 10}}>Bạn chỉ muốn xóa món này hay toàn bộ món đã hoàn thành trong danh sách?</Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40 }}>
              <TouchableOpacity style={{
                height: 40,
                width: 70,
                borderRadius: 40,
                backgroundColor: '#566FA5',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1
              }}
                onPress={() => {
                  setModalChooseDelete(false)
                   DeleteProduct()
                  }}
              >
                <Text style={{ color: 'white' }}>chỉ một</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                height: 40,
                width: 70,
                borderRadius: 40,
                backgroundColor: '#566FA5',
                justifyContent: 'center',
                alignItems: 'center'
              }}
                onPress={() => {
                  setModalChooseDelete(false)
                  DeletAll()
                }}
              >
                <Text style={{ color: 'white' }}>toàn bộ</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View style={{
            height: 60,
            width: 60,
            position: "absolute",
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            top: 270
          }}>
            <Ionicons name='at-sharp' size={30} />
          </View>
        </View>
      </Modal>
      <SuccessDialog
      isVisible={isVisible}
      message={"Thành công"}
      onClose={handleAlret}/>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'gray', widt: "100%", textAlign: 'center', marginTop: 20 }}></Text>
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
  }
})
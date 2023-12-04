import { View, Text, StyleSheet, Image, TouchableOpacity,Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import shareVarible from './../../AppContext'
import { FlatGrid } from 'react-native-super-grid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
const ListProductByCategogy = ({ route, navigation }) => {
  const [dataipa, setDataIPA] = useState([{}]);
  const [showAlertAdjustProduct, setShowAlertAdjustProduct] = useState(false)
  const [showModalAlert, setShowModalAlert] = useState(false)
  const [itemProduct, setItemProduct] = useState(null);
  const idCategory = route.params.item._id;
  useEffect(() => {
    fetchData();
  }, []);
  const [fdata, setFdata] = useState({
    id_product: "",
    ten_mon: "",
    hinh_mon: "",
    so_luong: "",
    gia: ""
  })
  const [dataChef, setdataChef] = useState({
    id_product: '',
    name: "",
    image: "",
    quantity: "",
    status: '',
    second: '',
    minute: '',
    hour: ''
  })
  const fetchData = () => {
    fetch(shareVarible.URLink + '/products/' + `${idCategory}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setDataIPA(data),
      )
      .catch(error => console.log(error));
  };
  const deleteProduct = () => {
    fetch(shareVarible.URLink + '/product/delete/' + `${itemProduct._id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setShowAlertAdjustProduct(false)
        fetchData();
        setShowModalAlert(true)
      })
      .catch(error => {
        console.error('Lỗi xóa đối tượng:', error);
      }
      )
  }
  return (
    <View style={styles.containerbos}>
      <Modal
        transparent={true}
        visible={showModalAlert}
        animationType='fade'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 300,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            justifyContent:'space-evenly',
            alignItems: 'center',
          }}>

            <View style={{height: 100, width: 100, backgroundColor: '#2D60D6', borderRadius: 70, marginTop: 20, justifyContent: 'center', alignItems:'center'}}>
              <Ionicons  name='checkmark-done-circle-outline' size={60} color={"#FFFCFF"}/>
            </View>
            <Text style={{fontSize:22, fontWeight: "700", color:'#3564C1'}}>
             Thành công
            </Text>
            <TouchableOpacity 
            onPress={()=>{setShowModalAlert(false)}}
            style={{height: 40, width: 140, backgroundColor:'#3564C1', justifyContent:'center', alignItems:'center', borderRadius: 20}}>
              <Text style={{fontSize:22, fontWeight: "700", color:'#FFFCFF'}}>tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={showAlertAdjustProduct}
        animationType='fade'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 70,
            width: 300,
            backgroundColor: "#FDD736",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            
            <Ionicons name='help' size={70} color="white" style={{ marginTop: 3, position: 'absolute' }} />
            <Ionicons name='cloudy-outline' size={30} color="white" style={{ marginRight: 140 }} />
            <Ionicons name='cloudy-outline' size={30} color="white" style={{ marginLeft: 140 }} />
            <TouchableOpacity 
            onPress={()=>{setShowAlertAdjustProduct(false)}}
            style={{ marginLeft: 220, top: -60 }}>
               <Ionicons name='close' size={30} color="black"/>
            </TouchableOpacity>
           

          </View>
          <View style={{
            height: 150,
            width: 300,
            backgroundColor: "white",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 20, fontWeight: '900', marginTop: -10, textAlign:'center' }}>Bạn muốn chỉnh sửa hay xóa món ăn này?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', height: '40%', alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => { setShowAlertAdjustProduct(false)
                deleteProduct()
                }}
                style={[styles.styButtonModal, { backgroundColor: '#D85261' }]}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>xóa</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => { 
                setShowAlertAdjustProduct(false)
                navigation.navigate('EditProduct', {itemProduct})}}
                style={[styles.styButtonModal, { backgroundColor: '#038857' }]}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>chỉnh sửa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeAdmin')}>
          <Ionicons name='arrow-undo-circle-sharp' size={35} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreateProduct', {idCategory})}>
          <Ionicons name='add' size={35} />
        </TouchableOpacity>
      </View>
      {
        dataipa.length != undefined ? <FlatGrid
          itemDimension={130}
          data={dataipa}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={() => {
              setItemProduct(item)
              setShowAlertAdjustProduct(true)
            } }
              style={styles.styButton}>
              <View style={[styles.itemContainer]}>
                <Image style={styles.styimage} source={{ uri: item.image }} />
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <View
                style={styles.container1}>
                <Text style={styles.styText}>{item.price} đ</Text>
                {
                  item.status == "0" ? <Text
                    style={[styles.styText1, { backgroundColor: "green" }]}>
                  </Text> : <Text
                    style={[styles.styText1, { backgroundColor: "red" }]}>
                  </Text>
                }
              </View>
            </TouchableOpacity>
          )}
        /> :
        <View style={styles.container2}>
         <MaterialCommunityIcons name="food-off" size={50} color="black" />
          </View>
      }

    </View>
  )
}

export default ListProductByCategogy
const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    backgroundColor: '#EDF6D1',
    opacity: 0.98
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 140,
  },
  itemName: {
    position: 'absolute',
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 1,
    color: "black",
    height: 29,
    width: 150,
    backgroundColor: '#F4C9C1',
    borderRadius: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    opacity: 0.6
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  styimage: {
    borderRadius: 40,
    padding: 10,
    height: 150,
    width: 180,
    marginTop: 20
  },
  container: {
    height: 50,
    marginTop: 30,
    width: '100%',
    backgroundColor: '#EDF6D8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  containerbos: {
    flex: 1,
    backgroundColor: '#EDF6D1',
  },
  styButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  styText: {
    fontSize: 17,
    fontWeight: '600',
    marginRight: 10
  },
  styText1: {
    height: 10,
    width: 10,
    backgroundColor: 'green',
    zIndex: 1,
    borderRadius: 10
  },
  styText2: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  container2:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    backgroundColor: '#EDF6D8',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  styButtonModal: {
    height: 45, width: 100,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
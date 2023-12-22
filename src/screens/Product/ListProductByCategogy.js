import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect,useContext } from 'react'
import shareVarible from './../../AppContext'
import { FlatGrid } from 'react-native-super-grid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import {SateContext} from './../../component/sateContext'
import { createAPI } from '../../component/callAPI';
import { ErrorDialog } from '../../component/CustomerAlert';
const ListProductByCategogy = ({ route, navigation }) => {
  const {currentName} = useContext(SateContext);
  const [isVisibleErr, setIsVisibleErr] = useState(false)
  const handleAlret = () =>{
    setIsVisibleErr(fasle)
  }
  const [dataipa, setDataIPA] = useState([{}]);
  const idCategory = route.params.item._id;
  const dataroute = route.params.route.params.route.params.data
  const idtable = route.params.route.params.route.params.data._id
  const datakey = uuidv4();
  useEffect(() => {
    getAPI({ linkURL: shareVarible.URLink + '/products/' + `${idCategory}`}).then(data => {
      setDataIPA(data)
    }).catch(error => {
      console.log("Lỗi lấy danh sách món: ", error)
    });
  }, []);
  const [fdata, setFdata] = useState({
    id_product: "",
    nhan_vien_goi: "",
    ten_mon: "",
    hinh_mon: "",
    so_luong: "",
    gia: ""
  })
  const [dataChef, setdataChef] = useState({
    id_product: '',
    id_table: '',
    ten_nhan_vien:"",
    name: "",
    image: "",
    quantity: "",
    status: '',
    second: '',
    minute: '',
    hour: ''
  })
  const sentoBackEnd = (item) => {
    const now = new Date();
    dataChef.id_product = datakey
    dataChef.id_table = idtable
    dataChef.ten_nhan_vien = currentName
    dataChef.name = item.name;
    dataChef.image = item.image;
    dataChef.quantity = 1;
    dataChef.status = 0,
    dataChef.second = now.getSeconds();
    dataChef.minute = now.getMinutes();
    dataChef.hour = now.getHours();

    fdata.id_product = datakey
    fdata.nhan_vien_goi = currentName
    fdata.ten_mon = item.name;
    fdata.hinh_mon = item.image;
    fdata.so_luong = 1;
    fdata.gia = item.price
    if (fdata.ten_mon == '' || fdata.so_luong == "") {
      alert("Không được thiếu")
      return;
    }
    if (item.status == 1) {
      setIsVisibleErr(true)
      return;
    }
    else {
      createAPI({ URLink: shareVarible.URLink + '/productcheft/create', fdata: dataChef })
      .catch(error => {
        console.error('Lỗi thêm món trong bếp:', error);
      });
      createAPI({ URLink: shareVarible.URLink + '/hoa-don/' + `${idtable}` + '/mon-an', fdata: fdata})
      .then(data => {
        const data = dataroute;
              navigation.navigate('Bill', { data })
      })
      .catch(error => {
        console.error('Lỗi tạo món trong hóa đơn:', error);
      });
    }
  }
  return (
    <View style={styles.containerbos}>
      <ErrorDialog
      isVisible={isVisibleErr}
      message={"Hết món"}
      onClose={handleAlret}/>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeWaitress')}>
          <Ionicons name='arrow-back-sharp' size={35} />
        </TouchableOpacity>
      </View>
      {dataipa.length != undefined ? <FlatGrid
          itemDimension={130}
          data={dataipa}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => sentoBackEnd(item)}
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
          )}/> :
          <View style={styles.container2}>
            <MaterialCommunityIcons name="food-off" size={50} color="black" />
          </View>}
    </View>
  )
}

export default ListProductByCategogy
const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    backgroundColor: '#EDF6D1',
    opacity: 0.98,
    top: -20
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
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
  styimage: {
    borderRadius: 40,
    padding: 10,
    height: 150,
    width: 180,
    marginTop: 20
  },
  container: {
    height: 50,
    marginTop: 40,
    width: '100%',
    backgroundColor: '#EDF6D8',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerbos: {
    flex: 1,
    backgroundColor: '#EDF6D8',
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
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#EDF6D8',
  }
})
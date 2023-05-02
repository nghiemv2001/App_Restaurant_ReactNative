import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import img_plus_image from '../../../assets/plus_image.jpg'
import { FlatGrid } from 'react-native-super-grid';

const ListProductByCategogy = ({ route, navigation }) => {
  const [dataipa, setDataIPA] = useState([{}]);
  const idCategory = route.params.item._id;
  const dataroute = route.params.route.params.route.params.data
  const idtable = route.params.route.params.route.params.data.item._id
  const [fdata, setFdata] = useState({
    ten_mon: "",
    hinh_mon: "",
    so_luong: "",
    gia: ""
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
  useEffect(() => {
    fetchData();
  }, []);

  const sentoBackEnd = (item) => {
    fdata.ten_mon = item.name;
    fdata.hinh_mon = item.image;
    fdata.so_luong = 1;
    fdata.gia = item.price
    console.log(fdata)
    if(fdata.ten_mon == '' || fdata.so_luong ==""){
      alert ("Data not null")
    }else{
      fetch(shareVarible.URLink + '/hoa-don/' + `${idtable}` + '/mon-an',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fdata)
      }).then(res => res.json()).then(
        data => {

          if (data.error) {
            setErrormgs(data.error);
            alert(data.error);
          }
          else {
            const data = dataroute;
            navigation.navigate('Bill', {data})
          }
        }
      )
    }
    
  }

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          height: 50,
          marginTop: 20,
          width: '100%',
          backgroundColor: '#EDF6D8',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: 10, }}
          onPress={() => navigation.navigate('HomeWaitress')}
        >
          <Ionicons name='arrow-back-sharp' size={35} />
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate('CreateProduct')}
        >
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
      {
        dataipa.length != undefined ? <FlatGrid
          itemDimension={130}
          data={dataipa}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => sentoBackEnd(item)
              }
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <View style={[styles.itemContainer]}>
                <Image style={styles.styimage} source={{ uri: item.image }} />
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <View
                style={{

                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 15
                }}>
                <Text style={{
                  fontSize: 17,
                  fontWeight: '600',
                  marginRight: 10
                }}>{item.price} $</Text>
                {
                  item.status == "0" ? <Text
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: 'red',
                      zIndex: 1,
                      borderRadius: 10
                    }}>
                  </Text> : <Text
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: 'green',
                      zIndex: 1,
                      borderRadius: 10
                    }}>
                  </Text>
                }
              </View>

            </TouchableOpacity>

          )}
        /> :
          <Text style={{
            height: '100%',
            width: '100%',
            textAlign: 'center',
            textAlignVertical: 'center'
          }}>
            Chưa có sản phẩm loại này ! Bạn có thể tạo một sản phẩm mới!
          </Text>
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
  }
})
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
  const idtable = route.params.route.params.route.params.data._id
  const [fdata, setFdata] = useState({
    id_product: "",
    ten_mon: "",
    hinh_mon: "",
    so_luong: "",
    gia: ""
  })
  const [dataChef, setdataChef] = useState({
    id_product :'',
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
  useEffect(() => {
    fetchData();
  }, []);

  const sentoBackEnd = (item) => {
    //Post Product cheft  
    const now = new Date();
    dataChef.id_product = item._id
    dataChef.name = item.name;
    dataChef.image = item.image;
    dataChef.quantity = 1;
    dataChef.status = 0,
    dataChef.second = now.getSeconds();
    dataChef.minute = now.getHours();
    dataChef.hour = now.getHours();
    fetch(shareVarible.URLink + '/productcheft/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataChef)
      }).then(res => res.json()).then(
        data => {

          if (data.error) {
            setErrormgs(data.error);
            alert(data.error);
          }
          else {
            console.log("ok111")
          }
        }
      )
    // Add product in BIll
    fdata.id_product = item._id
    fdata.ten_mon = item.name;
    fdata.hinh_mon = item.image;
    fdata.so_luong = 1;
    fdata.gia = item.price
    if (fdata.ten_mon == '' || fdata.so_luong == "") {
      alert("Data not null")
      return ;
    } 
    if(item.status == 0){
      alert("Out of sock")
      return;
    }

    else {
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
              navigation.navigate('Bill', { data })
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
            Catalog haven't poduct!
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
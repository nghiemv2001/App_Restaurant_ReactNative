import { View, Text, Image, TouchableOpacity, Alert, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view';
import img_food_ic from '../../../assets/foods.png'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
const Drawer = createDrawerNavigator();
const ListTable = ({ navigation }) => {
  const darkMode = useSelector(state=>state.tableReducer.darkMode);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const [datatenban, setDataTEnBan] = useState({
    id_ban_an: "",
    ten_ban_an: ''
  })
  const [data, setData] = useState(null);
  const [dataitem, setDataItem] = useState(null);
  const [showModel, setShowModal] = useState(false);
  const [databills, setDataBills] = useState(null);
  const [nameTable, setNameTable] = useState(null)
  const [valueTable, setValueTable] = useState(null)
  const [statusAdjustTable, setStatusAdjustTable] = useState(false);
  
  //read data
  const fetchData = () => {
    fetch(shareVarible.URLink + '/tables/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setData(data),
      )
      .catch(error => console.log(error));

    //lấy toàn bộ bills
    fetch(shareVarible.URLink + '/bills/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setDataBills(data),
      )
      .catch(error => console.log(error));
  }
  //kiem tra bill do co hay chua 
  const CheckNullTable = (data) => {
    fetchData()
    setDataTEnBan({ id_ban_an: data._id })
    const arrbills = Object.values(databills);
    const table = arrbills.find(t => t.id_ban_an === data._id);
    if (table != undefined) {
      navigation.navigate('Bill', { data })
    }
    else {
      setShowModal(true)
      setDataItem(data)
    }
  }
  // kiem tra ban do co bill chua va tao mot bill moi
  const CreateBillabdEditTable = (data) => {
    setShowModal(false)
    console.log(shareVarible.URLink + '/table/update/' + `${dataitem._id}`)
    //edit table
    const updates = {
      name: data.name,
      peoples: data.peoples,
      status: 1,
      image: data.image
    };
    const response = fetch(shareVarible.URLink + '/table/update/' + `${dataitem._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    }).then(res => res.json()).then(
      data => {
        if (data.error) {
          alert(data.error);
        }
        else {
          navigation.navigate('Bill', { data })
        }
      }
    )
    //tao mot hoa don 
    fetch(shareVarible.URLink + '/hoa-don',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_ban_an: dataitem._id, ten_ban_an: dataitem.name })
      }).then(res => res.json()).then(
        data => {
          if (data.error) {
      
            alert(data.error);
          }
          else {
            fetchData();
          }
        }
      )
  }
  const renderlist = ((item) => {
    return (
      <View style={styles.containner}>
        <Image style={styles.imagepic} source={{ uri: item.image }} />
        <View style={styles.containner2}>
          <Text style={
            styles.styText
          }>{item.name}</Text>
          {
            item.status === "0" ? <Text
              style={[styles.styTextStatus,
              {
                backgroundColor: 'red',
              }
              ]}>
            </Text> : item.status === "1" ? <Text
              style={[styles.styTextStatus, {
                backgroundColor: 'green',
              }]}>
            </Text> : <Text
              style={[styles.styTextStatus
                , {
                backgroundColor: 'yellow',
              }]}>
            </Text>
          }
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name='people' size={28} />
            <Text >{item.peoples}</Text>
          </View>
        </View>
      </View>
    )
  })

  return (
    <SafeAreaView style={styles.containner3}>
      <Modal
        transparent={true}
        visible={showModel}
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
            <Text style={{
              fontFamily: ''
            }}>It seems that the table doesn't have a bill yet</Text>
            <Text style={{
              fontFamily: ''
            }}>let's create a bill for the table, shall we? </Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40 }}>
              <TouchableOpacity style={{
                height: 40,
                width: 70,
                borderRadius: 40,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1
              }}
              onPress={() => { setShowModal(false) }}
              >
                <Text style={{ color: 'black' }}>skip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                height: 40,
                width: 70,
                borderRadius: 40,
                backgroundColor: '#566FA5',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {CreateBillabdEditTable(data)}}
              >
                <Text style={{ color: 'white' }}>create</Text>
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
      <View>
        <SwipeListView
          data={data}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.containner4}>
              <View style={styles.containner5}>
                <TouchableOpacity
                  onPress={() => CheckNullTable(data.item)}
                >
                  <Image
                    style={styles.styimg}
                    source={img_food_ic}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-150}
          keyExtractor={item => item._id}
        />
      </View>
    </SafeAreaView>
  )
}

export default ListTable

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EDF6D8',
    marginBottom: 10,
    width: "100%"
  },
  imagepic: {
    flex: 3,
    width: 120,
    height: 120,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    marginLeft: 10
  },
  containner2: {
    width: "100%",
    marginLeft: 10,
    flex: 3
  },
  styText: {
    fontSize: 30,
    width: "100%",
    fontWeight: 'bold',
  },
  styTextStatus: {
    height: 30,
    width: 30,
    zIndex: 1,
    borderRadius: 30,
    marginTop: 3
  },
  containner3: {
    height: '100%',
    width: '100%',
    backgroundColor: '#EDF6D8'
  },
  containner4: {
    flexDirection: 'row',
    height: 135,
    width: 200,
    marginLeft: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080',
  },
  containner5: {
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  styimg: {
    height: 50,
    width: 50,
    marginRight: 40,
  },
  styTouch: {
    height: 40, width: 100,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignContent: 'center',
  },
  styText1: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: '500'
  },
  itemContainer: {
    width: 100,
    height: 100,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: 'lightblue',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    width: "100%"
  },
  modalView: {
    height: 250,
    width: 180,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    shadowColor: 'blue',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  View1: {
    height: 250,
    width: 180,
    backgroundColor: 'yellow',
    padding: 30,
    borderRadius: 20,
    shadowColor: 'blue',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  View1: {
    height: 250,
    width: 180,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    shadowColor: 'blue',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
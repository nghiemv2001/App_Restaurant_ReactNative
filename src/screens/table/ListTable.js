import { View, Text, Image, TouchableOpacity, Alert, Modal, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view';
import img_food_ic from '../../../assets/foods.png'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
const Drawer = createDrawerNavigator();
const ListTable = ({ fdata, navigation, props }) => {
  const [datatenban, setDataTEnBan] = useState({
    id_ban_an: "",
    ten_ban_an: ''
  })
  const [data, setData] = useState(null);
  const [showModel, setShowModal] = useState(false);
  const [databills, setDataBills] = useState(null);
  const [nameTable, setNameTable] = useState(null)
  const [valueTable, setValueTable] = useState(null)
  const [showModel2, setShowModal2] = useState(false);
  const [statusAdjustTable, setStatusAdjustTable] = useState(false);
  const data1 = [
    { id: 'a', value: 'A' },
    { id: 'b', value: 'B' },
    { id: 'c', value: 'C' },
    { id: 'd', value: 'D' },
    { id: 'e', value: 'E' },
    { id: 'f', value: 'F' },
  ];
  useEffect(() => {
    fetchData();
  }, [])
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
    setDataTEnBan({ id_ban_an: data._id })
    // gia tri ten_ban_an và data_id không giống nhau
    const arrbills = Object.values(databills);
    const table = arrbills.find(t => t.id_ban_an === data._id);
    if (table != undefined) {
      navigation.navigate('Bill', { data })
    }
    else {
      Alert.alert('BILL', 'Table empty ! Create bill ?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () =>
            CreateBillabdEditTable(data)
        },
      ]);
    }
  }
  // kiem tra ban do co bill chua va tao mot bill moi
  const CreateBillabdEditTable = async (data) => {
    //edit table
    const updates = {
      name: data.name,
      peoples: data.peoples,
      status: 1,
      image: data.image
    };
    const response = await fetch(shareVarible.URLink + '/table/update/' + `${data._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    }).then(res => res.json()).then(
      data => {
        if (data.error) {
          setErrormgs(data.error);
          alert(data.error);
        }
        else {
          fetchData();
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
        body: JSON.stringify({ id_ban_an: data._id, ten_ban_an: data.name })
      }).then(res => res.json()).then(
        data => {
          if (data.error) {
            setErrormgs(data.error);
            alert(data.error);
          }
          else {
            fetchData();
          }
        }
      )
  }
  // chuyen ban , gop ban
  const moveTable = () => {
    setShowModal2(true)
    setShowModal(false)
    setStatusAdjustTable(false)
  }
  const adjustTableItem =(item)=>{
    if(statusAdjustTable){
      console.log("merge", item.name)
      console.log(item)
    }
    else{
      console.log("move", item.name)
      console.log(item)
    }
  }
  const mergeTable = () => {
    setShowModal2(true)
    setShowModal(false)
    setStatusAdjustTable(true)
  }
  const adjustTable = (itemtable) => {
    setValueTable(itemtable)
    setNameTable(itemtable.name)
    setShowModal(true)
  }
  useEffect(() => {
  }, [nameTable, valueTable]);
  //Design item in SwipeListView
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
        <View
          style={{ flex: 4, justifyContent: 'space-evenly', alignItems: 'flex-end', padding: 10 }}
        >
          <TouchableOpacity 
          onPress={() => adjustTable(item)}>
            <Ionicons name='ellipsis-vertical-sharp' size={38} />
          </TouchableOpacity>
        </View>
      </View>
    )
  })

  return (
    <SafeAreaView style={styles.containner3}>
      <View>
        <Modal
          transparent={true}
          visible={showModel}
          animationType='slide'
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView1}>
              <Text style={styles.styText1}>{nameTable}</Text>
              <TouchableOpacity style={styles.styTouch} onPress={() => { moveTable() }}>
                <Text style={{ textAlign: 'center' }}>
                  Move Tabe
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.styTouch, { marginTop: 10 }]} onPress={() => { mergeTable() }}>
                <Text style={{ textAlign: 'center' }}>
                  Merge Tabe
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.styTouch, { marginTop: 10 }]}>
                <Text style={{ textAlign: 'center' }} onPress={() => { setShowModal(false) }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <Modal
            transparent={true}
            visible={showModel2}
            animationType='slide'
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView2}>
                <Text style={styles.styText1}>{nameTable}</Text>

                <FlatList
                  style={{ height: 100, width: 300, }}
                  data={data}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    
                    <TouchableOpacity 
                      onPress={()=>{adjustTableItem(item)}}
                    style={
                      {
                        width: 70, 
                        height: 70, 
                        backgroundColor: 'lightblue', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        margin: 10,
                      }}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  numColumns={3} />
                <TouchableOpacity style={[styles.styTouch, { marginTop: 10 }]}>
                  <Text style={{ textAlign: 'center' }} onPress={() => { setShowModal2(false) }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
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
    marginLeft: 10,
    flex: 3
  },
  styText: {
    fontSize: 30,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView1: {
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
  modalView2: {
    height: 420,
    width: 320,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    shadowColor: 'blue',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
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
  }
})
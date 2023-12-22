import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState , useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view';
import img_food_ic from '../../../assets/foods.png'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import {SateContext} from './../../component/sateContext'
import { getAPI, editAPI } from '../../component/callAPI';
import { ConfirmDialog } from '../../component/CustomerAlert';
const ListTable = ({ navigation }) => {
  const [isVisibleCofirm, setIsVisibleConfirm] = useState(false)
  const handleAlret = () =>{
    setIsVisibleConfirm(false)
  }
  const {currentName, currentID} = useContext(SateContext);
  useFocusEffect(
    React.useCallback(() => {fetchData();}, [])
  );
  const [data, setData] = useState(null);
  const [dataitem, setDataItem] = useState(null);
  const [showModel, setShowModal] = useState(false);
  const [databills, setDataBills] = useState(null);
  const fetchData = () => {
    getAPI({ linkURL: shareVarible.URLink + '/tables/'}).then(data => {
      setData(data)
    }).catch(error => {
      console.log("Lỗi lấy danh sách bàn:", error)
    });
    getAPI({ linkURL: hareVarible.URLink + '/bills/'}).then(data => {
      setDataBills(data)
    }).catch(error => {
      console.log("Lỗi lấy danh sách hóa đơn:", error)
    });
  } 
  const CheckNullTable = (data) => {
    fetchData()
    const arrbills = Object.values(databills);
    const table = arrbills.find(t => t.id_ban_an === data._id);
    if (table != undefined) {
      navigation.navigate('Bill', { data })
    }
    else {
      setIsVisibleConfirm(true)
      setDataItem(data)
    }
  }

  const CreateBillabdEditTable = (data) => {
    setIsVisibleConfirm(false)
    const updates = {
      name: data.name,
      peoples: data.peoples,
      status: 1,
      image: data.image
    };
    editAPI({ URLink: shareVarible.URLink + '/table/update/' + `${dataitem._id}`, updates: updates})
    .then(data => {
      navigation.navigate('Bill', { data })
    })
    .catch(error => {
      console.error('Lỗi khi cập nhật bill:', error);
    });
    
    createAPI({ URLink: shareVarible.URLink + '/hoa-don', fdata:{ id_ban_an: dataitem._id, ten_ban_an: dataitem.name, ten_nhan_vien: currentName, id_nhan_vien: currentID } })
        .then(data => {
          fetchData();
        })
        .catch(error => {
          console.error('Lỗi tạo hóa đơn:', error);
        });
  }
  const renderlist = ((item) => {
    return (
      <View style={styles.containner}>
        <Image style={styles.imagepic} source={{ uri: item.image }} />
        <View style={styles.containner2}>
          <Text style={styles.styText}>{item.name}</Text>
          {
            item.status === "0" ? <Text style={[styles.styTextStatus,{backgroundColor: 'red',}]}></Text> 
            : item.status === "1" ? <Text style={[styles.styTextStatus, {backgroundColor: 'green',}]}></Text> 
            : <Text style={[styles.styTextStatus, {backgroundColor: 'yellow',}]}></Text>
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
      <ConfirmDialog
      isVisible={isVisibleCofirm}
      message={"Tạo hóa đơn"}
      onClose={handleAlret}
      funtionHandle={CreateBillabdEditTable}/>
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
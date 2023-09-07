import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons'
const Bill = ({ navigation, route }) => {
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const [dataipa, SetDataApi] = useState([]);
  const [dataproductchef, SetDataProductChef] = useState(null)
  const idtable = route.params.data._id
  const [errorMsg, setErrorMsg] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showModel, setShowModal] = useState(false);
  const [qty, setQyt] = useState(1);
  const [price, setPrice]= useState(0);
  const CustomAlert = ({ isVisible, message, onConfirm }) => {
    return (
      <Modal
        transparent
        animationType="fade"
        visible={isVisible}
        onRequestClose={onConfirm}
      >
        <View style={styles.modalBackground}>
          <View style={styles.alertContainer}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        </View>
      </Modal>
    );
  };
  const showCustomAlert = (message) => {
    setErrorMsg(message);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      fetchData()
    }, 500);
  };
  const handleConfirm = () => {
    setIsVisible(false);
  };
  var total = 0;
  if (dataipa.length !== 0) {
    total = dataipa.danh_sach_mon_an.reduce((acc, danh_sach_mon_an) => {
      return acc + (danh_sach_mon_an.gia * danh_sach_mon_an.so_luong);
    }, 0);
  }
  //get data 1 bill 
  const fetchData = () => {
    fetch(shareVarible.URLink + '/bill/' + `${idtable}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => SetDataApi(data),
      )
      .catch(error => console.log(error));

    //get list product chef
    fetch(shareVarible.URLink + '/productchef/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => SetDataProductChef(data),
      )
      .catch(error => console.log(error));
  };
  //delete item
  const DeleteItem = (item) => {
    const dataproductchef1 = dataproductchef.find(p => p.id_product === item.id_product);
    if (dataproductchef1.status != 0) {
      alert("The cooked dish cannot be deleted!!!");
    }
    else {
      fetch(shareVarible.URLink + '/monan/delete/' + `${item._id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          showCustomAlert('Delete success!');

        })
        .catch(error => {
          console.error('Error', error);
        }
        )
    }
  }
  const SlowQYT = () => {
    if (qty > 1) {
      setQyt(qty - 1)
    }
  }
  const IncreasQYT = () => {
    setQyt(qty + 1);
    
  }
  useEffect(() => {
  }, [qty]);
  const updateProduct= () =>{
    console.log(price)
    console.log(qty)
    setShowModal(false)
  } 
  //dieu chinh san pham
  const DialogAdjustProduct = (idProduct, soluongProduct, priceproduct) => {
    const valueqty = Number(soluongProduct);
    const valueprice = Number(priceproduct);
    setPrice(valueprice);
    setQyt(valueqty)
    setShowModal(true)
  }
  //Render Faglist
  const renderlist = ((item) => {
    return (
      <View style={styles.container1}>
        <View style={styles.container2}>
          <Image style={styles.styimge} source={{ uri: item.hinh_mon }} />
          <View style={styles.container3}>
            <View style={styles.container4}>
              <Text style={styles.styleText}
                numberOfLines={1} >{item.ten_mon}</Text>
              <View style={styles.container5}>
                <Text style={styles.styleText1}
                >{item.gia} $</Text>
                <Text style={styles.styleText1}
                >x {item.so_luong}</Text>
                <Text style={styles.styleText2}
                >=   {item.gia * item.so_luong} $</Text>
              </View>
            </View>
            <View style={styles.container6}>
              <TouchableOpacity onPress={() => { DialogAdjustProduct(item._id, item.so_luong, item.gia) }}>
                <Ionicons name='ellipsis-vertical-sharp' size={35} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  })
  return (
    <SafeAreaView style={styles.styAreaView}>
      {
        isVisible ? <CustomAlert
          isVisible={isVisible}
          message={errorMsg}
          onConfirm={handleConfirm}
        /> : null
      }
      <Modal
        transparent={true}
        visible={showModel}
        animationType='slide'
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView1}>
            <Text>You can adjust the price and quantity here.</Text>
            <View style={styles.container12}>
              <TextInput
                style={styles.styTIextIP}
                placeholder='price of product'
                keyboardType='numeric'
                enablesReturnKeyAutomatically
                onChangeText={(text) => { setPrice(text) }}
              /><Text>$</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity style={{
              }} onPress={SlowQYT}>
                <Text style={{ fontSize: 32, }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 32, }}>{qty}</Text>
              <TouchableOpacity onPress={IncreasQYT}>
                <Text style={{ fontSize: 32, }}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity style={styles.styTouch} onPress={() => { setShowModal(false) }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.styTouch} onPress={() => { updateProduct() }} >
                <Text>Save</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
      <View style={styles.container7}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeWaitress')}
        >
          <Ionicons name='arrow-back-sharp' size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 10, }}
          onPress={() => navigation.navigate('ListCategory', { route })}
        >
          <Ionicons name='add' size={40} />
        </TouchableOpacity>
      </View>

      {
        (dataipa !== null && typeof dataipa === 'object') ?
          <SwipeListView
            data={dataipa.danh_sach_mon_an}
            renderItem={({ item }) => {
              return renderlist(item)
            }}
            renderHiddenItem={(dataipa, rowMap) => (
              <View style={styles.container8}>
                <View style={styles.container9}>
                  <TouchableOpacity
                    style={{
                      marginBottom: 50
                    }}
                    onPress={() => DeleteItem(dataipa.item)}
                  >
                    <Ionicons
                      style={styles.styIcon}
                      name='trash-bin' size={45} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-150}
            keyExtractor={item => item._id}
          />
          :
          <Text style={{
          }}>Chưa có bất kì món ăn nào</Text>
      }
      <View style={styles.container10}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold'
          }}
        >{total}.00$</Text>
        <View style={styles.container11}>
        </View>
      </View>
    </SafeAreaView>

  )
}

export default Bill
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    flexDirection: "column",
  },
  container1: {
    flexDirection: 'row',
    backgroundColor: '#EDF6D8',
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    marginLeft: 10,
    flexDirection: 'row',
    height: 105,
    width: '95%',
    padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    marginBottom: 10
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  styimge: {
    width: '30%',
    borderRadius: 10
  },
  container3: {
    flexDirection: 'row',
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    height: '100%',
    width: '70%',
  },
  container4: {
    width: "80%"
  },
  styleText: {
    width: '75%',
    height: 50,
    paddingLeft: 10,
    fontSize: 23,
    textAlignVertical: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  container5: {
    flexDirection: 'row'
  },
  styleText1: {
    width: 40,
    fontSize: 18,
    textAlignVertical: 'center',
    marginLeft: 10
  },
  styleText2: {
    width: '50%',
    fontSize: 18,
    textAlignVertical: 'center',
  },
  container6: {
    width: "10%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  styAreaView: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#EDF6D8',
  },
  container7: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  container8: {
    flexDirection: 'row',
    height: 135,
    width: 200,
    marginLeft: 211,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B22222',
    margin: 5
  },
  container9: {
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  styIcon: { marginTop: 28, marginLeft: 20 },
  container10: {
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
  container11: {
    flexDirection: 'row',
    marginTop: 10,

  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
  },
  okButtonText: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView1: {
    height: 300,
    width: 300,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    shadowColor: 'blue',
    elevation: 5,
    justifyContent: 'space-evenly',

  },
  modelText: {
    fontSize: 30,
    marginBottom: 20
  },
  qtyText: {
    fontSize: 24,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
  },
  button1: {
    width: 60,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  container12: {
    height: 40,
    width: 240,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  styTIextIP: {
    height: 40,
    width: 200,
  },
  styTouch: {
    width: 100,
    height: 40,
    backgroundColor: '#00FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10
  }
})
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SateContext } from './../../component/sateContext'
const Bill = ({ navigation, route }) => {
  const { currentName, currentID } = useContext(SateContext);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const getDetails = (type) => {
    if (route.params.data) {
      switch (type) {
        case "id":
          return route.params.data._id
        case "name":
          return route.params.data.name
        case "peoples":
          return route.params.data.peoples
        case "status":
          return 0
        case "image":
          return route.params.data.image
      }
    }
    return ""
  }
  const [dataTable, setdataTable] = useState({
    id: getDetails("id"),
    name: getDetails("name"),
    peoples: getDetails("peoples"),
    status: getDetails("status"),
    image: getDetails("image")
  })
  const [dataTableMove, setdataTableMove] = useState({
    id: getDetails("id"),
    name: getDetails("name"),
    peoples: getDetails("peoples"),
    status: "1",
    image: getDetails("image")
  })
  const [data, setData] = useState(null);
  const [dataipa, SetDataApi] = useState([]);
  const [dataproductchef, SetDataProductChef] = useState(null)
  const [idtable, setIDTable] = useState(route.params.data._id)
  const [nameTable, setNameTable] = useState(route.params.data.name)
  const [errorMsg, setErrorMsg] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [qty, setQyt] = useState(1);
  const [price, setPrice] = useState(0);
  const [dataItem, setDataItem] = useState(null);
  const [showModel, setShowModal] = useState(false);
  const [showModel1, setShowModal1] = useState(false);
  const [showModel2, setShowModal2] = useState(false);
  const [showModel3, setShowModal3] = useState(false);
  const [showModelMove, setShowModalMove] = useState(false);
  const [showModelCofirmMove, setShowModalConfimMove] = useState(false);
  const [databills, setDataBills] = useState(null);
  const [datamerge, setDataMerge] = useState({
    id_ban_doi: "",
    id_ban_nhan: ""
  })
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
  if (dataipa && dataipa.danh_sach_mon_an && dataipa.danh_sach_mon_an.length !== 0) {
    total = dataipa.danh_sach_mon_an.reduce((acc, danh_sach_mon_an) => {
      return acc + (danh_sach_mon_an.gia * danh_sach_mon_an.so_luong);
    }, 0);
  }
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [dataChef, setdataChef] = useState({
    id_product: '',
    id_table: '',
    name: "",
    image: "",
    quantity: "",
    status: '',
    second: '',
    minute: '',
    hour: ''
  })
  const formattedTotal = formatNumberWithCommas(total);
  //get data 1 bill 
  const fetchData = () => {
    fetch(shareVarible.URLink + '/bill/' + `${route.params.data._id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          SetDataApi(data);
          if (data.ten_ban_an) {
            setNameTable(data.ten_ban_an);
          }
        }
      },
      )
      .catch(error => console.log(error));

    //lay danh sach ban
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
  function isNumericString(value) {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  }
  //Update Product in Bill
  const updateProduct = () => {
    const dataproductchef1 = dataproductchef.find(p => {
      if (p.id_product === dataItem.id_product) {
        return p;
      }
    })
    if (dataproductchef1.status != 0) {
      setShowModal(false)
      showCustomAlert("The cooked dish cannot be update!!!");
    }
    else {
      if (isNumericString(price)) {
        fetch(shareVarible.URLink + '/monan/update/' + `${dataItem.id_product}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: qty }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              console.log('Error updating quantity:', data.error);
            }
          }).catch(error => {
            console.error('Error updating quantity:', error);
          });
        fetch(shareVarible.URLink + '/hoa-don/' + `${idtable}` + '/mon-an/' + `${dataItem._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ so_luong: qty, gia: price })
        })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              alert(data.error);
            } else {
              showCustomAlert('Thành công!');
            }
          }).catch(error => {
            console.error(error);
            showCustomAlert('Lỗi trong quá tình tải ảnh');
          });
        setShowModal(false)
      }
      else {
        showCustomAlert("Cần nhập số")
      }
    }

  }
  const deleteItem = (url, id, successCallback) => {
    fetch(`${shareVarible.URLink}/${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        successCallback('Delete success!');
      })
      .catch(error => {
        console.error('Error', error);
      });
  };
  const DeleteItem = (item) => {
    const dataproductchef1 = dataproductchef.find(p => {
      if (p.id_product === item.id_product) {
        return p;
      }
    })
    if (dataproductchef1.status != 0) {
      showCustomAlert("Món ăn đã được chế biến không thể xóa!!!");
    }
    else {
      deleteItem('monan/delete', item._id, showCustomAlert);
      deleteItem('productcheft/delete', item.id_product, showCustomAlert);
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

  const moveTable = () => {
    const datamerge = {
      id_ban_nhan: dataItem._id,
      id_ban_doi: route.params.data._id,
    };
    fetch(shareVarible.URLink + '/table/update/' + `${datamerge.id_ban_doi}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataTable),
    }).then(res => res.json()).then(
      data => {
        if (data.error) {
          console.log(data.error)
        }
      }
    )
    fetch(shareVarible.URLink + '/table/update/' + `${datamerge.id_ban_nhan}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 1 }),
    }).then(res => res.json()).then(
      data => {
        if (data.error) {
          console.log(data.error)
        }
      }
    )
    fetch(shareVarible.URLink + '/bill/update/' + `${dataipa._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ten_ban_an: dataItem.ten_ban_an, ten_nhan_vien: currentName, danh_sach_mon_an: dataipa.danh_sach_mon_an }),
    }).then(res => res.json()).then(
      data => {
        if (data.error) {
          console.log(data.error)
        }
      }
    )
    fetch(shareVarible.URLink + '/hoa-don',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_ban_an: datamerge.id_ban_nhan, ten_ban_an: dataItem.name, id_nhan_vien: currentID, ten_nhan_vien: currentName })
      }).then(res => res.json()).then(
        data => {
          if (data.error) {
            console.log(data.error)
          }
          else {
            fetch(shareVarible.URLink + '/movebill',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_doi: datamerge.id_ban_doi, id_nhan: datamerge.id_ban_nhan })
              }).then(res => res.json()).then(
                data => {
                  if (data.error) {
                    console.log(data.error)
                  }
                  else {
                    route.params.data._id = datamerge.id_ban_nhan
                    setIDTable(datamerge.id_ban_nhan)
                    fetchData()
                    setNameTable(dataipa.ten_ban_an)
                    setShowModalConfimMove(false)
                  }
                }
              )
          }
        }
      )
  }
  const MergeTable = () => {
    const datamerge = {
      id_ban_nhan: dataItem._id,
      id_ban_doi: route.params.data._id,
    };
    const response = fetch(shareVarible.URLink + '/table/update/' + `${datamerge.id_ban_doi}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataTable),
    }).then(res => res.json()).then(
      data => {
        if (data.error) {
          alert(data.error);
        }
      }
    )
    fetch(shareVarible.URLink + '/merge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datamerge)
    }).then(res => res.json()).then(
      data => {
        if (data.error) {
          setErrormgs(data.error);
          alert(data.error);
        } else {
          route.params.data._id = datamerge.id_ban_nhan
          setIDTable(datamerge.id_ban_nhan)
          fetchData()
          setNameTable(dataipa.ten_ban_an)
          setShowModal2(false)
        }
      }
    );
  }

  useEffect(() => {
    fetchData();
  }, [idtable, qty]);
  //dieu chinh san pham
  const DialogAdjustProduct = (item, soluongProduct, priceproduct) => {
    setDataItem(item)
    const valueqty = Number(soluongProduct);
    const valueprice = Number(priceproduct);
    setPrice(valueprice);
    setQyt(valueqty)
    setShowModal(true)
  }

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
                  numberOfLines={1}
                >{item.gia} đ</Text>
                <Text style={[styles.styleText1, { width: "15%" }]}
                  numberOfLines={1}
                >x {item.so_luong}</Text>
                <Text style={styles.styleText2}
                  numberOfLines={1}
                >= {item.gia * item.so_luong} đ</Text>
              </View>
            </View>
            <View style={styles.container6}>
              <TouchableOpacity onPress={() => { DialogAdjustProduct(item, item.so_luong, item.gia) }}>
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
      {/* confirm merge or move*/}
      <Modal
        transparent={true}
        visible={showModel1}
        animationType='fade'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 350,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>

            <View style={{ height: 90, width: 90, backgroundColor: '#F6D3B3', borderRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='alert' size={60} color={"#FFFCFF"} />
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowModal1(false)
                setShowModalMove(true)
              }}
              style={{ height: 40, width: 140, backgroundColor: '#3085D6', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Chuyển bàn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal1(false)
                setShowModal2(true)
              }}
              style={{ height: 40, width: 140, backgroundColor: '#3085D6', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Nhập bàn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setShowModal1(false) }}
              style={{ height: 40, width: 140, backgroundColor: '#D03737', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*FlaList merge */}

      <Modal
        transparent={true}
        visible={showModel2}
        animationType='slide'
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView3}>
            <Text style={styles.styText1}>--{nameTable}--</Text>
            <FlatList
              style={{ height: 100, width: 300, }}
              data={data}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                (item.status == "1" && item._id != dataTable.id) ?
                  <TouchableOpacity
                    onPress={() => {
                      setShowModal3(true)
                      setDataItem(item)
                      setShowModal2(false)
                    }}
                    style={
                      {
                        width: 90,
                        height: 90,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 10,
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 40
                      }}>
                    <Ionicons name="restaurant-outline" size={35} />
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                  : null
              )}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              numColumns={3} />
            <TouchableOpacity
              onPress={() => { setShowModal2(false) }}
              style={{ height: 40, width: 140, backgroundColor: '#D03737', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* FlaList merge move */}
      <Modal
        transparent={true}
        visible={showModelMove}
        animationType='slide'
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView3}>
            <Text style={styles.styText1}>--{nameTable}--</Text>
            <FlatList
              style={{ height: 100, width: 300, }}
              data={data}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                (item.status == "0" && item._id != dataTable.id) ?
                  <TouchableOpacity
                    onPress={() => {
                      setShowModalConfimMove(true)
                      setShowModalMove(false)
                      setDataItem(item)
                    }}
                    style={
                      {
                        width: 90,
                        height: 90,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 10,
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 40
                      }}>
                    <Ionicons name="restaurant-outline" size={35} />
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                  : null
              )}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              numColumns={3} />
            <TouchableOpacity
              onPress={() => { setShowModalMove(false) }}
              style={{ height: 40, width: 140, backgroundColor: '#D03737', justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: 30 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* confirm merge */}
      <Modal
        transparent={true}
        visible={showModel3}
        animationType='fade'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 300,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>

            <View style={{ height: 90, width: 90, backgroundColor: '#F6D3B3', borderRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='alert' size={60} color={"#FFFCFF"} />
            </View>
            <Text style={{ fontSize: 22, fontWeight: "700", color: 'black' }}>
              NHẬP BÀN
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal3(false)
                MergeTable()
              }}
              style={{ height: 40, width: 140, backgroundColor: '#3085D6', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Chấp nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setShowModal3(false) }}
              style={{ height: 40, width: 140, backgroundColor: '#D03737', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* confirm move */}
      <Modal
        transparent={true}
        visible={showModelCofirmMove}
        animationType='fade'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 300,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>

            <View style={{ height: 90, width: 90, backgroundColor: '#F6D3B3', borderRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='alert' size={60} color={"#FFFCFF"} />
            </View>
            <Text style={{ fontSize: 22, fontWeight: "700", color: 'black' }}>
              CHUYỂN BÀN
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModalMove(false)
                moveTable()
              }}
              style={{ height: 40, width: 140, backgroundColor: '#3085D6', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Chấp nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => { setShowModalConfimMove(false) }}
              style={{ height: 40, width: 140, backgroundColor: '#D03737', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* adjust product item in flalist */}
      <Modal
        transparent={true}
        visible={showModel}
        animationType='slide'
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView1}>

            <View style={{ height: 90, width: 90, backgroundColor: '#F6D3B3', borderRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='alert' size={60} color={"#FFFCFF"} />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: '700' }}>Điều Chỉnh Số Lượng</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{
              }} onPress={SlowQYT}>
                <Text style={{ fontSize: 32, }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 32, paddingHorizontal: 40 }}>{qty}</Text>
              <TouchableOpacity onPress={IncreasQYT}>
                <Text style={{ fontSize: 32, }}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity style={[styles.styTouch, { backgroundColor: "#3085D5", marginRight: 10 }]} onPress={() => { updateProduct() }} >
                <Text style={{ fontSize: 18, fontWeight: '700' }}>Xác Nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.styTouch, { backgroundColor: "#D03737" }]} onPress={() => { setShowModal(false) }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>Hủy</Text>
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
        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ fontSize: 22, fontWeight: '700' }}>{nameTable}</Text>
          <TouchableOpacity onPress={() => { setShowModal1(true) }}>
            <Ionicons name="caret-down-sharp" size={30} />
          </TouchableOpacity>

        </View>
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
            style={styles.swipeListView}
            data={dataipa.danh_sach_mon_an}
            renderItem={({ item, index }) => {
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
            keyExtractor={(item, index) => index.toString()}
          />
          :
          <View style={styles.View1}>
            <Text style={{
            }}>Chưa có bất kì món ăn nào</Text>
          </View>
      }
      <View style={styles.container10}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold'
          }}
        >{formattedTotal} đ</Text>
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
    width: '40%',
    fontSize: 18,
    textAlignVertical: 'center',

  },
  styleText2: {
    width: '51%',
    fontSize: 18,
    textAlignVertical: 'center',
  },
  container6: {
    left: 13,
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
    alignItems: 'center'

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
    height: 45,
    width: 120,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView2: {
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
  modalView3: {
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
  styText1: {
    fontSize: 22,
    top: -10,
    fontWeight: '700'
  },
  View1: {
    height: "70%",
    justifyContent: 'center',
    alignItems: "center"
  }
})
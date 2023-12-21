import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SateContext } from './../../component/sateContext'
import { DialogMoveAdjust, ErrorDialog, SuccessDialog, ConfirmDialog } from '../../component/CustomerAlert'
import { useSelector, useDispatch } from 'react-redux'
import { getAPI, editAPI, createAPI } from '../../component/callAPI'
const Bill = ({ navigation, route }) => {
  const [isVisibleErr, setIsVisibleErr] = useState(false)
  const [isVisibleSucc, setIsVisibleSucc] = useState(false)
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)
  const [isVisibleConfirmMerger, setIsVisibleConfirmMerger] = useState(false)
  const [isVisibleMoveAdjust, setIsVisibleMovAndAjust] = useState(false)
  const [message, setMesage] = useState("")
  const tables = useSelector(state => state.tableReducer.tableList);
  const dispatch = useDispatch();
  const handleAlret = () => {
    setIsVisibleErr(false)
    setIsVisibleSucc(false)
    setIsVisibleMovAndAjust(false)
    setIsVisibleConfirm(false)
    setIsVisibleConfirmMerger(false)
  }
  const { currentName, currentID } = useContext(SateContext);
  useEffect(() => {
    fetchData();
  }, [idtable, qty]);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      dispatch({ type: 'GET_BILLS' })
      dispatch({ type: "GET_TABLE_LIST" });
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
  const [dataipa, SetDataApi] = useState([]);
  const [dataproductchef, SetDataProductChef] = useState(null)
  const [idtable, setIDTable] = useState(route.params.data._id)
  const [nameTable, setNameTable] = useState(route.params.data.name)
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
  var total = 0;
  if (dataipa && dataipa.danh_sach_mon_an && dataipa.danh_sach_mon_an.length !== 0) {
    total = dataipa.danh_sach_mon_an.reduce((acc, danh_sach_mon_an) => {
      return acc + (danh_sach_mon_an.gia * danh_sach_mon_an.so_luong);
    }, 0);
  }
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const formattedTotal = formatNumberWithCommas(total);
  const fetchData = () => {
    getAPI({ linkURL: shareVarible.URLink + '/bill/' + `${route.params.data._id}` }).then(data => {
      SetDataApi(data);
      if (data.ten_ban_an) {
        setNameTable(data.ten_ban_an);
      }
    }).catch(error => {
      console.log("Lỗi get API bill: ", error)
    });
    getAPI({ linkURL: shareVarible.URLink + '/productchef/' }).then(data => {
      SetDataProductChef(data)
    }).catch(error => {
      console.log("Lỗi get API sản phẩm bếp: ", error)
    });
  };
  function isNumericString(value) {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  }
  const updateProduct = () => {
    const dataproductchef1 = dataproductchef.find(p => {
      if (p.id_product === dataItem.id_product) {
        return p;
      }
    })
    if (dataproductchef1.status != 0) {
      setShowModal(false)
      setMesage("Món ăn không thể điều chỉnh do đã chế biến!!!");
      setIsVisibleErr(true)
    }
    else {
      if (isNumericString(price)) {
        editAPI({ URLink: shareVarible.URLink + '/monan/update/' + `${dataItem.id_product}`, updates: { quantity: qty } })
          .catch(error => {
            console.error('Lỗi khi cập nhật món ăn :', error);
          });
        editAPI({ URLink: shareVarible.URLink + '/hoa-don/' + `${idtable}` + '/mon-an/' + `${dataItem._id}`, updates: { so_luong: qty, gia: price } })
          .then(data => {
            setMesage('Thành công!');
            setIsVisibleSucc(true)
          })
          .catch(error => {
            console.error('Lỗi khi cập nhật loại món trong bếp :', error);
          });
        setShowModal(false)
      }
      else {
        setMesage("Cần nhập số")
        setIsVisible(true)
      }
    }

  }
  const deleteItem = (url, id) => {
    fetch(`${shareVarible.URLink}/${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        fetchData()
        setMesage('Xóa thành công!');
        setIsVisibleSucc(true)
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
    if (dataproductchef1 && dataproductchef1.status !== 0) {
      setMesage("Món ăn đã được chế biến không thể xóa!!!");
      setIsVisibleErr(true)
    }
    else {
      deleteItem('monan/delete', item._id);
      deleteItem('productcheft/delete', item.id_product);
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
    editAPI({ URLink: shareVarible.URLink + '/table/update/' + `${datamerge.id_ban_doi}`, updates: dataTable })
      .catch(error => {
        console.error('Lỗi khi cập nhật bàn:', error);
      });
    editAPI({ URLink: shareVarible.URLink + '/table/update/' + `${datamerge.id_ban_nhan}`, updates: { status: 1 } })
      .catch(error => {
        console.error('Lỗi khi cập nhật bàn:', error);
      });
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
    createAPI({ URLink: shareVarible.URLink + '/hoa-don', fdata: { id_ban_an: datamerge.id_ban_nhan, ten_ban_an: dataItem.name, id_nhan_vien: currentID, ten_nhan_vien: currentName } })
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          createAPI({ URLink: shareVarible.URLink + '/movebill', fdata: { id_doi: datamerge.id_ban_doi, id_nhan: datamerge.id_ban_nhan } })
            .then(data => {
              route.params.data._id = datamerge.id_ban_nhan
              setIDTable(datamerge.id_ban_nhan)
              fetchData()
              setNameTable(dataipa.ten_ban_an)
              setShowModalConfimMove(false)
            })
            .catch(error => {
              console.error('Lỗi tạo chuyển hóa đơn:', error);
            });
        }
      })
      .catch(error => {
        console.error('Lỗi tạo hóa đơn:', error);
      });
  }
  const MergeTable = () => {
    const datamerge = {
      id_ban_nhan: dataItem._id,
      id_ban_doi: route.params.data._id,
    };
    editAPI({ URLink: shareVarible.URLink + '/table/update/' + `${datamerge.id_ban_doi}`, updates: dataTable })
      .catch(error => {
        console.error('Lỗi khi cập nhật bàn dời:', error);
      });
    createAPI({ URLink: shareVarible.URLink + '/merge', fdata: datamerge })
      .then(data => {
        route.params.data._id = datamerge.id_ban_nhan
        setIDTable(datamerge.id_ban_nhan)
        fetchData()
        setNameTable(dataipa.ten_ban_an)
        setShowModal2(false)
      })
      .catch(error => {
        console.error('Lỗi nhập bàn:', error);
      });
  }
  const DialogAdjustProduct = (item, soluongProduct, priceproduct) => {
    setDataItem(item)
    const valueqty = Number(soluongProduct);
    const valueprice = Number(priceproduct);
    setPrice(valueprice);
    setQyt(valueqty)
    setShowModal(true)
  }

  const OpenMove = () => {
    setShowModalMove(true)
  }
  const OpenMerger = () => {
    setShowModal2(true)
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
      <ErrorDialog
        isVisible={isVisibleErr}
        message={message}
        onClose={handleAlret} />
      <SuccessDialog
        isVisible={isVisibleSucc}
        message={message}
        onClose={handleAlret} />
      <DialogMoveAdjust
        isVisible={isVisibleMoveAdjust}
        onClose={handleAlret}
        funtionHandle1={OpenMove}
        funtionHandle2={OpenMerger} />
      <Modal
        transparent={true}
        visible={showModel2}
        animationType='slide'>
        <View style={styles.centeredView2}>
          <View style={styles.modalView3}>
            <Text style={styles.styText1}>--{nameTable}--</Text>
            <FlatList
              style={{ height: 100, width: 300, }}
              data={tables}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                (item.status == "1" && item._id != dataTable.id) ?
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisibleConfirmMerger(true)
                      setDataItem(item)
                      setShowModal2(false)
                    }}
                    style={styles.styFlagList}>
                    <Ionicons name="restaurant-outline" size={35} />
                    <Text>{item.name}</Text>
                  </TouchableOpacity> : null)}
              contentContainerStyle={styles.contentContainerStyle}
              numColumns={3} />
            <TouchableOpacity
              onPress={() => { setShowModal2(false) }}
              style={{ height: 40, width: 140, backgroundColor: '#D03737', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={showModelMove}
        animationType='slide'>
        <View style={styles.centeredView2}>
          <View style={styles.modalView3}>
            <Text style={styles.styText1}>--{nameTable}--</Text>
            <FlatList
              style={{ height: 100, width: 300, }}
              data={tables}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                (item.status == "0" && item._id != dataTable.id) ?
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisibleConfirm(true)
                      setShowModalMove(false)
                      setDataItem(item)
                    }}
                    style={
                      styles.styFlagList}>
                    <Ionicons name="restaurant-outline" size={35} />
                    <Text>{item.name}</Text>
                  </TouchableOpacity> : null)}
              contentContainerStyle={styles.contentContainerStyle}
              numColumns={3} />
            <TouchableOpacity
              onPress={() => { setShowModalMove(false) }}
              style={{ height: 40, width: 140, backgroundColor: '#D03737', justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: 30 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ConfirmDialog
        isVisible={isVisibleConfirmMerger}
        message={"Nhập bàn"}
        onClose={handleAlret}
        funtionHandle={MergeTable} />
      <ConfirmDialog
        isVisible={isVisibleConfirm}
        message={"Chuyển bàn"}
        onClose={handleAlret}
        funtionHandle={moveTable} />
      <Modal
        transparent={true}
        visible={showModel}
        animationType='slide'>
        <View style={styles.centeredView}>
          <View style={styles.modalView1}>
            <View style={{ height: 90, width: 90, backgroundColor: '#F6D3B3', borderRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='alert' size={60} color={"#FFFCFF"} />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: '700' }}>Điều Chỉnh Số Lượng</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={SlowQYT}>
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
        <TouchableOpacity onPress={() => navigation.navigate('HomeWaitress')}>
          <Ionicons name='arrow-back-sharp' size={35} />
        </TouchableOpacity>
        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ fontSize: 22, fontWeight: '700' }}>{nameTable}</Text>
          <TouchableOpacity onPress={() => { setIsVisibleMovAndAjust(true) }}>
            <Ionicons name="caret-down-sharp" size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ marginLeft: 10, }}
          onPress={() => navigation.navigate('ListCategory', { route })}>
          <Ionicons name='add' size={40} />
        </TouchableOpacity>
      </View>
      {(dataipa !== null && typeof dataipa === 'object') ?
        <SwipeListView
          style={styles.swipeListView}
          data={dataipa.danh_sach_mon_an}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          renderHiddenItem={(dataipa) => (
            <View style={styles.container8}>
              <View style={styles.container9}>
                <TouchableOpacity
                  style={{ marginBottom: 50 }}
                  onPress={() => DeleteItem(dataipa.item)}>
                  <Ionicons
                    style={styles.styIcon}
                    name='trash-bin' size={45} />
                </TouchableOpacity>
              </View>
            </View>)}
          leftOpenValue={0}
          rightOpenValue={-150}
          keyExtractor={(index) => index.toString()} /> :
        <View style={styles.View1}>
          <Text style={{
          }}>Chưa có bất kì món ăn nào</Text>
        </View>}
      <View style={styles.container10}>
        <Text
          style={{ fontSize: 32, fontWeight: 'bold' }}>{formattedTotal} đ</Text>
        <View style={styles.container11}>
        </View>
      </View>
    </SafeAreaView>
  )
}
export default Bill
const styles = StyleSheet.create({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView3: {
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
  styFlagList: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 40
  },
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
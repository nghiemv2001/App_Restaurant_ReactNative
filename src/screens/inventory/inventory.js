import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ModalDropdown from 'react-native-modal-dropdown';
import { getAPI, editAPI, createAPI, DeteleAPI } from '../../component/callAPI'
import { ErrorDialog, SuccessDialog } from '../../component/CustomerAlert';
import { pickImage, takeImage } from '../../component/Cloudinary';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Inventory = ({ route, navigation }) => {
  const [isVisibleErr, setIsVisibleErr] = useState(false)
  const [isVisibleSuc, setIsVisibleSuc] = useState(false)
  const handleAlret = () => {
    setIsVisibleErr(false)
    setIsVisibleSuc(false)
  }
  const [message, setMesage] = useState("")
  const [modalAjust, setModalAdjust] = useState(false)
  const [modalCreate, setModalCreate] = useState(false)
  const [apiInvetory, setAPIInventory] = useState([{}]);
  const [fitem, setFitem] = useState(1)
  const [image, setImage] = useState(null);
  const [finventory, setFInventory] = useState({
    id_ingedient: route.params.item._id,
    name: "",
    quantities: "",
    entiry: "",
    image: ""
  })
  const [cinventory, setCInventory] = useState({
    id_ingedient: route.params.item._id,
    name: "",
    quantities: "",
    entiry: "",
    image: ""
  })
  const [errormgs, setErrormgs] = useState(null)
  const [qty, setQyt] = useState(1);
  const SlowQYT = () => {
    if (qty > 1) {
      setQyt(qty - 1)
      setFitem({ ...fitem, quantities: qty - 1 })
    }
  }

  const IncreasQYT = () => {
    setQyt(qty + 1);
    setFitem({ ...fitem, quantities: qty + 1 })
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAPI({ linkURL: shareVarible.URLink + '/inventory/' + `${route.params.item._id}` }).then(data => {
      setAPIInventory(data)
    }).catch(error => {
      console.log("Lỗi get nguyên liệu: ", error)
    });
  };

  const handlePickImage = async () => {
    try {
      const imageUrl = await pickImage();
      setFdata({ ...fdata, image: imageUrl })
      setImage(imageUrl)
    } catch (error) {
      console.error('Lỗi tải ảnh: ', error);
    }
  };

  const handleTakeImage = async () => {
    try {
      const imageUrl = await takeImage();
      setFdata({ ...fdata, image: imageUrl })
      setImage(imageUrl)
    } catch (error) {
      console.error('Lỗi tải ảnh: ', error);
    }
  };

  const handleDropdownSelect = (index, value) => {
    setFInventory({ ...finventory, entiry: value })
  }
  const createInventory = () => {
    if (finventory.name == "") {
      setMesage("Thiếu thông tin")
      setIsVisibleErr(true)
      return;
    }
    if (finventory.quantities == "" || isNaN(finventory.quantities)) {
      setMesage("Thiếu thông tin")
      setIsVisibleErr(true)
      return;
    }
    if (finventory.entiry == "") {
      setMesage("Thiếu thông tin")
      setIsVisibleErr(true)
      return;
    }
    if (finventory.image == "") {
      setMesage("Thiếu thông tin")
      setIsVisibleErr(true)
      return;
    }
    else {
      createAPI({ URLink: shareVarible.URLink + '/inventory/create', fdata: finventory })
        .then(data => {
          setFInventory({ ...finventory, name: "", quantities: "", entiry: "trai" })
          setImage(null);
          fetchData();
          setIsVisibleSuc(true)
        })
        .catch(error => {
          console.error('Lỗi tạo nguyên liệu:', error);
        });
    }
  }

  const editInventory = () => {
    editAPI({ URLink: shareVarible.URLink + '/inventory/update/' + `${fitem._id}`, updates: fitem })
      .then(data => {
        setModalAdjust(false)
       setIsVisibleSuc(true)
        fetchData()
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật nguyên liệu trong bếp :', error);
      });
  }

  const deleteInventory = () => {
    DeteleAPI({ URLink: shareVarible.URLink + '/inventory/delete/' + `${fitem._id}` }).then(data => {
      setModalAdjust(false)
      setIsVisibleSuc(true)
      fetchData()
    })
  }

  const renderItem = ((item) => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ height: 80, marginBottom: 3, paddingVertical: 5, paddingLeft: 5, flexDirection: 'row', borderWidth: 1, borderRadius: 40, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={{ height: 60, width: 60, marginLeft: 10, borderRadius: 30 }} source={{ uri: item.image }} />
            <Text style={{ marginLeft: 10, fontSize: 18 }}>{item.name} - {item.quantities} {item.entiry}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            setFitem(item)
            setQyt(item.quantities)
            setModalAdjust(true)
          }
          }>
            <Ionicons name='caret-down-outline' size={35} />
          </TouchableOpacity>
        </View>
      </View>

    )
  })
  return (
    <View>
      <ErrorDialog
        isVisible={isVisibleErr}
        message={message}
        onClose={handleAlret} />
      <SuccessDialog
        isVisible={isVisibleSuc}
        message={"Thành công"}
        onClose={handleAlret} />
      <Modal
        transparent={true}
        visible={modalCreate}
        animationType='slide'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 450,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            borderWidth: 1,
            alignItems: 'center'
          }}>
            <TouchableOpacity
              style={{ left: 120, top: 20 }}
              onPress={() => { setModalCreate(false) }}>
              <Ionicons name='close' size={35} />
            </TouchableOpacity>
            <TextInput
              onPressIn={() => setErrormgs(null)}
              onChangeText={(text) => setFInventory({ ...finventory, name: text })}
              style={[styles.inputname, { width: 240, marginRight: 20, marginTop: 20 }]}
              value={finventory.name}
              placeholder="Tên nguyên liệu"
            />
            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', marginLeft: 40 }}>
              <TextInput
                onPressIn={() => setErrormgs(null)}
                onChangeText={(text) => setFInventory({ ...finventory, quantities: text })}
                style={[styles.inputname, { width: 110, textAlign: 'center' }]}
                value={finventory.quantities}
                keyboardType='number-pad'
                placeholder="số lượng"
              />
              <View style={{ width: 180, borderRadius: 20, padding: 5, paddingLeft: 10 }}>
                <ModalDropdown
                  dropdownTextStyle={{ fontSize: 22, width: 150, borderRadius: 20, padding: 5 }}
                  textStyle={{ fontSize: 22 }}
                  style={{ marginLeft: 20, marginRight: 20 }}
                  defaultValue='kilogram'
                  onSelect={handleDropdownSelect}
                  options={['Trái', 'Củ', 'Bó', 'Thùng', 'Chai', 'gam', 'kilogam']} />
              </View>

            </View>
            {
              image == null ? <View style={[styles.uploadimge, { justifyContent: 'center', alignItems: 'center' }]}><Ionicons name="camera-outline" size={50} /></View> : image && <Image source={{ uri: image }} style={styles.uploadimge} />
            }
            <View style={styles.styView2}>
              <TouchableOpacity
                onPress={handleTakeImage}
              >
                <Ionicons name='logo-instagram' size={35} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePickImage}
              >
                <Ionicons name='image-outline' size={35} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ height: 40, width: 100, backgroundColor: 'green', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}
              onPress={() => {
                setModalCreate(false)
                createInventory()
              }}
            >
              <Ionicons name='checkmark' size={35} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalAjust}
        animationType='slide'>
        <View style={styles.centeredView}>
          <View style={{
            height: 250,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            borderWidth: 1,
            alignItems: 'center'
          }}>
            <TouchableOpacity
              style={{ left: 120, top: 20 }}
              onPress={() => { setModalAdjust(false) }}>
              <Ionicons name='close' size={35} />
            </TouchableOpacity>
            <TextInput
              onPressIn={() => setErrormgs(null)}
              onChangeText={(text) => setFitem({ ...fitem, name: text })}
              style={[{ top: 20 }, styles.inputname]}
              value={fitem.name}
              placeholder="Inventory name"
            />
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 170, top: 30 }}>
                <TouchableOpacity style={{ right: 10 }} onPress={SlowQYT}>
                  <Text style={{ fontSize: 32, }}>-</Text>
                </TouchableOpacity  >
                <Text style={{ fontSize: 32, }}>{qty}</Text>
                <TouchableOpacity
                  style={{ left: 10 }}
                  onPress={IncreasQYT}>
                  <Text style={{ fontSize: 32, }}>+</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30 }}>
                  <ModalDropdown
                    dropdownTextStyle={{ fontSize: 22, borderWidth: 1, width: 100, padding: 5 }}
                    defaultTextStyle={{ width: 100, padding: 5 }}
                    textStyle={{ fontSize: 22 }}
                    style={{ width: 100, borderRadius: 20, padding: 5 }}
                    defaultValue={fitem.entiry}
                    onSelect={(index, value) => {
                      setFitem({ ...fitem, entiry: value })
                    }}
                    options={['Trái', 'Củ', 'Bó', 'Thùng', 'Chai', 'gam', 'kilogam']} />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ top: 30, right: 10, height: 40, width: 100, backgroundColor: '#FF6666', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
                onPress={() => { editInventory() }}>
                <Text>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ top: 30, height: 40, width: 100, backgroundColor: 'green', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
                onPress={() => { deleteInventory() }}>
                <Text>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ zIndex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#EDF6D8', top: 30, paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeChef')}>
          <Ionicons name='arrow-undo-circle-sharp' size={42} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setModalCreate(true) }}>
          <Ionicons name='add' size={42} />
        </TouchableOpacity>
      </View>
      {
        apiInvetory.length != undefined
          ? <FlatList
            style={{ marginTop: 30, height: "90%", backgroundColor: '#EDF6D8' }}
            data={apiInvetory}
            renderItem={({ item }) => {
              return renderItem(item)
            }}
            keyExtractor={item => item._id} />
          : <View style={styles.container2}>
            <MaterialCommunityIcons name="food-off" size={50} color="black" />
          </View>}
    </View>
  )
}

export default Inventory
const styles = StyleSheet.create({
  inputname: {
    height: 40,
    width: 190,
    backgroundColor: 'white',
    borderRadius: 50,
    paddingLeft: 10,
    borderWidth: 1,
    fontSize: 22,
    fontWeight: '600',
  },
  inputdescrition: {
    height: 100,
    width: 190,
    marginTop: 20,
    backgroundColor: 'white',
    marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingBottom: 50
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#EDF6D8'
  },
  uploadimge: {
    height: 170,
    width: 170,
    borderRadius: 1000,
    borderColor: 'black',
    borderWidth: 1
  },
  styimageFlagist: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15
  },
  styView1: {
    paddingLeft: 50,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  styTextImage: {
    backgroundColor: 'black',
    color: 'white',
    height: 35,
    width: 90,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '900',
    paddingTop: 10
  },
  styTextImageLibary: {
    backgroundColor: 'black',
    color: 'white',
    height: 35,
    width: 90,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '900',
    paddingTop: 10
  },
  styTextError: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 150,
    color: 'red'
  },
  styView2: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 80
  },
  styButtonCreate: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 30,
    width: 150,
    height: 55,
    marginLeft: 144,
    backgroundColor: '#6AF597',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  styButton: {
    height: 45, width: 100,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  styButton: {
    height: 45, width: 100,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
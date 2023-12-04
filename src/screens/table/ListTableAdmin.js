import { View, Text, FlatList, Image, TouchableWithoutFeedback, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux';
const ListTableAdmin = ({navigation}) => {
  const tables = useSelector(state => state.tableReducer.tableList);
  const billredux = useSelector(state => state.billReducer.bills)
  const dispatch = useDispatch();
  const [databills, setDataBills] = useState(null);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const fetchData = () => {
      ////lấy toàn bộ bills
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
     //read data
  useEffect(() => {
   fetchData(),
   dispatch({type : "GET_TABLE_LIST"})
  },[])
  const [data, setData] = useState(null);
  ///checktablenull
  const CheckNullTable = (data) => 
  {
    const arrbills = Object.values(billredux);
    const table = arrbills.find(t => t.id_ban_an === data._id);
    if (table != undefined) {
      navigation.navigate('BillAdmin', {data})
    }
    else {
      setShowModalAlert(true)
    }
  }
  const renderlist = ((item) => {
    return (
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#EDF6D8'
      }}>
        <View style={{width : "70%",flexDirection: 'row',}}>
          <Image style={{
          width: 120, height: 120,
          borderRadius: 50, borderColor: 'black',
          borderWidth: 1, marginBottom: 15,
          marginLeft: 10
        }} source={{ uri: item.image }} />
        <View style={{
          marginLeft: 10
        }}>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
          }}>{item.name}</Text>
          <View style ={{flexDirection : 'row'}}>
                <Ionicons name='people' size={28} />
                <Text >{item.peoples}</Text>
                </View>
          {
                  item.status === "0" ? <Text
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'red',
                      zIndex: 1,
                      borderRadius: 30,
                      marginTop : 8
                    }}>
                  </Text> : item.status === "1" ? <Text
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'green',
                      zIndex: 1,
                      borderRadius: 30,
                      marginTop : 8
                    }}>
                  </Text> :<Text
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'yellow',
                      zIndex: 1,
                      borderRadius: 30,
                      marginTop:8
                    }}>
                  </Text>
                }
          
        </View>
        </View>
        <View style={{width : "10%", justifyContent : 'space-evenly', marginLeft : 30, paddingVertical:25}}>
        <TouchableOpacity
          style={{ marginLeft: 10, }}
          onPress={() => navigation.navigate('EditTable',{item})}
        >
          <Ionicons name='pencil' size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 10, }}
          onPress={() => CheckNullTable(item)}
        >
          <Ionicons name='logo-bitcoin' size={35} />
        </TouchableOpacity>
        </View>
        
      </View>
    )
  })
  return (
<SafeAreaView style ={{backgroundColor:'#EDF6D8', height: '100%'}}>
      <Modal
        transparent={true}
        visible={showModalAlert}
        animationType='fade'
      >
        <View style={styles.centeredViewAlert}>
          <View style={{
            height: 300,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            justifyContent:'space-evenly',
            alignItems: 'center',
          }}>

            <View style={{height: 100, width: 100, backgroundColor: '#84202A', borderRadius: 70, marginTop: 20, justifyContent: 'center', alignItems:'center'}}>
              <Ionicons  name='close' size={60} color={"#FFFCFF"}/>
            </View>
            <Text style={{fontSize:22, fontWeight: "700", color:'#84202A'}}>
            Không có bill
            </Text>
            <TouchableOpacity 
            onPress={()=>{setShowModalAlert(false)}}
            style={{height: 40, width: 140, backgroundColor:'#84202A', justifyContent:'center', alignItems:'center', borderRadius: 20}}>
              <Text style={{fontSize:22, fontWeight: "700", color:'#FFFCFF'}}>tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={{position:'absolute',marginTop: 40, marginLeft: 345, zIndex:1}}
      onPress={()=>navigation.navigate("CreateTable")}
      >
         <Ionicons name="add" size={40} color="black" />
      </TouchableOpacity>
   
      <View style={{backgroundColor:'#EDF6D8'}}>
        
        <FlatList
          data={tables}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          keyExtractor={item => item._id}/> 
        
      </View>
    </SafeAreaView>
  )
}

export default ListTableAdmin
const styles = StyleSheet.create({
  centeredViewAlert: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  styButtonalert: {
    height: 45, width: 100,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
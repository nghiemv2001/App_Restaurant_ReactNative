import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList,Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
const ListProductStep2 = () => {
  const [dataproduct, SetDataProduct] = useState(null)
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [dataproduct2, SetDataProduct2] = useState({
    id_product : '',
    name : '',
    image :'',
    status :'',
    quantity :'',
    second :'',
    minute:'',
    hour :'',

  })
  const fetchData = () => {
    fetch(shareVarible.URLink + '/productchef/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => SetDataProduct(data),
      )
      .catch(error => console.log(error));  
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []) 
  );

  //Edit Product 
  const EditProduct=async(item)=>{
    const now = new Date();
    dataproduct2.id_product = item.id_product
    dataproduct2.name = item.name,
    dataproduct2.image = item.image,
    dataproduct2.status = 2,
    dataproduct2.quantity = item.quantity,
    dataproduct2.second = now.getSeconds(),
    dataproduct2.minute = now.getMinutes(),
    dataproduct2.hour = now.getHours()
    const response = await fetch(shareVarible.URLink + '/productchef/update/'+`${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataproduct2),
    }).then(res => res.json()).then(
      data => {
        if (data.error) {
          setErrormgs(data.error);
          alert(data.error);
        }
        else {
          fetchData()
          setShowModalAlert(true)
        }
      }
    )
  }
  //render Faglist
  const renderlist = ((item) => {
    return (
      <View>
        {
        item.status == "1" ? <View style={{marginBottom : 3, backgroundColor: '#EDF6D8', paddingVertical : 5, paddingRight : 200,paddingLeft : 5,flexDirection : 'row', borderTopWidth:1}}>
        <Image style={{height : 100, width : 100}}  source={{ uri: item.image }}/>
          <View style={{flexDirection : 'column', justifyContent :'space-between', paddingLeft : 5, width :'100%'}}>
            <View style={{flexDirection : 'row' }}> 
              <Text style={{fontSize : 22}}>{item.name}</Text>
              <Text style={{height : 15, width : 15, backgroundColor : 'yellow', marginTop : 10, marginLeft : 10, borderRadius : 20}}></Text>
            </View>
            <Text style={{fontSize : 19}}>X{item.quantity}</Text>
            <Text style={{fontSize : 16}}>Time : ( {item.hour.toString().padStart(2, '0')} : {item.minute.toString().padStart(2, '0')}':{item.second.toString().padStart(2, '0')}s )</Text>
          </View>
          <View style={{justifyContent : 'center', paddingLeft : 30}}>
            <TouchableOpacity  
            onPress={() => EditProduct(item)}
            >
                        <Ionicons name='checkmark-circle-outline' size={55} />
                    </TouchableOpacity>
          </View>
          
        </View> : null
      }
      </View>
      
        
    )
})

  return (
    <View style={{backgroundColor :'#EDF6D8', height: '100%'}}>
      <Modal
        transparent={true}
        visible={showModalAlert}
        animationType='fade'
      >
        <View style={styles.centeredView}>
          <View style={{
            height: 300,
            width: 300,
            backgroundColor: "white",
            borderRadius: 40,
            justifyContent:'space-evenly',
            alignItems: 'center',
          }}>

            <View style={{height: 100, width: 100, backgroundColor: '#2D60D6', borderRadius: 70, marginTop: 20, justifyContent: 'center', alignItems:'center'}}>
              <Ionicons  name='checkmark-done-circle-outline' size={60} color={"#FFFCFF"}/>
            </View>
            <Text style={{fontSize:22, fontWeight: "700", color:'#3564C1'}}>
             Success
            </Text>
            <TouchableOpacity 
            onPress={()=>{setShowModalAlert(false)}}
            style={{height: 40, width: 140, backgroundColor:'#3564C1', justifyContent:'center', alignItems:'center', borderRadius: 20}}>
              <Text style={{fontSize:22, fontWeight: "700", color:'#FFFCFF'}}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={{fontSize: 20, fontWeight: 'bold', color:'gray', widt:"100%", textAlign:'center', marginTop: 20}}>COOKING</Text>
            <FlatList
                data={dataproduct}
                renderItem={({ item }) => {
                    return renderlist(item)
                }}
                keyExtractor={item => item._id}

            />
        </View>
  )
}
export default ListProductStep2
const styles = StyleSheet.create({
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
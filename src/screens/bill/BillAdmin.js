import { View, Text ,FlatList,TouchableOpacity,Image,Modal,StyleSheet} from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {SateContext} from './../../component/sateContext'
const BillAdmin = ({navigation, route}) => {
  const [dataipa, SetDataApi] = useState([]);
  const [data, setData] = useState(null);
  const idtable = route.params.data._id
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [datainvoice,SetDataInvoice] = useState({
    name:'',
    total : '',
    minute :'',
    hour :'',
    day :'',
    month:'',
    year:'',
    product_list :''
  })
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
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
};
//CheckCard
// const CheckCard=()=>{
//   Alert.alert('Check', 'Pay for this table, right?', [
//     {
//       text: 'Cancel',
//       onPress: () => console.log('Cancel Pressed'),
//       style: 'cancel',
//     },
//     {text: 'OK', onPress: () => console.log('OK Pressed')},
//   ]);
// }
//CheckCash
const CheckCash=()=>{
  // Alert.alert('Check', 'Pay for this table, right?', [
  //   {
  //     text: 'Cancel',
  //     onPress: () => console.log('Cancel Pressed'),
  //     style: 'cancel',
  //   },
  //   {text: 'OK', onPress: () =>
  //   CreateInvoice()
  //   },
  // ]);
}

///Create Invoice 
const CreateInvoice=async()=>{
  //EditTable
  const updates =  {
    name : route.params.data.name,
    peoples : route.params.data.peoples,
    status : 0,
    image : route.params.data.image
  };
  const response = await fetch(shareVarible.URLink + '/table/update/'+`${route.params.data._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  }).then(res => res.json()).then(
    data => {
      if (data.error) {
        setErrormgs(data.error);
      }
    }
  )
  //create Invoice 
  const now = new Date();
  fetch(shareVarible.URLink + '/invoice/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name : dataipa.ten_ban_an, 
        total :total, 
        nhan_vien: dataipa.ten_nhan_vien,
        id_nhan_vien: dataipa.id_nhan_vien,
        day : now.getDate(), 
        month : now.getMonth()+1, 
        minute : now.getMinutes(),
        hour : now .getHours(),
        year: now.getFullYear(), 
        product_list:dataipa.danh_sach_mon_an })
    }).then(res => res.json()).then(
      data => {
        if (data.error) {
          setErrormgs(data.error);
          alert(data.error);
        }
      }
    )

  ///delete bill
    fetch(shareVarible.URLink + '/bill/delete/'+`${dataipa._id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setShowModalAlert(true)
    })
    .catch(error => {
      console.error('Error', error);
    }
    )
}
//Render Faglist
const renderlist = ((item) => {
  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: '#EDF6D8'
    }}>
      <View style={{
        marginLeft: 10,
        flexDirection: 'row',
        height: 105,
        width: '100%',
        padding: 5
      }}>
        <Image style={{
          width: '30%',
          borderRadius: 10
        }}
          source={{ uri: item.hinh_mon }}
        /><View
          style={{
            flexDirection: 'column',
            marginLeft: 10,
            borderWidth: 1,
            borderRadius: 10
          }}
        >
          <Text style={{
            width: '105%',
            height: 50,
            paddingLeft: 10,
            fontSize: 23,
            textAlignVertical: 'center',

          }}>{item.ten_mon}</Text>
          <View style={{
            flexDirection: 'row'
          }}>

            <Text
              style={{
                width: '30%',
                fontSize: 18,
                textAlignVertical: 'center',
                marginLeft: 10
              }}
            >{item.gia}đ</Text>
            <Text
              style={{
                width: '9%',
                fontSize: 18,
              }}
            >x{item.so_luong}</Text>
            <Text
              style={{
                width: '50%',
                fontSize: 18,
                textAlignVertical: 'center',

              }}
            >= {item.gia * item.so_luong} đ</Text>
          </View>
        </View>
      </View>
    </View>
  )
})
return (
  <SafeAreaView style={{
    height: '100%',
    width: '100%',
    backgroundColor: '#EDF6D8'
  }}>
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
             Thành công
            </Text>
            <TouchableOpacity 
            onPress={()=>{
              setShowModalAlert(false)
              navigation.navigate("HomeAdmin")
            }}
            style={{height: 40, width: 140, backgroundColor:'#3564C1', justifyContent:'center', alignItems:'center', borderRadius: 20}}>
              <Text style={{fontSize:22, fontWeight: "700", color:'#FFFCFF'}}>tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('HomeAdmin')}>
        <Ionicons name='arrow-undo-circle-outline' size={45} />
      </TouchableOpacity>
      <Text style={{fontSize: 32, fontWeight: '700'}}>{route.params.data.name}</Text>
      <Text></Text>
    </View>

    {
      (dataipa !== null && typeof dataipa === 'object') ?
      <FlatList
      data={dataipa.danh_sach_mon_an}
      renderItem={({ item }) => {
        return renderlist(item)
      }}
      keyExtractor={item => item._id}/>
        :
        <Text style={{
        }}>Chưa có bất kì món ăn nào</Text>
    }
    <View style={{
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
      backgroundColor:'white'
    }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop : 10
        }}>
        <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold'
        }}
      >{formattedTotal} </Text>
        <TouchableOpacity
        onPress={CreateInvoice}
        >
          <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            marginLeft: 100
          }}
        >$</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  </SafeAreaView>
)
}

export default BillAdmin
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
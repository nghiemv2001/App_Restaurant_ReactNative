import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FlatGrid } from 'react-native-super-grid';
import shareVarible from './../../AppContext'
const ListProduct = ({ navigation }) => {
  const [dataipa, setDataIPA] = useState([{}]);
  useEffect(() => {
    getAPI({ linkURL: shareVarible.URLink + '/product/'}).then(data => {
      setDataIPA(data)
    }).catch(error => {
      console.log("Lỗi get nguyên liệu: ", error)
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#EDF6D1',}}>
      <View style={{height: "100%"}}>
        <FlatGrid
          itemDimension={130}
          data={dataipa}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProduct',{item})}
              style={{
                justifyContent: 'center',
                alignItems: 'center'}}>
              <View style={[styles.itemContainer]}>
                <Image style={styles.styimage} source={{ uri: item.image }} />
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <View
                style={styles.bosView}>
                <Text style={styles.styTextPrice}>{item.price} $</Text>
                {item.status == "0" ? <Text
                    style={styles.styStatus}>
                  </Text> : <Text
                    style={styles.styStatus}>
                  </Text>}
              </View>
            </TouchableOpacity>)}/>
      </View>
    </View>
  )
}

export default ListProduct
const styles = StyleSheet.create({
  styStatus:{
    height: 10,
    width: 10,
    backgroundColor: 'green',
    zIndex: 1,
    borderRadius: 10
  },
  styTextPrice:{
    fontSize: 17,
    fontWeight: '600',
    marginRight: 10
  },
  bosView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  gridView: {
    flex: 1,
    backgroundColor: '#EDF6D1',
    opacity: 0.98,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 140,
  },
  itemName: {
    position: 'absolute',
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 1,
    color: "black",
    height: 29,
    width: 150,
    backgroundColor: '#F4C9C1',
    borderRadius: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    opacity: 0.6
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  styimage: {
    borderRadius: 40,
    padding: 10,
    height: 150,
    width: 180,
    marginTop: 20
  }
})
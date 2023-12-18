import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React , {useEffect, useState}from 'react'
import { FlatGrid } from 'react-native-super-grid';
import { useSelector, useDispatch } from 'react-redux';
const ListCategory = ({navigation, route}) => {
  const categorys = useSelector(state => state.categoryReducer.categorys)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: "GET_CATEGORY"})
  }, []);
  return (
    <View 
      style={{flex : 1}}>
      <FlatGrid
      itemDimension={130}
      data={categorys}
      style={styles.gridView}
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity 
        onPress={() => {navigation.navigate('ListProductByCategory', {item,route });}}>
          <View style={[styles.itemContainer]}>
          <Image style={styles.styimage} source={{uri: item.image}}/>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        </TouchableOpacity> 
      )}/>
    </View>
  )
}
export default ListCategory
const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    backgroundColor : '#EDF6D1',
    opacity : 0.98
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    position :'absolute',
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    zIndex : 1,
    color : "black",
    height : 29,
    width : 150,
    backgroundColor : '#F4C9C1',
    borderRadius : 40,
    textAlign : 'center',
    textAlignVertical: 'center',
    opacity : 0.6
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  styimage:{
    borderRadius: 40,
    padding: 10,
    height: 150,
    width : 180,
    marginTop : 20
  }
})
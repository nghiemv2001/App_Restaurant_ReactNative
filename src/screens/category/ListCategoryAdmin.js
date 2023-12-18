import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React , {useEffect, useState}from 'react'
import { FlatGrid } from 'react-native-super-grid';
import shareVarible from './../../AppContext'
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native'
const ListCategoryAdmin = ({navigation}) => {
  const Categorys = useSelector(state => state.categoryReducer.categorys)
  const listProductByCatgory = (item) => {navigation.navigate("ListProductByCategoryAdmin", {item})}
  return (
    <View style={{flex : 1, paddingTop: 20}}>
      <FlatGrid
      itemDimension={130}
      data={Categorys}
      style={styles.gridView}
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity 
        onPress={() => listProductByCatgory(item)}>
          <View style={[styles.itemContainer]}>
          <Image style={styles.styimage} source={{uri: item.image}}/>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        </TouchableOpacity>
      )}/>
    </View>
  )
}

export default ListCategoryAdmin
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
  styimage:{
    borderRadius: 40,
    padding: 10,
    height: 150,
    width : 180,
    marginTop : 20
  }
})
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import { ErrorDialog } from '../../component/CustomerAlert'
const ListTableAdmin = ({ navigation }) => {
  const tables = useSelector(state => state.tableReducer.tableList);
  const billredux = useSelector(state => state.billReducer.bills)
  const [isVisible, setIsVisible] = useState(false)
  const handleAlret = () => {
    setIsVisible(false)
  }
  const CheckNullTable = (data) => {
    const arrbills = Object.values(billredux);
    const table = arrbills.find(t => t.id_ban_an === data._id);
    if (table != undefined) {
      navigation.navigate('BillAdmin', { data })
    }
    else {
      setIsVisible(true)
    }
  }
  const renderlist = ((item) => {
    return (
      <View style={styles.itemBossView}>
        <View style={styles.itemSecondView}>
          <Image style={styles.styImage} source={{ uri: item.image }} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.styTextName}>{item.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name='people' size={28} />
              <Text >{item.peoples}</Text>
            </View>
            {
              item.status === "0" ? <Text
                style={[styles.styTextStatus, {backgroundColor:'red'}]}>
              </Text> : item.status === "1" ? <Text
               style={[styles.styTextStatus, {backgroundColor:'green'}]}>
              </Text> : <Text
                style={[styles.styTextStatus, {backgroundColor:'yellow'}]}>
              </Text>
            }
          </View>
        </View>
        <View style={styles.viewFlag}>
          <TouchableOpacity
            style={{ marginLeft: 10, }}
            onPress={() => navigation.navigate('EditTable', { item })}>
            <Ionicons name='pencil' size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10, }}
            onPress={() => CheckNullTable(item)}>
            <Ionicons name='logo-bitcoin' size={35} />
          </TouchableOpacity>
        </View>
      </View>
    )
  })
  return (
    <SafeAreaView style={{ backgroundColor: '#EDF6D8', height: '100%' }}>
      <ErrorDialog
        isVisible={isVisible}
        message={"KHÔNG CÓ BILL"}
        onClose={handleAlret}
      />
      <TouchableOpacity
        style={{ position: 'absolute', marginTop: 40, marginLeft: 345, zIndex: 1 }}
        onPress={() => navigation.navigate("CreateTable")}>
        <Ionicons name="add" size={40} color="black" />
      </TouchableOpacity>
      <View style={{ backgroundColor: '#EDF6D8' }}>
        <FlatList
          data={tables}
          renderItem={({ item }) => {
            return renderlist(item)
          }}
          keyExtractor={item => item._id} />
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
  },
  itemBossView: {
    flexDirection: 'row',
    backgroundColor: '#EDF6D8'
  },
  itemSecondView: { width: "70%", flexDirection: 'row', },
  styImage: {
    width: 120, height: 120,
    borderRadius: 50, borderColor: 'black',
    borderWidth: 1, marginBottom: 15,
    marginLeft: 10
  },
  styTextName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  styTextStatus:{
    height: 30,
    width: 30,
    zIndex: 1,
    borderRadius: 30,
    marginTop: 8
  },
  viewFlag:{ width: "10%", justifyContent: 'space-evenly', marginLeft: 30, paddingVertical: 25 }
})
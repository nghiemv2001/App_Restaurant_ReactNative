import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React , {useEffect, useState}from 'react'
import { FlatGrid } from 'react-native-super-grid';
import shareVarible from './../../AppContext'
import uploadimge2 from '../../../assets/UpLoadImage.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
const ListCategory = ({navigation, route}) => {
  const idtable  = route.params.route.params.data._id
  const [dataipa, setDataIPA] = useState([{}]);
  const [items, setItems] = useState([
    { name: 'TURQUOISE', code: '#1abc9c' },
  ]);
  const fetchData = () => {
    fetch(shareVarible.URLink + '/category/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setDataIPA(data),
      )
      .catch(error => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const sendtoBackEnd=(item)=>{
  navigation.navigate('ListProductByCategory', {item,route });
  }
  return (
    <View 
      style={{flex : 1}}
    >
      <FlatGrid
      itemDimension={130}
      data={dataipa}
      style={styles.gridView}
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity 
        onPress={() => sendtoBackEnd(item)}
        >
          <View style={[styles.itemContainer]}>
          <Image style={styles.styimage} source={{uri: item.image}}/>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        </TouchableOpacity>
        
      )}
    />
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
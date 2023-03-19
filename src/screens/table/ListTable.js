import { View, Text, FlatList, Image, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Swipeble } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view';
import img_food_ic from '../../../assets/foods.png'
import img_check_ic from '../../../assets/salenumber.png'

const ListTable = ({navigation}) => {

  const data = [
    {
      "_id": "1",
      "name": "Table 1",
      "status": '1',
      "pepleonumer": "6",
      "image": "https://res.cloudinary.com/dmsgfvp0y/image/upload/v1679209788/table-va-desk-table_jrjerz.jpg"
    },
    {
      "_id": "2",
      "name": "Table 2",
      "status": '0',
      "pepleonumer": "0",
      "image": "https://res.cloudinary.com/dmsgfvp0y/image/upload/v1679209788/table-va-desk-table_jrjerz.jpg"
    },
    {
      "_id": "3",
      "name": "Table 3",
      "status": '1',
      "pepleonumer": "2",
      "image": "https://res.cloudinary.com/dmsgfvp0y/image/upload/v1679209788/table-va-desk-table_jrjerz.jpg"
    },
    {
      "_id": "4",
      "name": "Table 4",
      "status": '1',
      "pepleonumer": "2",
      "image": "https://res.cloudinary.com/dmsgfvp0y/image/upload/v1679209788/table-va-desk-table_jrjerz.jpg"
    },
    {
      "_id": "5",
      "name": "Table 5",
      "status": '1',
      "pepleonumer": "6",
      "image": "https://res.cloudinary.com/dmsgfvp0y/image/upload/v1679209788/table-va-desk-table_jrjerz.jpg"
    },

    {
      "_id": "6",
      "name": "Table 6",
      "status": '1',
      "pepleonumer": "2",
      "image": "https://res.cloudinary.com/dmsgfvp0y/image/upload/v1679209788/table-va-desk-table_jrjerz.jpg"
    },
  ]

  const testfuntion = () => {
    Alert.alert("OK");
  }

  const renderlist = ((item) => {
    return (
      <View style={{
        flexDirection: 'row',
        backgroundColor : 'white'
      }}>
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
            fontWeight: 'bold'
          }}>{item.name}</Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold'
            }}>Status : {item.status}</Text>
          <Text key="uniqueId1">Peoples : {item.pepleonumer}</Text>
        </View>
      </View>
    )
  })


  return (
    <SafeAreaView>
    <View>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginTop: 10,
          height: 50,
          width: '100%',
          backgroundColor: '#EDF6D8'
        }}
      >Tables</Text>

      <SwipeListView
        style={{ marginTop: 10 }}
        data={data}
        renderItem={({ item }) => {
          return renderlist(item)
        }}
        renderHiddenItem={ (data, rowMap) => (
          <View style={{
            flexDirection : 'row',
            height : 135 ,
            width : 200,
            marginLeft : 211,
            
          }}>
              <Image
                style ={{
                height :60,
                width : 60,
                marginVertical : 40,
                marginHorizontal : 20
                }}
                source={img_food_ic}
              />
              <Image
                style ={{
                height :60,
                width : 60,
                marginVertical : 40,
                marginHorizontal : 20
                }}
                source={img_check_ic}
              />
          </View>
      )}
      leftOpenValue={0}
      rightOpenValue={-200}
        
        keyExtractor={item => item._id}
      />
    </View>
    </SafeAreaView>
  )
}

export default ListTable
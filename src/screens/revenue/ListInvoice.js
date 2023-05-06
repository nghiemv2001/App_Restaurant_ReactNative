import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
const ListInvoice = ({navigation}) => {

    const [datalistinvoice, SetDataListInvoice] = useState(null)
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );
    const fetchData = () => {
        fetch(shareVarible.URLink + '/invoices/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => SetDataListInvoice(data),
            )
            .catch(error => console.log(error));
    };

    //Delete Invoice
    const AlertDeteleInvoice = (item) => {
        Alert.alert('Delete', 'Delete this invoice ?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => 
            DeteleInvoice(item)
        },
          ]);
    }
    const DeteleInvoice = (item) => {
        fetch(shareVarible.URLink + '/invoice/delete/'+`${item}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            alert("Success!")
            fetchData()
          })
          .catch(error => {
            console.error('Error', error);
          }
          )
    }
    //Design FatList
    const renderlist = ((item) => {
        return (
            <TouchableOpacity style={styles.V1} onPress={() => navigation.navigate('ListProductInInvoice', {item})}>
                <View style={styles.V11}>
                    <Text style={{fontSize : 18}}>Bill of  day :{item.day.toString().padStart(2, '0')}/{item.month.toString().padStart(2, '0')}/{item.year}  ({item.minute.toString().padStart(2, '0')}:{item.hour.toString().padStart(2, '0')}) </Text>
                    <Text style={{fontSize : 18}}>Table name : {item.name}</Text>
                    <Text style={{fontSize : 18}}>Total : {item.total}$</Text>
                </View>
                <View style={styles.V13}>
                    <TouchableOpacity onPress={() => AlertDeteleInvoice(item._id)}>
                        <Ionicons name='remove-circle-sharp' size={35} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

        )
    })
    return (
        <View style={styles.V12}>
            <FlatList
                data={datalistinvoice}
                renderItem={({ item }) => {
                    return renderlist(item)
                }}
                keyExtractor={item => item._id}

            />
        </View>
    )
}

export default ListInvoice
const styles = StyleSheet.create({
    V1: {
        width : '100%',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent : 'space-between',
        paddingRight : 20,
        backgroundColor: '#EDF6D8',
        paddingLeft : 10
    },
    V11: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    V12: {
        paddingTop : 12,
        backgroundColor: '#EDF6D8',
        height : '100%',
    },
    V13:{

        flexDirection : 'column',
        marginLeft : 40
    }

})
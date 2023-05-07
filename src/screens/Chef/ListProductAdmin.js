import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
const ListProductStep1 = ({navigation}) => {
    const [dataproduct, SetDataProduct] = useState(null)
    const [dataproduct2, SetDataProduct2] = useState({
        id_product: '',
        name: '',
        image: '',
        status: '',
        quantity: '',
        second: '',
        minute: '',
        hour: '',

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

    const renderlist = ((item) => {
        return (
            <View>
                {
                    item.status == "2" ? <View style={{ marginBottom: 3, backgroundColor: '#EDF6D8', paddingVertical: 5, paddingRight: 200, paddingLeft: 5, flexDirection: 'row' }}>
                        <Image style={{ height: 100, width: 100 }} source={{ uri: item.image }} />
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 5, width: '100%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 22 }}>{item.name}</Text>
                                <Text style={{ height: 15, width: 15, backgroundColor: 'green', marginTop: 10, marginLeft: 10, borderRadius: 20 }}></Text>
                            </View>

                            <Text style={{ fontSize: 19 }}>X{item.quantity}</Text>
                            <Text style={{ fontSize: 16 }}>Time : ( {item.hour.toString().padStart(2, '0')} : {item.minute.toString().padStart(2, '0')}':{item.second.toString().padStart(2, '0')}s )</Text>
                        </View>
                        <View style={{ justifyContent: 'center', paddingLeft: 30 }}>
                        </View>

                    </View> : null
                }
            </View>


        )
    })
    return (
        <View style={{height : '100%'}}>
            
            <View>
                <FlatList
                    style={{backgroundColor: 'black'}}
                    data={dataproduct}
                    renderItem={({ item }) => {
                        return renderlist(item)
                    }}
                    keyExtractor={item => item._id}

                />
            </View>

            <TouchableOpacity
                style={{
                    position : 'absolute',
                    zIndex: 1,
                    justifyContent: 'flex-end',
                    alignItems : 'center',
                    marginTop : 500,
                    marginLeft : 170
                    
                }}
                // onPress={() => navigation.navigate('ChartofInvoice')}
            >
                <Ionicons name='pie-chart-sharp' size={75} />
            </TouchableOpacity>
        </View>
    )
}
export default ListProductStep1
const styles = StyleSheet.create({})
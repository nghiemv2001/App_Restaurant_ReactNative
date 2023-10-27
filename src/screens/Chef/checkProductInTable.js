import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
const CheckProductInTable = ({ navigation, route }) => {
    const [dataProduct, setDataProduct] = useState(null)
    const fetchData = () => {
        fetch(shareVarible.URLink + '/productcheft/idTable/'+`${route.params.item._id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setDataProduct(data)
            },
            )
            .catch(error => console.log(error));
    };
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );
    const renderlist = ((item) => {
        const backgroundColor = item.status === 0 ? '#EEEEEE' : item.status === 1 ? '#FFFF99' : '#99FF66';
        return (
            <View>
                <View style={{ marginBottom: 3, backgroundColor: backgroundColor, paddingVertical: 5, paddingRight: 200, paddingLeft: 5, flexDirection: 'row', borderWidth: 1, borderRadius: 40 }}>
                    <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={{ uri: item.image }} />
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 5, width: '100%' }}>
                        <Text style={{ fontSize: 22, width: '100%' }}>{item.name}</Text>
                        <Text style={{ fontSize: 19 }}>X{item.quantity}</Text>
                        <Text style={{ fontSize: 16 }}>Time : ( {item.hour.toString().padStart(2, '0')} : {item.minute.toString().padStart(2, '0')}':{item.second.toString().padStart(2, '0')}s )</Text>
                    </View>
                </View>
            </View>
        )
    })
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeChef')}>
                <Ionicons name='arrow-back-sharp' size={35} />
            </TouchableOpacity>
            <FlatList
                style={{paddingHorizontal: 10}}
                data={dataProduct}
                renderItem={({ item }) => {
                    return renderlist(item)
                }}
                keyExtractor={item => item._id}/>
        </View>
    )
}

export default CheckProductInTable
const styles = StyleSheet.create({
    gridView: {
        flex: 1,
        backgroundColor: '#EDF6D1',
        opacity: 0.98,
        top: -20
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
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
    },
    container: {
        height: "100%",
        marginTop: 40,
        width: '100%',
        backgroundColor: '#EDF6D8',
    },
    containerbos: {
        flex: 1
    },
    styButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    styText: {
        fontSize: 17,
        fontWeight: '600',
        marginRight: 10
    },
    styText1: {
        height: 10,
        width: 10,
        backgroundColor: 'green',
        zIndex: 1,
        borderRadius: 10
    },
    styText2: {
        height: '100%',
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#EDF6D8',
    },
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
    }
})
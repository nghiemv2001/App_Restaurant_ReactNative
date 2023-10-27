import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
const TableChef = ({ navigation }) => {
    const [apiTable, setApiTable] = useState(null)
    const [modalCheckBill, setModalCheckBill] = useState(false)
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );
    const fetchData = () => {
        //lay danh sach ban
        fetch(shareVarible.URLink + '/tables/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setApiTable(data)
            },
            )
            .catch(error => console.log(error));
    };
    const renderlist = ((item) => {
        return (
            <View>
                {item.status == 1 ?
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("CheckProductInTable", {item})
                        }}
                        style={{
                            width: 110,
                            height: 110,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 10,
                            borderWidth: 1,
                            borderColor: "gray",
                            backgroundColor: '#99FFFF',
                            borderRadius: 60
                        }}>
                        <Ionicons name="restaurant-outline" size={35} />
                        <Text>{item.name}</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity
                        onPress={() => {
                            setModalCheckBill(true)
                        }}
                        style={{
                            width: 110,
                            height: 110,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 10,
                            borderWidth: 1,
                            borderColor: "gray",
                            backgroundColor: 'white',
                            borderRadius: 60
                        }}>
                        <Ionicons name="restaurant-outline" size={35} />
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    })
    return (
        <View style={{ alignItems: 'center', height: '100%', width: '100%', backgroundColor: '#EDF6D8', paddingTop: 50 }}>
            <Modal
                transparent={true}
                visible={modalCheckBill}
                animationType='fade'
            >
                <View style={styles.centeredViewAlert}>
                    <View style={{
                        height: 300,
                        width: 300,
                        backgroundColor: "white",
                        borderRadius: 40,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}>

                        <View style={{ height: 100, width: 100, backgroundColor: '#84202A', borderRadius: 70, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='close' size={60} color={"#FFFCFF"} />
                        </View>
                        <Text style={{ fontSize: 22, fontWeight: "700", color: '#84202A' }}>
                            DONT HAVE BILL
                        </Text>
                        <TouchableOpacity
                            onPress={() => { setModalCheckBill(false) }}
                            style={{ height: 40, width: 140, backgroundColor: '#84202A', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                            <Text style={{ fontSize: 22, fontWeight: "700", color: '#FFFCFF' }}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={apiTable}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return renderlist(item)
                }
                }
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                numColumns={3} />
        </View>
    )
}

export default TableChef
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
    }
})
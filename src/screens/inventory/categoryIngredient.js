import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatGrid } from 'react-native-super-grid';
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const CategoryIngredient = ({ navigation }) => {
    const [apicategoryIngredient, setApicategoryIngredient] = useState([{}])
    const fetchData = () => {
        fetch(shareVarible.URLink + '/categoryIngredient/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setApicategoryIngredient(data)
                console.log(apicategoryIngredient)
            },
            )
            .catch(error => console.log(error));
    };
    useEffect(() => {
        console.log(apicategoryIngredient)
        fetchData();
    }, []);
    return (
        <View style={styles.containerbos}>
            <TouchableOpacity

                onPress={() => {
                    navigation.navigate("CreateCategoryIngredient")
                }}
                style={styles.buttonPlus}>
                <Ionicons name="add" size={50} />
            </TouchableOpacity>
            {
                apicategoryIngredient.length != null ?
                    <FlatGrid
                        itemDimension={130}
                        data={apicategoryIngredient}
                        style={styles.gridView}
                        spacing={10}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => { navigation.navigate("Inventory", { item }) }}
                                style={styles.styButton}>
                                <View style={[styles.itemContainer]}>
                                    <Image style={styles.styimage} source={{ uri: item.image }} />
                                    <Text style={styles.itemName}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    : <View style={styles.container2}>
                        <MaterialCommunityIcons name="food-off" size={50} color="black" />
                    </View>
            }

        </View>
    )
}

export default CategoryIngredient

const styles = StyleSheet.create({
    gridView: {
        flex: 1,
        backgroundColor: '#EDF6D1',
        opacity: 0.98,
        top: 10
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
        height: 50,
        marginTop: 40,
        width: '100%',
        backgroundColor: '#EDF6D8',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerbos: {
        flex: 1
    },
    styButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
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
    },
    buttonPlus: {
        position: 'absolute',
        zIndex: 1, height: 70,
        width: 70, borderWidth: 1,
        borderRadius: 50,
        left: 300,
        top: 690,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#99FF99'
    }
})
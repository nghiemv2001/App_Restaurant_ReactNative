import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ListAccount = () => {
    const [dataUser , SetDataUser] = useState(null)
    // //test data 
    const fetchData = () => {
        fetch(shareVarible.URLink + '/users/ ', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => SetDataUser(data),
            )
            .catch(error => console.log(error));
    };
    useEffect(() => {
        fetchData();
    }, []);
    const Data = [{
        _id: "645688804d15179b6f4836d1",
        name: "me",
        email: "admin@gmail.com",
        phone: "123457890",
        password: "$2b$08$DpDBxHu4CgloMiukuJig1Ow9rJQQrx1YbMDROC9iWmlkp02WnWfJq",
        keycode: "0000",
        role: "1",
        image: "https://res.cloudinary.com/dmsgfvp0y/image/upload/v1680762848/uhfbmfpd7died2ef8icd.png",
        birthday: "27/09/2001",
    },
    {
        _id: "645688804d15179b6f4836d11213",
        name: "me",
        email: "admin@gmail.com",
        phone: "123457890",
        password: "$2b$08$DpDBxHu4CgloMiukuJig1Ow9rJQQrx1YbMDROC9iWmlkp02WnWfJq",
        keycode: "0000",
        role: "1",
        image: "https://res.cloudinary.com/dmsgfvp0y/image/upload/v1680762848/uhfbmfpd7died2ef8icd.png",
        birthday: "27/09/2001",
    }]
    const DeteleUser = (id) => {
        Alert.alert('DELETE', 'Delete this User?', [
            {
                text: 'Cancel',
            },
            {
                text: 'OK', onPress: () => fetch(shareVarible.URLink + '/user/delete/' + `${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Xóa thành công đối tượng:', data);
                    })
                    .catch(error => {
                        console.error('Lỗi xóa đối tượng:', error);
                    }
                    )
            }
        ]);
    }
    const renderlist = ((item) => {
        return (
            <View style={{ backgroundColor: 'black' }}>
                {
                    item.role ==='0' ? null :<View style={{ marginBottom: 3, backgroundColor: '#EDF6D8', paddingVertical: 5, paddingRight: 20, paddingLeft: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ height: 70, width: 70, borderRadius: 50 }} source={{ uri: item.image }} />
                    <View style={{ flexDirection: 'column', paddingLeft: 5, width: '70%' }}>
                        <Text style={{ fontSize: 18, }}>Name : {item.name}</Text>
                        <Text style={{ fontSize: 18 }}>Email : {item.email}</Text>
                        <Text style={{ fontSize: 18 }}>Phone : {item.phone}</Text>
                        <Text style={{ fontSize: 18 }}>Role : {item.role}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', paddingLeft: 30 }}>
                    </View>
                    <TouchableOpacity onPress={() => DeteleUser(item._id)}>
                        <Ionicons name='remove-circle-sharp' size={35} />
                    </TouchableOpacity>

                </View>
                }
               

            </View>


        )
    })
    return (
        <View style={{ height: '100%', backgroundColor: '#EDF6D8' }}>

            <View >
                <FlatList
                    style={{ backgroundColor: 'black' }}
                    data={dataUser}
                    renderItem={({ item }) => {
                        return renderlist(item)
                    }}
                    keyExtractor={item => item._id}

                />
            </View>


        </View>
    )
}

export default ListAccount
const styles = StyleSheet.create({})
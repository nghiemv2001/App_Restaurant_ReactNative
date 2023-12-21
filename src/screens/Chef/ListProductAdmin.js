import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import shareVarible from './../../AppContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getAPI } from '../../component/callAPI'
const ListProductStep1 = ({navigation}) => {
    const [dataproduct, SetDataProduct] = useState(null)
    useFocusEffect(
        React.useCallback(() => {
            getAPI({ linkURL: shareVarible.URLink + '/productchef/'}).then(data => {
                SetDataProduct(data)
            }).catch(error => {
                console.log("Lỗi get API chế biến dưới bếp: ", error)
            });
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
                    renderItem={({ item }) => {return renderlist(item)}}
                    keyExtractor={item => item._id}/>
            </View>
            <TouchableOpacity
                style={{
                    position : 'absolute',
                    zIndex: 1,
                    justifyContent: 'flex-end',
                    alignItems : 'center',
                    marginTop : 500,
                    marginLeft : 170
                }}>
                <Ionicons name='pie-chart-sharp' size={75} />
            </TouchableOpacity>
        </View>
    )
}
export default ListProductStep1
const styles = StyleSheet.create({})
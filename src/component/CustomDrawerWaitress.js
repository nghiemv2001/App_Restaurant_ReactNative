import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import {useNavigation} from '@react-navigation/native';
import mainpicture from '../../assets/xinchao.png'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
const CustomDrawerWaitress = (props) => {
    const navigation = useNavigation();
    return (
        <View style={{flex : 1}}>
            <DrawerContentScrollView {...props}
            contentContainerStyle={{}}
            >
                <ImageBackground style={{padding: 100}} source={mainpicture}/>
                <View style ={{flex : 1, backgroundColor:'#fff', padding : 10}}>
                   <DrawerItemList {...props} /> 
                </View>
            <View style={{ borderTopColor:'black',
                            marginTop : 300
                }}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Signin');}}>
                    <View style={{flexDirection :'row', alignItems :'center', padding : 15}}>
                    <Ionicons name='log-in-outline' size={39}/>
                    <Text style={{
                        fontSize : 20, 
                        marginLeft : 10,
                        }}>Đăng xuất</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
        </View>
        
    )
}

export default CustomDrawerWaitress
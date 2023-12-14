import { View, Text } from 'react-native'
import React, {useEffect,useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomDrawerWaitress from '../../component/CustomDrawerWaitress';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListProductStep1 from '../Chef/ListProductStep1';
import ListProductStep2 from '../Chef/ListProductStep2';
import ListProductStep3 from '../Chef/ListProductStep3';
import tableChef from '../Chef/tableChef';
import Inventory from '../inventory/inventory';
import CategoryIngredient from '../inventory/categoryIngredient';
const Drawer = createDrawerNavigator();
const HomeChef = () => {
  return (
    <Drawer.Navigator drawerContent={props=><CustomDrawerWaitress{...props}/>} 
    screenOptions={{
        headerShown : false,
        drawerActiveTintColor:'green',
        drawerInactiveTintColor:'black',
        drawerStyle: {
          backgroundColor: 'white',
          width: 240,
        },
      }}>
      <Drawer.Screen 
        options={{
            drawerIcon: ({color})=>(
                <Ionicons name='md-list' size={22}/>
            ),
        }}
      name="Món chế biến" component={ListProductStep1} />
      <Drawer.Screen 
        options={{
            drawerIcon: ({color})=>(
                <Ionicons name='restaurant-sharp' size={22}/>
            ),
        }}
      name="Bàn ăn" component={tableChef} />
      <Drawer.Screen 
        options={{
            drawerIcon: ({color})=>(
                <Ionicons name='business' size={22}/>
            ),
        }}
      name="Hàng tồn kho" component={CategoryIngredient}/>
    </Drawer.Navigator>  
    
  )
}

export default HomeChef
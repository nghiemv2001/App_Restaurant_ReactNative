import { View, Text } from 'react-native'
import React, {useEffect,useState} from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomDrawerWaitress from '../../component/CustomDrawerWaitress';
import CreateTable from '../table/CreateTable'
import CreateCategory from '../category/CreateCategory'
import ListProduct from '../Product/ListProduct';
import ListTableAdmin from '../table/ListTableAdmin'
import ListProductByCategogy from '../Product/ListProductByCategogy';
import ListInvoice from '../revenue/ListInvoice';
import CreateProduct from '../Product/CreateProduct';
import shareVarible from './../../AppContext'
import ListProductAdmin from '../Chef/ListProductAdmin';
import ListAccount from '../auth/ListAccount';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
const HomeAdmin = () => {
  return (
    <Drawer.Navigator drawerContent={props=><CustomDrawerWaitress{...props}/>} 
    screenOptions={{
        headerShown : true,
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
                <Ionicons name='restaurant' size={22}/>
            ),
        }}
      name="Table" component={CreateTable} />
      <Drawer.Screen 
       options={{
        drawerIcon: ({color})=>(
            <Ionicons name='fast-food' size={22}/>
        ),
    }}
      name="Food" component={CreateProduct} />
      <Drawer.Screen 
       options={{
        drawerIcon: ({color})=>(
            <Ionicons name='md-grid' size={22}/>
        ),
    }}
      name="Category" component={CreateCategory} />
      <Drawer.Screen 
       options={{
        drawerIcon: ({color})=>(
            <Ionicons name='newspaper' size={22}/>
        ),
    }}
      name="Invoice" component={ListInvoice} />
      <Drawer.Screen 
       options={{
        drawerIcon: ({color})=>(
            <Ionicons name='list' size={22}/>
        ),
    }}
      name="Cooking" component={ListProductAdmin} />
      <Drawer.Screen 
       options={{
        drawerIcon: ({color})=>(
            <Ionicons name='people' size={22}/>
        ),
    }}
      name="List Account" component={ListAccount} />
    </Drawer.Navigator>       
  );
}

export default HomeAdmin
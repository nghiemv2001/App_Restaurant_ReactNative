import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomDrawerWaitress from '../../component/CustomDrawerWaitress';
import CreateTable from '../table/CreateTable'
import CreateCategory from '../category/CreateCategory'
import ListProduct from '../Product/ListProduct';
import ListTableAdmin from '../table/ListTableAdmin'
import ListProductByCategogy from '../Product/ListProductByCategogy';
import CreateProduct from '../Product/CreateProduct';
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
      name="Table" component={ListTableAdmin} />
      <Drawer.Screen 
       options={{
        drawerIcon: ({color})=>(
            <Ionicons name='fast-food' size={22}/>
        ),
    }}
      name="Food" component={ListProduct} />
      <Drawer.Screen 
       options={{
        drawerIcon: ({color})=>(
            <Ionicons name='bar-chart-sharp' size={22}/>
        ),
    }}
      name="Sale Goal" component={CreateCategory} />
    </Drawer.Navigator>       
  );
}

export default HomeAdmin
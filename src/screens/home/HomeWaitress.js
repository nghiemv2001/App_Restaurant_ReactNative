import { View, Text } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from '../../component/CustomDrawerWaitress'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomDrawerWaitress from '../../component/CustomDrawerWaitress';
import ListTable from '../table/ListTable'
const Drawer = createDrawerNavigator();
const HomeWaitress = () => {
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
          name="Tables" component={ListTable} />    
        </Drawer.Navigator> 
          
      );
}

export default HomeWaitress
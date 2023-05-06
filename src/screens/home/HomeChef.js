import { View, Text } from 'react-native'
import React, {useEffect,useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomDrawerWaitress from '../../component/CustomDrawerWaitress';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListProductStep1 from '../Chef/ListProductStep1';
import ListProductStep2 from '../Chef/ListProductStep2';
import ListProductStep3 from '../Chef/ListProductStep3';
const Drawer = createDrawerNavigator();
const HomeChef = () => {
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
                <Ionicons name='md-list' size={22}/>
            ),
        }}
      name="List Step 1" component={ListProductStep1} />
      <Drawer.Screen 
        options={{
            drawerIcon: ({color})=>(
                <Ionicons name='md-list-outline' size={22}/>
            ),
        }}
      name="List Step 2" component={ListProductStep2} />
      <Drawer.Screen 
        options={{
            drawerIcon: ({color})=>(
                <Ionicons name='md-list-sharp' size={22}/>
            ),
        }}
      name="List Step 3" component={ListProductStep3} />
    </Drawer.Navigator>  
    
  )
}

export default HomeChef
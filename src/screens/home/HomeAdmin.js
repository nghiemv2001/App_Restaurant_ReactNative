import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomDrawerWaitress from '../../component/CustomDrawerWaitress';
import CreateCategory from '../category/CreateCategory'
import ListTableAdmin from '../table/ListTableAdmin'
import ListInvoice from '../revenue/ListInvoice';
import CreateProduct from '../Product/CreateProduct';
import ListProductAdmin from '../Chef/ListProductAdmin';
import ListAccount from '../auth/ListAccount';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import { useSelector, useDispatch } from 'react-redux';
const HomeAdmin = () => {
  const darkMode = useSelector(state=>state.tableReduce.darkMode);
  console.log(darkMode)
  return (
    <Drawer.Navigator drawerContent={props=><CustomDrawerWaitress{...props}/>} 
    screenOptions={{
      headerShown : false,
      headerStyle:{
        height: 0,
      },
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
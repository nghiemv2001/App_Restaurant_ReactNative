import React, {useEffect} from 'react'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomDrawerWaitress from '../../component/CustomDrawerWaitress';
import ListTable from '../table/ListTable'
import ListProductWaitress from '../Chef/ListProductWaitress';
const Drawer = createDrawerNavigator();
const HomeWaitress = () => {
  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log("loai lai")
  //   }, [])
  // )
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
          name="Bàn ăn" component={ListTable} />    
          <Drawer.Screen 
            options={{
                drawerIcon: ({color})=>(
                    <Ionicons name='fast-food' size={22}/>
                ),
            }}
          name="Món chế biến" component={ListProductWaitress} />    
        </Drawer.Navigator> 
          
      );
}

export default HomeWaitress
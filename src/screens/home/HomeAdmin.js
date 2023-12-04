
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomDrawerWaitress from '../../component/CustomDrawerWaitress';
import CreateCategory from '../category/CreateCategory'
import ListTableAdmin from '../table/ListTableAdmin'
import ListCategory from '../category/ListCategoryAdmin'
import ListInvoice from '../revenue/ListInvoice';
import React, { useState, useEffect, useMemo } from 'react'
import ListAccount from '../auth/ListAccount';
import { useFocusEffect } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import ListCategoryAdmin from '../category/ListCategoryAdmin';
const Drawer = createDrawerNavigator();
const HomeAdmin = () => {
  const tables = useSelector(state => state.tableReducer.tableList);
  const billredux = useSelector(state => state.billReducer.bills)
  const Categorys = useSelector(state => state.categoryReducer.categorys)
  const invoices = useSelector(state => state.invoiceReducer.invoices)
  const users = useSelector(state => state.userReducer.users)
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch({ type: "GET_TABLE_LIST" });
      dispatch({ type: "GET_BILLS" });
      dispatch({ type: "GET_CATEGORY" });
      dispatch({ type: "GET_INVOICES" });
      dispatch({ type: "GET_USER" });
    }, [])
  );
  // Sử dụng useMemo để kiểm tra sự thay đổi của tables
  const memoizedTables = useMemo(() => tables, [tables]);
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerWaitress{...props} />}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          height: 0,
        },
        drawerActiveTintColor: 'green',
        drawerInactiveTintColor: 'black',
        drawerStyle: {
          backgroundColor: 'white',
          width: 240,
        },
      }}>
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='restaurant' size={22} />
          ),
        }}
        name="Bàn ăn" component={ListTableAdmin} />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='fast-food' size={22} />
          ),
        }}
        name="Món ăn" component={ListCategoryAdmin} />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='md-grid' size={22} />
          ),
        }}
        name="Loại món" component={CreateCategory} />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='newspaper' size={22} />
          ),
        }}
        name="Hóa đơn" component={ListInvoice} />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='people' size={22} />
          ),
        }}
        name="Tài khoản" component={ListAccount} />
    </Drawer.Navigator>
  );
}

export default HomeAdmin
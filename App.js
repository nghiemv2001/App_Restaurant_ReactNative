import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//system
import Welcome from './src/screens/ScreenWelcome';
import TestScreen from './src/TestScreen'
//home  
import Home from './src/screens/home/Home'
import HomeWaitress from './src/screens/home/HomeWaitress'
import HomeAdmin from './src/screens/home/HomeAdmin'
import HomeChef from './src/screens/home/HomeChef'
//auth
import ReceiverPassword from './src/screens/auth/ReceiverPassword';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import Signin from './src/screens/auth/Signin';
import Signup from './src/screens/auth/Signup';
import Profile from './src/screens/auth/Profile';
import ChangProfile from './src/screens/auth/ChangProfile';
import ListAccount from './src/screens/auth/ListAccount';
//table
import CreateTable from './src/screens/table/CreateTable';
import EditTable from './src/screens/table/EditTable';
import ListTable from './src/screens/table/ListTable'
import ListTableAdmin from './src/screens/table/ListTableAdmin';
//category
import CreateCategory from './src/screens/category/CreateCategory';
import ListCategory from './src/screens/category/ListCategory';
import ListCategoryAdmin from './src/screens/category/ListCategoryAdmin';
import EditCategory from './src/screens/category/EditCategory';
//Product
import CreateProduct from './src/screens/Product/CreateProduct';
import ListProduct from './src/screens/Product/ListProduct';
import EditProduct from './src/screens/Product/EditProduct';
import ListProductByCategogy from './src/screens/Product/ListProductByCategogy';
import ListProductByCategogyAdmin from './src/screens/Product/ListProductByCategoryAdmin';
//bill
import Bill from './src/screens/bill/Bill'
import BillAdmin from './src/screens/bill/BillAdmin';

//invoice 
import ListProductInInvoice from './src/screens/revenue/ListProductInInvoice';
import ListInvoice from './src/screens/revenue/ListInvoice';

//Cheft 
import ListProductStep1 from './src/screens/Chef/ListProductStep1';
import ListProductStep2 from './src/screens/Chef/ListProductStep2';
import ListProductStep3 from './src/screens/Chef/ListProductStep3';
import ListProductWaitress from './src/screens/Chef/ListProductWaitress';
import ListProductAdmin from './src/screens/Chef/ListProductAdmin';


//chart
import ChartofInvoice from './src/screens/Chart/ChartofInvoice';
const Stack = createNativeStackNavigator();

import { Provider } from 'react-redux';
import Redux from './src/redux/store'

export default function App() {
  return (
    <Provider store={Redux.store}>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={{
          headerShown: false
        }} />
        <Stack.Screen name="HomeWaitress" component={HomeWaitress} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Wellcome" component={Welcome} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Signin" component={Signin} options={{
          headerShown: false
        }} />
        
        <Stack.Screen name="HomeChef" component={HomeChef} options={{
          headerShown: false
        }} />
        
        <Stack.Screen name="Profile" component={Profile} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Signup" component={Signup} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ReceiverPassword" component={ReceiverPassword} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ChangProfile" component={ChangProfile} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListTableAdmin" component={ListTableAdmin} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListProductWaitress" component={ListProductWaitress} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListProductAdmin" component={ListProductAdmin} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListTable" component={ListTable} options={{
          headerShown: false
        }} />
        <Stack.Screen name="EditTable" component={EditTable} options={{
          headerShown: false
        }} />
        <Stack.Screen name="CreateTable" component={CreateTable} options={{
          headerShown: false
        }} />
        <Stack.Screen name="CreateProduct" component={CreateProduct} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListProduct" component={ListProduct} options={{
          headerShown: false
        }} />
        <Stack.Screen name="EditProduct" component={EditProduct} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListCategory" component={ListCategory} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListProductByCategory" component={ListProductByCategogy} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListProductByCategoryAdmin" component={ListProductByCategogyAdmin} options={{
          headerShown: false
        }} />
        <Stack.Screen name="EditCategory" component={EditCategory} options={{
          headerShown: false
        }} />
        <Stack.Screen name="CreateCategory" component={CreateCategory} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListCategoryAdmin" component={ListCategoryAdmin} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Bill" component={Bill} options={{
          headerShown: false
        }} />
        <Stack.Screen name="BillAdmin" component={BillAdmin} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListProductInInvoice" component={ListProductInInvoice} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListInvoice" component={ListInvoice} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListProductStep1" component={ListProductStep1} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListProductStep2" component={ListProductStep2} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListProductStep3" component={ListProductStep3} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ChartofInvoice" component={ChartofInvoice} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ListAccount" component={ListAccount} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



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
//table
import CreateTable from './src/screens/table/CreateTable';
import EditTable from './src/screens/table/EditTable';
import ListTable from './src/screens/table/ListTable'
//category
import CreateCategory from './src/screens/category/CreateCategory';
import ListCategory from './src/screens/category/ListCategory';
//Product
import CreateProduct from './src/screens/Product/CreateProduct';
import ListProduct from './src/screens/Product/ListProduct';
import EditProduct from './src/screens/Product/EditProduct';
import ListProductByCategogy from './src/screens/Product/ListProductByCategogy';
//bill
import Bill from './src/screens/bill/Bill'
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
      <Stack.Screen name="HomeWaitress" component={HomeWaitress} options={{
          headerShown: false
        }} />
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={{
          headerShown: false
        }} />       
        <Stack.Screen name="Bill" component={Bill} options={{
          headerShown: false
        }} />  
        <Stack.Screen name ="ListCategory" component={ListCategory} options={{
        headerShown : false
        }}/>  
        <Stack.Screen name ="ListProductByCategory" component={ListProductByCategogy} options={{
        headerShown : false
        }}/> 
         
        <Stack.Screen name ="ListProduct" component={ListProduct} options={{
        headerShown : false
        }}/>
        <Stack.Screen name="Wellcome" component={Welcome} options={{
          headerShown: false
        }} />     
        <Stack.Screen name="ListTable" component={ListTable} options={{
          headerShown: false
        }} />
        <Stack.Screen name ="EditProduct" component={EditProduct} options={{
        headerShown : false
        }}/>
        <Stack.Screen name ="CreateProduct" component={CreateProduct} options={{
        headerShown : false
        }}/>
        <Stack.Screen name="Signin" component={Signin} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Profile" component={Profile} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Signup" component={Signup} options={{
          headerShown: false
        }} />
        <Stack.Screen name="EditTable" component={EditTable} options={{
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
        <Stack.Screen name="CreateCategory" component={CreateCategory} options={{
          headerShown: false
        }} />  
        <Stack.Screen name="CreateTable" component={CreateTable} options={{
          headerShown: false
        }} />
        <Stack.Screen name="HomeChef" component={HomeChef} options={{
          headerShown: false
        }} />
       </Stack.Navigator>
    </NavigationContainer>  
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



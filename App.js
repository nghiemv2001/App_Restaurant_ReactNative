import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signin from './src/screens/auth/Signin';
import Signup from './src/screens/auth/Signup';
import Welcome from './src/screens/ScreenWelcome';
import Home from './src/screens/home/Home'
import TestScreen from './src/TestScreen'
import CreateCategory from './src/screens/category/CreateCategory';
import ReceiverPassword from './src/screens/auth/ReceiverPassword';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import ListTable from './src/screens/table/ListTable'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListTable" component={ListTable} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Signup" component={Signup} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Signin" component={Signin} options={{
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



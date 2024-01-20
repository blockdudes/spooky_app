import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import UserWalletScreen from '../screens/UserWalletScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="userWallet" component={UserWalletScreen} options={{ headerShown: false }}/>

    </Stack.Navigator>
  );
};

export default AppNavigator;
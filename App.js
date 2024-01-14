import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CreateWallet from './src/components/CreateWallet';
import AppProvider from './src/providers/store';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/providers/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </NavigationContainer>
  );
}

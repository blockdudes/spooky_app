import React from 'react'
import CreateWallet from '../components/CreateWallet'
import { SafeAreaView, StatusBar, View } from 'react-native'

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" className="bg-zinc-800"/> 
     <View className="flex flex-col bg-zinc-800">
      <CreateWallet/>
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen
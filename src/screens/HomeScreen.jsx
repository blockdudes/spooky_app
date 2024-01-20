import React from 'react'
import CreateWallet from '../components/CreateWallet'
import { SafeAreaView, StatusBar, View } from 'react-native'


const HomeScreen = () => {
  return (
    <View className="bg-[#171A25] h-[100vh]">
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={'#171A25'}/> 
     <View className="flex flex-col">
      <CreateWallet/>
    </View>
    </SafeAreaView>
    </View>
  )
}

export default HomeScreen
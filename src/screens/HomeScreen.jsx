import React, { useContext } from 'react'
import CreateWallet from '../components/CreateWallet'
import { SafeAreaView, StatusBar, View, Text } from 'react-native'
import { ContextApi } from '../providers/store'
import { useNavigation } from '@react-navigation/native'
import UserWalletScreen from './UserWalletScreen'
import { Gradient } from '../components/Gradient'



const HomeScreen = () => {
  const { userWalletData } = useContext(ContextApi)
  return (
    <View className="bg-[#42a1ff] h-[100vh]">

      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor={'#40C9FF'} />
        <View className="flex flex-col">
          {userWalletData.publicAddress==='' ? (
            <CreateWallet />
          ) : ( <UserWalletScreen/> )}
       
        </View>
      </SafeAreaView>
    
    </View>
  )
}

export default HomeScreen
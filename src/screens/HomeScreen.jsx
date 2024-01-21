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
    <View className="bg-[#171A25] h-[100vh]">
      <Gradient>

      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor={'#171A25'} />
        <View className="flex flex-col">
          {userWalletData.publicAddress==='' ? (
            <CreateWallet />
          ) : ( <UserWalletScreen/> )}
       
        </View>
      </SafeAreaView>
      </Gradient>
    
    </View>
  )
}

export default HomeScreen
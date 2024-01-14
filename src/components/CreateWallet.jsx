import { View, Text, Pressable } from 'react-native'
import React,{ useContext } from 'react'
import { ContextApi } from '../providers/store'
import { useNavigation } from '@react-navigation/native';

const CreateWallet = () => {
  // const { user, setUser } = useContext(ContextApi);
  const navigation = useNavigation();
  const goToUserWalletScreen = () => {
    navigation.navigate('userWallet'); 
  };

  return (
    <View className="flex flex-col px-4 h-[100vh]">
      <View className="h-[70vh]">

      </View>
      <View className="flex space-x-4">
        <Pressable className="bg-pink-500 rounded-xl p-3">
          
          <Text className="text-white text-center font-semibold text-lg">Create Wallet</Text>
        </Pressable>
        <Pressable className="rounded-xl p-3" onPress={goToUserWalletScreen}>
          
          <Text className="text-pink-500 text-center font-semibold text-lg">Already registered</Text>
        </Pressable>
      </View>
      <View>
        <Text className="text-gray-400 font-bold">
            By continuing, I agree to the Terms of Service and Privacy Policy
        </Text>
      </View>

    </View>
  )
}

export default CreateWallet
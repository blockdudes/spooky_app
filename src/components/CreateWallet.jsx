import { View, Text, Pressable, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { ContextApi } from '../providers/store'
import { useNavigation } from '@react-navigation/native';
import { ethers } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateWallet = () => {
  const {setUserWalletData,userWalletData} = useContext(ContextApi);
  const [isLoading, setIsloading] = useState(false)
  const navigation = useNavigation();
  
  const goToUserWalletScreen = () => {
    setIsloading(true)
    setTimeout(() => {
      setIsloading(false)
      navigation.navigate('userWallet');
    }, 1000);
  };

  const CreateWallet = async() => {
    setIsloading(true)
    const value=await AsyncStorage.getItem("walletData")
    const parseValue=JSON.parse(value)
    console.log(parseValue)

    if(parseValue===null){
      const wallet=ethers.Wallet.createRandom()
      
      await AsyncStorage.setItem("walletData",JSON.stringify({
        publicAddress: wallet.address,
        privateKey: wallet.privateKey
      }))
      setUserWalletData({
        publicAddress: wallet.address,
        privateKey: wallet.privateKey
      })
    }
    
    

    setTimeout(() => {
      setIsloading(false)
      navigation.navigate('userWallet');
    }, 5000);
  }

  

  return (
    <View className="flex flex-col bg-[#171A25] px-4 h-[100vh]">
      {
        isLoading ? (
          <View style={{ height: Dimensions.get('screen').height *0.9 }} className=" flex justify-center space-y-8 items-center">
            <View>
              <Image
                className="h-[100px] w-[100px]"
                source={require('../../assets/pngwing.com.png')}
                tintColor={'#7264ff'}
              />
            </View>
            <Text className="text-center text-white text-xl">Please wait while we create your wallet</Text>
          </View>
        ) : (
          <>
            <View className="h-[55%]  flex justify-center" >
              <Image
                className="h-[300px]  w-[300px] object-cover self-center mt-8"
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/IRIB_Mazandaran_White_Logo.png',
                }}
              />
            </View>
            <View className="flex space-y-4">
              <TouchableOpacity className="bg-[#7264ff] rounded-3xl  py-4" >

                <Text className="text-white text-center font-semibold text-lg" onPress={()=>CreateWallet()}>Create Wallet</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity className="rounded-xl p-3">

                <Text className="text-[#7264ff] text-center font-semibold text-lg">Already registered</Text>
              </TouchableOpacity> */}
            </View>
            <View className='mt-6'>
              <Text className="text-gray-400 text-center font-bold">
                By continuing, I agree to the Terms of Service and Privacy Policy
              </Text>
              
            </View>
          </>
        )
      }

    </View>
  )
}

export default CreateWallet
import React, { useCallback, useMemo, useRef, useState,useContext } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import SwapUiComponent from './SwapUiComponent';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { ContextApi, supportedTokens } from '../providers/store';
import { stablizeTokens } from '../utils/stablize_tokens';
import { errorToast } from '../config/CallToast';
import { toastConfig } from '../config/toastConfig';
import Toast from "react-native-toast-message"



const StableModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [payAmount, setPayAmount] = useState("0")
  const {userWalletData,ghoPriceEth,signer} = useContext(ContextApi)
  const [isLoading,setIsLoading]=useState(false)

  console.log(payAmount)


  const stabilizeEthToken=async()=>{
    setIsLoading(true)
    try {
      
      console.log("stabilize--->")
      const txnRes=await stablizeTokens(userWalletData.publicAddress,payAmount,payAmount/ghoPriceEth,signer)
      const reciept=await txnRes.wait()

      setIsLoading(false)
      if(reciept){
        successToast("Eth stabilized successfully")
      }      
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      errorToast(error.message)
    }
  }



  return (
    <SafeAreaView>

      <View>
        <View className="flex items-center space-y-2 mr-4">

          <TouchableOpacity className=" bg-[#7264FF] w-[70px] flex items-center  rounded-2xl py-4 px-5" onPress={() => setModalVisible(true)}>
            <FontAwesome name="money" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white  ">Stablize</Text>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >

          <View className='bg-[#171A25] flex pt-12 flex-col h-[100vh]'>
          <Toast position='bottom' bottomOffset={80} config={toastConfig} />



            {/* top div */}
            <View className=" px-6 flex flex-row justify-between items-center">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View className='bg-[#10131A]/70 px-3 py-1 rounded-3xl'>

                  <Entypo name="chevron-small-left" size={30} color="white" />
                </View>
              </TouchableOpacity>
              <Text className="text-white text-center text-lg semibold">Stabilize your ETH</Text>
              <View className='bg-[#10131A]/70 px-5 py-2 rounded-3xl'>

                <AntDesign name="scan1" size={20} color="white" />
              </View>
            </View>

            <View className=" h-full bg px-4 py-4">
              <View className="flex flex-col space-y-2 h-[50%] relative rounded-lg">

                <View className="flex flex-col border border-[#9fa1a3]/20 rounded-3xl space-y-1 bg-[#10131A] h-[50%] p-4">
                  <View className="flex flex-row justify-between ">
                    <TouchableOpacity>
                      <View className="flex items-center space-x-3 flex-row  py-2 rounded-2xl">
                        <Image
                          className="h-[40px] rounded-2xl  w-[40px] object-cover self-center"
                          source={{
                            uri: 'https://logowik.com/content/uploads/images/ethereum3649.jpg',
                          }}
                        />

                        <View className="flex flex-col ">
                          <Text className="text-white text-xl">ETH</Text>
                          <Text className="text-[#9fa1a3]">Ethereum</Text>
                        </View>

                      </View>
                    </TouchableOpacity>
                    
                  </View>
                  {/* //youpay div */}
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-white font-bold text-lg">You Pay</Text>
                    <View className="flex flex-col items-end gap-2">
                      <TextInput
                        className="text-white text-xl  max-w-[150px]"
                        onChangeText={setPayAmount}
                        value={payAmount}
                        keyboardType="numeric"
                        placeholder='0.0'
                        placeholderTextColor={'#9fa1a3'}
                      />
                      <Text className="text-[#9fa1a3]">$0.00</Text>
                    </View>
                  </View>
                </View>


                <View className="absolute left-[48%] top-[42%] z-10  h-[45px] w-[45px] bg-[#7264ff]  flex justify-center items-center  rounded-full border">
                  <AntDesign name="arrowdown" size={24} color="white" />
                </View>

                <View className="flex flex-col border border-[#9fa1a3]/20 rounded-3xl space-y-1 bg-[#10131A] h-[50%] p-4">
                  <View className="flex flex-row justify-between ">
                    <View className="flex items-center space-x-3 flex-row  py-2 rounded-2xl">
                      <Image
                        className="h-[40px] rounded-2xl  w-[40px] object-cover self-center"
                        source={{
                          uri: supportedTokens[1].logo,
                        }}
                      />

                      <View className="flex flex-col ">
                        <Text className="text-white text-xl">{supportedTokens[1].symbol}</Text>
                        <Text className="text-[#9fa1a3]">{supportedTokens[1].name}</Text>
                      </View>

                    </View>
                    
                  </View>
                  {/* //youpay div */}
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-white font-semibold text-lg">You Get</Text>
                    <View className="flex flex-col items-end gap-2">
                      <Text className="text-white text-xl">{payAmount/ghoPriceEth}</Text>
                      <Text className="text-[#9fa1a3]">$0.00</Text>
                    </View>
                  </View>
                </View>
              </View>
              {
                isLoading ? (
                  <TouchableOpacity className=" rounded-[30px] flex flex-row justify-center space-x-4 mt-8  bg-[#9fa1a3] py-4" >
                    <ActivityIndicator  size="small" color="#10131a" />
                <Text className="text-lg text-center font-semibold   text-[#10131a]">Stabilize</Text>
              </TouchableOpacity>

                ):(

                  <TouchableOpacity className=" rounded-[30px] mt-8  bg-[#9fa1a3] py-4" onPress={()=>stabilizeEthToken()}>
                <Text className="text-lg text-center font-semibold   text-[#10131a]">Stabilize</Text>
              </TouchableOpacity>

                )
              }

            </View>
          </View>

        </Modal>



      </View>


    </SafeAreaView>

  );
};

export default StableModal;







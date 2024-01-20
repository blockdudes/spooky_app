import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import SwapUiComponent from './SwapUiComponent';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import QrScannerModal from './QrScannerModal';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../config/toastConfig';
import SheetModal from './SheetModal';
import { ContextApi, supportedTokens } from '../providers/store';
import { errorToast, successToast } from '../config/CallToast';
import { sendEth, sendGho } from '../utils/send_token';
import { provider } from '../utils/contracts';
import { approveCreditDelegation } from '../utils/lend_tokens';
import { ethers } from 'ethers';



const CreditDelegation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { signer,ethPrice,ghoPrice,panelRef, selectedSendToken, setSendTokenData, sendTokenData, ghoContract,setCreditData,creditData,ghoDebtContract } = useContext(ContextApi)
  const [isLoading,setIsLoading]=useState(false)
  
  const creditDelegate=async()=>{
    setIsLoading(true)
    try {
      const amountInWei = ethers.utils.parseEther(creditData.amount);
      const txn = await approveCreditDelegation(ghoDebtContract, signer, creditData.delegeteeAddress, amountInWei)
      setIsLoading(false)
      if(txn){

        successToast("Token sent successfully")
      }

    } catch (error) {
      console.log(error)
      setIsLoading(false)
      errorToast(error.message)
    }
  }

  return (
    <SafeAreaView>

      <View>
        <View className="flex items-center space-y-2 mr-4">
          <TouchableOpacity className=" bg-[#7264FF] w-[70px] flex items-center  rounded-2xl py-4 px-5" onPress={() => setModalVisible(true)}>
            <Entypo name="credit" size={20} color="white" /> 
          </TouchableOpacity>
          <Text className="text-white  ">Delegate</Text>
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
              <Text className="text-white text-center text-lg semibold">Credit Delegation</Text>
              <View className='bg-[#10131A]/70 px-5 py-2 rounded-3xl'>
                {/* <QrScannerModal /> */}
              </View>
            </View>


            <View className=" h-full px-8 py-4">
              <View className="flex flex-col space-y-6  relative rounded-lg">

                {/* amount div */}
                <View className="flex flex-col space-y-2 mt-4 items-center">
                  <TextInput
                    className="text-[#ffffff] text-4xl"
                    onChangeText={(text) => setCreditData({ ...creditData, amount: text })}
                    // onChange={(e) => setSendTokenData({...sendTokenData,amount:e.nativeEvent.text})}
                    value={creditData.amount}
                    keyboardType="numeric"
                    placeholder='0.0'
                    placeholderTextColor={'#9fa1a3'}
                  />
                  <Text className="text-[#9fa1a3]">${creditData.amount * ghoPrice || 0}</Text>
                </View>

                {/* select token div */}
                  <View className="  flex items-center justify-center space-x-3 flex-row px-6 py-2 h-[60px] rounded-[30px]" >
                    <View className="flex flex-row items-center gap-2">
                      <Image
                        className="h-[35px] rounded-full  w-[35px] object-cover self-center"
                        source={{
                          uri: supportedTokens[1].logo,
                        }}
                      />
                      <Text className="text-white text-xl">{supportedTokens[1].symbol}</Text>
                      <Text className="text-[#9fa1a3]">{supportedTokens[1].name}</Text>
                    </View>
                    {/* <Entypo name="chevron-small-down" size={35} color="#ffffff" /> */}
                  </View>

                {/* address div */}
                <View>
                  <TextInput
                    className="text-[#ffffff] border border-[#9fa1a3]/20  h-[60px] px-6  rounded-[30px] text-[15px]"
                    placeholder='delegetee (address)'
                    value={creditData.delegeteeAddress}
                    onChangeText={(text) => setCreditData({ ...creditData, delegeteeAddress: text })}
                    // onChange={(e) => setSendTokenData({ ...sendTokenData, address: e.nativeEvent.text })}                    
                    placeholderTextColor={'#9fa1a3'}
                    keyboardType='default'
                  />
                </View>
                {
                  isLoading ? (
                    <TouchableOpacity  className=" rounded-[30px] flex flex-row justify-center items-center space-x-4 bg-[#9fa1a3]/70 py-4">
                      <ActivityIndicator size="small" color="#10131a" />
                  <Text className="text-lg text-center font-semibold  text-[#10131a]">Delegating</Text>
                </TouchableOpacity>
                  ):(
                    <TouchableOpacity  className=" rounded-[30px] bg-[#9fa1a3]/70 py-4" onPress={()=>creditDelegate()}>
                  <Text className="text-lg text-center font-semibold  text-[#10131a]">Delegate</Text>
                </TouchableOpacity>
                  )
                }
              </View>
            </View>
          </View>
          {/* <SheetModal /> */}
        </Modal>
      </View>

    </SafeAreaView>

  );
};

export default CreditDelegation;

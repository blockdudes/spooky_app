import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import SwapUiComponent from './SwapUiComponent';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { ContextApi, supportedTokens } from '../providers/store';
import { borrow } from '../utils/borrow_token';
import { errorToast, successToast } from '../config/CallToast';
import { toastConfig } from '../config/toastConfig';
import Toast from "react-native-toast-message"



const BorrowModal = () => {
  const [payAmount, setPayAmount] = useState("0")
  const [sendAddress, setSendAddress] = useState("")
  const [isLoading,setIsLoading]=useState(false)
  const {borrowModalVisible,setBorrowModalVisible,userWalletData,signer,ghoPrice}=useContext(ContextApi)
  console.log(payAmount)


  const borrowToken=async()=>{
    setIsLoading(true)
    try {
    const txnRes=await borrow(userWalletData.publicAddress,payAmount,signer,sendAddress)
    const reciept=await txnRes.wait()
    setIsLoading(false)
    if(reciept){

      successToast("Token borrowed successfully")
    }
  
      
    } catch (error) {
      setIsLoading(false)
      
      errorToast(error.message)
      
    }
  }

  return (
    <SafeAreaView>

      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={borrowModalVisible}
        >
          <View className='bg-[#171A25] flex pt-12 flex-col h-[100vh]'>
          <Toast position='bottom' bottomOffset={80} config={toastConfig} />
            

            {/* top div */}
            <View className=" px-6 flex flex-row justify-between items-center">
              <TouchableOpacity onPress={() => setBorrowModalVisible(false)}>
                <View className='bg-[#10131A]/70 px-3 py-1 rounded-3xl'>

                  <Entypo name="chevron-small-left" size={30} color="white" />
                </View>
              </TouchableOpacity>
              <Text className="text-white text-center text-lg semibold">Borrow Token</Text>
              <View className='bg-[#10131A]/70 px-5 py-2 rounded-3xl'>

                <AntDesign name="scan1" size={20} color="white" />
              </View>
            </View>



            <View className=" h-full px-8 py-4">
              <View className="flex flex-col space-y-6  relative rounded-lg">

                {/* amount div */}
                <View className="flex flex-col space-y-2 mt-4 items-center">
                  <TextInput
                    className="text-[#ffffff] text-4xl"
                    onChangeText={setPayAmount}
                    value={payAmount}
                    keyboardType="numeric"
                    placeholder='0.0'
                    placeholderTextColor={'#9fa1a3'}
                  />
                  <Text className="text-[#9fa1a3]">${payAmount*ghoPrice || 0}</Text>
                </View>

                {/* select token div */}
                <View className="  flex items-center justify-center space-x-3 flex-row px-6 py-2 h-[60px] rounded-[30px]">
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
                </View>

                {/* address div */}
                
                  <View>
                    <TextInput
                      className="text-[#ffffff] border border-[#9fa1a3]/20  h-[60px] px-6  rounded-[30px] text-[15px]"
                      placeholder='Send borrowed token to  (Optional)'
                      onChangeText={setSendAddress}
                      value={sendAddress}
                      keyboardType="phone-pad"
                      placeholderTextColor={'#9fa1a3'}
                      te
                    />
                  </View>
                  {
                    isLoading ? (
                      <TouchableOpacity className=" rounded-[30px] bg-[#9fa1a3]/70 flex flex-row justify-center items-center space-x-4 py-4">
                        <ActivityIndicator size="small" color='#10131a'/>
                  <Text className="text-lg text-center font-semibold  text-[#10131a]">Borrowing</Text>
                </TouchableOpacity>
                    ):(

                      <TouchableOpacity className=" rounded-[30px] bg-[#9fa1a3]/70 py-4" onPress={borrowToken}>
                  <Text className="text-xl text-center font-semibold  text-[#10131a]">Borrow</Text>
                </TouchableOpacity>

                    )
                  }
              </View>
            </View>
          </View>
        </Modal>

      </View>

    </SafeAreaView>

  );
};

export default BorrowModal;




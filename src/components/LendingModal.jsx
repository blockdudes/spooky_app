import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import SwapUiComponent from './SwapUiComponent';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { ContextApi, supportedTokens } from '../providers/store';
import SheetModal from './SheetModal';
import { supply } from '../utils/lend_tokens';
import { errorToast, successToast } from '../config/CallToast';
import { toastConfig } from '../config/toastConfig';
import Toast from "react-native-toast-message"
import { TxDialog } from './TxDialog';




const LendingModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [payAmount, setPayAmount] = useState("0")
  const [sendAddress, setSendAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signer, selectedLendToken, setSelectedLendToken, panelRef, ethPrice, ghoPrice, userWalletData, lendData, setLendData, ghoPriceEth } = useContext(ContextApi)
  console.log(payAmount)
  console.log(selectedLendToken)
  const [status, setStatus] = useState(0)



  const lendEthToken = async () => {
    setIsLoading(true)
    setStatus(1)
    try {
      console.log("ssusususdf")
      console.log(lendData.amount)
      console.log(ethPrice)
      const supplyAmount = lendData.amount / ethPrice * 1.60
      console.log(supplyAmount)
      const txnRes = await supply(userWalletData.publicAddress, supplyAmount, signer, lendData.optionalAddress, lendData.amount)
      setIsLoading(false)
      setStatus(2)
      if(txnRes){

        successToast("Token lend successfully")
      }
    } catch (error) {
      setIsLoading(false)
      errorToast(error.message)
      console.log("helo--->",error)
      setStatus(3)

    }
  }


  const handleLendBtn = () => {
    console.log("hello-->", selectedLendToken.symbol)
      lendEthToken()
    
  }

  return (
    <SafeAreaView>

      <View>
        <View className="flex items-center space-y-2 mr-4">
          <TouchableOpacity className=" bg-[#7264FF]  rounded-2xl w-[70px] flex items-center py-4 px-5" onPress={() => setModalVisible(true)}>
          <FontAwesome5 name="handshake" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white  ">Lend</Text>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <View className='bg-[#171A25] flex pt-12 flex-col h-[100vh]'>
          <Toast position='bottom' bottomOffset={80} config={toastConfig} />
          <TxDialog status={status} setStatus={setStatus}/>


            {/* top div */}
            <View className=" px-6 flex flex-row justify-between items-center">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View className='bg-[#10131A]/70 px-3 py-1 rounded-3xl'>

                  <Entypo name="chevron-small-left" size={30} color="white" />
                </View>
              </TouchableOpacity>
              <Text className="text-white text-center text-lg semibold">Lend Token</Text>
              <View className='px-5 py-2 rounded-3xl'>

                {/* <AntDesign name="scan1" size={20} color="white" /> */}
              </View>
            </View>



            <View className=" h-full px-8 py-4">
              <View className="flex flex-col space-y-6  relative rounded-lg">

                {/* amount div */}
                <View className="flex flex-col space-y-2 mt-4 items-center">
                  <TextInput
                    className="text-[#ffffff] text-4xl"
                    onChangeText={(text) => setLendData({ ...lendData, amount: text })}
                    value={lendData.amount}
                    keyboardType="numeric"
                    placeholder='0.0'
                    placeholderTextColor={'#9fa1a3'}
                  />
                  <Text className="text-[#9fa1a3]">${selectedLendToken.symbol === "ETH" ? Number(lendData.amount) * ethPrice : Number(lendData.amount) * ghoPrice}</Text>
                </View>

                {/* select token div */}
                <TouchableOpacity>
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
                </TouchableOpacity>
                <TouchableOpacity>
                  <View className="  flex items-center border border-[#9fa1a3]/20  justify-center space-x-3 flex-row px-6 py-2 h-[60px] rounded-[30px]">
                    <View className="flex flex-row items-center gap-2">
                        
                      <Image
                        className="h-[35px] rounded-full  w-[35px] object-cover self-center"
                        source={{
                          uri: supportedTokens[0].logo,
                        }}
                      />
                      <Text className="text-white text-xl">{supportedTokens[0].symbol}</Text>
                      <Text className="text-[#9fa1a3]">{supportedTokens[0].name + " (Lending Token)"}</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* address div */}

                <View>
                  <TextInput
                    className="text-[#ffffff] border border-[#9fa1a3]/20  h-[60px] px-6  rounded-[30px] text-lg"
                    placeholder='Borrower'
                    onChangeText={(text) => setLendData({ ...lendData, optionalAddress: text })}
                    value={lendData.optionalAddress}
                    placeholderTextColor={'#9fa1a3'}
                    
                  />
                  
                </View>
{/* 
                <View>
                  <TextInput
                    className="text-[#ffffff] border border-[#9fa1a3]/20  h-[60px] px-6  rounded-[30px] text-lg"
                    placeholder='Interest Rate %'
                    onChangeText={(text) => setLendData({ ...lendData, interestRate: text })}
                    value={lendData.interestRate}
                    keyboardType="phone-pad"
                    placeholderTextColor={'#9fa1a3'}
                    te
                  />
                  
                </View> */}
                {
                  isLoading ? (

                    <TouchableOpacity className=" rounded-[30px] flex flex-row items-center justify-center space-x-4 bg-[#9fa1a3]/70 py-4">
                      <ActivityIndicator size="small" color="#10131a" />
                      <Text className="text-xl text-center font-semibold  text-[#10131a]">Lending...</Text>
                    </TouchableOpacity>
                  ) : (

                    <TouchableOpacity className=" rounded-[30px] bg-white py-4" onPress={() => handleLendBtn()}>
                      <Text className="text-xl text-center font-semibold  text-black">Lend</Text>
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

export default LendingModal;







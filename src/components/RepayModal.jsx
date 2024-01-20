import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { toastConfig } from '../config/toastConfig';
import Toast from "react-native-toast-message"
import SheetModal from './SheetModal';
import { Entypo } from '@expo/vector-icons';
import QrScannerModal from './QrScannerModal';
import { ContextApi } from '../providers/store';
import { repayTx } from '../utils/repay_token';
import { errorToast, successToast } from '../config/CallToast';



const RepayModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {panelRef,ethPrice,ghoPrice, selectedRepayToken,setSelectedRepayToken,repayData,setRepayData,userWalletData,signer} = useContext(ContextApi)
  const [repayType, setRepayType] = useState("full")
  const [isLoading,setIsLoading]=useState(false)
  console.log(repayData)

  const repay=async()=>{
    setIsLoading(true)
    try {

      const txnRes=await repayTx(userWalletData.publicAddress,repayData.amount,signer)
      const reciept=await txnRes.wait()
      setIsLoading(false)
      if(reciept){
        successToast("Token repay successfully")
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error) 
      errorToast(error.message)
    }
  }

  const handleRepayBtn=()=>{
    repay()
  }

  return (
    <View>
      <View className="flex items-center space-y-2 mr-4">

        <TouchableOpacity className=" bg-[#7264FF] w-[70px] flex items-center  rounded-2xl py-4 px-5" onPress={() => setModalVisible(true)}>
          <FontAwesome name="money" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-white  ">Repay</Text>
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
              <Text className="text-white text-center text-lg semibold">Repay token</Text>
              <View className='bg-[#10131A]/70 px-5 py-2 rounded-3xl'>
                <QrScannerModal />
              </View>
            </View>


            <View className=" h-full px-8 py-4">
              <View className="flex flex-col space-y-6  relative rounded-lg">

              <View className="flex flex-row mt-6 justify-around">
              <TouchableOpacity className="bg-[#7264FF]/70 px-6 py-1 rounded-3xl" onPress={() => {
                setRepayType("full")
                setRepayData({...repayData,amount:-1})
                }}>
                <Text className="text-white text-lg font-semibold">Full</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#7264FF]/70 px-6 py-1 rounded-3xl" onPress={() => setRepayType("partial")}>
                <Text className="text-white text-lg font-semibold">Partial</Text>
              </TouchableOpacity>

            </View>

                {/* amount div */}
                {
                  repayType === "full" ? (
                    ""
                  ):(
                    <View className="flex flex-col space-y-2 mt-4 items-center">
                  <TextInput
                    value={repayData.amount}
                    onChangeText={(text)=>setRepayData({...repayData,amount:text})}
                    className="text-[#ffffff] text-4xl"
                    keyboardType="numeric"
                    placeholder='0.0'
                    placeholderTextColor={'#9fa1a3'}
                  />
                  <Text className="text-[#9fa1a3]">${selectedRepayToken.symbol === "ETH" ? Number(repayData.amount || 0) * ethPrice : Number(repayData.amount || 0) * ghoPrice}</Text>
                </View>
                  )
                }

                {/* select token div */}
                <TouchableOpacity onPress={() => {
                  panelRef.current.togglePanel()
                }}>
                  <View className=" border border-[#9fa1a3]/20 flex items-center justify-between space-x-3 flex-row px-6 py-2 h-[60px] rounded-[30px]" >
                    <View className="flex flex-row items-center gap-2">
                      <Image
                        className="h-[35px] rounded-full  w-[35px] object-cover self-center"
                        source={{
                          uri: selectedRepayToken.logo,
                        }}
                      />
                      <Text className="text-white text-xl">{selectedRepayToken.symbol}</Text>
                      <Text className="text-[#9fa1a3]">{selectedRepayToken.name}</Text>
                    </View>
                    <Entypo name="chevron-small-down" size={35} color="#ffffff" />
                  </View>
                </TouchableOpacity>

                {/* address div */}
                {/* <View>
                  <TextInput
                    className="text-[#ffffff] border border-[#9fa1a3]/20  h-[60px] px-6  rounded-[30px] text-[15px]"
                    placeholder='To (address)'
                    
                    placeholderTextColor={'#9fa1a3'}
                    keyboardType='default'
                  />
                </View> */}

                {
                  isLoading?(
                    <TouchableOpacity  className=" rounded-[30px] flex flex-row justify-center items-center space-x-4 bg-[#9fa1a3]/70 py-4">
                      <ActivityIndicator size="small" color="#10131a" />
                  <Text className="text-lg text-center font-semibold  text-[#10131a]">Repaying..</Text>
                </TouchableOpacity>
                  ):(
                    <TouchableOpacity onPress={()=>handleRepayBtn()} className=" rounded-[30px] bg-[#9fa1a3]/70 py-4">
                  <Text className="text-lg text-center font-semibold  text-[#10131a]">Repay</Text>
                </TouchableOpacity>
                  )
                }
              </View>
            </View>
          </View>
          <SheetModal />
        </Modal>
    </View>
  );
};

export default RepayModal;

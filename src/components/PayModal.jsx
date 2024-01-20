import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import SwapUiComponent from './SwapUiComponent';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import QrScannerModal from './QrScannerModal';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../config/toastConfig';
import SheetModal from './SheetModal';
import { ContextApi } from '../providers/store';
import { successToast } from '../config/CallToast';



const PayModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { ethPrice,ghoPrice,panelRef, selectedSendToken, setSendTokenData, sendTokenData } = useContext(ContextApi)

  const showToast = () => {
    successToast("Token Sent Successfully")
  }

  console.log(sendTokenData)

  return (
    <SafeAreaView>

      <View>
        <View className="flex items-center space-y-2 mr-4">
          <TouchableOpacity className=" bg-[#7264FF] w-[75px] flex items-center  rounded-2xl py-4 px-5" onPress={() => setModalVisible(true)}>
            <FontAwesome name="send" size={25} color="white" />
          </TouchableOpacity>
          <Text className="text-white  ">Send</Text>
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
              <Text className="text-white text-center text-lg semibold">Send Token</Text>
              <View className='bg-[#10131A]/70 px-5 py-2 rounded-3xl'>
                <QrScannerModal />
              </View>
            </View>


            <View className=" h-full px-8 py-4">
              <View className="flex flex-col space-y-6  relative rounded-lg">

                {/* amount div */}
                <View className="flex flex-col space-y-2 mt-4 items-center">
                  <TextInput
                    className="text-[#ffffff] text-4xl"
                    onChangeText={(text) => setSendTokenData({ ...sendTokenData, amount: text })}
                    // onChange={(e) => setSendTokenData({...sendTokenData,amount:e.nativeEvent.text})}
                    value={sendTokenData.amount}
                    keyboardType="numeric"
                  />
                  <Text className="text-[#9fa1a3]">${selectedSendToken.symbol==="ETH" ? Number(sendTokenData.amount || 0)*ethPrice : Number(sendTokenData.amount || 0)*ghoPrice}</Text>
                </View>

                {/* select token div */}
                <TouchableOpacity onPress={() => {
                  panelRef.current.togglePanel()
                }}>
                  <View className=" border border-[#9fa1a3]/20 flex items-center justify-between space-x-3 flex-row px-6 py-2 h-[60px] rounded-[30px]" >
                    <View className="flex flex-row items-center gap-2">
                      <Image
                        className="h-[35px] rounded-full  w-[35px] object-cover self-center"
                        source={{
                          uri: selectedSendToken.logo,
                        }}
                      />
                      <Text className="text-white text-xl">{selectedSendToken.symbol}</Text>
                      <Text className="text-[#9fa1a3]">{selectedSendToken.name}</Text>
                    </View>
                    <Entypo name="chevron-small-down" size={35} color="#ffffff" />
                  </View>
                </TouchableOpacity>

                {/* address div */}
                <View>
                  <TextInput
                    className="text-[#ffffff] border border-[#9fa1a3]/20  h-[60px] px-6  rounded-[30px] text-[15px]"
                    placeholder='To (address)'
                    value={sendTokenData.address}
                    onChangeText={(text) => setSendTokenData({ ...sendTokenData, address: text })}
                    // onChange={(e) => setSendTokenData({ ...sendTokenData, address: e.nativeEvent.text })}
                    
                    placeholderTextColor={'#9fa1a3'}
                    keyboardType='default'
                  />
                </View>

                <TouchableOpacity onPress={() => showToast()} className=" rounded-[30px] bg-[#9fa1a3]/70 py-4">
                  <Text className="text-xl text-center font-semibold  text-[#10131a]">Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <SheetModal />
        </Modal>
      </View>

    </SafeAreaView>

  );
};

export default PayModal;

import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import SwapUiComponent from './SwapUiComponent';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { ContextApi } from '../providers/store';
import { borrow } from '../utils/borrow_token';



const BorrowModal = () => {
  const [payAmount, setPayAmount] = useState("0")
  const [sendAddress, setSendAddress] = useState("")
  const {borrowModalVisible,setBorrowModalVisible,userWalletData,signer}=useContext(ContextApi)
  console.log(payAmount)


  const borrowToken=async()=>{
    try {
    txnRes=await borrow(userWalletData.publicAddress,payAmount,signer,sendAddress)
  
      
    } catch (error) {
      console.log(error)
      
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
                  <Text className="text-[#9fa1a3]">$150.42</Text>
                </View>

                {/* select token div */}
                <View className="  flex items-center justify-center space-x-3 flex-row px-6 py-2 h-[60px] rounded-[30px]">
                  <View className="flex flex-row items-center gap-2">
                    <Image
                      className="h-[35px] rounded-full  w-[35px] object-cover self-center"
                      source={{
                        uri: 'https://logowik.com/content/uploads/images/ethereum3649.jpg',
                      }}
                    />
                    <Text className="text-white text-xl">Eth</Text>
                    <Text className="text-[#9fa1a3]">Ethereum</Text>
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

              

                <TouchableOpacity className=" rounded-[30px] bg-[#9fa1a3]/70 py-4" onPress={borrowToken}>
                  <Text className="text-xl text-center font-semibold  text-[#10131a]">Borrow</Text>
                </TouchableOpacity>


              </View>
            </View>
          </View>
        </Modal>

      </View>

    </SafeAreaView>

  );
};

export default BorrowModal;




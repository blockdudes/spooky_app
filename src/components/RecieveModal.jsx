import React, { useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import SwapUiComponent from './SwapUiComponent';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import BarCode from './BarCode';
import QRCode from "react-native-qrcode-svg"
import * as Clipboard from 'expo-clipboard';


const RecieveModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [payAmount, setPayAmount] = useState("0")
  const [sendAddress, setSendAddress] = useState("")
  console.log(payAmount)
  const [QRvalue, setQRValue] = useState('');
  const [QRLogo, setQRLogo] = useState('');
  const [QRImage, setQRImage] = useState('');
  const ref = useRef();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipBoard=async()=>{
    const status=await Clipboard.setStringAsync('0xabch....xvshb')
    setIsCopied(status)
    setTimeout(() => {
      setIsCopied(false)
    }, 3000);
  }

  return (
    <SafeAreaView>

      <View>
        <View className="flex items-center space-y-2 mr-4">
          <TouchableOpacity className=" bg-[#7264FF] w-[75px] flex  items-center  rounded-2xl py-4 px-5" onPress={() => setModalVisible(true)}>
            <FontAwesome name="arrow-down" size={25} color="white" />
          </TouchableOpacity>
          <Text className="text-white  ">Recieve</Text>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <View className='bg-[#171A25] flex pt-12 flex-col h-[100vh]'>

            {/* top div */}
            <View className=" px-6 flex flex-row justify-between items-center">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View className='bg-[#10131A]/70 px-3 py-1 rounded-3xl'>

                  <Entypo name="chevron-small-left" size={30} color="white" />
                </View>
              </TouchableOpacity>
              <Text className="text-white text-center text-lg semibold">Recieve Token</Text>
              <View className='bg-[#10131A]/70 px-5 py-2 rounded-3xl'>

                <AntDesign name="scan1" size={20} color="white" />
              </View>
            </View>



            <View className=" h-full px-8 py-4">
              <View className="flex flex-col space-y-6  relative rounded-lg">

                {/* amount div */}
                <View className="flex flex-col space-y-2 mt-4 items-center">

                  {/* generate qr code */}
                  <View style={styles.sectionContainer}>
                    {/* <Text style={styles.sectionTitle}>Generate QRCode</Text> */}
                    <View style={styles.row}>
                    </View>
                    <View className="bg-white p-4 rounded-xl items-center">

                      <QRCode
                        size={200}
                        value={QRvalue ? QRvalue : 'NA'}

                        logoSize={60}
                        getRef={ref}
                      />
                    </View>
                  </View>




                  {/* <Image
                      className="h-[200px] w-[200px] object-cover self-center"
                      source={{
                        uri: 'https://cdn3.vectorstock.com/i/1000x1000/23/67/qr-code-the-white-color-icon-vector-15662367.jpg',
                      }}
                    /> */}
                  <Text className="text-[#9fa1a3]">Scan Address to receive token</Text>
                </View>

                {/* select token div */}
                <View className="mx-auto">
                  <View className="bg-[#10131A] flex flex-row items-center  px-4 space-x-4 rounded-[30px]  h-[55px] ">
                    <Text className="text-white tracking-wider text-lg">0xabch....xvshb</Text>
                    <TouchableOpacity onPress={() => copyToClipBoard()}>
                      {isCopied ?(
                        <Feather name="check" size={20} color="green" />
                      ):(
                        <Feather name="copy" size={20} color="white" />

                      )}
                    </TouchableOpacity>

                  </View>

                </View>

                {/* address div */}
                {/* <Text className="text-white text-center text-lg">Amount request</Text>
                <View className=" border border-[#9fa1a3]/20 flex items-center justify-between space-x-3 px-6 py-3 h-[60px] rounded-[30px]">
                  
                  <View className="flex flex-row items-center ">
                    <TextInput
                      className="text-[#ffffff] text-center text-lg"
                      placeholder='Amount'
                      onChangeText={setSendAddress}
                      value={sendAddress}
                      keyboardType="numeric"
                      placeholderTextColor={'#9fa1a3'}
                    />
                  </View>

                </View>

                <TouchableOpacity className=" rounded-[30px] bg-[#9fa1a3]/70 py-4">
                  <Text className="text-xl text-center   text-[#10131a]">Set Amount</Text>
                </TouchableOpacity> */}


              </View>
            </View>
          </View>
        </Modal>

      </View>

    </SafeAreaView>

  );
};

export default RecieveModal;



const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginRight: 20,
    marginVertical: 20,
    borderRadius: 20,
    width: 162,
    borderWidth: 1,
    borderStyle: 'solid',
  },
});




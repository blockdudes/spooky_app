import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import BarCode from './BarCode';



const QrScannerModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View >
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <AntDesign name="scan1" size={20} color="white" />
                </TouchableOpacity>
            

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <View className='bg-[#171A25] h-[100vh]'>
                    
                    <View className="h-full pt-24  items-center space-y-4  flex-col">
                        <Text className="text-white text-xl">Scan QR</Text>
                        <View className="w-full items-center">
                        <BarCode setModalVisible={setModalVisible}/>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default QrScannerModal;

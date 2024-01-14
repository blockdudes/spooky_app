import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import SwapUiComponent from './SwapUiComponent';

const SwapModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className='flex-1 justify-center items-center'>
      <TouchableOpacity className="h-[50px] w-[50px] bg-pink-500/30 rounded-md p-2" onPress={() => setModalVisible(true)}>
        <Text className="text-pink-500 text-center">S</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <View className='flex-1 justify-center items-center'>
          <SwapUiComponent/>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text sclassName='bg-red-500 text-white p-3 rounded'>
              Close Modal
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default SwapModal;

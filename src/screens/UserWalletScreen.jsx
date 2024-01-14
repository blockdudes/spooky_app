import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import SwapModal from '../components/SwapModal'
import LendingModal from '../components/LendingModal'
import RecieveModal from '../components/RecieveModal'
import BorrowModal from '../components/BorrowModal'
import RepayModal from '../components/RepayModal'
import StablizeModal from '../components/StablizeModal'
import PayModal from '../components/PayModal'

const UserWalletScreen = () => {
  return (
    <SafeAreaView>
        <View className="flex border flex-col space-y-2 p-8">
            <View>
                <Text className="font-bold text-lg">Wallet Address</Text>
                <Text className="font-bold text-2xl">$0.00</Text>
            </View>
            <View className="flex  flex-row gap-4">
                <SwapModal/>
                <LendingModal/>
                <RecieveModal/>
                <BorrowModal/>
                <RepayModal/>
                <StablizeModal/>
                <PayModal/>
                
            </View>
            <View className="mt-10">
                <Text className="font-bold text-lg">Transaction History</Text>
                {/* <View className="bg-gray-300 h-[80%] m-4 rounded-lg ">
                </View> */}
            </View>
            {/* <SwapModal/> */}
            
            
            
        </View>
    </SafeAreaView>
)}

export default UserWalletScreen
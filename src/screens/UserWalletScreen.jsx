import { View, Text, SafeAreaView, Pressable, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import SwapModal from '../components/SwapModal'
import LendingModal from '../components/LendingModal'
import RecieveModal from '../components/RecieveModal'
import BorrowModal from '../components/BorrowModal'
import RepayModal from '../components/RepayModal'
import PayModal from '../components/PayModal'
import { Feather } from '@expo/vector-icons';
import StableModal from '../components/StableModal'
import BarCode from '../components/BarCode'
import { ContextApi } from '../providers/store'
import * as Clipboard from 'expo-clipboard';
import CreditDelegation from '../components/CreditDelegation'
import { ethers } from 'ethers'



const UserWalletScreen = () => {
    const [activeTab, setActiveTab] = useState('Activity')
    const { setBorrowModalVisible, userWalletData, signer,ghoContract } = useContext(ContextApi)
    const [isCopied, setIsCopied] = useState(false)
    const [ethBalance, setEthBalance] = useState(0)
    const [ghoBalance, setGhoBalance] = useState(0);
    const getBalance = async () => {
        ethBal = await signer.getBalance();
        console.log("ethBal........",ethBal)
        ghoBal = await ghoContract.balanceOf(signer.address);
        
        const ethBalanceFormatted = ethers.utils.formatUnits(ethBal, 18);
        const ghoBalanceFormatted = ethers.utils.formatUnits(ghoBal, 18);
        setEthBalance(ethBalanceFormatted)
        setGhoBalance(ghoBalanceFormatted)
    }
    useEffect(() => {
        getBalance()
    }, [signer])

    


    const copyToClipBoard = async () => {
        const status = await Clipboard.setStringAsync(userWalletData.publicAddress)
        setIsCopied(status)
        setTimeout(() => {
            setIsCopied(false)
        }, 4000);
    }

    return (
        <View className="bg-[#10131A]">
            <SafeAreaView className="flex  bg-[#171A25] h-[100vh]  flex-col space-y-3 ">


                <View style={Dimensions.get('screen').height < 668 ? { height: "75%" } : { height: "60%" }} className="pl-4 space-y-6 pt-4  rounded-b-[60px] shadow-xl bg-[#10131A]">

                    {/* //wallet address */}
                    <View className="items-center">
                        <View className="bg-[#171A25] flex flex-row items-center justify-center px-4 space-x-4 rounded-[30px] w-[220px] h-[55px] ">
                            <Text className="text-white tracking-wider text-lg">{`${userWalletData?.publicAddress.slice(0, 6)}...${userWalletData.publicAddress.slice(-6)}`}</Text>
                            <TouchableOpacity onPress={() => copyToClipBoard()}>
                                {isCopied ? (
                                    <Feather name="check" size={20} color="green" />
                                ) : (

                                    <Feather name="copy" size={20} color="white" />
                                )}

                            </TouchableOpacity>

                        </View>

                    </View>

                    {/* totalbalance */}
                    <View className="flex flex-row justify-evenly items-center space-x-4">
                        <View className="flex flex-col items-center space-y-2">
                            <Text className="text-white tracking-wider text-lg">GHO</Text>
                            <Text className="text-white text-[3vh] ">{parseFloat(ghoBalance).toFixed(4)}</Text>
                        </View>
                        <View className="flex flex-col items-center space-y-2">
                            <Text className="text-white tracking-wider text-lg">ETH</Text>
                            <Text className="text-white text-[3vh] ">{parseFloat(ethBalance).toFixed(4)}</Text>
                        </View>
                    </View>

                    <View className="flex flex-col space-y-3">
                        <View className=" flex flex-row justify-around ">
                            <PayModal />
                            <RecieveModal />
                            <LendingModal />

                        </View>
                        <View className="flex flex-row justify-around">
                            <SwapModal />
                            <StableModal />
                            <RepayModal />
                        </View>
                        <View className="flex flex-row justify-around">
                            <CreditDelegation />
                            {/* <BorrowModal/> */}
                        </View>



                    </View>

                </View>


                <View className="flex flex-col h-[40vh] px-3 gap-3">
                    <View className="flex pl-2 flex-row space-x-8 items-center">
                        <TouchableOpacity className={`${activeTab === 'Activity' ? 'border-b-2 border-[#7264FF]' : ''} pb-2`} onPress={() => setActiveTab('Activity')}>
                            <Text className="text-lg tracking-wider  text-white">Activity</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={`${activeTab === 'Borrow' ? 'border-b-2 border-[#7264FF]' : ''} pb-2 `} onPress={() => setActiveTab('Borrow')}>
                            <Text className="text-lg tracking-wider  text-white">Borrow</Text>
                        </TouchableOpacity>
                    </View>
                    <View className=" h-[100%] rounded-xl">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                activeTab === 'Activity' ? (

                                    // activity tab content
                                    <View className="flex flex-col space-y-2">

                                        {
                                            [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19].map((item) => (
                                                <View key={item}>
                                                    <View className=" bg-[#10131A]  h-[75px] flex justify-between flex-row items-center px-5 rounded-[20px]">
                                                        <View className="flex flex-row items-center space-x-2">
                                                            <Image
                                                                className="h-[30px] rounded-full  w-[30px] object-cover self-center"
                                                                source={{
                                                                    uri: 'https://logowik.com/content/uploads/images/ethereum3649.jpg',
                                                                }}
                                                            />
                                                            <View className="flex flex-col">
                                                                <Text className="text-white font-bold">Send</Text>
                                                                <Text className="text-[#9fa1a3]">0.00eth</Text>
                                                            </View>
                                                        </View>
                                                        <View className="flex flex-col">
                                                            <Text className="text-[#9fa1a3]">From: 0xb3...dsfb</Text>
                                                            <Text className="text-[#9fa1a3]"> To: 0xbz..rtyht</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                    </View>
                                ) : (

                                    //borrow tab content
                                    <View className="flex flex-col space-y-2">

                                        {
                                            [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19].map((item) => (
                                                <View key={item}>
                                                    <View className=" bg-[#10131A]  h-[75px] flex justify-between flex-row items-center px-5 rounded-[25px]">
                                                        <View className="flex flex-row items-center space-x-2">
                                                            <Image
                                                                className="h-[30px] rounded-full  w-[30px] object-cover self-center"
                                                                source={{
                                                                    uri: 'https://logowik.com/content/uploads/images/ethereum3649.jpg',
                                                                }}
                                                            />
                                                            <View className="flex flex-col">
                                                                <Text className="text-white font-bold">Send</Text>
                                                                <Text className="text-[#9fa1a3]">0.00eth</Text>
                                                            </View>
                                                        </View>
                                                        <BorrowModal />
                                                        <TouchableOpacity className=" bg-[#171A25] border border-[#7264FF] flex items-center  rounded-3xl py-3 px-5" onPress={() => setBorrowModalVisible(true)}>
                                                            <Text className="text-white text-xs font-bold">Borrow</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                    </View>

                                )
                            }
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default UserWalletScreen

{/* <View className="flex flex-col gap-3">
                <Text className="font-bold text-lg text-white">Activity</Text>
                <View className=" h-[75%] rounded-xl">
                    <ScrollView>
                        <View className="flex flex-col space-y-2">

                        {
                            [1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,18,19].map((item)=>(
                                <View key={item}>
                                    <View className=" flex justify-between flex-row rounded-xl">
                                        <View className="flex flex-col space-y-1 p-3">
                                            <Text className="text-white font-bold">Send</Text>
                                            <Text className="text-green-500">0.00eth</Text>
                                        </View>
                                        <View className="flex flex-col space-y-1 p-3">
                                            <Text className="text-white font-bold">From: 0xb3...dsfb</Text>
                                            <Text className="text-green-500"> To: 0xbz..rtyht</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                        </View>
                    </ScrollView>
                </View>
            </View> */}

var styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});





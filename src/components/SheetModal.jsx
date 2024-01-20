import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import BottomSheet from 'react-native-simple-bottom-sheet';
import { ContextApi, supportedTokens } from '../providers/store';


const SheetModal = () => {
    const {repayData,setRepayData,setSelectedPayToken,setSelectedRecieveToken,activeTask,panelRef,setSelectedSendToken,setSendTokenData,sendTokenData,swapData,setSwapData,setSelectedLendToken,setSelectedRepayToken} = useContext(ContextApi)
    const selectToken = ({name,symbol,logo}) => {

        activeTask==="pay" ? setSelectedPayToken({name,symbol,logo}) : setSelectedRecieveToken({name,symbol,logo})
        activeTask==="pay" ? setSwapData({...swapData,payToken:symbol}):setSwapData({...swapData,receiveToken:symbol})
        setSelectedLendToken({name,symbol,logo})
        setSelectedRepayToken({name,symbol,logo})
        setRepayData({...repayData,tokenName:symbol})
    }

  return (
    <View>
            <BottomSheet isOpen={false} wrapperStyle={{ backgroundColor: '#18181b',height:Dimensions.get('window').height }} ref={ref => panelRef.current = ref} sliderMinHeight={0} sliderMaxHeaigt={1000}    >
              {(onScrollEndDrag) => (
                <View>

                  <ScrollView onScrollEndDrag={onScrollEndDrag}>
                    <View className="flex flex-col pb-8 space-y-2">

                      {
                        supportedTokens.map(({name,symbol,logo},i) => (
                          <View key={i} >
                            <TouchableOpacity onPress={()=>{
                                selectToken({name,symbol,logo})
                                setSelectedSendToken({name,symbol,logo})
                                setSendTokenData({...setSendTokenData,tokenName:symbol})
                                panelRef.current.togglePanel()

                                }}>

                            <View className=" bg-[#171A25]  h-[75px] flex justify-between flex-row items-center px-4 rounded-[35px]">
                              <View className="flex flex-row items-center space-x-2">
                                <Image
                                  className="h-[30px] rounded-full  w-[30px] object-cover self-center"
                                  source={{
                                    uri: logo,
                                  }}
                                />
                                <View className="flex flex-col">
                                  <Text className="text-white font-bold">{symbol}</Text>
                                  <Text className="text-[#9fa1a3]">{name}</Text>
                                </View>
                              </View>
                            </View>
                            </TouchableOpacity>
                          </View>
                        ))
                      }
                    </View>
                  </ScrollView>
                </View>
              )}
            </BottomSheet>
          </View>
  )
}

export default SheetModal
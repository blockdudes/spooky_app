import React from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { useState } from 'react';


const SwapUiComponent = () => {
    const [inputTokenAmount, setInputTokenAmount] = useState(0);
    const [outputTokenPrice, setOutputTokenPrice] = useState(0);


    const handleTokenInputChange = (amount) => {
        setInputTokenAmount(amount);
        setOutputTokenPrice(Number(amount) + 10);
    };

    const handleSwapPress = () => {
        console.log('Swapping tokens...');
    };

    return (
        <View className="flex-1 p-4" >
            <View className="flex-1">

                <TextInput
                    className="h-12 border border-gray-300 rounded p-2 mb-4"
                    placeholder="Enter Token Amount"
                    keyboardType="numeric"
                    value={inputTokenAmount}
                    onChangeText={handleTokenInputChange}
                />


                <Text className="mb-4">
                    Estimated Output Token Price: {outputTokenPrice} ETH
                </Text>
            </View>


            <Pressable
                className="bg-blue-500 p-3 rounded"
                onPress={handleSwapPress}
            >
                <Text className="text-white text-center">Swap</Text>
            </Pressable>
        </View>
    );
};


export default SwapUiComponent
import { BarCodeScanner } from "expo-barcode-scanner";
import { useContext, useEffect, useState } from "react";
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ContextApi } from "../providers/store";
import { successToast } from "../config/CallToast";

export default function BarCode({setModalVisible}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [scannedText, setScannedText] = useState("Please scan");
  const {setSendTokenData,sendTokenData}=useContext(ContextApi)

  const askCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  };

  const handleAfterScanned = ({ data, type }) => {
    setHasScanned(true);
    console.log(data);
    setScannedText(data);
    setSendTokenData({...sendTokenData,address:data})
    setModalVisible(false)
    successToast("Address successfully scanned")
  };

  useEffect(() => {
    askCameraPermission();
  }, []);

  if (hasPermission === false) {
    return (
      <View className="flex flex-col w-[300px] items-center h-[400px] justify-center  space-y-12">
        <View className="bg-black w-full px-4 py-4 rounded-xl ">

        <Text className="text-white text-center">Permission denied!</Text>
        </View>
        <TouchableOpacity onPress={askCameraPermission} className="text-white bg-[#7264FF] px-6 py-2 rounded-2xl ">
            <Text className="text-white text-center">Scan Again</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (hasPermission === null) {
    return (
      <View >
        <Text className="text-white" >Requesting camera Permission</Text>
      </View>
    );
  }

  return (
    <View className="  items-center border-3 border-[#9fa1a3]  space-y-8 bg-black w-[80%] rounded-[30px]">
      <BarCodeScanner
        
        onBarCodeScanned={hasScanned ? undefined : handleAfterScanned}
        className="h-[80%]  w-[85%]"
      />
      {hasScanned && (
        <TouchableOpacity className="text-white bg-[#7264FF] px-6 py-2 rounded-2xl " onPress={() => setHasScanned(false)}>
            <Text className="text-white">Scan Again</Text>
        </TouchableOpacity>
      )}
      {/* <Text className="text-white">{scannedText}</Text> */}
    </View>
  );
}

import { View } from "react-native";

export const ActivityComponent = () => {
  return (
    <View key={item}>
      <View className=" bg-[#10131A]  h-[75px] flex justify-between flex-row items-center px-5 rounded-[20px]">
        <View className="flex flex-row items-center space-x-2">
          <Image
            className="h-[30px] rounded-full  w-[30px] object-cover self-center"
            source={{
              uri: "https://logowik.com/content/uploads/images/ethereum3649.jpg",
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
  );
};

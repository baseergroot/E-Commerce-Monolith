import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
  console.log("cart rendered")
  return (
    <SafeAreaView>
      <ScrollView contentContainerClassName="flex-col gap-5 items-center pb-10" 
        className="flex-1">

        {/* three sections */}

        {/* Hero */}
        <View className='bg-slate-600 h-48 w-full '>
          <Text className='text-green-600'>Your Cart</Text>
        </View>

        {/* cart items list */}
        <View className='bg-red-300'></View>

        {/* Order summary */}
        <View className='bg-green-300'></View>
      </ScrollView>
    </SafeAreaView>
  );
}
 
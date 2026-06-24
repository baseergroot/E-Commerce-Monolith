import { View, Text, TouchableOpacity } from 'react-native'
import { ArrowRightIcon } from 'lucide-react-native'
import { CartItemType } from '@/lib/asyncStorage'

const OrderSummary = ({cartItems}: {cartItems: CartItemType[]}) => {
  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const deliveryCharges = subTotal > 0 ? 30 : 0
  const total = subTotal + deliveryCharges
  return (
    // make the bg match app theme bg color 
    // #f5ebdb

    <View className='bg-[#f5ebdb] px-5 py-5 mx-5 rounded-xl flex flex-col gap-1'>
      <Text className='font-bold text-lg mb-2'>Order Summary</Text>

      <View className='flex flex-row justify-between'>
        <Text>Subtotal</Text>
        <Text>${subTotal}</Text>
      </View>

      <View className='flex flex-row justify-between'>
        <Text>Delivery Charges</Text>
        <Text>${deliveryCharges}</Text>
      </View>

      {/* line break */}
      <View className='border-b border-gray-500 my-2'></View>

      <View className='flex flex-row justify-between'>
        <Text className='font-bold text-lg'>Total</Text>
        <Text className='font-bold text-lg'>${total}</Text>
      </View>

      {/* proceed to checkout */}
      {
        cartItems.length > 0 && (
          <TouchableOpacity className='bg-black text-white px-5 py-3 rounded-xl mt-5 flex flex-row justify-center items-center gap-2'>
        <Text className='text-white font-bold'>Proceed to Checkout</Text>
        <ArrowRightIcon color={'white'} />
      </TouchableOpacity>
        )
      }

    </View>
  )
}

export default OrderSummary
import { View, Text } from 'react-native'
import React from 'react'
import { ShoppingBag } from 'lucide-react-native'

const CartHeader = () => {
  return (

    // make bg gradient light red and white at corners
    <View className='bg-linear-to-br from-rose-50 via-rose-100 to-white h-36 px-5 py-5 flex flex-row justify-between mx-5 my-5 rounded-xl'>
      <View className='w-60'>
        <Text className='text-2xl font-bold mb-2'>Your Cart</Text>
        <Text className='text-gray-600 text-sm leading-6'>Review the items you added, adjust quantities, and proceed to checkout</Text>
      </View>
      <View className='bg-white h-14 w-14 flex justify-center items-center rounded-md'>
        <ShoppingBag color={'red'} />
      </View>
    </View>
  )
}

export default CartHeader
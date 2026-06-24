import { View, Text, TouchableOpacity } from 'react-native'

const ProductQuantity = ({ productQuantity, setProductQuantity, variant = '' }: { productQuantity: number, setProductQuantity: (value: number) => void, variant?: string }) => {

  return (
    <View className='flex flex-row items-center justify-between w-full mt-5  px-5'>
      <Text className='font-bold'>Quantity</Text>
      <View className='flex flex-row items-center bg-white rounded-full px-3 py-1'>

        {/* decrement quantity */}
        <TouchableOpacity onPress={() => { if (productQuantity > 1) setProductQuantity(productQuantity - 1) }} className='bg-gray-300 w-12 h-12  rounded-full flex items-center justify-center'>
          <Text className='text-black font-bold'>-</Text>
        </TouchableOpacity>

        {/* show quantity is >= 1 then show minus */}
        <Text className=' rounded-full mx-2'>{productQuantity}</Text>

        {/* increment quantity */}
        <TouchableOpacity onPress={() => { setProductQuantity(productQuantity + 1) }} className='bg-[#fe4343] w-12 h-12  rounded-full flex items-center justify-center'>
          <Text className='text-white font-bold'>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductQuantity
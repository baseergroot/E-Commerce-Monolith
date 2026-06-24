import { Image, Text, View } from 'react-native'
import ProductQuantityCart from './ProductQuantityCart'
import { CartItemType } from '@/lib/asyncStorage'

const CartProductComp = ({item}: {item: CartItemType}) => {
  return (
    <View className='h-auto w-full bg-white rounded-2xl flex flex-row gap-3 items-center px-3 py-5 '>

      {/* Product Image */}
      <View className='h-36 w-36  rounded-md'>
        <Image src={item.images[0]} alt='product image' className='h-full w-full object-center rounded-md ' />  
      </View> 

      {/* Product Details */}
      <View className='h-36 w-36  rounded-md grow flex flex-col justify-between p-2'>
        <View>
          <Text className='font-bold text-lg '>{item.name}</Text>
          <Text className='text-gray-600 text-sm leading-6'>Variant: {item.category}</Text>
          <Text className='text-gray-600 text-sm leading-6'>In stock</Text>
        </View>

        <View className='flex flex-row justify-between items-center  '>
          <View className='flex flex-row gap-2'>
            <Text className='font-bold text-lg mb-2'>Price:</Text>
            <Text className='font-bold text-lg mb-2'>${item.price}</Text>
          </View>
          <ProductQuantityCart productQuantity={item.quantity} setProductQuantity={() => { }} />
        </View>
      </View>
    </View>
  )
}

export default CartProductComp


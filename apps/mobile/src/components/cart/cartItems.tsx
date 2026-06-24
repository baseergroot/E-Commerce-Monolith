import { Text, View } from 'react-native'
import { CartItemType, clearCart, getCartItems } from '@/lib/asyncStorage'
import CartProductComp from './cartProductComp'
import { TouchableOpacity } from 'react-native'

const CartItems = ({cartItems, setCartItems}: {cartItems: CartItemType[], setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>}) => {
  
  return (

    // make the bg match app theme bg color 
    // #FAF8F5

    <View className='bg-[#f5ebdb] px-5 py-2 mx-5 mb-5 rounded-xl flex flex-col gap-5'>
      <View className='flex flex-row justify-between'>
        <Text className='font-bold text-lg mb-2'>Cart Items</Text>
        <TouchableOpacity onPress={async () => {
          await clearCart()
          const items = await getCartItems()
          setCartItems([])
        }}>
          <Text className='text-red-400 text-sm leading-6 font-bold'>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* cart product component */}
      {
        cartItems.length == 0 ? <Text className='text-center text-lg font-bold'>Cart is empty</Text> : 
      cartItems?.map((item:CartItemType) => (
        <CartProductComp key={item._id + Math.random()} item={item} />
      ))} 

    </View>
  )
}

export default CartItems
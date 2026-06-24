import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from '@/components/shared/navbar'
import CartHeader from '@/components/cart/cartHeader'
import OrderSummary from '@/components/cart/orderSummary'
import CartItems from '@/components/cart/cartItems'
import { useEffect, useState } from 'react'
import { CartItemType, getCartItems } from '@/lib/asyncStorage'
import { ScrollView, View } from 'react-native'

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])

  useEffect(() => {
    const fetchCartItems = async () => {
      const allCartItems = await getCartItems()
      if (allCartItems && allCartItems.length > 0) {
        setCartItems(allCartItems)
      }
    }
    fetchCartItems()
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-[#FAF8F5] '>

      {/* Navbar */}
      <Navbar />

      {/* Cart Header */}
      <CartHeader />

      <ScrollView>
        <View className="pb-60">
          <CartItems cartItems={cartItems} setCartItems={setCartItems}/>
          <OrderSummary cartItems={cartItems}/>
        </View>
      </ScrollView>
 
    </SafeAreaView>
  )
}

export default CartScreen

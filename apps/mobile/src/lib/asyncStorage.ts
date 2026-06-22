import { Product } from '@/types/product';
import AsyncStorage from '@react-native-async-storage/async-storage';


const key = "recent-searches"

const setItem = async (value: string) => {

  try {
    // await AsyncStorage.setItem(key, JSON.stringify(["shoes"])) // debugging line
    const allRecentSearches = await getItem()
    if (!allRecentSearches || allRecentSearches.length < 1) {
      await AsyncStorage.setItem(key, JSON.stringify([value]))
      return
    }

    if (allRecentSearches.includes(value) || value.trim().length == 0) {
      return
    }
    // console.log("existing", existingValue)
    // console.log("value", value)
    // console.log("allRecentSearches", allRecentSearches)
    allRecentSearches.push(value)
    await AsyncStorage.setItem(key, JSON.stringify(allRecentSearches))
  } catch (e) {
    // saving error
    console.log(e)
  }
}

const getItem = async (): Promise<string[] | undefined> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value) as string[]
    }
    return [] 
  } catch (e) {
    // error reading value
    console.log(e)
  }
}

const removeItem = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
    console.log(e)
  }
}


const cartKey = 'cart'
type CartItemType = Product & {quantity:number}

const getCartItems = async (): Promise<CartItemType[] | undefined> => {
  try {
    const value = await AsyncStorage.getItem(cartKey);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value) as CartItemType[]
    }
    return [] 
  } catch (e) {
    // error reading value
    console.log(e)
  }
}

const addToCart = async (product: Product, quantity:number) => {
  try {
    const tempProduct: CartItemType = {...product, quantity}
    const allCartItems = await getCartItems()
    console.log("allCartItems", allCartItems)
    if (!allCartItems || allCartItems.length < 1) {
      await AsyncStorage.setItem(cartKey, JSON.stringify([tempProduct]))
      return
    }

    // if product is already in cart inrease quantity 
    if (allCartItems.includes(tempProduct)) {
      await updateCartItemQuantity(tempProduct._id, quantity)
      return
    }

    allCartItems.push(tempProduct)
    await AsyncStorage.setItem(cartKey, JSON.stringify(allCartItems))
  } catch (e) {
    // saving error
    console.log(e)
  }
}

const removeFromCart = async (product: Product) => {
  try {
    const allCartItems = await getCartItems()
    if (!allCartItems || allCartItems.length < 1) {
      return
    }
    const filteredItems = allCartItems.filter((item) => item._id !== product._id)
    await AsyncStorage.setItem(cartKey, JSON.stringify(filteredItems))
  } catch (e) {
    // saving error
    console.log(e)
  }
}

const updateCartItemQuantity = async (productId:string, quantity:number) => {
  try {
    const allCartItems = await getCartItems()
    if (!allCartItems || allCartItems.length < 1) {
      return
    }
    const filteredItems = allCartItems.map((item) => {
      if (item._id === productId) {
        return {...item, quantity}
      }
      return item
    })
    await AsyncStorage.setItem(cartKey, JSON.stringify(filteredItems))
  } catch (e) {
    // saving error
    console.log(e)
  }
}

export { setItem, getItem, removeItem, getCartItems, addToCart, removeFromCart, updateCartItemQuantity }
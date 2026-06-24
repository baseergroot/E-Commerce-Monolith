import { View, Text, TouchableOpacity } from 'react-native'
import { Search, ShoppingBag } from 'lucide-react-native'

const Navbar = () => {
  return (
    <View className="flex flex-row px-6 pt-8 pb-4 justify-between items-center">
          <View className="flex flex-col">
            <Text className="font-medium text-[#71717b] text-xs leading-4">
              Hello there 👋
            </Text>
            <Text className="font-extrabold text-[#FF6B6B] text-2xl leading-8 tracking-tight">
              Clay Shop
            </Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            {/* <TouchableOpacity className="size-11 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-full bg-white flex justify-center items-center">
              <Search size={20} color="#18181b" />
            </TouchableOpacity>
            <TouchableOpacity className="relative size-11 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-full bg-white flex justify-center items-center">
              <ShoppingBag size={20} color="#18181b" />
              <View className="size-5 font-bold rounded-full bg-[#FF6B6B] border-[#FAF8F5] border-2 border-solid flex absolute -right-0.5 -top-0.5 justify-center items-center">
                <Text className="text-white text-[10px]">3</Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
  )
}

export default Navbar

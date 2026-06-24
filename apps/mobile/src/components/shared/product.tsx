import { Product } from "@/types/product"
import { useRouter } from "expo-router"
import { Heart, Star } from "lucide-react-native"
import { Image, Text, TouchableOpacity, View } from "react-native"


const ProductComp = ({ product }: { product: Product }) => {
  const router = useRouter()
  return (
    <TouchableOpacity onPress={() => router.push(`/products/${product._id}`)} className="w-full  shadow-[0_6px_16px_rgba(0,0,0,0.06)] rounded-2xl bg-white p-2 overflow-hidden">
      <View className="relative aspect-square rounded-xl bg-[#E6F4EA] overflow-hidden">
        <Image
          source={{ uri: product.images[0] }}
          className="object-cover w-full h-full"
        />
        <TouchableOpacity className="size-7 shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-full bg-white/90 flex absolute right-2 top-2 justify-center items-center">
          <Heart size={16} color="#FF6B6B" fill="#FF6B6B" />
        </TouchableOpacity>
      </View>
      <View className="px-1.5 pt-2.5 pb-1">
        <Text className="truncate font-semibold text-zinc-950 text-sm leading-5">
          {product.name}
        </Text>
        <View className="flex flex-row mt-1 justify-between items-center">
          <Text className="font-bold text-[#FF6B6B] text-sm leading-5">
            $ {product.price}
          </Text>
          <View className="flex flex-row items-center gap-0.5">
            <Star size={12} color="#fbbf24" fill="#fbbf24" />
            <Text className="font-medium text-[#71717b] text-[10px]">
              4.8
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductComp

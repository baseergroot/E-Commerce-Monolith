// app/product/[id].tsx
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/lib/axiosClient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'expo-router/build/react-navigation';
import { Image } from 'react-native';
import { ArrowLeft, Backpack, ShoppingBag, ShoppingCart } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';


export default function ProductDetailScreen() {
  // The key 'id' corresponds exactly to the filename [id].tsx
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  console.log(id);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const result = await getProductById(id)

      return result
    },
    enabled: id.length > 0, // don't fire on empty string
  })

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    )
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-red-500">Error loading product</Text>
        <Button onPress={() => router.replace(`/products/${id}`)}>Try again</Button>
      </SafeAreaView>
    )
  }

  return (
    // replace style with nativewind
    <SafeAreaView className="flex-1 items-center bg-[#FAF8F5] h-full">

      {
        product && (
          <View className='w-full h-full flex flex-col'>
            <View className='w-full bg-gray-600 flex max-h-72' style={style.imageContainer}>
              <View className='flex flex-row justify-between w-full px-5 py-5 items-center z-10 absolute top-0 left-0 right-0 '>
                <TouchableOpacity onPress={() => router.back()} className='bg-white rounded-full p-2'>
                  <ArrowLeft color={'black'} size={20} />
                </TouchableOpacity>
                <TouchableOpacity className='bg-white rounded-full p-2'>
                  <ShoppingBag color={'black'} size={20} />
                </TouchableOpacity>
              </View>
              <Image
                source={{ uri: product.images[0] }}
                className="w-full h-64 "
                style={style.imageContainer}
              />
            </View>

            {/* product details */}
            <View className='w-full h-auto flex-1 px-5 py-3 mt-5 bg-gray-600'>
              <View className='flex w-full flex-row justify-between '>
                <Text className="text-xl font-bold w-[90%] text-ellipsis overflow-hidden flex flex-wrap">{product.name}</Text>
                <Text className="text-xl font-bold w-[10%]">${product.price}</Text>
              </View>
              <Text className="text-gray-600 mt-5">{product.description}</Text>

              {/* size / varient */}
              

              {/* qauntity */}

              {/* add to cart */}

            </View>


          </View>
        )
      }
    </SafeAreaView>
  );
}


const style = StyleSheet.create({
  imageContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
})

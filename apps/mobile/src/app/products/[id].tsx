// app/product/[id].tsx
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getProductById, getRecomendedProducts } from '@/lib/axiosClient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'expo-router/build/react-navigation';
import { Image } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import SizeBtn from '@/components/product/id/sizeBtn';
import { useState } from 'react';
import RecomendedProducts from '@/components/product/id/recomendedProducts';
import { ScrollView } from 'react-native';
import ProductQuantity from '@/components/product/id/productQuantity';
import { addToCart } from '@/lib/asyncStorage';


export default function ProductDetailScreen() {
  // The key 'id' corresponds exactly to the filename [id].tsx
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [productQuantity, setProductQuantity] = useState<number>(1)
  // console.log(id);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const result = await getProductById(id)
      // console.log({result})
      return result
    },
    enabled: id.length > 0, // don't fire on empty string
  })



  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" colorClassName="accent-blue-500" />
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

  const productVarriants: {
    size: 'S' | 'M' | 'L' | 'XL';
    isSelected: boolean;
  }[] = [{
    size: 'S',
    isSelected: true
  },
  {
    size: 'M',
    isSelected: false
  },
  {
    size: 'L',
    isSelected: false
  },
  {
    size: 'XL',
    isSelected: false
  }]

  return (
    <SafeAreaView className="flex-1 items-center bg-[#FAF8F5] h-full">

      {
        product && (
          <View className='w-full h-full flex flex-col'>
            <View className='w-full bg-gray-600 flex max-h-72' style={style.imageContainer}>
              <View className='flex flex-row justify-between w-full px-5 py-5 items-center z-10 absolute top-0 left-0 right-0 '>
                <TouchableOpacity onPress={() => router.back()} className='bg-white rounded-full p-2'>
                  <FontAwesome6 name="arrow-left" size={16} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity className='bg-white rounded-full p-2' onPress={() => router.replace('/(tabs)/cart')}>
                  <FontAwesome6 name="bag-shopping" size={16} color="#000000" />
                </TouchableOpacity>
              </View>
              <Image
                source={{ uri: product.images[0] }}
                className="w-full h-64 "
                style={style.imageContainer}
              />
            </View>

            {/* product details */}
            <ScrollView className='w-full h-auto flex-1 px-5 py-3 mb-5 mt-5 '>
              <View className='flex w-full flex-row justify-between '>
                <Text className="text-xl font-bold w-[85%] text-ellipsis overflow-hidden flex flex-wrap">{product.name}</Text>
                <Text className="text-xl font-bold w-[15%]">${product.price}</Text>
              </View>
              <Text className="text-gray-600 mt-5">{product.description}</Text>

              {/* size / varient */}
              <View className='flex flex-row w-full gap-3 mt-5 '>
                {
                  productVarriants.map((item, index) => {
                    return (
                      <SizeBtn
                        key={index + item.size}
                        size={item.size}
                        isSelected={item.size == selectedVariant}
                        onPress={() => { setSelectedVariant(item.size) }} />
                    )
                  })
                }

              </View>

              {/* qauntity */}

              <ProductQuantity productQuantity={productQuantity} setProductQuantity={setProductQuantity} />

              {/* add to cart button */}
              <TouchableOpacity
                onPress={() => addToCart(product, productQuantity)}
                className='bg-[#fe4343] w-full mt-5 text-center rounded-full py-3 flex flex-row items-center justify-center gap-5'>
                <FontAwesome6 name="bag-shopping" size={16} color="#ffffff" />
                <Text className='text-white font-bold' onPress={() => { }}>Add to bag</Text>
              </TouchableOpacity>

              {/* recomended products */}
              <RecomendedProducts catagory={product.category} />
            </ScrollView>

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

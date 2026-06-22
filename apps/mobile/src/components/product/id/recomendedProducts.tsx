
import { View, Text, ScrollView, FlatList } from 'react-native'
import ProductComp from '@/components/shared/product'
import { Product } from '@/types/product'
import { FlashList } from "@shopify/flash-list";
import { useMemo } from 'react';


const RecomendedProducts = ({ products }: { products: Product }) => {
  console.log("reco rendered")
  const demoProducts: Product[] = useMemo(() => {
    return [
    {
      _id: products._id,
      name: products.name,
      price: products.price,
      images: products.images,
      description: products.description,
      category: products.category,
      stock: products.stock
    },

    {
      _id: products._id + '2',
      name: products.name,
      price: products.price,
      images: products.images,
      description: products.description,
      category: products.category,
      stock: 50,
    },
    // two more product 

    {
      _id: products._id + '3',
      name: products.name,
      price: products.price,
      images: products.images,
      description: products.description,
      category: products.category,
      stock: 50,
    },
    {
      _id: products._id + '4',
      name: products.name,
      price: products.price,
      images: products.images,
      description: products.description,
      category: products.category,
      stock: 50,
    }
  ]
  }, [products._id])

  return (
    <View className='flex flex-col gap-5 mt-5'>
      <Text className='font-bold text-xl'>You may also like</Text>
      {/* <View className='w-full bg-blue-300  h-64 '>
        <FlashList
          horizontal
          data={demoProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProductComp product={item} />
          )}
          showsHorizontalScrollIndicator={true}
          // contentContainerClassName="flex flex-row gap-3"
          style={{ width: '100%', height: 256 }}
        />
      </View> */}
    </View>
  )
}

export default RecomendedProducts
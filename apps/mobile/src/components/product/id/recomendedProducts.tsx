
import { View, Text, ScrollView, FlatList } from 'react-native'
import ProductComp from '@/components/shared/product'
import { Product } from '@/types/product'
import { FlashList } from "@shopify/flash-list";
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecomendedProducts } from '@/lib/axiosClient';


const RecomendedProducts = ({ catagory }: { catagory: string }) => {
  console.log("reco rendered")
  // const demoProducts: Product[] = useMemo(() => {
  //   return [
  //   {
  //     _id: products._id,
  //     name: products.name,
  //     price: products.price,
  //     images: products.images,
  //     description: products.description,
  //     category: products.category,
  //     stock: products.stock
  //   },

  //   {
  //     _id: products._id + '2',
  //     name: products.name,
  //     price: products.price,
  //     images: products.images,
  //     description: products.description,
  //     category: products.category,
  //     stock: 50,
  //   },
  //   // two more product 

  //   {
  //     _id: products._id + '3',
  //     name: products.name,
  //     price: products.price,
  //     images: products.images,
  //     description: products.description,
  //     category: products.category,
  //     stock: 50,
  //   },
  //   {
  //     _id: products._id + '4',
  //     name: products.name,
  //     price: products.price,
  //     images: products.images,
  //     description: products.description,
  //     category: products.category,
  //     stock: 50,
  //   }
  // ]
  // }, [products._id])

    const { data: products, isLoading, isError, error } = useQuery({
      queryKey: ['userPosts', catagory],
      queryFn: async () => {
        const result = await getRecomendedProducts(catagory!)
        // console.log({result})
        return result
      },
      // The query won't run until catagory exists
      enabled: !!catagory
    });

    if (isLoading) {
      return <Text className='flex items-center justify-center'>Loading...</Text>;
    }

    if (isError) {
      return <Text>Error loading products: {error.message}</Text>; 
    }


  return (
    <View className='flex flex-col gap-5 mt-5'>
      <Text className='font-bold text-xl'>You may also like</Text>
      <View style={{ flex: 1 }}>
        <FlashList
          data={products}
          keyExtractor={(item): string => item._id.toString()}
          numColumns={2}
          // horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{
            paddingHorizontal: 10, 
            paddingBottom: 10,
          }}
          renderItem={({ item }) => (
            <View className="m-2">
              <ProductComp product={item} />
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default RecomendedProducts

import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '@/components/search/input';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import ProductComp from '@/components/shared/product';
import api, { searchProducts } from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '@/hooks/debounce';
import { setItem } from '@/lib/asyncStorage';
import RecentSearchComp from '@/components/search/recentSearchComp';


export default function SearchScreen() {

  // should be removed later
  
  const [products, setProducts] = useState<Product[]>([])
  // props states and setters
  const [searchInput, setSearchInput] = useState<string>('')
  const debounceSearchInput = useDebounce(searchInput)

  // search function api call
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', 'search', debounceSearchInput],
    queryFn: async () => {
      const result = await searchProducts(debounceSearchInput)
      setItem(debounceSearchInput)
      console.log("result at comp", result)
      if (typeof result === 'object' && result !== null) {
        setProducts(result)
      }
      return result
    },
    enabled: debounceSearchInput.length > 0, // don't fire on empty string
  })

  useEffect(() => {
    console.log({data: data, debounce: debounceSearchInput})

  } , [debounceSearchInput]) 

  return (
    <SafeAreaView className="flex flex-col gap-5 px-5 bg-[#FAF8F5]">
      <Text className='py-3 font-bold text-xl'>Search</Text>
      <SearchInput searchInput={searchInput} setSearchInput={setSearchInput} />

      {/* recent searches section  */}

      <RecentSearchComp debounceSearchInput={debounceSearchInput} setSearchInput={setSearchInput} />


      {/* results section */}


      {/* should use FlatList instead of map */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductComp product={item} />
        )}
        numColumns={2}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ gap: 16 }}
        columnWrapperStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}



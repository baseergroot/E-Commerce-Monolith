import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { fetchProducts } from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from "../shared/navbar";
import Hero from "./hero";
import ProductComp from "../shared/product";


export default function Home() {
  const [filter, setFilter] = useState<string>("All")
  const [categories, setCategories] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])

  const { data: products, isPending, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  })

  useEffect(() => {
    setCategories(["All", ...Array.from(new Set(products?.map((product) => product.category)))])
    setAllProducts(products as Product[])
  }, [products])

  const handleFilter = (filter: string) => {
    setFilter(filter)
    console.log(filter)
    const tempFilteredProducts: Product[] | undefined = filter == 'All' ? products : products?.filter((product) => product.category == filter)
    if (tempFilteredProducts) {
      setFilteredProducts(tempFilteredProducts)
      setAllProducts(tempFilteredProducts)
    }
    console.log(filteredProducts)
  }


  // beautiful loading UI skeleton
  if (isPending) {
    return (
      <View>
        <Text className="bg-red-500 text-green">
          Loading...
        </Text>
      </View>
    )
  }

  // handle error UI
  if (isError) {
    return (
      <View>
        <Text className="bg-red-500 text-green">
          Error: try again, {error.message}
        </Text>
      </View>
    )
  }

  // rendering list of products with react query
  return (
    <SafeAreaView>
      <View className="font-['Plus_Jakarta_Sans',sans-serif] relative bg-[#FAF8F5] pb-28 w-full h-fit min-h-screen">
        <Navbar />
        <Hero />

        <ScrollView horizontal className="flex flex-row px-6 pt-6 pb-1 overflow-scroll" contentContainerStyle={{ gap: 8 }}>
          {
            categories.map((category, index) => {
              if (category == filter) {
                return (
                  <TouchableOpacity key={index} className="shrink-0 shadow-[0_6px_14px_rgba(255,107,107,0.35)] rounded-2xl bg-[#FF6B6B] px-4 py-2.5" onPress={() => handleFilter(category)}>
                    <Text className="font-bold text-white text-sm leading-4">{category}</Text>
                  </TouchableOpacity>
                )
              }
              return (
                <TouchableOpacity key={index} className="shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-2xl bg-white px-4 py-2.5" onPress={() => handleFilter(category)}>
                  <Text className="font-semibold text-[#71717b] text-xs leading-4">{category}</Text>
                </TouchableOpacity>
              )
            })
          }

        </ScrollView>
        <View className="flex flex-row px-6 pt-5 pb-3 justify-between items-center">
          <Text className="font-extrabold text-zinc-950 text-base leading-6">
            Popular Picks
          </Text>
          <Text className="font-semibold text-[#FF6B6B] text-xs leading-4">
            See all
          </Text>
        </View>
        <View className="flex flex-row flex-wrap px-6 justify-between gap-y-4">
          {

            allProducts?.map((product) => {

              return (
                <ProductComp product={product} key={product._id.toString()} />
              )
            })
          }

        </View>
      </View>
    </SafeAreaView>
  );
}




{/* <View className="w-[48%] shadow-[0_6px_16px_rgba(0,0,0,0.06)] rounded-2xl bg-white p-2 overflow-hidden">
            <View className="relative aspect-square rounded-xl bg-[#EFEAFF] overflow-hidden">
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1669484179894-4cfb13b51b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0JTIwcGFzdGVsfGVufDF8Mnx8fDE3ODAxOTg4ODZ8MA&ixlib=rb-4.1.0&q=80&w=400" }}
                className="object-cover w-full h-full"
              />
              <TouchableOpacity className="size-7 shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-full bg-white/90 flex absolute right-2 top-2 justify-center items-center">
                <Heart className="size-3.5 text-[#71717b]" />
              </TouchableOpacity>
            </View>
            <View className="px-1.5 pt-2.5 pb-1">
              <Text className="truncate font-semibold text-zinc-950 text-sm leading-5">
                Pastel Audio Buds
              </Text>
              <View className="flex flex-row mt-1 justify-between items-center">
                <Text className="font-bold text-[#FF6B6B] text-sm leading-5">
                  $59.00
                </Text>
                <View className="flex flex-row items-center gap-0.5">
                  <Star className="size-3 text-amber-400" fill="#fbbf24" />
                  <Text className="font-medium text-[#71717b] text-[10px]">
                    4.6
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="w-[48%] shadow-[0_6px_16px_rgba(0,0,0,0.06)] rounded-2xl bg-white p-2 overflow-hidden">
            <View className="relative aspect-square rounded-xl bg-[#FFE8DD] overflow-hidden">
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1722356541579-c5c6b0a42789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwY2VyYW1pYyUyMHZhc2UlMjBob21lJTIwZGVjb3J8ZW58MXwyfHx8MTc4MDE5ODg4N3ww&ixlib=rb-4.1.0&q=80&w=400" }}
                className="object-cover w-full h-full"
              />
              <TouchableOpacity className="size-7 shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-full bg-white/90 flex absolute right-2 top-2 justify-center items-center">
                <Heart className="size-3.5 text-[#FF6B6B]" fill="#FF6B6B" />
              </TouchableOpacity>
            </View>
            <View className="px-1.5 pt-2.5 pb-1">
              <Text className="truncate font-semibold text-zinc-950 text-sm leading-5">
                Volcano Clay Vase
              </Text>
              <View className="flex flex-row mt-1 justify-between items-center">
                <Text className="font-bold text-[#FF6B6B] text-sm leading-5">
                  $42.00
                </Text>
                <View className="flex flex-row items-center gap-0.5">
                  <Star className="size-3 text-amber-400" fill="#fbbf24" />
                  <Text className="font-medium text-[#71717b] text-[10px]">
                    4.9
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="w-[48%] shadow-[0_6px_16px_rgba(0,0,0,0.06)] rounded-2xl bg-white p-2 overflow-hidden">
            <View className="relative aspect-square rounded-xl bg-[#F3EDE3] overflow-hidden">
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1771329064159-33f758d91f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMGJlYXV0eSUyMGJvdHRsZSUyMG1pbmltYWx8ZW58MXwyfHx8MTc4MDE5ODg4N3ww&ixlib=rb-4.1.0&q=80&w=400" }}
                className="object-cover w-full h-full"
              />
              <TouchableOpacity className="size-7 shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-full bg-white/90 flex absolute right-2 top-2 justify-center items-center">
                <Heart className="size-3.5 text-[#71717b]" />
              </TouchableOpacity>
            </View>
            <View className="px-1.5 pt-2.5 pb-1">
              <Text className="truncate font-semibold text-zinc-950 text-sm leading-5">
                Retinol+ Serum
              </Text>
              <View className="flex flex-row mt-1 justify-between items-center">
                <Text className="font-bold text-[#FF6B6B] text-sm leading-5">
                  $34.00
                </Text>
                <View className="flex flex-row items-center gap-0.5">
                  <Star className="size-3 text-amber-400" fill="#fbbf24" />
                  <Text className="font-medium text-[#71717b] text-[10px]">
                    4.7
                  </Text>
                </View>
              </View>
            </View>
          </View> */}
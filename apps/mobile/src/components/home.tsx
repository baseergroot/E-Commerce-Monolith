import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import {
  ArrowRight,
  Heart,
  Home as HomeIcon,
  Search,
  ShoppingBag,
  Star,
  User,
} from "lucide-react-native";
import api from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
}

const fetchProducts = async () => {
  const res = await api.get('/products')
  // console.log(res.data.products[0])
  return res.data.products as Product[]
}

export default function Home() {
  const [filter, setFilter] = useState<string>("All")
  const [categories, setCategories] = useState<string[]>([])

  const { data: products, isPending, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  })

  useEffect(() => {
    setCategories(["All", ...Array.from(new Set(products?.map((product) => product.category)))])
  }, [products])

  const handleFilter = (filter: string) => {
    setFilter(filter)
    console.log(filter)
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
    <ScrollView>
      <View className="font-['Plus_Jakarta_Sans',sans-serif] relative bg-[#FAF8F5] pb-28 w-full h-fit min-h-screen">
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
            <TouchableOpacity className="size-11 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-full bg-white flex justify-center items-center">
              <Search className="size-5 text-zinc-950" />
            </TouchableOpacity>
            <TouchableOpacity className="relative size-11 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-full bg-white flex justify-center items-center">
              <ShoppingBag className="size-5 text-zinc-950" />
              <View className="size-5 font-bold rounded-full bg-[#FF6B6B] border-[#FAF8F5] border-2 border-solid flex absolute -right-0.5 -top-0.5 justify-center items-center">
                <Text className="text-white text-[10px]">3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-6 pt-2">
          <View className="relative bg-[linear-gradient(135deg,#E6E0FF_0%,#FFE0D6_100%)] shadow-[0_12px_30px_rgba(0,0,0,0.08)] rounded-2xl flex flex-row p-6 items-center overflow-hidden">
            <View className="pr-2 flex-1">
              <View className="rounded-full bg-white/70 mb-3 px-3 py-1 self-start">
                <Text className="font-bold text-[#FF6B6B] text-[10px]">
                  FEATURED
                </Text>
              </View>
              <Text className="font-extrabold text-zinc-950 text-xl leading-7 mb-1">
                Artisan Clay Mug
              </Text>
              <Text className="text-zinc-950/70 text-xs leading-4 mb-4">
                Handcrafted ceramic, 20% off today
              </Text>
              <TouchableOpacity className="shadow-[0_6px_16px_rgba(255,107,107,0.4)] rounded-full bg-[#FF6B6B] flex flex-row px-5 py-2.5 items-center gap-1 self-start">
                <Text className="font-bold text-white text-xs leading-4">Shop Now</Text>
                <ArrowRight className="size-3.5 text-white" />
              </TouchableOpacity>
            </View>
            <View className="size-28 shadow-[0_14px_24px_rgba(0,0,0,0.18)] shrink-0 rounded-2xl overflow-hidden">
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1721109890030-00faaa68981f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwY2xheSUyMG11ZyUyMHByb2R1Y3QlMjBtaW5pbWFsJTIwcGFzdGVsfGVufDF8MHx8fDE3ODAxOTg4ODd8MA&ixlib=rb-4.1.0&q=80&w=400" }}
                className="object-cover w-full h-full"
              />
            </View>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex flex-row px-6 pt-6 pb-1 overflow-visible" contentContainerStyle={{ gap: 8 }}>
          {
            categories.map((category, index) => {
              if (category == filter) {
                return (
                  <TouchableOpacity key={index} className="shrink-0 shadow-[0_6px_14px_rgba(255,107,107,0.35)] rounded-2xl bg-[#FF6B6B] px-4 py-2.5" onPress={() => handleFilter(category)}>
                  <Text className="font-bold text-white text-xs leading-4">{category}</Text>
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
           {/* <TouchableOpacity className="shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-2xl bg-white px-4 py-2.5">
            <Text className="font-semibold text-[#71717b] text-xs leading-4">Electronics</Text>
          </TouchableOpacity>
          <TouchableOpacity className="shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-2xl bg-white px-4 py-2.5">
            <Text className="font-semibold text-[#71717b] text-xs leading-4">Clothing</Text>
          </TouchableOpacity> 
          <TouchableOpacity className="sh rink-0 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-2xl bg-white px-4 py-2.5">
            <Text className="font-semibold text-[#71717b] text-xs leading-4">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-2xl bg-white px-4 py-2.5">
            <Text className="font-semibold text-[#71717b] text-xs leading-4">Beauty</Text>
          </TouchableOpacity> */}
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
            products.map((product) => (
              <View key={product._id.toString()} className="w-[48%] shadow-[0_6px_16px_rgba(0,0,0,0.06)] rounded-2xl bg-white p-2 overflow-hidden">
                <View className="relative aspect-square rounded-xl bg-[#E6F4EA] overflow-hidden">
                  <Image
                    source={{ uri: "https://images.unsplash.com/photo-1763692108454-6cfa2b0af5c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXIlMjBwcm9kdWN0JTIwY2xlYW4lMjBiYWNrZ3JvdW5kfGVufDF8Mnx8fDE3ODAxOTg4ODZ8MA&ixlib=rb-4.1.0&q=80&w=400" }}
                    className="object-cover w-full h-full"
                  />
                  <TouchableOpacity className="size-7 shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-full bg-white/90 flex absolute right-2 top-2 justify-center items-center">
                    <Heart className="size-3.5 text-[#FF6B6B]" fill="#FF6B6B" />
                  </TouchableOpacity>
                </View>
                <View className="px-1.5 pt-2.5 pb-1">
                  <Text className="truncate font-semibold text-zinc-950 text-sm leading-5">
                    {product.name}
                  </Text>
                  <View className="flex flex-row mt-1 justify-between items-center">
                    <Text className="font-bold text-[#FF6B6B] text-sm leading-5">
                      {product.price}
                    </Text>
                    <View className="flex flex-row items-center gap-0.5">
                      <Star className="size-3 text-amber-400" fill="#fbbf24" />
                      <Text className="font-medium text-[#71717b] text-[10px]">
                        4.8
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          }

        </View>
        {/* <View className="absolute bg-white border-zinc-200 border-t bottom-0 px-6 pt-3 pb-6 w-full">
          <View className="flex flex-row justify-around items-center">
            <TouchableOpacity className="flex flex-col items-center gap-1">
              <HomeIcon className="size-6 text-[#FF6B6B]" />
              <Text className="font-bold text-[#FF6B6B] text-[10px]">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-col items-center gap-1">
              <Search className="size-6 text-[#71717b]" />
              <Text className="font-medium text-[#71717b] text-[10px]">
                Search
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="relative flex flex-col items-center gap-1">
              <ShoppingBag className="size-6 text-[#71717b]" />
              <Text className="font-medium text-[#71717b] text-[10px]">
                Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-col items-center gap-1">
              <User className="size-6 text-[#71717b]" />
              <Text className="font-medium text-[#71717b] text-[10px]">
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </ScrollView>
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
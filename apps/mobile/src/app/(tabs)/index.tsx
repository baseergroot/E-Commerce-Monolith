import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchProducts } from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from "@/components/shared/navbar";
import Hero from "@/components/home/hero";
import ProductFilter from "@/components/home/productFilter";
import ProductsHeader from "@/components/home/productsHeader";
import AllProducts from "@/components/home/allProducts";


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
        <Text className="bg-red-500 text-green-600">
          Loading...
        </Text>
      </View>
    )
  }

  // handle error UI
  if (isError) {
    return (
      <View>
        <Text className="bg-red-500 text-green-600">
          Error: try again later, {error.message}
        </Text>
      </View>
    )
  }

  // rendering list of products with react query
  return (
    <SafeAreaView>
      <View className="relative bg-[#FAF8F5] pb-28 w-full h-fit min-h-screen">
        <Navbar />
        <Hero />

        {/* filter ui */}
        <ProductFilter categories={categories} filter={filter} handleFilter={handleFilter} />

        <ProductsHeader handleFilter={handleFilter} /> 

        {/* all products list */}
        <AllProducts allProducts={allProducts} />

      </View>
    </SafeAreaView>
  );
}




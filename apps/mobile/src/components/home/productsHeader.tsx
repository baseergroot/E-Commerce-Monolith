import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ProductsHeader = ({ handleFilter }: { handleFilter: (filter: string) => void }) => {
  return (
    <View className="flex flex-row px-6 pt-5 pb-3 justify-between items-center">
      <Text className="font-extrabold text-zinc-950 text-base leading-6">
        Popular Picks
      </Text>
      <TouchableOpacity onPress={() => handleFilter("All")}>
        <Text className="font-semibold text-[#FF6B6B] leading-4">
          See all
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProductsHeader
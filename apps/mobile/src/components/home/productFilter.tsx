import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { FlashList } from '@shopify/flash-list'

const ProductFilter = ({ categories, filter, handleFilter }: { categories: string[], filter: string, handleFilter: (filter: string) => void }) => {
  return (
    <View className="px-6 pt-6 pb-1" >

      <FlashList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item): string => item}
        renderItem={({ item, index }) => {
          if (item == filter) {
            return (
              <TouchableOpacity key={index} className="shrink-0 shadow-[0_6px_14px_rgba(255,107,107,0.35)] rounded-2xl bg-[#FF6B6B] px-4 py-2.5 mx-0.5" onPress={() => handleFilter(item)}>
                <Text className="font-semibold text-white text-sm leading-4">{item}</Text>
              </TouchableOpacity>
            )
          }
          return (
            <TouchableOpacity className="shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-2xl bg-white px-4 py-2.5 ml-0.5 mr-1" onPress={() => handleFilter(item)}>
              <Text className="font-semibold text-[#71717b] text-xs leading-4">{item}</Text>
            </TouchableOpacity>
          )
        }}
      />

    </View>
  )
}

export default ProductFilter
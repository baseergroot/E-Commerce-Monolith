import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { getItem } from '@/lib/asyncStorage'

const RecentSearchComp = ({debounceSearchInput, setSearchInput}: {debounceSearchInput: string, setSearchInput: (value: string) => void}) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // debugging - why is getItem not working?
  useEffect(() => {
    async function getRecentSearches() {
      const searches = await getItem()
      // console.log({searches})
      if (searches) {
        setRecentSearches(searches as string[])
      }
      else {
        setRecentSearches([])
        // console.log("No recent searches")
      }
    }
    getRecentSearches()
  }, [debounceSearchInput])

  return (
    <View className='flex flex-col gap-3'>
        <Text className='font-bold text-lg'>Recent Searches</Text>
        <View className="flex flex-row flex-wrap gap-3">
          {
          recentSearches.map((search, index) => (
            // add remove search feature in future
            <TouchableOpacity onPress={() => setSearchInput(search)} 
            key={index + search} className="bg-slate-200 px-5 py-2 rounded-2xl">
              <Text className="text-slate-600">{search}</Text>
            </TouchableOpacity>
          ))
        }
        </View>
      </View>
  )
} 

export default RecentSearchComp
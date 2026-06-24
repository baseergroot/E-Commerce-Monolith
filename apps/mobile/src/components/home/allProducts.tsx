import { View, Text } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { Product } from '@/types/product'
import ProductComp from '../shared/product'


const AllProducts = ({ allProducts }: { allProducts: Product[] }) => {
  return (
    <View className="flex-1"> {/* Direct parent must expand to fill space */}
      <FlashList
        data={allProducts}
        keyExtractor={(item): string => item._id.toString()}
        numColumns={2}

        // 1. Replaces px-6 and controls bottom scroll breathing room
        contentContainerStyle={{
          paddingHorizontal: 10, // Matches px-6
          paddingBottom: 10      // Gives extra room so the last items are fully reachable
        }}

        renderItem={({ item }) => {
          return (
            // Remove individual horizontal margins here; let the list handle column gaps
            <View className="m-2"> {/* Matches gap-y-4 */}
              <ProductComp product={item} />
            </View>
          )
        }}
      />
    </View>
  )
}

export default AllProducts
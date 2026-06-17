import { SearchIcon } from "lucide-react-native";
import { useEffect } from "react";
import { View, Text, TextInput } from "react-native";


const SearchInput = ({ searchInput, setSearchInput }: { searchInput: string, setSearchInput: (input: string) => void }) => {
    // useEffect(() => {
    //     console.log({ searchInput })
    // }, [searchInput])
    return (
        <View className="px-6 py-3 w-full h-12 rounded-3xl bg-white flex flex-row items-center">

            {/* icon before input */}
            <SearchIcon color={"#ea580c"} className="text-lg w-1/10" />
            <TextInput
                style={{ color: 'black', height: 48, padding: 8, width: '90%' }}
                placeholder="Search products"
                placeholderTextColor="#000"
                value={searchInput}
                onChangeText={setSearchInput}
            />
        </View>
    )
}

export default SearchInput
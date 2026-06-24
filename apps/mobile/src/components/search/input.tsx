import { SearchIcon } from "lucide-react-native";
import { View, TextInput } from "react-native";

const SearchInput = ({
    searchInput,
    setSearchInput,
}: {
    searchInput: string;
    setSearchInput: (input: string) => void;
}) => {
    return (
        <View className="flex-row items-center h-12 px-6 py-3 bg-white rounded-3xl mx-5">
            <SearchIcon size={18} color="#ea580c" />
            <TextInput
                style={{
                    flex: 1,
                    minWidth: 0,
                    color: '#000000',
                    fontSize: 16,
                    paddingHorizontal: 8,
                }}
                placeholder="Search products"
                placeholderTextColor="#9ca3af"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={false}
                keyboardType="default"
                secureTextEntry={false}
                textContentType="none"
                autoComplete="off"
                importantForAutofill="no"
                value={searchInput}
                onChangeText={setSearchInput}
            />
        </View>
    );
};

export default SearchInput

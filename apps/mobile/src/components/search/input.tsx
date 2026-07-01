import { FontAwesome6 } from '@expo/vector-icons';
import { View, TextInput } from "react-native";

const SearchInput = ({
    searchInput,
    setSearchInput,
}: {
    searchInput: string;
    setSearchInput: (input: string) => void;
}) => {
    return (
      <View className='flex flex-row gap-5 items-center px-6  bg-white rounded-3xl mx-5'>
        <FontAwesome6 name="magnifying-glass" size={16} color="#ea580c" />
        <TextInput value={searchInput} onChangeText={setSearchInput} placeholder='Search '  
        className=' grow'
        />
      </View>
    );
};

export default SearchInput


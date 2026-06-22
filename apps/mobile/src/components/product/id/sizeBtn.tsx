import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'

interface SizeBtnProps {
  size: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function SizeBtn({ size, isSelected, onPress }: SizeBtnProps) {
  return (
    <TouchableOpacity onPress={onPress} className={`rounded-full w-12 h-12 flex items-center justify-center ${isSelected ? 'bg-[#fe4343]' : 'bg-white'}`}>
      <Text className={`${isSelected ? 'text-white' : 'text-black'}`}>{size}</Text>
    </TouchableOpacity>
  )
}
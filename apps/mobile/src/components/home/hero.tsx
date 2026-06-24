import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ArrowRight } from 'lucide-react-native'

const Hero = () => {
  return (
    <View className="px-3 pt-2">
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
                <ArrowRight size={14} color="#ffffff" />
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
  )
}

export default Hero

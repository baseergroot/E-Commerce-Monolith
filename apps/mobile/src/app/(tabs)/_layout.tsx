import { Tabs } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // change active colour to the colour of shop now button at home header i.e. #FF6B6B and make the inactive text font bold
        tabBarActiveTintColor: '#FF6B6B', // Color of active tab icon/text
        tabBarInactiveTintColor: '#8E8E93', // Color of inactive tab icon/text
        headerShown: false, // Shows or hides the top screen header
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="house" size={20} color={color} solid={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="magnifying-glass" size={20} color={color} solid={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Bag',
          
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="bag-shopping" size={20} color={color} solid={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

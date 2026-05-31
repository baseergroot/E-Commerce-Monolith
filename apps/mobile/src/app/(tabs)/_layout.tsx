import { Tabs } from 'expo-router';
// import ionicons
import { Ionicons } from '@expo/vector-icons';

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
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

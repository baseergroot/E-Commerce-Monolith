import api from '@/lib/axiosClient';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SearchScreen() {

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products')
      console.log(res.data)
      return res.data
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log({ error_axios: error.request })
      }
      console.log({ error: error })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Search Screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: 'bold' },
});

import { Product } from "@/types/product";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL
})


const fetchProducts = async () => {
  const res = await api.get('/products')
  // console.log(res.data.products[0]) 
  return res.data.products as Product[]
}

const searchProducts = async (searchInput: string): Promise<Product[] | string> => {
  try {
    const { data } = await api.get('/products/search', { params: { searchTerm: searchInput } })
    // console.log("result at query", data) 
    return data.result
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.log(error.response?.data)
      return error.response?.data.error as string || "axios error while searching"
    }
    // console.log("error while searching", error)
    return "unknown error while searching"
  }
}

const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await api.get(`/products/${id}`)
    // console.log("result at query", data.product.name) 
    return data.product as Product
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.log(error.response?.data)
      throw new Error(error.response?.data.error as string || "axios error while searching")
    }
    // console.log("error while getting product by id", error)
    throw new Error("unknown error while getting product by id") 
  }
}

const getRecomendedProducts = async (category: string): Promise<Product[]> => {
  try {
    // products/recommend?category=cloth
    const { data } = await api.get(`/products/recommend?category=${category}`)
    // console.log("result at query", data) 
    // console.log({reco_prod: data.result}) 
    return data.result as Product[] 
  } catch (error) { 
    if (error instanceof AxiosError) {
      // console.log(error.response?.data)
      throw new Error(error.response?.data.error as string || "axios error while getting recommended products")
    }
    // console.log("error while getting product by id", error)
    throw new Error("unknown error while getting product by id") 
  }
}

export default api
export { fetchProducts, searchProducts, getProductById, getRecomendedProducts }
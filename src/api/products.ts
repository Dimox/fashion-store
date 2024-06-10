import { Product } from '@/types'

const apiUrl = import.meta.env.VITE_API_URL as string

export const fetchProducts = async (path: string) =>
  (await fetch(`${apiUrl}/${path}`).then(response => response.json())) as Product[]

export const fetchProduct = async (id: number) =>
  (await fetch(`${apiUrl}/products/${id.toString()}`).then(response => response.json())) as Product

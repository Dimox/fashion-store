import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CartItem } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const storage = localStorage.getItem('fashion-store-cart')
  const state = ref<CartItem[]>(storage ? (JSON.parse(storage) as CartItem[]) : [])

  const addItem = (id: number, quantity: number) => {
    state.value.push({ id, quantity })
    localStorage.setItem('fashion-store-cart', JSON.stringify(state.value))
  }

  const removeItem = (id: number) => {
    state.value = state.value.filter(item => item.id !== id)
    localStorage.setItem('fashion-store-cart', JSON.stringify(state.value))
  }

  const updateItem = (id: number, quantity: number) => {
    state.value = state.value.map(item => (item.id === id ? { ...item, quantity } : item))
    localStorage.setItem('fashion-store-cart', JSON.stringify(state.value))
  }

  return { state, addItem, removeItem, updateItem }
})

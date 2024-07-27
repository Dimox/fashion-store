import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CartItem } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const storage = localStorage.getItem('fashion-store-cart')
  const state = ref<CartItem[]>(storage ? (JSON.parse(storage) as CartItem[]) : [])

  const saveToLocalStorage = () => {
    localStorage.setItem('fashion-store-cart', JSON.stringify(state.value))
  }

  const addItem = (id: number, quantity: number) => {
    state.value.push({ id, quantity })
    saveToLocalStorage()
  }

  const removeItem = (id: number) => {
    state.value = state.value.filter(item => item.id !== id)
    saveToLocalStorage()
  }

  const updateItem = (id: number, quantity: number) => {
    state.value = state.value.map(item => (item.id === id ? { ...item, quantity } : item))
    saveToLocalStorage()
  }

  return { state, addItem, removeItem, updateItem }
})

import { Component } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import Homepage from './pages/Homepage.vue'
import Catalog from './pages/Catalog.vue'
import Product from './pages/Product.vue'
import ShoppingCart from './pages/ShoppingCart.vue'
import Checkout from './pages/Checkout.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage as Component,
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: Catalog as Component,
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: Product as Component,
    },
    {
      path: '/cart',
      name: 'Shopping Cart',
      component: ShoppingCart as Component,
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout as Component,
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

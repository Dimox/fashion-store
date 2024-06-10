import { createApp, Component } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { router } from './router'
import '@/assets/scss/main.scss'
import App from './App.vue'

const pinia = createPinia()

createApp(App as Component)
  .use(VueQueryPlugin)
  .use(router)
  .use(pinia)
  .mount('#app')

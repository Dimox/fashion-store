import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { run } from 'vite-plugin-run'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/fashion-store/',
  plugins: [
    run([
      {
        name: 'generate icon types',
        run: ['pnpm generate-icon-types'],
        pattern: ['src/assets/img/sprites/icons.svg'],
        startup: true,
        build: false,
      },
    ]),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('swiper-'),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
})

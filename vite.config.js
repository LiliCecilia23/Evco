import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy';


// https://vitejs.dev/config/
export default defineConfig({
  base: "Evco",
  plugins: [
    vue(),
  ],
  build: {
      rollupOptions: {
          plugins: [
              copy({
                  targets: [
                      { src: 'server.js', dest: 'dist' },
                      { src: 'api.js', dest: 'dist' },
                  ],
                  hook: 'writeBundle'
              }),
          ]
      }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

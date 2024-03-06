import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy';


// https://vitejs.dev/config/
export default defineConfig({
  base: "/Evco/",
  plugins: [
    vue(),
  ],
})

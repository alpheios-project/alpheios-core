import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import content from '@originjs/vite-plugin-content'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    content()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: "./src/index.js",
      formats: [ "cjs" ],
      fileName: `alpheios-fixtures`,
      name: "AlpheiosFixtures"
    },
  }
})

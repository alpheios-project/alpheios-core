import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: "./src/driver.js",
      formats: [ "es" ],
      fileName: (format) => format === "es" ? `alpheios-res-client.js` : `alpheios-res-client.cjs`,
      name: "AlpheiosResClient"
    },
  }
})

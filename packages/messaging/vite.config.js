import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
  ],
  resolve: {
    alias: {
      '@messServ': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: "./src/index.js",
      formats: [ "es" ],
      fileName: (format) => format === "es" ? `alpheios-messaging.js` : `alpheios-messaging.cjs`,
      name: "AlpheiosMessaging"
    },
  }
})

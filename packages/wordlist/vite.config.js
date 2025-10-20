import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
  ],
  resolve: {
    alias: {
      '@wordlist': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      keep_fnames: true,
      keep_classnames: true
    },
    lib: {
      entry: "./src/index.js",
      formats: [ "es" ],
      fileName: (format) => format === "es" ? `alpheios-wordlist.js` : `alpheios-wordlist.cjs`,
      name: "AlpheiosWordlist"
    },
  }
})

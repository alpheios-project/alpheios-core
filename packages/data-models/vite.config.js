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
    minify: "terser",
    terserOptions: {
      keep_fnames: true,
      keep_classnames: true
    },
    lib: {
      entry: "./src/driver.js",
      formats: [ "es" ],
      fileName: (format) => format === "es" ? `alpheios-data-models.js` : `alpheios-data-models.cjs`,
      name: "AlpheiosDataModels"
    },
  }
})

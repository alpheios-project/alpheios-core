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
  esbuild: {
    keepNames: true // Prevent class name mangling
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    esbuild: {
      minifyIdentifiers: false, // Don't minify identifiers
      keepNames: true // Keep class and function names
    },
    lib: {
      entry: "./src/driver.js",
      formats: [ "es" ],
      fileName: (format) => format === "es" ? `alpheios-data-models.js` : `alpheios-data-models.cjs`,
      name: "AlpheiosDataModels"
    },
  }
})

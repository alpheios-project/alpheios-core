import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.csv'],
  plugins: [
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url))
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
      entry: "./src/index.js",
      formats: [ "es" ],
      fileName: (format) => format === "es" ? `alpheios-inflection-tables.js` : `alpheios-inflection-tables.cjs`,
      name: "AlpheiosInflectionTables"
    },
  }
})

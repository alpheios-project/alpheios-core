import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { createVuePlugin } from "vite-plugin-vue2"; // vue2 plugin
import { createSvgPlugin } from "vite-plugin-vue2-svg";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.svg'],
  plugins: [
    createVuePlugin(), 
    createSvgPlugin()
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@comp': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'esnext',
    minify: "terser",
    cssMinify: 'lightningcss',
    terserOptions: {
      keep_fnames: true,
      keep_classnames: true
    },
    cssCodeSplit: false,
    lib: {
      entry: "./src/plugin.js",
      formats: [ "es" ],
      name: "AlpheiosComponents",
      fileName: 'alpheios-components.js'
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css')
            return `alpheios-components.css`
          return assetInfo.name;
        }
      }
    }
  },
  css: {
    transformer: 'lightningcss'
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext' // Also set for dev server
    }
  }
})

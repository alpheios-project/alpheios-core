import VueLoaderPlugin from 'vue-loader/lib/plugin.js'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import path from 'path'
const projectRoot = process.cwd()

const webpack = {
  common: {
    entry: './plugin.js',
    output: {
      library: 'AlpheiosComponents',
      libraryTarget: 'window'
    },
    resolve: {
      alias: {
        // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js'),
        'alpheios-wordlist': path.join(projectRoot, 'node_modules/alpheios-wordlist/dist/alpheios-wordlist.js'),
        'vue-multiselect-css': path.join(projectRoot, 'node_modules/vue-multiselect/dist/vue-multiselect.min.css'),
        '@vue-runtime': path.join(projectRoot, 'node_modules/vue/dist/vue.runtime.esm.js'),
        '@': path.join(projectRoot, 'src')
      }
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  },

  production: {
    mode: 'production',
    output: {
      filename: 'alpheios-components.min.js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style/style-components-safari.min.css'
      })
    ]
  },

  development: {
    mode: 'development',
    output: {
      filename: 'alpheios-components.js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style/style-components-safari.css'
      })
    ]
  }
}

export { webpack }

import VueLoaderPlugin from 'vue-loader/lib/plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import path from 'path'
const projectRoot = process.cwd()

const webpack = {
  common: {
    entry: './plugin.js',
    // externals: ['alpheios-data-models', 'alpheios-inflection-tables'],
    resolve: {
      alias: {
        // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js'),
        'vue-multiselect-css': path.join(projectRoot, 'node_modules/vue-multiselect/dist/vue-multiselect.min.css'),
        '@': path.join(projectRoot, 'src')
      }
    },
    externals: {
      'alpheios-client-adapters': 'alpheios-client-adapters',
      'alpheios-data-models': 'alpheios-data-models',
      'alpheios-inflection-tables': 'alpheios-inflection-tables',
      'alpheios-experience': 'alpheios-experience',
      'alpheios-res-client': 'alpheios-res-client',
      'intl-messageformat': 'intl-messageformat',
      'uuid': 'uuid'
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  },

  production: {
    mode: 'production',
    output: { filename: 'alpheios-components.min.js' },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style/style-safari.min.css'
      })
    ]
  },

  development: {
    mode: 'development',
    output: { filename: 'alpheios-components.js' },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style/style-safari.css'
      })
    ]
  }
}

export { webpack }

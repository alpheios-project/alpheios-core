import VueLoaderPlugin from 'vue-loader/lib/plugin.js'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import path from 'path'
const projectRoot = process.cwd()

const imagemin = {
  tasks: [
    { source: 'src/images', target: 'dist/images', extensions: ['jpg', 'png', 'svg'], excludedDirs: ['inline-icons', 'alpheios'] }
  ]
}

const webpack = {
  common: {
    entry: './index.js',
    output: {
      library: 'AlpheiosAnnotations',
      libraryTarget: 'umd',
      chunkFilename: 'components.[name].js'
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  },

  production: {
    mode: 'production',
    output: {
      filename: 'alpheios-annotations.min.js'
    },
    resolve: {
      alias: {
        // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.min.js'),
        'alpheios-inflection-tables': path.join(projectRoot, 'node_modules/alpheios-inflection-tables/dist/alpheios-inflection-tables.min.js'),
        'alpheios-l10n': path.join(projectRoot, 'node_modules/alpheios-l10n/dist/alpheios-l10n.min.js'),
        'alpheios-client-adapters': path.join(projectRoot, 'node_modules/alpheios-client-adapters/dist/alpheios-client-adapters.min.js'),
        'alpheios-res-client': path.join(projectRoot, 'node_modules/alpheios-res-client/dist/alpheios-res-client.min.js'),
        'alpheios-wordlist': path.join(projectRoot, 'node_modules/alpheios-wordlist/dist/alpheios-wordlist.min.js'),
        'alpheios-messaging': path.join(projectRoot, '../../node_modules/alpheios-messaging/dist/prod/alpheios-messaging.min.js'),
        'vue-multiselect-css': path.join(projectRoot, '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'),
        '@vue-runtime': path.join(projectRoot, '../../node_modules/vue/dist/vue.runtime.esm.js'),
        '@annotations': path.join(projectRoot, 'src')
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles/alpheios-annotations.min.css'
      })
    ]
  },

  development: {
    mode: 'development',
    output: {
      filename: 'alpheios-annotations.js'
    },
    resolve: {
      alias: {
        // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js'),
        'alpheios-inflection-tables': path.join(projectRoot, 'node_modules/alpheios-inflection-tables/dist/alpheios-inflection-tables.js'),
        'alpheios-l10n': path.join(projectRoot, 'node_modules/alpheios-l10n/dist/alpheios-l10n.js'),
        'alpheios-client-adapters': path.join(projectRoot, 'node_modules/alpheios-client-adapters/dist/alpheios-client-adapters.js'),
        'alpheios-res-client': path.join(projectRoot, 'node_modules/alpheios-res-client/dist/alpheios-res-client.js'),
        'alpheios-wordlist': path.join(projectRoot, 'node_modules/alpheios-wordlist/dist/alpheios-wordlist.js'),
        'alpheios-messaging': path.join(projectRoot, '../../node_modules/alpheios-messaging/dist/dev/alpheios-messaging.js'),
        'vue-multiselect-css': path.join(projectRoot, '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'),
        '@vue-runtime': path.join(projectRoot, '../../node_modules/vue/dist/vue.runtime.esm.js'),
        '@annotations': path.join(projectRoot, 'src')
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles/alpheios-annotations.css'
      })
    ]
  }
}

export { webpack, imagemin }

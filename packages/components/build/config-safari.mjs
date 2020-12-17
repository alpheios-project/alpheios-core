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
    plugins: [
      new VueLoaderPlugin()
    ]
  },

  production: {
    mode: 'production',
    output: {
      filename: 'alpheios-components.min.js'
    },
    resolve: {
      alias: {
        // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
        'alpheios-annotations': path.join(projectRoot, 'node_modules/alpheios-annotations/dist/alpheios-annotations.min.js'),
        'alpheios-annotations-css': path.join(projectRoot, 'node_modules/alpheios-annotations/dist/styles/'),
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.min.js'),
        'alpheios-inflection-tables': path.join(projectRoot, 'node_modules/alpheios-inflection-tables/dist/alpheios-inflection-tables.min.js'),
        'alpheios-l10n': path.join(projectRoot, 'node_modules/alpheios-l10n/dist/alpheios-l10n.min.js'),
        'alpheios-client-adapters': path.join(projectRoot, 'node_modules/alpheios-client-adapters/dist/alpheios-client-adapters.min.js'),
        'alpheios-res-client': path.join(projectRoot, 'node_modules/alpheios-res-client/dist/alpheios-res-client.min.js'),
        'alpheios-wordlist': path.join(projectRoot, 'node_modules/alpheios-wordlist/dist/alpheios-wordlist.min.js'),
        'alpheios-messaging': path.join(projectRoot, '../../node_modules/alpheios-messaging/dist/prod/alpheios-messaging.min.js'),
        'vue-multiselect-css': path.join(projectRoot, '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'),
        '@vue-runtime': path.join(projectRoot, '../../node_modules/vue/dist/vue.runtime.esm.js'),
        '@': path.join(projectRoot, 'src'),
        '@comp': path.join(projectRoot, 'src'),
        /*
        Starting from version 4.5, `papaparse` uses a `stream` package from node.js.
        In webpack 4, this package was polyfilled for the browser build automatically.
        It is not so, however, with webpack 5 as it disabled all automatic polyfills.
        Solution is to use `readable-stream` as a `stream` polyfill.
         */
        stream: path.join(projectRoot, '../../node_modules/readable-stream')
      }
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
    resolve: {
      alias: {
        // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
        'alpheios-annotations': path.join(projectRoot, 'node_modules/alpheios-annotations/dist/alpheios-annotations.js'),
        'alpheios-annotations-css': path.join(projectRoot, 'node_modules/alpheios-annotations/dist/styles/'),
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js'),
        'alpheios-inflection-tables': path.join(projectRoot, 'node_modules/alpheios-inflection-tables/dist/alpheios-inflection-tables.js'),
        'alpheios-l10n': path.join(projectRoot, 'node_modules/alpheios-l10n/dist/alpheios-l10n.js'),
        'alpheios-client-adapters': path.join(projectRoot, 'node_modules/alpheios-client-adapters/dist/alpheios-client-adapters.js'),
        'alpheios-res-client': path.join(projectRoot, 'node_modules/alpheios-res-client/dist/alpheios-res-client.js'),
        'alpheios-wordlist': path.join(projectRoot, 'node_modules/alpheios-wordlist/dist/alpheios-wordlist.js'),
        'alpheios-messaging': path.join(projectRoot, '../../node_modules/alpheios-messaging/dist/dev/alpheios-messaging.js'),
        'vue-multiselect-css': path.join(projectRoot, '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'),
        '@vue-runtime': path.join(projectRoot, '../../node_modules/vue/dist/vue.runtime.esm.js'),
        '@': path.join(projectRoot, 'src'),
        '@comp': path.join(projectRoot, 'src'),
        /*
        Starting from version 4.5, `papaparse` uses a `stream` package from node.js.
        In webpack 4, this package was polyfilled for the browser build automatically.
        It is not so, however, with webpack 5 as it disabled all automatic polyfills.
        Solution is to use `readable-stream` as a `stream` polyfill.
         */
        stream: path.join(projectRoot, '../../node_modules/readable-stream')
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style/style-components-safari.css'
      })
    ]
  }
}

export { webpack }

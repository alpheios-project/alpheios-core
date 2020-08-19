/*
A configuration file for a github build script. Same as config.mjs except paths
 */
import VueLoaderPlugin from 'vue-loader/lib/plugin.js'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import path from 'path'
const projectRoot = path.join(process.cwd(), 'packages/components')

const imagemin = {
  tasks: [
    { source: 'src/images', target: 'dist/images', extensions: ['jpg', 'png', 'svg'], excludedDirs: ['inline-icons', 'alpheios'] }
  ]
}

const webpack = {
  common: {
    context: path.join(projectRoot, 'src'),
    entry: './plugin.js',
    output: {
      path: path.join(projectRoot, 'dist'),
      library: 'AlpheiosComponents',
      libraryTarget: 'umd',
      chunkFilename: 'components.[name].js'
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    module: {
      rules: [
        /*
        The following rule is required to fix the interact.js issue allowing no more than one sequence of
        drag and drop operation in the Firefox content script. The problem is that interact.js uses
        `requestAnimationFrame` and `cancelAnimationFrame` functions of the `window` object and
        those lose the window context in a Firefox content script due to the Firefox bug.
        Please see https://bugzilla.mozilla.org/show_bug.cgi?id=1208775 for more details.

        To fix this we can rebind those functions to the window object. This code has to be executed
        before any interact.js function to be called.

        The simplest solution to this is to use an `imports-loader` webpack plugin and assign
        a self-executing function to a variable. As a result, the content of this function's body
        will be guaranteed to be executed before the interact.js functions are called.
         */
        {
          test: /.*node_modules(?:\/|\\)interactjs(?:\/|\\)dist(?:\/|\\)interact.js/,
          use: 'imports-loader?alpheiosFFCSFix=>(function () { window.requestAnimationFrame=requestAnimationFrame.bind(window); window.cancelAnimationFrame=cancelAnimationFrame.bind(window) })()'
        }
      ]
    }
  },

  production: {
    mode: 'production',
    output: {
      filename: 'alpheios-components.min.js'
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
        filename: 'style/style-components.min.css'
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
        filename: 'style/style-components.css'
      })
    ]
  }
}

export { webpack, imagemin }

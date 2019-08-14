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
    entry: './plugin.js',
    output: {
      library: 'AlpheiosComponents',
      libraryTarget: 'umd',
      chunkFilename: 'components.[name].js'
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
          use: "imports-loader?alpheiosFFCSFix=>(function () { window.requestAnimationFrame=requestAnimationFrame.bind(window); window.cancelAnimationFrame=cancelAnimationFrame.bind(window) })()"
        }
      ]
    }
  },

  production: {
    mode: 'production',
    output: {
      filename: 'alpheios-components.min.js'
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
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style/style-components.css'
      })
    ]
  }
}

export { webpack, imagemin }

import VueLoaderPlugin from 'vue-loader/lib/plugin.js'

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
    // externals: ['alpheios-data-models', 'alpheios-inflection-tables'],
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
    /*externals: {
      'alpheios-client-adapters': 'alpheios-client-adapters',
      'alpheios-wordlist': 'alpheios-wordlist',
      'alpheios-data-models': 'alpheios-data-models',
      'alpheios-inflection-tables': 'alpheios-inflection-tables',
      'alpheios-experience': 'alpheios-experience',
      'alpheios-res-client': 'alpheios-res-client',
      'intl-messageformat': 'intl-messageformat'
    },*/
    plugins: [
      new VueLoaderPlugin()
    ]
  },

  production: {
    mode: 'production',
    output: { filename: 'alpheios-components.min.js' }
  },

  development: {
    mode: 'development',
    output: {
      filename: 'alpheios-components.js',
      library: 'AlpheiosComponents'
    }
  }
}

export { webpack, imagemin }

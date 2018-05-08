import VueLoaderPlugin from '../node_modules/vue-loader/lib/plugin.js'

import path from 'path'
const projectRoot = process.cwd()

const sass = {
  tasks: [
    { source: `src/skins/blue/style.scss`,
      target: `dist/skins/blue/style.css`,
      style: 'compressed',
      sourceMap: false
    },
    {
      source: `src/skins/green/style.scss`,
      target: `dist/skins/green/style.css`,
      style: 'compressed',
      sourceMap: false
    }
  ]
}

const imagemin = {
  tasks: [
    {source: 'src/images', target: 'dist/images', extensions: ['jpg', 'png', 'svg'], excludedDirs: ['inline-icons']}
  ]
}

const webpack = {
  common: {
    entry: './plugin.js',
    // externals: ['alpheios-data-models', 'alpheios-inflection-tables'],
    resolve: {
      alias: {
        // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js')
      }
    },
    externals: {
      'alpheios-data-models': 'alpheios-data-models',
      'alpheios-inflection-tables': 'alpheios-inflection-tables',
      'alpheios-experience': 'alpheios-experience',
      'alpheios-res-client': 'alpheios-res-client',
      'alpheios-lemma-client': 'alpheios-lemma-client',
      'alpheios-lexicon-client': 'alpheios-lexicon-client',
      'alpheios-morph-client': 'alpheios-morph-client',
      'intl-messageformat': 'intl-messageformat',
      'uuid': 'uuid'
    },
    module: {
      rules: [
        {
          test: /\.json$/,
          use: 'raw-loader',
          type: 'javascript/auto' // To prevent running Webpack's default JSON parser on the output of raw-loader
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  },

  production: {
    mode: 'production',
    output: {filename: 'alpheios-components.min.js'}
  },

  development: {
    mode: 'production',
    output: {filename: 'alpheios-components.js'}
  }
}

export { webpack, imagemin, sass }

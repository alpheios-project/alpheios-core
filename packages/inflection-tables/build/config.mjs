import path from 'path'
const projectRoot = process.cwd()
const webpack = {
  common: {
    context: projectRoot,
    entry: './index.js',
    externals: {
      'alpheios-data-models': 'alpheios-data-models',
      'uuid/v4': 'uuid/v4',
      papaparse: 'papaparse'
    },
    resolve: {
      alias: {
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js'),
        '@lib': path.join(projectRoot, 'lib'),
        '@views': path.join(projectRoot, 'views'),
        '@l10n': path.join(projectRoot, 'l10n'),
        /*
        Starting from version 4.5, `papaparse` uses a `stream` package from node.js.
        In webpack 4, this package was polyfilled for the browser build automatically.
        It is not so, however, with webpack 5 as it disabled all automatic polyfills.
        Solution is to use `readable-stream` as a `stream` polyfill.
         */
        'stream': path.join(projectRoot, '../../node_modules/readable-stream'),
        '@': path.join(projectRoot, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.csv$/,
          use: ['raw-loader'],
          enforce: 'pre'
        }
      ]
    }
  },

  production: {
    output: { filename: 'alpheios-inflection-tables.min.js' }
  },
  development: {
    output: { filename: 'alpheios-inflection-tables.js' }
  }
}

export { webpack }

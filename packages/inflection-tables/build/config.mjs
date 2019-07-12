import path from 'path'
const projectRoot = process.cwd()
const webpack = {
  common: {
    context: projectRoot,
    entry: './index.js',
    externals: {
      'intl-messageformat': 'intl-messageformat',
      'alpheios-data-models': 'alpheios-data-models',
      'uuid/v4': 'uuid/v4'
    },
    resolve: {
      alias: {
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js'),
        '@lib': path.join(projectRoot, 'lib'),
        '@views': path.join(projectRoot, 'views'),
        '@l10n': path.join(projectRoot, 'l10n')
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

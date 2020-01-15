import path from 'path'
const projectRoot = process.cwd()

const webpack = {
  common: {
    entry: './index.js',
    externals: {
      'alpheios-data-models': 'alpheios-data-models'
    },
    resolve: {
      alias: {
        // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.node.js'),
        '@lexisCs': path.join(projectRoot, 'node_modules/alpheios-lexis-cs/src/'),
        '@': path.join(projectRoot, 'src')
      }
    },
    target: 'node'
  },

  production: {
    output: { filename: 'alpheios-client-adapters.node.min.js' }
  },
  development: {
    output: { filename: 'alpheios-client-adapters.node.js' }
  }
}

export { webpack }

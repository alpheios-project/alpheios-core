import path from 'path'
const projectRoot = process.cwd()

const webpack = {
  common: {
    entry: './index.js',
    externals: {
      'alpheios-data-models': 'alpheios-data-models'
    },
    target: "node"
  },

  production: {
    output: {filename: 'alpheios-client-adapters.node.min.js'},
    resolve: {
      alias: {
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.node.min.js'),
        '@': path.join(projectRoot, 'src')
      }
    }
  },
  development: {
    output: {filename: 'alpheios-client-adapters.node.js'},
    resolve: {
      alias: {
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.node.js'),
        '@': path.join(projectRoot, 'src')
      }
    }
  }
}

export { webpack }

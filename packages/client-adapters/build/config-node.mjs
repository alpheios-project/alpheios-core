import path from 'path'
const projectRoot = process.cwd()

const webpack = {
  common: {
    entry: './driver.js',
    externals: {
      'alpheios-data-models': 'alpheios-data-models'
    },
    target: "node",
    resolve: {
      alias: {
        // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
        '@': path.join(projectRoot, 'src')
      }
    }
  },

  production: {
    output: {filename: 'alpheios-client-adapters.node.min.js'},
    resolve: {
      alias: {
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.node.min.js')
      }
    }
  },
  development: {
    output: {filename: 'alpheios-client-adapters.node.js'},
    resolve: {
      alias: {
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.node.js')
      }
    }
  }
}

export { webpack }

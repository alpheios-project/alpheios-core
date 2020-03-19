import path from 'path'
const projectRoot = process.cwd()

const webpack = {
  common: {
    entry: './index.js',
    externals: {
      'alpheios-data-models': 'alpheios-data-models',
      'alpheios-messaging': 'alpheios-messaging'
    },
    resolve: {
      alias: {
        '@clAdapters': path.join(projectRoot, 'src')
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

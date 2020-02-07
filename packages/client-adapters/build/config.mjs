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
        '@clAdapters': path.join(projectRoot, 'src')
      }
    }
  },

  production: {
    output: { filename: 'alpheios-client-adapters.min.js' }
  },
  development: {
    output: { filename: 'alpheios-client-adapters.js' }
  }
}

export { webpack }

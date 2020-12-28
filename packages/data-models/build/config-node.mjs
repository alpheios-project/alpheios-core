import path from 'path'
const projectRoot = process.cwd()

const webpack = {
  common: {
    entry: './driver.js',
    externals: {
      'uuid/v4': 'uuid/v4'
    },
    target: 'node',
    resolve: {
      alias: {
        '@dmodels': path.join(projectRoot, 'src')
      }
    }
  },

  production: {
    output: { filename: 'alpheios-data-models.node.min.js' }
  },
  development: {
    output: { filename: 'alpheios-data-models.node.js' }
  }
}

export { webpack }

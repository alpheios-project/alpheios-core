import path from 'path'
const projectRoot = process.cwd()

const webpack = {
  common: {
    entry: './driver.js',
    externals: {
      'uuid/v4': 'uuid/v4'
    },
    output: {
      library: 'AlpheiosDataModels',
      libraryTarget: 'umd',
      chunkFilename: 'datamodels.[name].js'
    },
    resolve: {
      alias: {
        '@dmodels': path.join(projectRoot, 'src')
      }
    }
  },

  production: {
    output: { filename: 'alpheios-data-models.min.js' }
  },
  development: {
    output: { filename: 'alpheios-data-models.js' }
  }
}

export { webpack }

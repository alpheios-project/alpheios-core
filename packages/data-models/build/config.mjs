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

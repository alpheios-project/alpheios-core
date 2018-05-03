const webpack = {
  common: {
    entry: './driver.js',
    externals: {
      'alpheios-data-models': 'alpheios-data-models'
    }
  },

  production: {
    output: {filename: 'alpheios-res-client.min.js'}
  },
  development: {
    output: {filename: 'alpheios-res-client.js'}
  }
}

export { webpack }

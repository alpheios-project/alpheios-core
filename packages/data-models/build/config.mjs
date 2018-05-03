const webpack = {
  common: {
    entry: './driver.js',
    externals: {
      'intl-messageformat': 'intl-messageformat'
    }
  },

  production: {
    output: {filename: 'alpheios-data-models.min.js'}
  },
  development: {
    output: {filename: 'alpheios-data-models.js'}
  }
}

export { webpack }

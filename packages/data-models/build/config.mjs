const webpack = {
  common: {
    entry: './driver.js',
    externals: {
      'intl-messageformat': 'intl-messageformat',
      'uuid/v4': 'uuid/v4'
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
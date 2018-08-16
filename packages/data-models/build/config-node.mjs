const webpack = {
  common: {
    entry: './driver.js',
    externals: {
      'intl-messageformat': 'intl-messageformat'
    },
    target: "node"
  },

  production: {
    output: {filename: 'alpheios-data-models.node.min.js'}
  },
  development: {
    output: {filename: 'alpheios-data-models.node.js'}
  }
}

export { webpack }
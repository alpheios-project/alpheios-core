const webpack = {
  common: {
    entry: './driver.js',
    externals: {
      'alpheios-data-models': 'alpheios-data-models'
    },
    resolve: {
      alias: {
        // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
        '@': path.join(projectRoot, 'src')
      }
    }
  },

  production: {
    output: {filename: 'alpheios-client-adapters.min.js'}
  },
  development: {
    output: {filename: 'alpheios-client-adapters.js'}
  }
}

export { webpack }

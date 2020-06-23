import path from 'path'
const projectRoot = process.cwd()

const webpack = {
  common: {
    entry: './driver.js',
    externals: {
      'alpheios-data-models': 'alpheios-data-models'
    },
    resolve: {
      alias: {
        /*
        Starting from version 4.5, `papaparse` uses a `stream` package from node.js.
        In webpack 4, this package was polyfilled for the browser build automatically.
        It is not so, however, with webpack 5 as it disabled all automatic polyfills.
        Solution is to use `readable-stream` as a `stream` polyfill.
         */
        'stream': path.join(projectRoot, '../../node_modules/readable-stream')
      }
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

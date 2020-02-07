import path from 'path'
const projectRoot = process.cwd()


const webpack = {
  common: {
    entry: './index.js',
    resolve: {
      alias: {
        '@wordlist': path.join(projectRoot, 'src')
      }
    },
    externals: {
      'intl-messageformat': 'intl-messageformat',
      'alpheios-data-models': 'alpheios-data-models'
    }
  },

  production: {
    mode: 'production',
    output: {filename: 'alpheios-wordlist.min.js'}
  },

  development: {
    mode: 'development',
    output: {filename: 'alpheios-wordlist.js'}
  }
}

export { webpack }
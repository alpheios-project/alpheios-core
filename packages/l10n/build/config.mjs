import path from 'path'
const projectRoot = process.cwd()

const webpack = {
  common: {
    entry: '../index.js',
    resolve: {
      alias: {
        '@l10n': path.join(projectRoot, 'src')
      }
    }
  },

  production: {
    output: { filename: 'alpheios-l10n.min.js' }
  },
  development: {
    output: { filename: 'alpheios-l10n.js' }
  }
}

export { webpack }

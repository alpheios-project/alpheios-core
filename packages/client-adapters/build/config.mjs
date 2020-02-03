import path from 'path'
const packageRoot = process.cwd()
const monorepoRoot = path.join(process.cwd(), '../..')
console.info('Project root is', monorepoRoot)

const webpack = {
  common: {
    entry: './index.js',
    externals: {
      'alpheios-data-models': 'alpheios-data-models'
    },
    resolve: {
      alias: {
        // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
        'alpheios-data-models': path.join(monorepoRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js'),
        '@lexisCs': path.join(monorepoRoot, 'node_modules/alpheios-lexis-cs/src/'),
        '@': path.join(packageRoot, 'src')
      }
    }
  },

  production: {
    output: { filename: 'alpheios-client-adapters.min.js' }
  },
  development: {
    output: { filename: 'alpheios-client-adapters.js' }
  }
}

export { webpack }

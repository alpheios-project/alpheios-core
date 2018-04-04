const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const string = require('rollup-plugin-string')

const defaultPlugins = [
  string({
    include: ['lib/lang/**/*.csv', 'lib/lang/**/*.json', 'l10n/locale/**/*.json', 'tests/data/**/*.json']
  }),
  // Resolve plugin must run before commonjs. please see https://github.com/rollup/rollup-plugin-commonjs/issues/145
  resolve({
    // use "module" field for ES6 module if possible
    module: true, // Default: true
    jsnext: true, // Default: false
    main: true, // Default: true
    browser: true // Default: false
  }),
  commonjs({
    ignoreGlobal: true, // Default: false
    sourceMap: true // Default: true
  })
]

// Standalone bundle
rollup.rollup({
  input: 'index.js',
  plugins: defaultPlugins
}).then(bundle => {
  bundle.write({
    name: 'InflectionTables',
    format: 'es',
    file: 'dist/inflection-tables.standalone.js',
    sourcemap: true
  })
}).catch(reason => {
  'use strict'
  console.error(reason)
})

// Module bundle
rollup.rollup({
  input: 'index.js',
  external: [
    'alpheios-data-models',
    'intl-messageformat',
    'uuid'
  ],
  plugins: defaultPlugins
}).then(bundle => {
  bundle.write({
    name: 'InflectionTables',
    format: 'es',
    file: 'dist/inflection-tables.module-external.js',
    sourcemap: true
  })
}).catch(reason => {
  'use strict'
  console.error(reason)
})

// Test bundle
rollup.rollup({
  input: 'tests/controller.js',
  plugins: defaultPlugins
}).then(bundle => {
  bundle.write({
    name: 'InflectionTablesTest',
    format: 'umd',
    file: 'tests/test-bundle.js'
  })
}).catch(reason => {
  'use strict'
  console.error(reason)
})

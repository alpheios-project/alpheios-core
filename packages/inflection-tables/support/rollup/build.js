const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const string = require('rollup-plugin-string')

const defaultPlugins = [
  string({
    include: ['lib/lang/**/*.csv', 'tests/data/**/*.json']
  }),
  commonjs({
    ignoreGlobal: true,  // Default: false
    sourceMap: true,  // Default: true
  }),
  resolve({
    // use "module" field for ES6 module if possible
    module: true, // Default: true
    jsnext: true,  // Default: false
    main: true,  // Default: true
    browser: true,  // Default: false
  })
]

// Regular bundle
rollup.rollup({
  entry: 'index.js',
  moduleName: 'InflectionTables',
  plugins: defaultPlugins
}).then(bundle => {
  bundle.write({
    format: 'es',
    dest: 'dist/inflection-tables.js',
    sourceMap: true
  })
}).catch(reason => {
  'use strict'
  console.error(reason)
})

// Test bundle
rollup.rollup({
  entry: 'tests/controller.js',
  moduleName: 'InflectionTablesTest',
  plugins: defaultPlugins
}).then(bundle => {
  bundle.write({
    format: 'umd',
    dest: 'tests/test-bundle.js'
  })
}).catch(reason => {
  'use strict'
  console.error(reason)
})
import resolve from 'rollup-plugin-node-resolve'
export default {
  entry: 'src/driver.js',
  plugins: [
    resolve({
      module: true, // Default: true
      jsnext: true,  // Default: false
      main: true,  // Default: true
      browser: true,  // Default: false
      namedExports: {
      }
    })
  ],
  moduleName: 'AlpheiosDataModels',
  targets: [
    {
      dest: 'dist/alpheios-data-models.js',
      format: 'es',
      sourceMap: true
    }
  ]
}

const path = require('path')

module.exports = {
  pathToProjectRoot: '../..',
  style: [
    { source: 'src/styles/style.scss', target: 'dist/styles/style.css', style: 'compressed', sourceMap: true }
  ],
  image: [
    { source: 'src/images', target: 'dist/images', extensions: ['jpg', 'png', 'svg'], excludedDirs: ['inline-icons'] }
  ],
  webpack: {
    common: {
      resolve: {
        alias: {
          // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
          'alpheios-data-models': path.resolve(__dirname, '../../node_modules/alpheios-data-models/dist/alpheios-data-models.js')
        },
        mainFields: ['moduleExternal', 'module', 'main']
      },
      devtool: 'source-map',
      externals: {
        'alpheios-data-models': 'alpheios-data-models',
        'alpheios-inflection-tables': 'alpheios-inflection-tables',
        'alpheios-experience': 'alpheios-experience',
        'alpheios-res-client': 'alpheios-res-client'
      }
    },
    tasks: [
      {
        context: path.resolve(__dirname, '../../src/'),
        entry: './plugin.js',
        externals: ['alpheios-data-models', 'alpheios-inflection-tables'],
        output: {
          path: path.resolve(__dirname, '../../dist'),
          filename: 'alpheios-components.js',
          libraryTarget: 'umd'
        },
        module: {
          rules: [
            {
              test: /\.csv$/,
              use: 'raw-loader'
            },
            {
              test: /\.json$/,
              use: 'raw-loader'
            },
            {
              test: /\.(jpg|png)$/,
              use: [{
                loader: 'url-loader',
                options: {
                  limit: 25000
                }
              }]
            },
            {
              test: /\.svg$/,
              loader: 'vue-svg-loader',
              options: {
                // optional [svgo](https://github.com/svg/svgo) options
                svgo: {
                  plugins: [
                    {removeDoctype: true},
                    {removeComments: true},
                    {removeDimensions: true},
                    {removeUselessStrokeAndFill: false}
                  ]
                }
              }
            },
            {
              test: /\.(htmlf)$/,
              use: {
                loader: 'html-loader'
              }
            },
            {
              test: /\.scss$/,
              use: [{
                loader: 'style-loader'
              }, {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              }, {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }]
            },
            {
              test: /\.vue$/,
              loader: 'vue-loader',
              options: {
                loaders: {
                  scss: 'vue-style-loader!css-loader!sass-loader' // <style lang="scss">
                }
              }
            },
            {
              test: /\.js$/,
              include: path.resolve(__dirname, '../src'),
              use: [{
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['es2015', {modules: false}]
                  ]
                }
              }]
            }
          ]
        }
      }
    ]
  }
}

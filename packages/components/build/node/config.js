const path = require('path')
const projectRoot = process.cwd()

module.exports = {
  style: {
    tasks: [
      { source: 'src/styles/style.scss', target: 'dist/styles/style.css', style: 'compressed', sourceMap: true }
    ]
  },
  image: {
    tasks: [
      {source: 'src/images', target: 'dist/images', extensions: ['jpg', 'png', 'svg'], excludedDirs: ['inline-icons']}
    ]
  },
  webpack: {
    common: {
      resolve: {
        alias: {
          // Below will force all imported modules with unresolved dependencies to use a single instance of that dependency
          'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js')
        },
        mainFields: ['moduleExternal', 'module', 'main']
      },
      devtool: 'source-map',
      externals: {
        'alpheios-data-models': 'alpheios-data-models',
        'alpheios-inflection-tables': 'alpheios-inflection-tables',
        'alpheios-experience': 'alpheios-experience',
        'alpheios-res-client': 'alpheios-res-client',
        'intl-messageformat': 'intl-messageformat',
        'uuid': 'uuid'
      }
    },
    tasks: [
      {
        context: path.join(projectRoot, 'src/'),
        entry: './plugin.js',
        externals: ['alpheios-data-models', 'alpheios-inflection-tables'],
        output: {
          path: path.join(projectRoot, 'dist/'),
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
              use: 'raw-loader',
              type: 'javascript/auto' // To prevent running Webpack's default JSON parser on the output of raw-loader
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
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ]
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
            // Seems to require babel-polyfill in higher level libraries. Need to figure out. Do we really need it?
            /* {
              test: /\.js$/,
              include: path.join(projectRoot, 'src/'),
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: ['babel-preset-env']
                  }
                }
              ]
            }, */
            {
              test: /\.js$/,
              use: ['source-map-loader'],
              enforce: 'pre'
            }
          ]
        }
      }
    ]
  }
}

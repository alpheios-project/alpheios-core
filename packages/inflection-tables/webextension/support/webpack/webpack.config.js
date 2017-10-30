const path = require('path');

module.exports = [
    {
        context: path.resolve(__dirname, '../../src/background'),
        entry: './background.js',
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, '../../dist'),
            filename: 'background.js'
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
                    test: /\.htmlf$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, '../../src/background'),
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', {modules: false}]
                            ]
                        }
                    }]
                }]
        }
    },
    {
        context: path.resolve(__dirname, '../../src/content'),
        entry: './content.js',
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, '../../dist'),
            filename: 'content.js'
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
                    test: /\.htmlf$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, '../../src/content'),
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', {modules: false}]
                            ]
                        }
                    }]
                }]
        }
    }
];
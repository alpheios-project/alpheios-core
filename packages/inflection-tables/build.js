const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const string = require('rollup-plugin-string');


const defaultPlugins = [
    string({
        // Required to be specified
        include: ['presenter/views/**/*.hbs', 'lib/lang/**/*.csv'],

        // Undefined by default
        //exclude: ['**/index.html']
    }),
    commonjs({
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        //include: 'node_modules/handlebars/**',  // Default: undefined
        exclude: [ 'node_modules/**' ],  // Default: undefined
        // these values can also be regular expressions
        //include: /node_modules/

        // search for files other than .js files (must already
        // be transpiled by a previous plugin!)
        //extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

        // if true then uses of `global` won't be dealt with by this plugin
        ignoreGlobal: true,  // Default: false

        // if false then skip sourceMap generation for CommonJS modules
        sourceMap: true,  // Default: true

        // explicitly specify unresolvable named exports
        // (see below for more details)
        //namedExports: { './presenter/support/handlebars-4.0.10/handlebars.runtime-v4.0.10.js': ['handlebarsID' ] },  // Default: undefined
        //namedExports: { 'lib/support/papaparse-4.3.2/papaparse.js': [ 'papaparse' ] }

        // sometimes you have to leave require statements
        // unconverted. Pass an array containing the IDs
        // or a `id => boolean` function. Only use this
        // option if you know what you're doing!
        //ignore: [ 'conditional-runtime-dependency' ]
    })
];

// Regular bundle
rollup.rollup({
    entry: 'controller.js',
    moduleName: 'InflectionTables',
    plugins: defaultPlugins
}).then(bundle => {
    bundle.write({
        format: 'umd',
        dest: 'dist/inflection-tables.js',
        sourceMap: true
    })
}).catch(reason => {
    "use strict";
    console.error(reason);
});

// Test bundle
rollup.rollup({
    entry: 'tests/controller.js',
    moduleName: 'InflectionTablesTest',
    plugins: defaultPlugins
}).then(bundle => {
    bundle.write({
        format: 'umd',
        dest: 'dist/inflection-tables-test.js'
    })
}).catch(reason => {
    "use strict";
    console.error(reason);
});
const rollup = require('rollup');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const string = require('rollup-plugin-string');


const defaultPlugins = [
    replace({
        'process.env.NODE_ENV': JSON.stringify( 'development' ) // For Vue.js, production/development
    }),
    string({
        // Required to be specified
        include: ['presenter/templates/**/*.hbs', 'lib/lang/**/*.csv'],

        // Undefined by default
        //exclude: ['**/index.html']
    }),
    commonjs({
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        //include: 'node_modules/handlebars/**',  // Default: undefined
        //exclude: [ 'node_modules/**' ],  // Default: undefined
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
    }),
    resolve({
        // use "module" field for ES6 module if possible
        module: true, // Default: true

        // use "jsnext:main" if possible
        // – see https://github.com/rollup/rollup/wiki/jsnext:main
        jsnext: true,  // Default: false

        // use "main" field or index.js, even if it's not an ES6 module
        // (needs to be converted from CommonJS to ES6
        // – see https://github.com/rollup/rollup-plugin-commonjs
        main: true,  // Default: true

        // some package.json files have a `browser` field which
        // specifies alternative files to load for people bundling
        // for the browser. If that's you, use this option, otherwise
        // pkg.browser will be ignored
        browser: true,  // Default: false

        // not all files you want to resolve are .js files
        //extensions: [ '.js', '.json' ],  // Default: ['.js']

        // whether to prefer built-in modules (e.g. `fs`, `path`) or
        // local ones with the same names
        //preferBuiltins: false,  // Default: true

        // Lock the module search in this path (like a chroot). Module defined
        // outside this path will be mark has external
        //jail: '/', // Default: '/'

        // If true, inspect resolved files to check that they are
        // ES2015 modules
        //modulesOnly: false, // Default: false

        // Any additional options that should be passed through
        // to node-resolve
        //customResolveOptions: {
        //moduleDirectory: 'js_modules'
        //}
        namedExports: {
            // left-hand side can be an absolute path, a path
            // relative to the current directory, or the name
            // of a module in node_modules
            'node_modules/my-lib/index.js': [ 'named' ]
        }
    })
];

rollup.rollup({
    entry: 'webextension-test/src/extension.js',
    moduleName: 'InflectionTables',
    plugins: defaultPlugins
}).then(bundle => {
    bundle.write({
        format: 'es',
        dest: 'webextension-test/extension/extension-bundle.js',
        sourceMap: false
    })
}).catch(reason => {
    "use strict";
    console.error(reason);
});
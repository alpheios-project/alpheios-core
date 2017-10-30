const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const string = require('rollup-plugin-string');


const defaultPlugins = [
    string({
        // Required to be specified
        include: ['lib/lang/**/*.csv', 'tests/data/**/*.json'],

        // Undefined by default
        //exclude: ['**/index.html']
    }),
    commonjs({
        // if true then uses of `global` won't be dealt with by this plugin
        ignoreGlobal: true,  // Default: false

        // if false then skip sourceMap generation for CommonJS modules
        sourceMap: false,  // Default: true
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
    })
];

rollup.rollup({
    entry: 'webextension/src/background/background.js',
    plugins: defaultPlugins
}).then(bundle => {
    bundle.write({
        format: 'umd',
        dest: 'webextension/dist/background.js',
        sourceMap: false
    })
}).catch(reason => {
    "use strict";
    console.error(reason);
});
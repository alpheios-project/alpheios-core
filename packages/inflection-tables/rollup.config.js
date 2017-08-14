// rollup.config.js
export default {
    entry: 'lib/main.js',
    format: 'umd', // For both browsers and Node.js
    moduleName: "InflectionTables",
    dest: 'dist/inflection-tables.js', // Equivalent to --output
    sourceMap: false
};
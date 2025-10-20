module.exports = {
    testEnvironment: 'jsdom',
    verbose: true,
    globals: {
      "DEVELOPMENT_MODE_BUILD": true,
      'vue-jest': {
        compiler: 'vue-template-compiler'
      }
    },
    testPathIgnorePatterns: [
      "<rootDir>/node_modules/"
    ],
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      ".*Icon\\.vue$": "<rootDir>/svgTransform.js",
      ".*\\.(vue)$": "@vue/vue2-jest",
      ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransform.js",
      "^.*\\.svg$": "<rootDir>/svgTransform.js"
    },
    transformIgnorePatterns: [
    ],
    moduleNameMapper: {
      "^@vue-runtime$": "vue/dist/vue.runtime.common.js",
      "^@[/](.+)": "<rootDir>/src/$1",
      "^@comp[/](.+)": "<rootDir>/src/$1",
      "^@tests[/](.+)": "<rootDir>/tests/$1",
      "^@compTests[/](.+)": "<rootDir>/tests/$1"
    },
    moduleFileExtensions: [
      "js",
      "json",
      "vue"
    ]
}

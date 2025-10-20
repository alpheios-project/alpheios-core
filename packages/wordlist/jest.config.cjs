module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  globals: {
  },
  testEnvironment: './tests/FixJSDOMEnvironment.js',
  verbose: true,
  transform: {
    '^.+\\js$': 'babel-jest'
  },
  moduleNameMapper: {
    "^@wordlist[/](.+)": "<rootDir>/src/$1",
    "^@wordlist-tests[/](.+)": "<rootDir>/tests/$1"
  },
  testMatch: [ "**/tests/**/*.test.js" ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  
  collectCoverageFrom: ['**/src/**'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  }
}

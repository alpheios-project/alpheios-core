module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  globals: {
  },
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    '^.+\\js$': 'babel-jest',
    ".*\\.(csv)$": "<rootDir>/csvTransform.js"
  },
  moduleNameMapper: {
    "^@lib[/](.+)": "<rootDir>/src/lib/$1",
    "^@views[/](.+)": "<rootDir>/src/views/$1",
    "^@[/](.+)": "<rootDir>/src/$1",
    "^@tests[/](.+)": "<rootDir>/tests/$1"
  },
  testMatch: [ "**/tests/**/*.test.js" ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  
  collectCoverageFrom: ['**/src/**'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  }
}

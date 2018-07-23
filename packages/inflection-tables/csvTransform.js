/* eslint-disable no-unused-vars */
const path = require('path')
const fs = require('fs')

module.exports = {
  process (src, filename, config, options) {
    let testCSV = fs.readFileSync(filename, 'UTF-8')
    return 'module.exports = ' + JSON.stringify(testCSV)
  }
}

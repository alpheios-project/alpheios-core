const path = require('path')

module.exports = {
  process (src, filename, config, options) {
    let jsonName = JSON.stringify(path.basename(filename))
    return {
      code: `
            {
              template: '<img src="${jsonName}">'
            }`
    }
  }
}

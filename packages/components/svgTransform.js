const vueJest = require('vue-jest/lib/template-compiler')

module.exports = {
  process (content, sourcePath) {
    const render =  () => ({
      name: 'Icon',
      render: () => null
    })
    return {
      code: `module.exports = { render: ${render} }`
    }
  }
}

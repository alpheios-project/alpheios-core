const webpack = require('webpack')
const chalk = require('chalk')

let build = function build (tasks) {
  let startTime = new Date().getTime()
  console.log() // Inserts an empty line
  console.log(chalk.blue('Webpack task:'))
  webpack(tasks, (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }
    const info = stats.toJson()
    if (stats.hasErrors()) { console.error(info.errors) }
    if (stats.hasWarnings()) { console.warn(info.warnings) }

    console.log(stats.toString({
      chunks: true,
      assets: true,
      hash: true,
      colors: true
    }))
    let duration = new Date().getTime() - startTime
    console.log(chalk.blue(`Webpack task completed in ${duration} ms`))
  })
}

module.exports = {
  run: build
}

const sass = require('node-sass')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const bytes = require('bytes')
const chalk = require('chalk')

let run = function (tasks) {
  'use strict'
  for (let task of tasks) {
    let destFileName = task.target || 'dist/styles/style.css'
    compileScss({
      src: task.source || 'src/styles/style.scss',
      cssFileName: destFileName.replace(/\.css/, '.min.css'),
      cssMapFileName: destFileName.replace(/\.css/, '.min.css.map'),
      style: task.style || 'compressed',
      sourceMap: (task.sourceMap !== undefined) ? task.sourceMap : true
    })
  }
}

let compileScss = function (options) {
  // write the result to file
  let destPath = path.dirname(options.cssFileName)

  // render the result
  sass.render({
    file: options.src,
    outputStyle: options.style,
    sourceMap: options.sourceMap,
    outFile: options.cssFileName
  }, (error, result) => {
    if (error) console.error(error)

    mkdirp(destPath, function (error) {
      if (error) console.error(error)

      console.log() // Inserts an empty line
      console.log(chalk.blue('STYLE TASK'))

      fs.writeFile(options.cssFileName, result.css, (err) => {
        if (err) console.log(err)
        // log successful compilation to terminal
        let size = fs.statSync(options.cssFileName).size
        console.log(`${options.cssFileName} ${chalk.yellow('[' + bytes.format(size) + ']')} ${chalk.green('[created]')}`)
      })

      fs.writeFile(options.cssMapFileName, result.map, (err) => {
        if (err) console.log(err)
        // log successful compilation to terminal
        let size = fs.statSync(options.cssMapFileName).size
        console.log(`${options.cssMapFileName} ${chalk.yellow('[' + bytes.format(size) + ']')} ${chalk.green('[created]')}`)
      })
    })
  })
}

module.exports = {
  run: run
}

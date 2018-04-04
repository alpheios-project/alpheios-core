const sass = require('node-sass')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const bytes = require('bytes')
const chalk = require('chalk')

let run = async function (config) {
  'use strict'
  return new Promise(resolve => {
    let results = []
    let startTime = new Date().getTime()
    for (let task of config.tasks) {
      let destFileName = task.target || 'dist/styles/style.css'
      results.push(compileScss({
        src: task.source || 'src/styles/style.scss',
        cssFileName: destFileName.replace(/\.css/, '.min.css'),
        cssMapFileName: destFileName.replace(/\.css/, '.min.css.map'),
        style: task.style || 'compressed',
        sourceMap: (task.sourceMap !== undefined) ? task.sourceMap : true
      }))
    }
    Promise.all(results).then(values => {
      console.log() // Inserts an empty line
      console.log(chalk.blue('Style task:'))
      for (const value of values) {
        for (const result of value) {
          console.log(result)
        }
      }
      let duration = new Date().getTime() - startTime
      console.log(chalk.blue(`Style task completed in ${duration} ms`))
      resolve()
    })
  })
}

let compileScss = async function (options) {
  // write the result to file
  let destPath = path.dirname(options.cssFileName)

  return new Promise(resolve => {
    let results = []
    const projectRoot = process.cwd()
    // render the result
    sass.render({
      file: options.src,
      outputStyle: options.style,
      sourceMap: options.sourceMap,
      outFile: options.cssFileName
    }, (error, result) => {
      if (error) results.push(error)

      mkdirp(destPath, function (error) {
        if (error) results.push(error)

        let fileResult = new Promise(resolve => {
          fs.writeFile(options.cssFileName, result.css, (err) => {
            if (err) resolve(err)
            // log successful compilation to terminal
            let size = fs.statSync(options.cssFileName).size
            resolve(`${path.join(projectRoot, options.cssFileName)} ${chalk.yellow('[' + bytes.format(size) + ']')} ${chalk.green('[created]')}`)
          })
        })

        let mapResult = new Promise(resolve => {
          fs.writeFile(options.cssMapFileName, result.map, (err) => {
            if (err) resolve(err)
            // log successful compilation to terminal
            let size = fs.statSync(options.cssMapFileName).size
            resolve(`${path.join(projectRoot, options.cssMapFileName)} ${chalk.yellow('[' + bytes.format(size) + ']')} ${chalk.green('[created]')}`)
          })
        })

        Promise.all([fileResult, mapResult]).then(values => {
          resolve(values)
        })
      })
    })
  })
}

module.exports = {
  run: run
}

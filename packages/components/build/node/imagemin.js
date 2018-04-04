const path = require('path')
const fs = require('fs')
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminOptipng = require('imagemin-optipng')
const imageminSvgo = require('imagemin-svgo')
const bytes = require('bytes')
const chalk = require('chalk')

let readDir = function (dir, extensions, excludedDirs) {
  let files = []
  let dirItems = fs.readdirSync(dir)
  for (let dirItem of dirItems) {
    dirItem = path.join(dir, dirItem)
    let dirItemInfo = fs.statSync(dirItem)
    if (dirItemInfo.isFile()) {
      let extension = path.extname(dirItem).toLowerCase().replace(/\./, '')
      if (extensions.includes(extension)) { files.push(dirItem) }
    } else if (dirItemInfo.isDirectory() && !excludedDirs.includes(path.basename(dirItem))) {
      files = files.concat(readDir(dirItem, extensions, excludedDirs))
    }
  }
  return files
}

let run = async function (config) {
  'use strict'
  return new Promise((resolve, reject) => {
    let results = []
    let startTime = new Date().getTime()
    for (let task of config.tasks) {
      results.push(optimize(task))
    }
    Promise.all(results).then(values => {
      console.log() // Inserts an empty line
      console.log(chalk.blue('Image task:'))
      for (const value of values) {
        for (const result of value) {
          console.log(result)
        }
      }
      let duration = new Date().getTime() - startTime
      console.log(chalk.blue(`Image task completed in ${duration} ms`))
      resolve()
    })
  })
}

let optimize = async function (config) {
  const projectRoot = process.cwd()
  const source = config.source || 'src/images'
  const sourcePath = path.join(projectRoot, source)
  const target = config.target || 'dist/images/'
  const targetPath = path.join(projectRoot, target)
  let extensions = config.extensions || ['jpg', 'png', 'svg']
  extensions = extensions.map(extension => extension.toLowerCase().replace(/\./, ''))
  const excludedDirs = config.excludedDirs || []
  const plugins = [
    imageminJpegtran(),
    imageminOptipng(),
    imageminSvgo()
  ]

  let files = readDir(sourcePath, extensions, excludedDirs) || []

  let fileList = new Map()
  let tasks = []
  let results = []
  for (let sourceFile of files) {
    let filename = path.basename(sourceFile)
    let relativePath = path.relative(sourcePath, path.dirname(sourceFile))
    let targetDir = path.join(targetPath, relativePath)
    let targetFile = path.join(targetPath, relativePath, filename)
    let skipped = false
    if (fs.existsSync(targetFile)) {
      let sourceTime = fs.statSync(sourceFile).mtimeMs
      let targetTime = fs.statSync(targetFile).mtimeMs
      if (sourceTime <= targetTime) {
        skipped = true
      }
    }

    fileList.set(targetFile, {
      filename: filename,
      source: sourceFile,
      target: targetFile,
      skipped: skipped
    })

    if (!skipped) {
      let task = imagemin([sourceFile], targetDir, { plugins: plugins })
      tasks.push(task)
      task.then(
        files => {
          let fileItem = fileList.get(files[0].path)
          fileItem.sourceSize = fs.statSync(fileItem.source).size
          fileItem.targetSize = fs.statSync(fileItem.target).size
          fileItem.sizeReduction = Math.round((fileItem.targetSize - fileItem.sourceSize) / fileItem.sourceSize * 10000) / 100
        },
        error => {
          results.push(`Image cannot be optimized: ${error}`)
        })
    }
  }

  Promise.all(tasks).then(
    () => {
      if (files && files.length > 0) {
        for (let fileItem of fileList.values()) {
          if (!fileItem.skipped) {
            results.push(`${fileItem.target} ${chalk.yellow('[' + bytes.format(fileItem.targetSize) + ']')} ${chalk.magenta('[' + fileItem.sizeReduction + '%]')} ${chalk.green('[created]')}`)
          } else {
            results.push(`${fileItem.target} ${chalk.cyan('[up to date]')}`)
          }
        }
      }
    }
  )
  return results
}

module.exports = {
  run: run
}

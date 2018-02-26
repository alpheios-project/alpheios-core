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

let run = function (tasks, pathToProjectRoot) {
  'use strict'
  for (let task of tasks) {
    optimize(task, pathToProjectRoot)
  }
}

let optimize = function (config, pathToProjectRoot) {
  const projectRoot = path.resolve(__dirname, pathToProjectRoot)
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
          console.error(`Image cannot be optimized: ${error}`)
        })
    }
  }

  Promise.all(tasks).then(
    () => {
      if (files && files.length > 0) {
        console.log() // Inserts an empty line
        console.log(chalk.blue('IMAGE TASK'))
        for (let fileItem of fileList.values()) {
          if (!fileItem.skipped) {
            console.log(`${fileItem.target} ${chalk.yellow('[' + bytes.format(fileItem.targetSize) + ']')} ${chalk.magenta('[' + fileItem.sizeReduction + '%]')} ${chalk.green('[created]')}`)
          } else {
            console.log(`${fileItem.target} ${chalk.cyan('[up to date]')}`)
          }
        }
      }
    }
  )
}

module.exports = {
  run: run
}

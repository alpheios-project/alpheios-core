import { generateBuildNumber } from 'packages/components/node_modules/alpheios-node-build/dist/build.mjs'
const process = require('process')
const { execFileSync, execSync } = require('child_process')
const branch = require('git-branch')
const { generate } = require('build-number-generator')
let branchName = branch.sync()
if (branchName === 'production') {
  branchName = ''
} else if (branchName === 'master') {
  branchName = 'dev.'
} else {
  branchName += '.'
}
const buildNumber = generate()
const firstTwoOfYear = new Date().getFullYear().toString(10).substring(0,2)
const build = `${branchName}${firstTwoOfYear}${buildNumber}`
console.info(`Starting a ${build} commit`)

generateBuildNumber()

let output
console.info('Rebuilding a components library. This may take a while')
try {
  output = execSync(`cd packages/components && node --experimental-modules ./node_modules/alpheios-node-build/dist/build.mjs -module=webpack -mode=all -preset=vue -confFile=config.mjs -libBuildNum='${build}'`)
} catch (error) {
  console.error('Build process failed:', error)
  process.exit(1)
}
console.info('Rebuilding of a components library has been completed')

console.info('Committing components/dist')
try {
  output = execFileSync('git', ['add', 'packages/components/dist'])
} catch (error) {
  console.log('Commit process failed:', error)
}
try {
  output = execFileSync('git', ['commit', '-m', `"Build ${build}"`])
} catch (error) {
  console.log('Commit process failed:', error)
}

console.info(`Tagging with ${build}`)
try {
  output = execSync(`git tag ${build}"`)
} catch (error) {
  console.log('Tag process failed:', error)
}
console.info(`Commit has been completed`)

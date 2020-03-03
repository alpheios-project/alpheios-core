import generateBuildNumber from './node_modules/alpheios-node-build/dist/support/build-number.mjs'
import { execFileSync, execSync } from 'child_process'

const build = generateBuildNumber()
console.info(`Starting a ${build} commit`)

let output
console.info('Rebuilding a components library. This may take a while')
try {
  output = execSync(`cd packages/components && node --experimental-modules ./node_modules/alpheios-node-build/dist/build.mjs --module=webpack --mode=all --preset=vue --externalConfig=config.mjs --libBuild=${build}`)
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

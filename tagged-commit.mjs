import pkg from './lerna.json'
import generateBuildNumber from './packages/components/node_modules/alpheios-node-build/dist/support/build-number.mjs'
import { execFileSync, execSync } from 'child_process'

const build = generateBuildNumber()
console.log(`Starting a ${build} commit`)

const version = `${pkg.version}-${build}`
console.log(`Setting a package version to ${version}`)
let output
try {
  const output = execSync(`npx lerna version ${version} --no-git-tag-version --no-push --yes`, { encoding: 'utf8' })
} catch (e) {
  console.error('Cannot execute npm version:', e)
  process.exit(1)
}

console.log('Rebuilding a components library. This may take a while')
try {
  output = execSync(`cd packages/components && node --experimental-modules ./node_modules/alpheios-node-build/dist/build.mjs --module=webpack --mode=all --preset=vue --externalConfig=config.mjs --buildNumber=${build}`, { encoding: 'utf8' })
} catch (error) {
  console.error('Build process failed:', error)
  process.exit(2)
}
console.log('Rebuilding of a components library has been completed')

console.log('Committing components/dist')
try {
  output = execFileSync('git', ['add', 'lerna.json', 'packages/*/package*.json', 'packages/components/dist'], { encoding: 'utf8' })
} catch (error) {
  console.error('Commit process failed:', error)
  process.exit(3)
}
try {
  output = execFileSync('git', ['commit', '-m', `Build ${build}`], { encoding: 'utf8' })
} catch (error) {
  console.error('Commit process failed:', error)
  process.exit(4)
}

console.log(`Tagging with ${build}`)
try {
  output = execSync(`git tag ${build}`, { encoding: 'utf8' })
} catch (error) {
  console.error('Tagging failed:', error)
  process.exit(5)
}
console.log(`Commit has been completed`)

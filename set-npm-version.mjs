import pkg from './package.json'
import { execSync } from 'child_process'

let tag
try {
  tag = execSync('git describe --tags', { encoding: 'utf8' })
  tag = tag.replace(/\r?\n|\r/g, '')
} catch (e) {
  console.error('Current git tag does not exist or cannot be obtained:', e)
  process.exit(1)
}

const version = `${pkg.version}-${tag}`
console.info(`Setting package version to ${version}`)
try {
  const output = execSync(`npm version ${version} --no-git-tag-version --force`, { encoding: 'utf8' })
  console.info('Done:', output)
} catch (e) {
  console.error('Cannot execute npm version:', e)
  process.exit(2)
}
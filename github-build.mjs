import pkg from './lerna.json'
import Builder from 'alpheios-node-build'
import generateBuildInfo from './node_modules/alpheios-node-build/dist/support/build-info.mjs'
import { execFileSync, execSync } from 'child_process'
import * as core from '@actions/core'

(async function() {
  const buildDT = Date.now()
  const buildInfo = generateBuildInfo(buildDT)
  console.log(`Starting build ${buildInfo.name}`)

  const baseVersion = pkg.version.split('-')[0]
  const version = `${baseVersion}-${buildInfo.name}`
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
    const builder = new Builder({
      module: 'webpack',
      mode: 'all',
      preset: 'vue',
      codeAnalysis: false,
      outputLevel: Builder.outputLevels.MIN,
      buildTime: buildDT
    })
    await builder.importConfig('config-github-build.mjs', 'packages/components/build')
    await builder.runModules()
  } catch (error) {
    console.error('Build process failed:', error)
    process.exit(2)
  }
  console.log('Rebuilding of a components library has been completed')
  try {
    console.info(core)
    core.default.setOutput('buildName',buildInfo.name)
  } catch (error) {
    console.error('Failed to set output variable:', error)
    process.exit(3)
  }
})()

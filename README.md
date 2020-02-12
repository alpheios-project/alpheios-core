# Alpheios Core
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/alpheios-project/alpheios-core.svg?branch=master)](https://travis-ci.org/alpheios-project/alpheios-core)
[![Coverage Status](https://coveralls.io/repos/github/alpheios-project/alpheios-core/badge.svg?branch=master)](https://coveralls.io/github/alpheios-project/alpheios-core?branch=master)


This monorepo contains packages of Alpheios Tools Core. It is managed by [Lerna](https://github.com/lerna/lerna).

The following packages are included:
* Data models
* Client adapters
* Resource client
* Wordlsts controller

## Directory structure

The root folder (`alpheios-core`) contains a root `package.json` and a Lerna configuration file (`lerna.json`). All packages that comprise Alpheios Core are in the `packages` subdirectory, each within its individual subfolder. Data models package is, for example, in `alpheios-core/packages/data-models`.
The root directory may also contain a `node_modules` folder for package dependencies that are hoisted.

## Operations with packages

Most operations with packages (including the ones made by npm) are executed from a root directory (`alpheios-core`) using Lerna or its companion tools. Operations can be performed over all packages at once or over individual packages. In the latter case a `--scope` Lerna filter shall be used: `npx lerna command --scope package-name` or `npx lerna command --scope '{package-name-one,package-name-two}`. Do not run npm commands from folders of individual packages, it may break things. Use [lerna run](https://github.com/lerna/lerna/tree/master/commands/run) (`npx lerna run npm-command`) for that. You can also use [lerna exec](https://github.com/lerna/lerna/tree/master/commands/exec) too.

Please note: the name of the package is the value of the `name` field in its `package.json`, not the name of the folder where this package is located.

## Installing dependencies
If necessary, run a `set-node-build-deps` npm script to install `node-build` dependencies first (please check an explanation below). Then use a `bootstrap` npm script in `package.json` within the root directory to install or update dependencies of all packages, including the root one, at once. It will use a `--hoist` option that, instead of installing dependencies into folders of individual packages, will install them into the `node_modules` folder of the root directory instead.

Alpheios Core uses a second version of the `node-build` tool. The second version does not install dependencies automatically, but rather lists as peer dependencies. Peer dependencies are not installed by npm. This means that `node-build` dependencies need to be injected into the root `package.json` of Alpheios Core. A `set-node-build-deps` script does just that: it installs `node-build` at the root, uses `install-peerdeps` npm package to inject dependencies, and then removes `node-build` from the root since it is not needed any more. Installation step is required because `node-build` is hosted on GitHub and `install-peerdeps`, not being able to work with GitHub-hosted packages at the moment, requires the package to be installed locally.

`node-build` dependencies do not need to be updated every time `bootstrap` runs: once added to `package.json`, dependencies will stay there. `bootstrap` will pick them up and install during its run. Only if it is known that dependencies of `node-build` are changed it is necessary to re-run `set-node-build-deps` so that the corresponding packages will be updated within `package.json`.

## Hoisting of dependencies
A `--hoist` option prevents the same dependency to be installed several times. The standard node.js resolution procedure makes it possible: if a dependency is not found in a `node_modules` subdirectory of the current folder it will go up the hierarchy trying to find a dependency there. As a result, it will go all the way up to the root directory (`alpheios-core`) where a dependency will finally be found in a `node_modules` folder.

`npx lerna bootstrap --hoist` does not create links to dependencies in individual packages. However, we need `build-node` to be installed into the `node-modules` directory of each individual package. This is how we refer to it from npm scripts section of `package.json` and it does not use the same dependency resolution mechanics as node.js do. Because of this we eliminate a `node-build` package from hoisting.

Please see [module resolution](https://github.com/lerna/lerna/blob/master/doc/hoist.md#module-resolution) for more details about how hoisting works.

## Adding dependencies
Use `npx lerna add package-dependency-to-add --dev --scope=package-to-which-dependency-to-be-added` command to add a new dependency to the package. If you want to add, for example, a `vue` dependency to `alpheios-client-adapters` then the following command will do it: `npx lerna add vue --dev --scope=alpheios-client-adapters`.

## Updating dependencies
If dependencies needs to be updated, one can use `list-mismatching-deps`, `fix-mismatching-deps`, `list-outdated-deps` (they will update `package.json` files of one ore several individual packages) or update `package.json` of an individual package manually. If to re-run a `bootstrap` script after that it will install or update missing dependencies. In case of any problems one can run a `clean` npm script before the `bootstrap`. `clean` will remove all `node_modules` folders making a way to the clean install.

## Working with dependencies
There are several script that help to manage dependencies:
* `list-mismatching-deps` will list all dependencies across different packages and highlight the ones that are listed as different versions in individual packages. It will, for example, highlight a webpack dependency if package A depends on version 4.0.1 of it and package B depends on version 4.1.5.
* `list-outdated-deps` will run `npm outdated` across all packages and will list packages that have outdated dependencies. If there is an outdated version found across one of the packages one might edit that `package.json` file manually to set the dependency to its latest version, run `fix-mismatching-deps` to update the same dependency across other packages to specify the same version and finally run `bootstrap` to install an updated dependency package.
* `fix-mismatching-deps`: if several packages depend on different versions of the same npm package this script will update `package.json` files with older dependencies so that all packages will depend on the the newwest version of the dependency list. For example, if package A depends on webpack v4.0.1 and packages B depends on webpack v4.1.5 then this command will updated both packages so that package A and package B will depend on webpack v4.1.5. This may be not the latest version of webpack available on npm but it will be the latest version specified across all individual packages. `fix-mismatching-deps` does not update dependencies themselves in `node_modules`; one has to run a `bootstrap` command to install an updated dependency version.


## Starting a new feature
When you are starting a new feature, create a feature branch for `alpheios-core` and do your development work in there as usual. After your work is completed, merge your changes to master.

## Run npm scripts
Please do not run scripts related to addition, installation, and upgrade of package dependencies from a package directory. Do it from a root directory (`alpheios-core`) using npm scripts of the root `package.json` or use Lerna's run command (`npx lerna run scipt-to-run`).

To run npm scripts for all packages use `npx lerna run script-name` from the top-level directory (i.e. `alpheios-core`). This will run `script-name` script for all packages that have this script in their `package.json`. See [lerna run documentation](https://github.com/lerna/lerna/tree/master/commands/run#readme) for more information on this command.

To run npm scripts of individual packages in situations other than add, install or update use `npx lerna run --scope package-name script-name` or go to the package directory (i.e. `alpheios-core/packages/package-name`) and run npm scripts from there: `npm run script-name`. Alternatively, you can use `npx lerna run --scope package-name script-name` to run a scoped script from a root directory.

## Setting a version number
Alpheios Core uses a versioning schema where all packages have the same version. Lerna commands provides an automation that allows to synchronize versions of all packages. The following npm scripts are available in the root directory for that:
* `version-set-major-dev` will update to the next major development version, e.g. `3.2.1-dev.3` -> `4.0.0-dev.0`.
* `version-set-minor-dev` will update to the next minor development version, e.g. `3.2.1-dev.3` -> `3.3.0-dev.0`.
* `version-set-patch-dev` will update to the next patch development version, e.g. `3.2.1-dev.3` -> `3.2.2-dev.0`.
* `version-increase-prerelease-dev` will increase a pre-release development version, e.g. `3.2.1-dev.3` -> `3.2.1-dev.4`. If the current version has no pre-release development modifier then this command will add one: `3.2.1` -> `3.2.1-dev.0`.
* `version-increase-prerelease-qa` will increase a pre-release QA version, e.g. `3.2.1-qa.1` -> `3.2.1-qa.2`. If the current version has no pre-release qa modifier then this command will add one: `3.2.1` -> `3.2.1-qa.0`, `3.2.1-dev.3` -> `3.2.1-qa.0`.
* `version-graduate` will set a production version out of whatever version is set currently, e.g. `3.2.1-qa.1` -> `3.2.1`.
These scripts will update version in `package.json` files of individual packages, make a commit this change, and tag it with a versioning tag. It will not push the commit, it has to be done manually.
 
 Please note that for Lerna to set a version number requires all changes to be fully committed. It will fail to work if there are any uncommitted changes in the `alpheios-core` directory.
 
 ## Claiming an individual package as a dependency (using webpack)
 To use an individual package as a dependency:
 * Set `alpheios-core` as a dependency in `package.json`.
 * Install `alpheios-core`.
 * Set a webpack alias that will point to an individual package within `alpheios-core`. So if, for example, a package depends on `alpheios-client-adapters` a webpack alias must point to an `alpheios-client-adaptes` package within `alpheios-core`: `alias: { 'alpheios-client-adapters': path.join(projectRoot, 'node_modules/alpheios-core/packages/client-adapters/dist/alpheios-client-adapters.js') }`.
 * Import items from Client Adapters: `import { something } from 'alpehios-client-adapters'`.
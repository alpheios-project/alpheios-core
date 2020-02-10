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

### Installing dependencies
Use a `bootstrap` npm script in `package.json` of the root directory to install or update dependencies of all packages at once. It will use a `--hoist` option that will, instead of installing dependencies into folders of individual packages, will install them instead into the `node_modules` folder of the root directory.

### Hoisting of dependencies
A `--hoist` option prevents the same dependency to be installed several times. The standard node.js resolution procedure makes it possible: if a dependency is not found in a `node_modules` subdirectory of the current folder it will go up the hierarchy trying to find a dependency there. As a result, it will go all the way up to the root directory (`alpheios-core`) where a dependency will finally be found in a `node_modules` folder.

`npx lerna bootstrap --hoist` does not create links to dependencies in individual packages. However, we need `build-node` to be installed into the `node-modules` directory of each individual package. This is how we refer to it from npm scripts section of `package.json` and it does not use the same dependency resolution mechanics as node.js do. Because of this we eliminate a `node-build` package from hoisting.

Please see [module resolution](https://github.com/lerna/lerna/blob/master/doc/hoist.md#module-resolution) for more details about how hoisting works.

### Adding dependencies
Use `npx lerna add package-dependency-to-add --dev --scope=package-to-which-dependency-to-be-added` command to add a new dependency to the package. If you want to add, for example, a `vue` dependency to `alpheios-client-adapters` then the following command will do it: `npx lerna add vue --dev --scope=alpheios-client-adapters`.

### Updating dependencies
If dependencies needs to be updated, one can use `list-mismatching-deps`, `fix-mismatching-deps`, `list-outdated-deps` (they will update `package.json` files of one ore several individual packages) or update `package.json` of an individual package manually. If to re-run a `bootstrap` script after that it will install or update missing dependencies. In case of any problems one can run a `clean` npm script before the `bootstrap`. `clean` will remove all `node_modules` folders making a way to the clean install.

### Starting a new feature
When you are starting a new feature, create a feature branch for `alpheios-core` and do your development work in there as usual. After your work is completed, merge your changes to master.

### Run npm scripts
Please do not run scripts related to addition, installation, and upgrade of package dependencies from a package directory. Do it from a root directory (`alpheios-core`) using npm scripts of the root `package.json` or use Lerna's run command (`npx lerna run scipt-to-run`).

To run npm scripts for all packages use `npx lerna run script-name` from the top-level directory (i.e. `alpheios-core`). This will run `script-name` script for all packages that have this script in their `package.json`. See [lerna run documentation](https://github.com/lerna/lerna/tree/master/commands/run#readme) for more information on this command.

To run npm scripts of individual packages in situations other than add, install or update use `npx lerna run --scope package-name script-name` or go to the package directory (i.e. `alpheios-core/packages/package-name`) and run npm scripts from there: `npm run script-name`. Alternatively, you can use `npx lerna run --scope package-name script-name` to run a scoped script from a root directory.

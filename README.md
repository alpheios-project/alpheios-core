# Alpheios Core
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/alpheios-project/alpheios-core.svg?branch=master)](https://travis-ci.org/alpheios-project/alpheios-core)
[![Coverage Status](https://coveralls.io/repos/github/alpheios-project/alpheios-core/badge.svg?branch=master)](https://coveralls.io/github/alpheios-project/alpheios-core?branch=master)


This monorepo contains packages of Alpheios Tools Core. It is managed by [Npm Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces).

The following packages are included:
* components
* data-models
* client-adapters
* res-client
* wordlists
* inflection-tables
* fixtures
* messaging
* language-detect
* l10n

## Directory structure

The root folder (`alpheios-core`) contains a root `package.json`. All packages that comprise Alpheios Core are in the `packages` subdirectory, each within its individual subfolder. Data models package is, for example, in `alpheios-core/packages/data-models`.
The root directory may also contain a `node_modules` folder for package dependencies that are hoisted.

## Operations with packages

Most operations with packages (including the ones made by npm) are executed from a root directory (`alpheios-core`) using npm workspaces commands. Operations can be performed over all packages at once or over individual packages.

Please note: the name of the package is the value of the `name` field in its `package.json`, not the name of the folder where this package is located.

## Installing dependencies

## Hoisting of dependencies

## Adding dependencies

## Updating dependencies

## Working with dependencies

## Installing local packages temporarily

## Developing Code

### Using Conventional Commits

## Claiming an individual package as a dependency

## Building for development

Run `npm run build`

This will inject an automatic build number generated from the branch name and date.

Commit built files to the development branch.

## Building for QA

## Versioning and Building for Production

TBD
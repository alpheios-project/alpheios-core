# alpheios-core

This is a monorepo that contains packages of Alpheios Tools Core. It uses [Lerna](https://github.com/lerna/lerna) to manage the repository.

It contains the following packages:
* Client adapters

## HOWTOs

### Install dependencies after initial checkout
`npx lerna bootstrap --hoist` will install dependencies of all packages at the top-level (i.e. into `alpheios-core/node_modules`). This is a recommended way to install dependencies as it will allow to avoid installing the same dependency multiple times. All packages in `alpheios-core` are configured to work with dependencies installed like that.

Please see [lerna bootstrap documentation](https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme) for more information on that command.

### Develop a new feature
Create a feature branch and do your development work in there as with regular packages. After your work is completed, merge changes to master.

### Run npm scripts
To run npm scripts for any individual package, go to that package directory (i.e. `alpheios-core/packages/package-name`) and run script using npm run-script: `npm run script-name`. Alternatively, you can use `npx lerna run --scope package-name script-name`.

To run npm scripts for all packages use `npx lerna run script-name` from the top-level directory (i.e. `alpheios-core`). This will run `script-name` script for all packages that have this script in their `package.json`. See [lerna run documentation](https://github.com/lerna/lerna/tree/master/commands/run#readme) for more information on this command.

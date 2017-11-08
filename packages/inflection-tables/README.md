# Inflection Tables
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

### Prerequisites

* Node >= 7

### Install Dependencies

```
npm install
```

### Build

```
npm run build
```

### Test

```
npm run test
```


## Release Notes
At the current stage inflection tables are displayed on index.html page. Please view this page via any local or remote web server. Because it uses ES6 modules, it is viewable in Google Chrome 60 only so far. Even though it may require to enable an `Experimental Web Platform` flag. For this type `chrome://flags` in the browser address bar to access the flags. For more details on ES6 module support in Google Chrome please check [https://medium.com/dev-channel/es6-modules-in-chrome-canary-m60-ba588dfb8ab7](https://medium.com/dev-channel/es6-modules-in-chrome-canary-m60-ba588dfb8ab7).

## Architecture
Application consists of the following modules:

### Morphological Analyzer Adapters
Located in `/analyzer/` directory. Responsible for converting morphological analyzer's output in its specific format into a library-standard Homonym object.

### Inflection Library
Based on data from Homonym object, it finds matching suffixes. Inflection library produces a ResultSet, an object, that contains matched endings and some other related data, such as footnotes. Inflection Library code is located in the `/lib/` directory.

### Presenter
Presenter is responsible for displaying data that is returned by an Inflection Library. It can display data in different ways using different view modules. All Presenter files are located in a `/presenter/` directory.

[More details about views](presenter/views/VIEWS.md)

### Controller
This is a `controller.js` file located in the root directory. It controls application modules and data flows between them.

### Other Directories
#### dist
`/dist/` directory contain transpiled files prepared for distribution. It does not have anything useful yet.


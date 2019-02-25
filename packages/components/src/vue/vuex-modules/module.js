import HTMLPage from '@/lib/utility/html-page.js'

/**
 * A base class for all data and UI modules. Its role is to define common features that are shared
 * across instances of al module types.
 */
export default class Module {
  /**
   * @param {Object} store - A Vuex store.
   * @param {Object} api - A public API object.
   * @param {Object} config - A module's configuration object
   */
  constructor (store, api, config = {}) {
    this.config = Object.assign(this.constructor._configDefaults, config)
  }

  static get moduleName () {
    return this._configDefaults._moduleName
  }

  static get moduleType () {
    return this._configDefaults._moduleType
  }

  static get isDataModule () {
    return this._configDefaults._moduleType === Module.types.DATA
  }

  static get isUiModule () {
    return this._configDefaults._moduleType === Module.types.UI
  }

  /**
   * Checks whether a specified platform is supported by the module.
   * @param {HTMLPage.platforms} platform - A name of a platforms.
   * @return {boolean} True if platform is supported, false otherwise.
   */
  static isSupportedPlatform (platform) {
    if (this._configDefaults._supportedPlatforms.includes(HTMLPage.platforms.ANY)) {
      return true
    } else if (this._configDefaults._supportedPlatforms.includes(platform)) {
      return true
    }
    return false
  }
}

/**
 * Specifies a generic API of a function that returns a module's Vuex store object
 * that will be integrated into a global Vuex store of a UI controller.
 */
Module.store = (moduleInstance) => {
  return {
    // Should return a Vuex store module object (if module provides any store module)
  }
}

/**
 * Specifies a generic API of a function that returns a module's public API object
 * that will be integrated into a global Vuex store of a UI controller.
 * An API object groups all publicly available methods of a module.
 * They will be exposed to UI components by the UI controller.
 * In order to use methods of a module, a UI component must inject them with `inject['moduleName']`.
 * Methods of a module will be available within a UI component after injection as
 * `this.moduleName.methodName`.
 *
 * Because some methods may need access to the module itself and Vuex store instance, `api` is a function
 * that takes `store` as an argument and returns an object that contains API methods.
 * @param {Module} moduleInstance - An instance of a module object.
 * @param {Vuex} store - an instance of a Vuex store that API methods may need to operate upon.
 * @return {Object} An object containing public methods of a module.
 */
Module.api = (moduleInstance, store) => {
  return {
    // Should return a list of functions from the module's public API (of module provides a public API)
  }
}

Module.types = {
  DATA: 'data',
  UI: 'ui'
}

Module._configDefaults = {
  /**
   * A name by which a store of the module will be visible inside a UI controller's Vuex store,
   * It is also used as a prefix for any global function a module may install on Vue instances.
   * Dynamic module names are not supported
   * @type {string}
   */
  _moduleName: `A name ame must be defined by a child module`,
  _moduleType: Module.types.DATA,

  /**
   * A list of platforms supported by a module according to HTMLPage.platforms list.
   */
  _supportedPlatforms: [HTMLPage.platforms.ANY]
}

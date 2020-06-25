import { Logger } from 'alpheios-data-models'

/**
 * A UI controller class is responsible for coordination between all UI components,
 * such as Panel, Popup, Action Panel, and so on.
 * A UI controller is a part of a higher-level app controller.
 */
export default class UIController {
  constructor ({ platform, queryParams = {} } = {}) {
    if (!platform) {
      throw new Error('No platform data provided for a UI controller')
    }

    /**
     * An object with information about an app environment.
     *
     * @type {Platform}
     */
    this._platform = platform

    /**
     * An object with parsed query parameters (if any).
     *
     * @type {QueryParams}
     */
    this._queryParams = queryParams

    /**
     * A map that holds instances of UI _modules of an application.
     *
     * @type {Map<string, Module>}
     */
    this._modules = new Map()

    /**
     * Holds a shard app-wide API object
     *
     * @type {object}
     * @private
     */
    this._api = {}

    // A shared Vuex store object
    this._store = null
  }

  init ({ api, store, uiOptions } = {}) {
    if (!api) {
      throw new Error('API object is required for a UI controller initialization')
    }
    if (!store) {
      throw new Error('Vuex store is required for a UI controller initialization')
    }
    if (!uiOptions) {
      throw new Error('UI options are required for a UI controller initialization')
    }

    this._api = api
    this._store = store
    this.uiOptions = uiOptions

    // Set options of _modules before _modules are created
    if (this.hasModule('popup')) {
      let popupOptions = this._modules.get('popup').options // eslint-disable-line prefer-const
      popupOptions.initialShift = {
        x: this.uiOptions.items.popupShiftX.currentValue,
        y: this.uiOptions.items.popupShiftY.currentValue
      }
    }

    if (this.hasModule('toolbar')) {
      let toolbarOptions = this._modules.get('toolbar').options // eslint-disable-line prefer-const
      toolbarOptions.initialShift = {
        x: this.uiOptions.items.toolbarShiftX.currentValue,
        y: this.uiOptions.items.toolbarShiftY.currentValue
      }
    }

    this.createModules()

    // Adjust configuration of _modules according to feature options
    if (this.hasModule('panel')) {
      this.store.commit('panel/setPosition', this.uiOptions.items.panelPosition.currentValue)
    }
  }

  activate () {
    this.activateModules()
  }

  deactivate () {
    this.deactivateModules()
  }

  /**
   * Registers a module for use by an app controller and other _modules.
   * It instantiates each module and adds them to the registered _modules store.
   *
   * @param {Module} moduleClass - A data module's class (i.e. the constructor function).
   * @param {object} options - Arbitrary number of values that will be passed to the module constructor.
   * @returns {UIController} - A self reference for chaining.
   */
  registerModule (moduleClass, options = {}) {
    if (moduleClass.isSupportedPlatform(this._platform)) {
      // Add query parameters and platform info to module's options
      options.queryParams = this._queryParams
      options.platform = this._platform
      this._modules.set(moduleClass.moduleName, { ModuleClass: moduleClass, options, instance: null })
    } else {
      Logger.getInstance().warn(`Skipping registration of a ${moduleClass.moduleName} UI module because it does not support a ${this._platform.deviceType} type of devices`)
    }
    return this
  }

  createModules () {
    this._modules.forEach((m) => {
      m.instance = new m.ModuleClass(this._store, this._api, m.options)
    })
  }

  hasModule (moduleName) {
    return this._modules.has(moduleName)
  }

  getModule (moduleName) {
    if (this.hasModule(moduleName)) {
      return this._modules.get(moduleName).instance
    } else {
      throw new Error(`UI controller has no ${moduleName} module`)
    }
  }

  activateModules () {
    this._modules.forEach(m => m.instance.activate())
  }

  deactivateModules () {
    this._modules.forEach(m => m.instance.deactivate())
  }
}

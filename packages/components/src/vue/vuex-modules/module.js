/**
 * A base class for all data and UI modules. Its role is to define common features that are shared
 * across instances of al module types.
 */
export default class Module {
  constructor () {
    /**
     * A module's Vuex store object that will be integrated into global Vuex store of a UI controller.
     * @type {Object}
     */
    this.store = {}
  }

  get publicName () {
    return this.constructor.publicName || `Module's name is not defined`
  }
}

/**
 * A name by which a store of the module will be visible inside a UI controller's Vuex store,
 * It is also used as a prefix for any global function a module may install on Vue instances.
 * @type {string}
 */
Module.publicName = `Module's name must be defined in a child`

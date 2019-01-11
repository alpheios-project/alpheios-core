/**
 * A base class for all data and UI modules. Its role is to define common features that are shared
 * across instances of al module types.
 */
export default class Module {
  constructor (name) {
    /**
     * A name with which a store of the module will be visible inside a UI controller's Vuex store,
     * It is also used as a prefix for any global function a module may install on Vue instances.
     * @type {string}
     */
    this.name = name

    /**
     * A module's Vuex store object that will be integrated into global Vuex store of a UI controller.
     * @type {Object}
     */
    this.store = {}
  }
}

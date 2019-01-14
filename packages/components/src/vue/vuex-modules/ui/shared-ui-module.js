import Module from '@/vue/vuex-modules/module.js'

export default class SharedUIModule extends Module {
  constructor () {
    super('sharedUI')

    this.store = {
      // All stores of modules are namespaced
      namespaced: true,

      state: {
      },
      getters: {
        // For arrow functions `this` will point to the class instance, not to the store
      },
      mutations: {
        // For arrow functions `this` will point to the class instance, not to the store
      }
    }

    /**
     * An API object groups all publicly available methods of a module.
     * They will be exposed to UI components by the UI controller.
     * In order to use methods of a module, a UI component must inject them with `inject['moduleName']`.
     * Methods of a module will be available within a UI component after injection as
     * `this.moduleName.methodName`
     *
     * Because some methods may need access to the Vuex store instance, `api` is a function
     * that takes `store` as an argument and returns an object that contains API methods.
     * For arrow functions `this` will be bound to the module's instance,
     * for regular functions - to the object that is returned by the `api` function.
     * @param {Vuex} store - an instance of a Vuex store that API methods may need to operate upon.
     * @return {Object} An object containing public methods of a module.
     */
    this.api = (store) => {
      return {

      }
    }
  }
}

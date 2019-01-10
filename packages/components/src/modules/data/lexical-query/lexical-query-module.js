import Module from '@/modules/module.js'
// import LexicalQuery from '@/lib/queries/lexical-query.js'
export default class LexicalQueryModule extends Module {
  constructor () {
    super('lexQuery')

    this.store = {
      // All stores of modules are namespaced
      namespaced: true,

      state: {
        inProgress: false
      },
      getters: {
        // For arrow functions `this` will point to the class instance, not to the store
        isInProgress: (state) => {
          return state.inProgress
        }
      },
      mutations: {
        // For arrow functions `this` will point to the class instance, not to the store
        startQuery: (state) => {
          state.inProgress = true
        }
      }
    }
  }
}

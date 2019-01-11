import Module from '@/vue/vuex-modules/module.js'
import L10n from '@/lib/l10n/l10n.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

export default class L10nModule extends Module {
  constructor () {
    super('l10n')
    this.l10n = new L10n()
      .addMessages(enUS, Locales.en_US)
      .addMessages(enGB, Locales.en_GB)
      .setLocale(Locales.en_US)

    this.store = {
      // All stores of modules are namespaced
      namespaced: true,

      state: {
        selectedLocale: this.l10n.selectedLocale
      },
      getters: {
        // For arrow functions `this` will point to the class instance, not to the store
        getMessage: () => (messageID) => {
          return this.l10n.bundle.get(messageID)
        }
      },
      mutations: {
        // For arrow functions `this` will point to the class instance, not to the store
        setLocale: (state, newLocale) => {
          this.l10n.setLocale(newLocale)
          state.selectedLocale = this.l10n.selectedLocale
        }
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
        /**
         * Returns a current locale of L10n.
         * @return {string} - A current locale
         */
        getLocale: () => {
          return this.store.state.selectedLocale
        },

        /**
         * Sets locale of L10n to a new value.
         * @param newLocale
         */
        setLocale: function (newLocale) {
          if (store.state.l10n.selectedLocale !== newLocale) {
            return store.commit('l10n/setLocale', newLocale)
          }
        },

        /**
         * Returns a translated string for its message ID given.
         * @param {string} messageID - A message ID of a string to retrieve.
         * @return {string} - A formatted translated text of a string.
         */
        getMessage: (messageID) => {
          return this.l10n.bundle.get(messageID)
        }
      }
    }
  }
}

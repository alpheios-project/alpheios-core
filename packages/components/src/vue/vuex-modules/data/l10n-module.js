import Module from '@/vue/vuex-modules/module.js'
import L10n from '@/lib/l10n/l10n.js'
import Locales from '@/locales/locales.js'

export default class L10nModule extends Module {
  constructor (defaultLocale = Locales.en_US, messageBundles = []) {
    super()
    this._l10n = new L10n()
    messageBundles.forEach(mb => this._l10n.addMessageBundle(mb))
    this._l10n.setLocale(defaultLocale)

    this.store = {
      // All stores of modules are namespaced
      namespaced: true,

      state: {
        selectedLocale: this._l10n.selectedLocale
      },
      mutations: {
        // For arrow functions `this` will point to the class instance, not to the store
        setLocale: (state, newLocale) => {
          this._l10n.setLocale(newLocale)
          state.selectedLocale = this._l10n.selectedLocale
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
         * Checks if message is in translated messages list.
         * @param messageID
         * @return {boolean}
         */
        hasMsg: (messageID) => {
          return this._l10n.bundle.hasMsg(messageID)
        },

        /**
         * Returns a translated message for a message ID given.
         * If not translation found, returns an error message.
         * @param {string} messageID - A message ID of a string to retrieve.
         * @param formatOptions
         * @param options
         * @return {string} - A formatted translated text of a string.
         */
        getMsg: (messageID, formatOptions, options) => {
          return this._l10n.bundle.getMsg(messageID, formatOptions, options)
        },

        /**
         * Returns a translated message for a message ID given.
         * If not translation found, returns a message ID string.
         * @param {string} messageID - A message ID of a string to retrieve.
         * @param formatOptions
         * @param options
         * @return {string} - A formatted translated text of a string.
         */
        getText: (messageID, formatOptions, options) => {
          return this._l10n.bundle.getText(messageID, formatOptions, options)
        },

        /**
         * Returns a translated version of an abbreviated message.
         * @param messageID
         * @param formatOptions
         * @return {string}
         */
        getAbbr: (messageID, formatOptions) => {
          return this._l10n.bundle.getAbbr(messageID, formatOptions)
        }
      }
    }
  }
}

L10nModule.publicName = 'l10n'

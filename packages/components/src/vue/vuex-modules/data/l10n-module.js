import Module from '@/vue/vuex-modules/module.js'
import L10n from '@/lib/l10n/l10n.js'
import Locales from '@/locales/locales.js'
import Platform from '@/lib/utility/platform.js'

export default class L10nModule extends Module {
  // defaultLocale = Locales.en_US, messageBundles = []

  /**
   * @param {Object} store - A Vuex store.
   * @param {Object} api - A public API object.
   * @param {Object} config - A module's configuration object:
   *        {string} defaultLocale - A default locale's code.
   */
  constructor (store, api, config) {
    super(store, api, config)
    this._l10n = new L10n()
    this.config.messageBundles.forEach(mb => this._l10n.addMessageBundle(mb))
    this._l10n.setLocale(this.config.defaultLocale)
    store.registerModule(this.constructor.moduleName, this.constructor.store(this))
    api[this.constructor.moduleName] = this.constructor.api(this, store)
  }
}

L10nModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      selectedLocale: moduleInstance._l10n.selectedLocale
    },
    mutations: {
      // For arrow functions `this` will point to the class instance, not to the store
      setLocale: (state, newLocale) => {
        moduleInstance._l10n.setLocale(newLocale)
        state.selectedLocale = moduleInstance._l10n.selectedLocale
      }
    }
  }
}

L10nModule.api = (moduleInstance, store) => {
  return {
    /**
     * Returns a current locale of L10n.
     * @return {string} - A current locale
     */
    getLocale: () => {
      return store.state.l10n.selectedLocale
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
      return moduleInstance._l10n.bundle.hasMsg(messageID)
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
      return moduleInstance._l10n.bundle.getMsg(messageID, formatOptions, options)
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
      return moduleInstance._l10n.bundle.getText(messageID, formatOptions, options)
    },

    /**
     * Returns a translated version of an abbreviated message.
     * @param messageID
     * @param formatOptions
     * @return {string}
     */
    getAbbr: (messageID, formatOptions) => {
      return moduleInstance._l10n.bundle.getAbbr(messageID, formatOptions)
    }
  }
}

L10nModule._configDefaults = {
  _moduleName: 'l10n',
  _moduleType: Module.types.DATA,
  _supportedDeviceTypes: [Platform.deviceTypes.ANY],
  defaultLocale: Locales.en_US,
  messageBundles: []
}

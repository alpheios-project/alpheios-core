import Module from '@/modules/module.js'

import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
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

    this.name = 'l10n'

    this.store = {
      // All stores of modules are namespaced
      namespaced: true,

      state: {
        selectedLocale: this.l10n.selectedLocale
      },
      getters: {
        // For arrow functions `this` will point to the class instance, not to the store
        getLocale: (state) => () => {
          return state.selectedLocale
        },

        getMessage: () => (messageID) => {
          return this.l10n.bundle.get(messageID)
        }
      },
      mutations: {
        // For arrow functions `this` will point to the class instance, not to the store
        setLocale: (state, newLocale) => {
          this.l10n.setLocale(newLocale)
          state.selectedLocale = this.l10n.selectedLocale
          state.messages = this.l10n.messages
        }
      }
    }

    /**
     * This is required to install methods listed in the `install()` globally.
     * If module registers no global methods, this step is not required.
     */
    Vue.use(L10nModule)
  }
}

/**
 * Because all modules are namespaced, their getters are accessed as:
 *    this.$store.getters[moduleName/getterName]()
 * This can be tedious.
 * To avoid this, we can either wrap them by computed props or methods
 * of a component that uses them (if those getters will not be used by every component)
 * or they can be installed globally via a Vue plugin (if those getters are expected to be used
 * in every component, such as getters for string translation)
 *
 * `install()` function contains a list of functions that will be installed globally.
 * By Vue.js convention, their names start with a dollar sign.
 * We also prepend their names with a module name to avoid name collisions.
 * Globally installed functions can be called from any Vue component as:
 *     this.$moduleMethodName(params) (e.g. this.$l10nMsg(messageID))
 *
 * A set of functions within `install()` defines a public API of a module.
 * @param Vue
 * @param options
 */
L10nModule.install = function (Vue, options) {
  /**
   * Returns a translated string for its message ID given.
   * @param {string} messageID - A message ID of a string to retrieve.
   * @return {string} - A formatted translated text of a string.
   */
  Vue.prototype.$l10nMsg = function (messageID) {
    return this.$store.getters['l10n/getMessage'](messageID)
  }

  /**
   * Returns a current locale of L10n.
   * @return {string} - A current locale
   */
  Vue.prototype.$l10nGetLocale = function () {
    return this.$store.getters['l10n/getLocale']()
  }

  /**
   * Sets locale of L10n to a new value.
   * @param newLocale
   */
  Vue.prototype.$l10nSetLocale = function (newLocale) {
    if (this.$store.state.selectedLocale !== newLocale) {
      return this.$store.commit('l10n/setLocale', newLocale)
    }
  }
}

import Module from '@/modules/module.js'
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
  }
}

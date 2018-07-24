import MessageBundle from './message-bundle.js'
import enUS from './locale/en-us.json'
import enGB from './locale/en-gb.json'

const messages = new Map([
  ['en-US', enUS],
  ['en-GB', enGB]
])

let messageBundles = new Map()

/**
 * Combines several message bundle for different locales.
 */
export default class L10n {
  /**
   * Creates an object. If an array of message bundle data is provided, initializes an object with this data.
   * @param {MessageBundle[]} messageData - An array of message bundles to be stored within.
   * @returns {L10n} Returns a reference to self for chaining.
   */
  constructor (messageData) {
    this._locales = {}
    this._localeList = []

    if (messageData) {
      this.addLocaleData(messageData)
    }
    return this
  }

  static get defaultLocale () {
    return 'en-US'
  }

  static get locales () {
    return Array.from(messages.keys())
  }

  static getMessages (locale = this.defaultLocale) {
    if (messageBundles.has(locale)) {
      return messageBundles.get(locale)
    }
    if (!messages.has(locale)) {
      console.warn(`Messages for "{locale}" are not found, returning a default "${this.defaultLocale}" instead`)
      locale = this.defaultLocale
    }
    let messageBundle = new MessageBundle(locale, messages.get(locale))
    messageBundles.set(locale, messageBundle)
    return messageBundle
  }

  /**
   * Adds one or several message bundles.
   * This function is chainable.
   * @param {MessageBundle[]} messageData - An array of message bundles to be stored within.
   * @return {L10n} - Returns self for chaining.
   */
  addLocaleData (messageData) {
    for (let messageBundle of messageData) {
      this._localeList.push(messageBundle.locale)
      this._locales[messageBundle.locale] = messageBundle
    }
    return this
  }

  /**
   * Returns a message bundle for a locale.
   * @param {string} locale - A locale code for a message bundle. IETF language tag format is recommended.
   * @returns {MessageBundle} A message bundle for a locale.
   */
  messages (locale) {
    if (!this._locales[locale]) {
      throw new Error('Locale "' + locale + '" is not found.')
    }
    return this._locales[locale]
  }

  /**
   * Returns a list of available locale codes.
   * @returns {string[]} Array of local codes.
   */
  get locales () {
    return this._localeList
  }
}

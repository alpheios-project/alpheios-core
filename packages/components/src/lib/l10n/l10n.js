import MessageBundle from './message-bundle'

/**
 * Combines several message bundles of different locales.
 */
export default class L10n {
  constructor () {
    this.selectedLocale = undefined // A locale that currently selected
    this.bundles = new Map() // Maps message bundles to their locales
    return this
  }

  /**
   * Adds, or appends, one or several messages for a locale specified.
   * This method is chainable.
   * @param {string} messageJSON - Messages in a JSON string
   * @param {string} locale - A locale of the messages
   * @param {Function} missingTranslationMsgFn - A placeholder message that will be shown if translation is not found.
   * @return {L10n} - Self reference (for chaining)
   */
  addMessages (messageJSON, locale, missingTranslationMsgFn) {
    let messageBundle
    if (this.bundles.has(locale)) {
      messageBundle = this.bundles.get(locale)
      messageBundle.appendFromJSON(messageJSON)
    } else {
      messageBundle = new MessageBundle(messageJSON, locale, missingTranslationMsgFn)
      this.addMessageBundle(messageBundle)
      if (!this.selectedLocale) {
        // If locale is not defined, set it to the value of the current (and the only one) message bundle
        this.setLocale(locale)
      }
    }
    return this
  }

  /**
   * Adds a message bundle to a L10n object. If selected locale is not set, sets it to the locale of the message bundle.
   * This function is chainable.
   * @param {MessageBundle} messageBundle - A message bundle that will be stored within an L10n object.
   * @return {L10n} - Returns self for chaining.
   */
  addMessageBundle (messageBundle) {
    const locale = messageBundle.locale
    if (this.bundles.has(locale)) {
      this.bundles.get(locale).appendFromBundle(messageBundle)
    } else {
      this.bundles.set(messageBundle.locale, messageBundle)
      if (!this.selectedLocale) {
        // If locale is not defined, set it to the value of the current (and the only one) message bundle
        this.setLocale(messageBundle.locale)
      }
    }
    return this
  }

  /**
   * Returns an array of locales supported by the L10n object.
   * @return {string[]}
   */
  get locales () {
    return Array.from(this.bundles.keys())
  }

  /**
   * Returns a message bundle for a currently selected locale
   * @return {MessageBundle | undefined} A message bundle object or undefined if selectedLocale is not set
   */
  get bundle () {
    return this.bundles.get(this.selectedLocale)
  }

  /**
   * Returns a message from a bundle for a current locale.
   * A wrapper for {@link MessageBundle#getMsg}
   */
  getMsg (...params) {
    return this.bundles.has(this.selectedLocale) ? this.bundles.get(this.selectedLocale).getMsg(...params) : {}
  }

  /**
   * Sets, or switches a locale that is currently selected. If message bundle for such locale
   * does not exist, does nothing.
   * This method is chainable.
   * @param {string} locale - A locale to be set as currently selected.
   * @return {L10n} Reference to self for chaining
   */
  setLocale (locale) {
    if (this.bundles.has(locale)) {
      this.selectedLocale = locale
    }
    return this
  }
}

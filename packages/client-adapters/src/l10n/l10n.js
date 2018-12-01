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
   * @return {L10n} - Self reference (for chaining)
   */
  addMessages (messageJSON, locale) {
    let messageBundle
    if (this.bundles.has(locale)) {
      messageBundle = this.bundles.get(locale)
      messageBundle.appendFromJSON(messageJSON)
    } else {
      messageBundle = new MessageBundle(messageJSON, locale)
      this.addMessageBundle(messageBundle)
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
    this.bundles.set(messageBundle.locale, messageBundle)
    if (!this.selectedLocale) {
      this.setLocale(messageBundle.locale)
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
   *
   * @return {Object} - An object containing message objects as property values.
   * The name of the property is a message key.
   */
  get messages () {
    return this.bundles.has(this.selectedLocale) ? this.bundles.get(this.selectedLocale).messages : {}
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
    } else {
      console.error(`Cannot set locale to "${locale}" because there is no message bundle for it`)
    }
    return this
  }
}

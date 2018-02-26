import MessageBundle from './message-bundle'

/**
 * Combines several message bundles for different locales.
 */
export default class L10n {
  constructor () {
    this.locales = []
    this.bundles = new Map()
    this.messages = {}
    return this
  }

  addMessages (messageJSON, locale) {
    let messageBundle = new MessageBundle(messageJSON, locale)
    this.addMessageBundle(messageBundle)
    return this
  }

  /**
   * Adds one or several message bundles.
   * This function is chainable.
   * @param {MessageBundle} messageBundle - A message bundle that will be stored within an L10n object.
   * @return {L10n} - Returns self for chaining.
   */
  addMessageBundle (messageBundle) {
    this.locales.push(messageBundle.locale)
    this.bundles.set(messageBundle.locale, messageBundle)
    return this
  }

  setLocale (locale) {
    this.locale = locale
    const bundle = this.bundles.get(this.locale)
    this.messages = bundle.messages
    return this
  }
}

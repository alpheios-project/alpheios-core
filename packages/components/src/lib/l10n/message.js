import IntlMessageFormat from 'intl-messageformat'

/**
 * Represents a single message object
 */
export default class Message {
  /**
   * Creates a new Message object.
   * @param {object} message - A message object as read from JSON file.
   * @param {string} message.name - A message string.
   * @param {string[]} [message.params] - A list of message parameters (optional).
   * @param {string} [message.abbr] - Message abbreviation (optional).
   * @param {string} locale - A message's locale.
   */
  constructor (message, locale) {
    if (!locale) {
      throw new Error('Locale data is missing')
    }
    if (!message) {
      throw new Error('Message data is missing')
    }

    this.message = `Message text is not defined in translation data` // Message format string or text
    this.params = [] // Message parameters

    this.locale = locale
    for (const key of Object.keys(message)) {
      this[key] = message[key]
    }

    this.formatFunc = new IntlMessageFormat(this.message, this.locale)
    this.abbrFunc = new IntlMessageFormat(this.abbr || this.message, this.locale)
  }

  /**
   * Whether this message has any parameters or not.
   * @return {boolean} True if message has any parameters, false otherwise.
   */
  get hasParameters () {
    return Boolean(this.params.length > 0)
  }

  /**
   * Returns a formatted version of a message (if message has parameters) or
   * a message text (if parameters do not exist for a message).
   * @param {object} formatOptions - Options that can be used for message formatting in the following format:
   * {
   *     paramOneName: paramOneValue,
   *     paramTwoName: paramTwoValue
   * }.
   * @return {string} A formatted message text
   */
  getMsg (formatOptions) {
    return !this.hasParameters ? this.message : this.formatFunc.format(formatOptions)
  }

  /**
   * Returns an abbreviated version of a message (if defined) or a message itself otherwise.
   * @param {object} formatOptions - Options that can be used for message formatting in the following format:
   * {
   *     paramOneName: paramOneValue,
   *     paramTwoName: paramTwoValue
   * }.
   * @return {string} Abbreviated or full message text.
   */
  getAbbr (formatOptions) {
    return !this.hasParameters ? this.abbrFunc.format() : this.abbrFunc.format(formatOptions)
  }
}

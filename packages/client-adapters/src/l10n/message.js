import IntlMessageFormat from 'intl-messageformat'

/**
 * Represents a single message object
 */
export default class Message {
  /**
   * Creates a new Message object.
   * @param {object} message - A message object as read from JSON file.
   * @param {string} locale - A message's locale.
   */
  constructor (message, locale) {
    if (!locale) {
      throw new Error('Locale data is missing')
    }
    if (!message) {
      throw new Error('Message data is missing')
    }

    this.locale = locale
    for (const key of Object.keys(message)) {
      this[key] = message[key]
    }

    this.formatFunc = new IntlMessageFormat(message.message, this.locale)
  }

  /**
   * Whether this message has any parameters or not.
   * @return {boolean} True if message has any parameters, false otherwise.
   */
  get hasParameters () {
    return !!(this.params && Array.isArray(this.params) && this.params.length > 0)
  }

  /**
   * Defines getter methods on an object of messages.
   * @param {object} messages - On object where messages will be stored. Each property corresponds to a message key.
   *        Each property will have a getter function defined (will return a formatted message), and,
   *        for messages with parameters, a format(function).
   *        `messages` object usually comes from a MessageBundle object.
   * @param {string} key - A message key, a name of a message.
   * @return {undefined} Has no return value.
   */
  defineProperties (messages, key) {
    const self = this

    if (this.hasParameters) {
      messages[key] = {
        format (options) {
          return self.formatFunc.format(options)
        },
        get (...options) {
          let params = {} // eslint-disable-line prefer-const
          // TODO: Add checks
          for (const [index, param] of self.params.entries()) {
            params[param] = options[index]
          }
          return self.formatFunc.format(params)
        }
      }
    } else {
      Object.defineProperty(messages, key, {
        get () {
          return self.formatFunc.format()
        },
        enumerable: true,
        configurable: true // So it can be deleted
      })
    }
  }
}

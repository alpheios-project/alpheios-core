import IntlMessageFormat from 'intl-messageformat'

/**
 * Combines messages with the same locale code into a single message bundle.
 */
export default class MessageBundle {
  /**
   * Creates a message bundle (a list of messages) for a locale.
   * @param {String} messagesJSON - Messages for a locale in a JSON format.
   * @param {string} locale - A locale code for a message group. IETF language tag format is recommended.
   */
  constructor (messagesJSON, locale) {
    if (!locale) {
      throw new Error('Locale data is missing')
    }
    if (!messagesJSON) {
      throw new Error('Message data is missing')
    }

    this._locale = locale
    this.messages = {}
    // console.warn('**********************MessageBundle')
    // console.warn('**********************MessageBundle', messagesJSON)
    // console.warn('**********************MessageBundle', typeof messagesJSON)
    // console.warn('**********************MessageBundle', messagesJSON.substr(0, 100))
    let jsonObject

    if (typeof (messagesJSON) === 'string') {
      jsonObject = JSON.parse(messagesJSON)
    } else {
      jsonObject = messagesJSON
    }
    // let jsonObject = JSON.parse(messagesJSON)
    for (const [key, message] of Object.entries(jsonObject)) {
      if (!this.hasOwnProperty(key)) {
        this[key] = message
        this[key].formatFunc = new IntlMessageFormat(message.message, this._locale)

        if (message.params && Array.isArray(message.params) && message.params.length > 0) {
          // This message has parameters
          this.messages[key] = {
            format (options) {
              return message.formatFunc.format(options)
            },
            get (...options) {
              let params = {}
              // TODO: Add checks
              for (let [index, param] of message.params.entries()) {
                params[param] = options[index]
              }
              return message.formatFunc.format(params)
            }
          }
        } else {
          // A message without parameters
          Object.defineProperty(this.messages, key, {
            get () {
              return message.formatFunc.format()
            },
            enumerable: true,
            configurable: true // So it can be deleted
          })
        }
      } else {
        console.warn(`A key name "{key} is reserved. It can not be used as a message key and will be ignored"`)
      }
    }
  }

  /**
   * Returns a (formatted) message for a message ID provided.
   * @param messageID - An ID of a message.
   * @param options - Options that can be used for message formatting in the following format:
   * {
   *     paramOneName: paramOneValue,
   *     paramTwoName: paramTwoValue
   * }.
   * @returns {string} A formatted message. If message not found, returns a message that contains an error text.
   */
  get (messageID, options = undefined) {
    if (this[messageID]) {
      return this[messageID].format(options)
    } else {
      // If message with the ID provided is not in translation data, generate a warning.
      return `Not in translation data: "${messageID}"`
    }
  }

  /**
   * Returns a locale of a current message bundle.
   * @return {string} A locale of this message bundle.
   */
  get locale () {
    return this._locale
  }
}

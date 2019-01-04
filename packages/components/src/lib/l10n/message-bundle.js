import Message from './message.js'
// TODO: Deal with situations when message is not available, but is requested

/**
 * Combines messages with the same locale code into a single message bundle.
 */
export default class MessageBundle {
  /**
   * Creates a message bundle (a list of messages) for a locale.
   * @param {string} messagesJSON - Messages for a locale as a JSON string or as an object.
   * @param {string} locale - A locale code for a message group. IETF language tag format is recommended.
   * @param {Function} missingTranslationMsgFn - A placeholder message that will be shown if translation is not found.
   */
  constructor (messagesJSON, locale, missingTranslationMsgFn = (msgID, locale) => `Missing translation: ${msgID} [${locale}]`) {
    if (!locale) {
      throw new Error('Locale data is missing')
    }
    if (!messagesJSON) {
      throw new Error('Message data is missing')
    }

    this._locale = locale
    /**
     * An object whose properties are messages. Each message has a get() method and,
     * if a message has any parameters, a format() method.
     * @type {{get: Function, [format]: Function}}
     */
    this.messages = {}

    this._missingTranslationMsgFn = missingTranslationMsgFn

    let messages = (typeof messagesJSON === 'string') ? JSON.parse(messagesJSON) : messagesJSON
    this.append(messages)
  }

  /**
   * Appends a series of messages to the bundle
   * @param {string} messagesJSON - Messages as a JSON string or as a parsed JSON object
   */
  appendFromJSON (messagesJSON) {
    let messages = (typeof messagesJSON === 'string') ? JSON.parse(messagesJSON) : messagesJSON
    this.append(messages)
  }

  /**
   * Appends a series of messages from an object. Object properties are message names, and
   * values are message objects.
   * @param {object} messages - An object containing messages.
   */
  append (messages) {
    for (const [key, messageObj] of Object.entries(messages)) {
      if (!this.hasOwnProperty(key)) {
        let message = new Message(messageObj, this._locale)
        this[key] = message
        message.defineProperties(this.messages, key)
      } else {
        console.warn(`A key name "${key}" is reserved or already used. A message will be ignored"`)
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
    if (this.messages[messageID]) {
      if (typeof this.messages[messageID].format === 'function') {
        return this.messages[messageID].format(options)
      } else {
        return this.messages[messageID].get()
      }
    } else {
      // If message with the ID provided is not in translation data, generate a warning.
      return `Not in translation data: "${messageID}"`
    }
  }

  /**
   * Returns an abbreviated version of a message for a message ID provided.
   * @param messageID - An ID of a message.
   * @param options - Options that can be used for message formatting in the following format:
   * {
   *     paramOneName: paramOneValue,
   *     paramTwoName: paramTwoValue
   * }.
   * @returns {string} An abbreviated, and possibly formatted, message. If message not found, returns a message that contains an error text.
   */
  abbr (messageID, options = undefined) {
    if (this.messages[messageID]) {
      return this.messages[messageID].abbr(options)
    } else {
      // If message with the ID provided is not in translation data, generate a warning.
      return this._missingTranslationMsgFn(messageID, this._locale)
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

import Message from './message.js'
// TODO: Deal with situations when message is not available, but is requested

/**
 * Combines messages with the same locale code into a single message bundle.
 */
export default class MessageBundle {
  /**
   * Creates a message bundle (a list of messages) for a locale.
   * @param {string | object} messagesJSONorObj - Messages for a locale as a JSON string or as an object.
   * @param {string} locale - A locale code for a message group. IETF language tag format is recommended.
   * @param {Function} missingTranslationMsgFn - A placeholder message that will be shown if translation is not found.
   */
  constructor (messagesJSONorObj, locale, missingTranslationMsgFn = (msgID, locale) => `Missing translation: ${msgID} [${locale}]`) {
    if (!locale) {
      throw new Error('Locale data is missing')
    }
    if (!messagesJSONorObj) {
      throw new Error('Message data is missing')
    }

    this._locale = locale

    /**
     * A map of message object. The key is a messageID
     * @type {Map<string, Message>}
     * @private
     */
    this._messages = new Map()

    this._missingTranslationMsgFn = missingTranslationMsgFn

    const messages = (typeof messagesJSONorObj === 'string') ? JSON.parse(messagesJSONorObj) : messagesJSONorObj
    this.append(messages)
  }

  /**
   * Appends messages from another bundle to the current message bundle.
   * If message has the same messageID that already exists in the
   * current bundle, it will be overwritten.
   * @param {MessageBundle} messageBundle - A bundle of messages.
   */
  appendFromBundle (messageBundle) {
    for (const key of messageBundle.messageIds) {
      this._messages.set(key, messageBundle.getMessageObject(key))
    }
  }

  /**
   * Appends a series of messages to the bundle
   * @param {string} messagesJSON - Messages as a JSON string or as a parsed JSON object
   */
  appendFromJSON (messagesJSON) {
    const messages = (typeof messagesJSON === 'string') ? JSON.parse(messagesJSON) : messagesJSON
    this.append(messages)
  }

  /**
   * Appends a series of messages from an object. Object properties are message names, and
   * values are message objects. If appended message has the same key as en existing one,
   * an existing message will be overwritten.
   * @param {object} messages - An object containing messages.
   */
  append (messages) {
    for (const [key, messageObj] of Object.entries(messages)) {
      const message = new Message(messageObj, this._locale)
      this._messages.set(key, message)
    }
  }

  /**
   * Returns a list of message IDs that exist in a bundle.
   * @return {string[]}
   */
  get messageIds () {
    return Array.from(this._messages.keys())
  }

  /**
   * Checks if message with a given message ID exists among the translated messages.
   * @param {string} messageID - A message ID of a message to be checked
   * @return {boolean} True if message is present, false otherwise
   */
  hasMsg (messageID) {
    return this._messages.has(messageID)
  }

  /**
   * Returns a (formatted) message for a message ID provided.
   * @see {@link Message#getMsg}
   * @param {string} messageID - An ID of a message.
   * @param {object} formatOptions - Options that can be used for message formatting in the following format:
   * {
   *     paramOneName: paramOneValue,
   *     paramTwoName: paramTwoValue
   * }.
   * @param {object} options - An object with the following possible options:
   *     {boolean} passthrough - If true and a translation for a given message ID is not found, will return
   *                             an original `messageID` string. Otherwise will return an error message if
   *                             a translation is missing.
   * @returns {string} A formatted message. If message not found, returns a message that contains an error text.
   */
  getMsg (messageID, formatOptions = undefined, options = {}) {
    const defaultOptions = {
      passthrough: false
    }
    options = Object.assign(defaultOptions, options)
    if (this.hasMsg(messageID)) {
      return this._messages.get(messageID).getMsg(formatOptions)
    } else {
      // If message with the ID provided is not in translation data, generate a warning.
      return options.passthrough ? messageID : `"${messageID}" is not in translation data for ${this._locale}`
    }
  }

  /**
   * A wrapper around `get()` with a `passthrough` parameter set to `true`.
   * @see {@link MessageBundle#getMsg} for more information.
   * @param messageID
   * @param formatOptions
   * @param options
   * @return {string}
   */
  getText (messageID, formatOptions, options = {}) {
    options.passthrough = true
    return this.getMsg(messageID, formatOptions, options)
  }

  /**
   * Returns an abbreviated version of a message for a message ID provided.
   * @see {@link Message#getAbbr}
   * @param messageID - An ID of a message.
   * @param formatOptions - Options that can be used for message formatting in the same order
   * as they are defined in a translation source file.
   * @returns {string} An abbreviated, and possibly formatted, message. If abbreviated message not found,
   *          returns an original message text.
   */
  getAbbr (messageID, formatOptions = undefined) {
    if (this.hasMsg(messageID)) {
      return this._messages.get(messageID).getAbbr(formatOptions)
    } else {
      // If message with the ID provided is not in translation data, generate a warning.
      return this._missingTranslationMsgFn(messageID, this._locale)
    }
  }

  /**
   * Returns a Message object for a given message ID.
   * @param {string} messageID - A message ID of a message object to be retrieved..
   * @return {Message} A message object.
   */
  getMessageObject (messageID) {
    return this.hasMsg(messageID) ? this._messages.get(messageID) : null
  }

  /**
   * Returns a locale of a current message bundle.
   * @return {string} A locale of this message bundle.
   */
  get locale () {
    return this._locale
  }
}

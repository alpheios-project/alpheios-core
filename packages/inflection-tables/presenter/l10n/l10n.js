import en_US from './locale/en-us.js';
import en_GB from './locale/en-gb.js';
import IntlMessageFormat from 'intl-messageformat';
export {MessageBundle, L10n, l10n};

/**
 * Combines messages with the same locale code.
 */
class MessageBundle {

    /**
     * Creates a message bundle (a list of messages) for a locale.
     * @param {string} locale - A locale code for a message group. IETF language tag format is recommended.
     * @param {Object[]} messages - Messages for a locale.
     * @param {string} messages[].id - Message ID, used for message reference.
     * @param {string} messages[].text - Message text.
     */
    constructor(locale, messages) {
        if (!locale) {
            throw new Error('Locale data is missing');
        }
        if (!messages) {
            throw new Error('Messages data is missing');
        }

        this._locale = locale;

        for (let messageID in messages) {
            if (messages.hasOwnProperty(messageID)) {
                this[messageID] = new IntlMessageFormat(messages[messageID], this._locale);
            }
        }
    }

    /**
     * Returns a (formatted) message for a message ID provided.
     * @param messageID - An ID of a message.
     * @param options - Options that can be used for message formatting.
     * @returns {string} A formatted message. If message not found, returns a message that contains an error text.
     */
    get(messageID, options = undefined) {
        if (this[messageID]) {
            return this[messageID].format(options);
        }
        else {
            // If message with the ID provided is not in translation data, generate a warning.
            return `Not in translation data: "${messageID}"`;
        }
    }
}

/**
 * Combines several message bundle for different locales.
 */
class L10n {

    /**
     * Creates an empty object.
     * @returns {L10n} Returns a reference to self for chaining.
     */
    constructor() {
        this._locales = {};
        this._localeList = [];
        return this;
    }

    /**
     * Adds a message bundle to the storage.
     * @param {string} locale - A locale code for a message bundle. IETF language tag format is recommended.
     * @param {Object[]} messages - Messages for a locale.
     * @param {string} messages[].id - Message ID, used for message reference.
     * @param {string} messages[].text - Message text.
     * @returns {L10n} Returns a reference to self for chaining.
     */
    add(locale, messages) {
        let bundle = new MessageBundle(locale, messages); // Will throw an error if arguments are incorrect

        this._localeList.push(locale);
        this._locales[locale] = bundle;
        return this;
    }

    /**
     * Returns a message bundle for a locale.
     * @param {string} locale - A locale code for a message bundle. IETF language tag format is recommended.
     * @returns {MessageBundle} A message bundle for a locale.
     */
    messages(locale) {
        if (!this._locales[locale]) {
            throw new Error('Locale "' + locale + '" is not found.');
        }
        return this._locales[locale];
    }

    /**
     * Returns a list of available locale codes.
     * @returns {string[]} Array of local codes.
     */
    get locales() {
        return this._localeList;
    }
}

// Initialize a global L10n object.
let l10n = new L10n().add('en-US', en_US).add('en-GB', en_GB);
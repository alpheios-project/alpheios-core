import en_US from './locale/en-us.js';
import en_GB from './locale/en-gb.js';
import IntlMessageFormat from 'intl-messageformat';
export {MessageBundle, l10n};

class MessageBundle {
    constructor(locale, messages) {
        this._locale = locale;

        for (let messageID in messages) {
            if (messages.hasOwnProperty(messageID)) {
                this[messageID] = new IntlMessageFormat(messages[messageID], this._locale);
            }
        }
    }

    get(messageID, options = undefined) {
        if (this[messageID]) {
            return this[messageID].format(options);
        }
        else {
            // If message with the ID provided is not in translation data, generate a warning.
            return `Not in translation data: "${messageID}"`;
            console.warn(`"${messageID}" does not exist in translation data.`);
        }
    }
}

class L10n {
    constructor() {
        this._locales = {};
        this._localeList = [];
        return this;
    }

    add(locale, messages) {
        this._localeList.push(locale);
        this._locales[locale] = new MessageBundle(locale, messages);
        return this;
    }

    messages(locale) {
        if (this._locales[locale]) {
            return this._locales[locale];
        }
    }

    get locales() {
        return this._localeList;
    }
}

let l10n = new L10n().add('en-US', en_US).add('en-GB', en_GB);


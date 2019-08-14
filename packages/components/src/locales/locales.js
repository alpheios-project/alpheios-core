import EnUs from './en-us/messages.json'
import EnUsData from './en-us/messages-data.json'
import EnUsInflectons from './en-us/messages-inflections.json'
import EnUsWordList from './en-us/messages-word-list.json'
import EnUsWordUsage from './en-us/messages-word-usage.json'
import EnUsResourceOptions from './en-us/messages-resource-options.json'
import EnGb from './en-gb/messages.json'
import MessageBundle from '@/lib/l10n/message-bundle.js'

const localeEnUs = 'en-US'
const localeEnGb = 'en-GB'
const availableMessages = {
  [localeEnUs]: [EnUs, EnUsData, EnUsInflectons, EnUsWordList, EnUsWordUsage, EnUsResourceOptions],
  [localeEnGb]: [EnGb]
}

export default {
  en_US: localeEnUs,
  en_GB: localeEnGb,
  availableMessages: availableMessages,
  /**
   * A helper function that creates a message bundle out of a messages JSON and a locale.
   * @param {string | object} messagesJSONorObj - Messages for a locale as a JSON string or as an object.
   * @param {string} locale - A locale code for a message group. IETF language tag format is recommended.
   * @return {MessageBundle} A message bundle with messages from JSON.
   */
  createBundle: (messagesJSONorObj, locale) => {
    return new MessageBundle(messagesJSONorObj, locale)
  },
  /**
   * Same as above, but creates an array of message bundles out of an array of messages JSONs and a locales.
   * @param {Array.<string | object, number>[]} msgArr - An array of arrays with
   * the first element being {string | object} messagesJSONorObj - messages for a locale as a JSON string or as an object,
   * and the second element being {string} locale - a locale code for a message group. IETF language tag format is recommended.
   * @return {MessageBundle[]} An array of message bundles.
   */
  createBundleArr: (msgArr) => {
    return msgArr.map((m) => new MessageBundle(...m))
  },
  /**
   * Creates an array of message bundles out of all availableMessages.
   * @return {MessageBundle[]} An array of message bundles.
   */
  bundleArr: () => {
    let msgArray = [] // eslint-disable-line prefer-const
    for (const [locale, messages] of Object.entries(availableMessages)) {
      msgArray.push(...messages.map(m => new MessageBundle(m, locale)))
    }
    return msgArray
  }
}

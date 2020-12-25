/** @module definition */
import { v4 as uuidv4 } from 'uuid'
import ResourceProvider from './resource_provider.js'
import Language from './language.js' /* @typedef {import('./language.js').Language} Language */

class Definition {
  /**
   * @param {string} text - A text of a definition.
   * @param {Language} language - A language on what a text of a definition is written.
   * @param {string} format - A MIME type of a definitions text (i.e. "text/plain").
   * @param {string} lemmaText - A ward that the definition text describes.
   */
  constructor (text, language, format, lemmaText) {
    if (!(language instanceof Language)) {
      throw new Error('The language argument is not of the Language type')
    }

    /**
     * A text of a definition.
     *
     * @type {string}
     */
    this.text = text

    /**
     * A language on what a text of a definition is written.
     *
     * @type {Language}
     */
    this.language = language

    /**
     * A MIME type of a definitions text (i.e. "text/plain").
     *
     * @type {string}
     */
    this.format = format

    /**
     * A ward that the definition text describes.
     *
     * @type {string}
     */
    this.lemmaText = lemmaText

    /**
     * A provider of the definition. Will be set outside of the constructor,
     * currently, in the `getProxy` method of the ResourceProvider.
     *
     * @type {ResourceProvider}
     */
    this.provider = null

    /**
     * A unique ID of an object instance.
     *
     * @type {string}
     */
    this.ID = uuidv4()
  }

  static readObject (jsonObject) {
    const lang = new Language(jsonObject.languageCode)
    // eslint-disable-next-line prefer-const
    let definition = new Definition(jsonObject.text, lang, jsonObject.format, jsonObject.lemmaText)

    if (jsonObject.ID) {
      definition.ID = jsonObject.ID
    }

    if (jsonObject.provider) {
      const provider = ResourceProvider.readObject(jsonObject.provider)
      return ResourceProvider.getProxy(provider, definition)
    } else {
      return definition
    }
  }

  convertToJSONObject () {
    // eslint-disable-next-line prefer-const
    let result = {
      text: this.text,
      languageCode: this.language.toCode(),
      format: this.format,
      lemmaText: this.lemmaText,
      ID: this.ID
    }

    if (this.provider) {
      result.provider = this.provider.convertToJSONObject()
    }
    return result
  }
}
export default Definition

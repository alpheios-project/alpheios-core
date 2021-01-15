/** @module definition */
import ResourceProvider from '@dmodels/resource_provider.js'
import Language from '@dmodels/language.js' /* @typedef {import('./language.js').Language} Language */
import IRIProvider from '@dmodels/iri/iri-provider.js'

class Definition {
  /**
   * @param {string} text - A text of a definition.
   * @param {Language} language - A _language on what a text of a definition is written.
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
    this._text = text

    /**
     * A language on what a text of a definition is written.
     *
     * @type {Language}
     */
    this._language = language

    /**
     * A MIME type of a definitions text (e.g. "text/plain").
     *
     * @type {string}
     */
    this.format = format

    /**
     * A word that the definition text describes.
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
    this._ID = IRIProvider.getIRI({ identityData: this.identityData })
  }

  get text () {
    return this._text
  }

  get language () {
    return this._language
  }

  get ID () {
    return this._ID
  }

  get identityData () {
    return {
      text: this._text,
      languageCode: this._language.toCode()
    }
  }

  static readObject (jsonObject) {
    const lang = new Language(jsonObject.languageCode)
    // eslint-disable-next-line prefer-const
    let definition = new Definition(jsonObject.text, lang, jsonObject.format, jsonObject.lemmaText)

    if (jsonObject.ID) {
      definition._ID = jsonObject.ID
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
      text: this._text,
      languageCode: this._language.toCode(),
      format: this.format,
      lemmaText: this.lemmaText,
      ID: this._ID
    }

    if (this.provider) {
      result.provider = this.provider.convertToJSONObject()
    }
    return result
  }
}
export default Definition

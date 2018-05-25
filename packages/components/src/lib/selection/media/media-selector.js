import { LanguageModelFactory, Constants } from 'alpheios-data-models'

export default class MediaSelector {
  constructor (event) {
    this.target = event.target // A selected text area in a document
    this.location = event.target.ownerDocument.location.href
  }

  /**
   * Creates a selection from a specific target and a default language code. Should be implemented in a subclass.
   * @param target
   * @param defaultLanguageCode
   * @return {undefined}
   */
  static getSelector (target, defaultLanguageCode) {
    return undefined
  }

  /**
   * Returns a language code of a text piece defined by target. Should scan a text piece and its surrounding environment
   * or use other methods in a best effort to determine the language of a text piece.
   * This method is media specific and should be redefined in media specific subclasses of SourceSelector.
   * @return {string | undefined} Language code of a text piece or undefined if language cannot be determined.
   */
  getLanguageCodeFromSource () {
    return undefined
  }

  /**
   * Returns a language ID of a selection target. If language cannot be determined,
   * a language from defaultLanguageCode will be used.
   * @param {string} defaultLanguageCode - A default language code that will be used if language cannot be determined.
   * @return {symbol} A language ID of a selection
   */
  getLanguageID (defaultLanguageCode) {
    let code = this.getLanguageCodeFromSource() || defaultLanguageCode
    return LanguageModelFactory.getLanguageIdFromCode(code)
  }

  /**
   * Returns a language code of a selection target. If language cannot be determined, defaultLanguageCode will be used instead.
   * @param {string} defaultLanguageCode - A default language code that will be used if language cannot be determined.
   * @return {string} A language code of a selection
   */
  getLanguageCode (defaultLanguageCode) {
    let code = this.getLanguageCodeFromSource() || defaultLanguageCode
    let langId = LanguageModelFactory.getLanguageIdFromCode(code)
    if (langId === Constants.LANG_UNDEFINED) {
      code = defaultLanguageCode
    } else if (langId) {
      code = LanguageModelFactory.getLanguageCodeFromId(langId)
    } else {
      code = defaultLanguageCode
    }
    return code
  }
}

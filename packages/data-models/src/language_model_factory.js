import LanguageModel from './language_model.js'
import LatinLanguageModel from './latin_language_model.js'
import GreekLanguageModel from './greek_language_model.js'
import ArabicLanguageModel from './arabic_language_model.js'
import PersianLanguageModel from './persian_language_model.js'
import * as Constants from './constants.js'

const MODELS = new Map([
  [ Constants.STR_LANG_CODE_LA, LatinLanguageModel ],
  [ Constants.STR_LANG_CODE_LAT, LatinLanguageModel ],
  [ Constants.STR_LANG_CODE_GRC, GreekLanguageModel ],
  [ Constants.STR_LANG_CODE_ARA, ArabicLanguageModel ],
  [ Constants.STR_LANG_CODE_AR, ArabicLanguageModel ],
  [ Constants.STR_LANG_CODE_PER, PersianLanguageModel ]
])

class LanguageModelFactory {
  static supportsLanguage (code) {
    return MODELS.has(code)
  }

  static getLanguageForCode (code = null) {
    let Model = MODELS.get(code)
    if (Model) {
      return new Model()
    }
    // for now return a default Model
    // TODO may want to throw an error
    return new LanguageModel()
  }

  /**
   * Converts an ISO 639-3 language code to a language ID
   * @param {String} languageCode - An ISO 639-3 language code
   * @return {Symbol | undefined} A language ID or undefined if language ID is not found
   */
  static getLanguageIdFromCode (languageCode) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.hasCode(languageCode)) {
        return languageModel.sourceLanguage
      }
    }
  }

  /**
   * Converts a language ID to an default ISO 639-3 language code for that language
   * @param {Symbol} languageID - A language ID
   * @return {String | undefined} An ISO 639-3 language code or undefined if language code is not found
   */
  static getLanguageCodeFromId (languageID) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.sourceLanguage === languageID) {
        return languageModel.toCode()
      }
    }
  }
}
export default LanguageModelFactory

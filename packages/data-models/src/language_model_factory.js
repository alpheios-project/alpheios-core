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
  [ Constants.STR_LANG_CODE_PER, PersianLanguageModel ],
  [ Constants.STR_LANG_CODE_FAR, PersianLanguageModel ]
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
}
export default LanguageModelFactory

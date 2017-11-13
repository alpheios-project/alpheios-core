import LanguageModel from './language_model'
import LatinLanguageModel from './latin_language_model'
import GreekLanguageModel from './greek_language_model'

class LanguageModelFactory {

  static getLanguageForCode (code = null) {
    for (const model of LanguageModelFactory.MODELS) {
      if (model.supportsLanguage(code)) {
        return new model()
      }
    }
    return new LanguageModel()
  }
}

LanguageModelFactory.MODELS = [LatinLanguageModel, GreekLanguageModel]
export default LanguageModelFactory

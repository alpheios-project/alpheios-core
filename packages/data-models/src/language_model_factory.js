import LanguageModel from './language_model.js';
import LatinLanguageModel from './latin_language_model.js';
class LanguageModelFactory {

  static getLanguageForCode(code=null) {
    for (const model of LanguageModelFactory.MODELS) {
      if (model.supportsLanguage(code)) {
        return new model();
      }
    }
    return new LanguageModel();
  }
}
LanguageModelFactory.MODELS = [ LatinLanguageModel ];
export default LanguageModelFactory;

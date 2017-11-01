import LanguageModel from './language_model.js';
/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class GreekLanguageModel extends LanguageModel {

   /**
   */
   constructor() {
     super();
     this.source_language = LanguageModel.LANG_GREEK;
     this.context_forward = 0;
     this.context_backward = 0;
     this.direction = LanguageModel.DIR_LTR;
     this.base_unit = LanguageModel.UNIT_WORD;
     this.language_codes = ['la','lat'];

   }

   static supportsLanguage(a_code) {
     return ['la','lat'].includes(a_code);
   }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect(a_node)
  {
    return true;
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} a_word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord(a_word)
  {
      return a_word;
  }


  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation()
  {
      return ".,;:!?'\"(){}\\[\\]<>\/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r";
  }
}
export default LatinLanguageModel;

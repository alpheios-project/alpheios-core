import LanguageModel from './language_model.js';
import Feature from './feature.js';
import FeatureType from './feature_type.js';
/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class LatinLanguageModel extends LanguageModel {

   /**
   */
   constructor() {
     super();
     this.source_language = LanguageModel.LANG_LATIN;
     this.context_forward = 0;
     this.context_backward = 0;
     this.direction = LanguageModel.DIR_LTR;
     this.base_unit = LanguageModel.UNIT_WORD;
     this.language_codes = ['la','lat'];
     this.features = this._initializeFeatures();
   }

   static supportsLanguage(a_code) {
     return ['la','lat'].includes(a_code);
   }

   _initializeFeatures() {
     let features = {}
     features[Feature.types.part] = new FeatureType(Feature.types.part, ['noun', 'adjective', 'verb'],this);
     features[Feature.types.number] = new FeatureType(Feature.types.number, ['singular', 'plural'],this);
     features[Feature.types.grmCase] = new FeatureType(Feature.types.grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative'],this);
     features[Feature.types.declension] = new FeatureType(Feature.types.declension, ['first', 'second', 'third', 'fourth', 'fifth'],this);
     features[Feature.types.gender] = new FeatureType(Feature.types.gender, ['masculine', 'feminine', 'neuter'],this);
     features[Feature.types.type] = new FeatureType(Feature.types.type, ['regular', 'irregular'],this);
     features[Feature.types.tense] = new FeatureType(Feature.types.tense, ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect'],this);
     features[Feature.types.voice] = new FeatureType(Feature.types.voice, ['passive', 'active'],this);
     features[Feature.types.mood] = new FeatureType(Feature.types.mood, ['indicative', 'subjunctive'],this);
     features[Feature.types.person] =new FeatureType(Feature.types.person, ['first', 'second', 'third'],this);
     features[Feature.types.conjugation] = new FeatureType(Feature.types.conjugation, ['first', 'second', 'third', 'fourth'],this);
     return features;
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

  toCode() {
    return 'lat';
  }
}
export default LatinLanguageModel;

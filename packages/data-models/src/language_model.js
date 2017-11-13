/**
 * @class  LanguageModel is the base class for language-specific behavior
 */
class LanguageModel {

  /**
   */
  constructor () {
    this.sourceLanguage = null
    this.contextForward = 0
    this.contextBackward = 0
    this.direction = LanguageModel.DIR_LTR
    this.baseUnit = LanguageModel.UNIT_WORD
    this.languageCodes = []
    this.features = {} // Grammatical feature types (definitions) within supported by a specific language.
  }

  /**
   * Handler which can be used as the contextHander.
   * It uses language-specific configuration to identify
   * the elements from the alph-text popup which should produce links
   * to the language-specific grammar.
   * @see #contextHandler
   */
  grammarContext (a_doc) {
    // used to bind a click handler on the .alph-entry items in the
    // popup which retrieved the context attribute from the clicked
    // term and used that to construct a link and open the grammar
    // at the apporopriate place.
    //var links = this.getGrammarLinks();

    //for (var link_name in links)
    //{
    //   if (links.hasOwnProperty(link_name))
    //    {
    //Alph.$(".alph-entry ." + link_name,a_doc).bind('click',link_name,
    //   function(a_e)
    //    {
    // build target inside grammar
    //var target = a_e.data;
    //var rngContext = Alph.$(this).attr("context");
    //if (rngContext != null)
    //{
    //  target += "-" + rngContext.split(/-/)[0];
    //}
    //myobj.openGrammar(a_e.originaEvent,this,target);
    //   }
    //);
    //   }
    //}
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (a_node) {
    return false
  }

  /**
   * Check to see if the supplied language code is supported by this tool
   * @param {String} a_code the language code
   * @returns true if supported false if not
   * @type Boolean
   */
  static supportsLanguage (a_code) {
    return false
  };

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} a_word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord (a_word) {
    return a_word
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation () {
    return '.,;:!?\'"(){}\\[\\]<>\/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r'
  }

  toString () {
    return String(this.sourceLanguage)
  }

  isEqual (model) {
    return this.sourceLanguage === model.sourceLanguage
  }

  toCode () {
    return null
  }

}

LanguageModel.UNIT_WORD = Symbol('word')
LanguageModel.UNIT_CHAR = Symbol('char')
LanguageModel.DIR_LTR = Symbol('ltr')
LanguageModel.DIR_RTL = Symbol('rtl')
LanguageModel.LANG_LATIN = Symbol('latin')
LanguageModel.LANG_GREEK = Symbol('greek')

export default LanguageModel

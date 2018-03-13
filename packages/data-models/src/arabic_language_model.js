import LanguageModel from './language_model.js'
import * as Constants from './constants.js'

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
export default class ArabicLanguageModel extends LanguageModel {
  static get languageID () { return Constants.LANG_ARABIC }
  static get languageCode () { return Constants.STR_LANG_CODE_ARA }
  static get languageCodes () { return [Constants.STR_LANG_CODE_ARA, Constants.STR_LANG_CODE_AR] }
  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return Constants.LANG_DIR_RTL }
  static get baseUnit () { return Constants.LANG_UNIT_WORD }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  static canInflect (node) {
    return false
  }

  /**
   * @override LanguageModel#alternateWordEncodings
   */
  static alternateWordEncodings (word, preceding = null, following = null, encoding = null) {
    // tanwin (& tatweel) - drop FATHATAN, DAMMATAN, KASRATAN, TATWEEL
    let tanwin = word.replace(/[\u{064B}\u{064C}\u{064D}\u{0640}]/ug, '')
    // hamzas - replace ALEF WITH MADDA ABOVE, ALEF WITH HAMZA ABOVE/BELOW with ALEF
    let hamza = tanwin.replace(/[\u{0622}\u{0623}\u{0625}]/ug, '\u{0627}')
    // harakat - drop FATHA, DAMMA, KASRA, SUPERSCRIPT ALEF, ALEF WASLA
    let harakat = hamza.replace(/[\u{064E}\u{064F}\u{0650}\u{0670}\u{0671}]/ug, '')
    // shadda
    let shadda = harakat.replace(/\u{0651}/ug, '')
    // sukun
    let sukun = shadda.replace(/\u{0652}/ug, '')
    // alef
    let alef = sukun.replace(/\u{0627}/ug, '')
    let alternates = new Map([
      ['tanwin', tanwin],
      ['hamza', hamza],
      ['harakat', harakat],
      ['shadda', shadda],
      ['sukun', sukun],
      ['alef', alef]
    ])
    if (encoding !== null && alternates.has(encoding)) {
      return [alternates.get(encoding)]
    } else {
      return Array.from(alternates.values())
    }
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }
}

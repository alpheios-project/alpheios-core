import LanguageModel from './language_model.js'
import * as Constants from './constants.js'
import Feature from './feature.js'

const typeFeatures = new Map()
let typeFeaturesInitialized = false

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

  static get typeFeatures () {
    if (!typeFeaturesInitialized) { this.initTypeFeatures() }
    return typeFeatures
  }

  static initTypeFeatures () {
    for (const featureName of this.featureNames) {
      typeFeatures.set(featureName, this.getFeature(featureName))
    }
    typeFeaturesInitialized = true
  }

  /**
   * Check to see if this language tool can produce an inflection table display
for the current node
   *
   * @param node
   */
  static canInflect (node) {
    return false
  }

  /**
   * @override
   */
  static alternateWordEncodings ({
    word = null, preceding = null, following = null, encoding = null,
    preserveCase = false, includeOriginal = false
  } = {}) {
    // tanwin (& tatweel) - drop FATHATAN, DAMMATAN, KASRATAN, TATWEEL
    const tanwin = word.replace(/[\u{064B}\u{064C}\u{064D}\u{0640}]/ug, '')
    // hamzas - replace ALEF WITH MADDA ABOVE, ALEF WITH HAMZA ABOVE/BELOW with ALEF
    const hamza = tanwin.replace(/[\u{0622}\u{0623}\u{0625}]/ug, '\u{0627}')
    // harakat - drop FATHA, DAMMA, KASRA, SUPERSCRIPT ALEF, ALEF WASLA
    const harakat = hamza.replace(/[\u{064E}\u{064F}\u{0650}\u{0670}\u{0671}]/ug, '')
    // shadda
    const shadda = harakat.replace(/\u{0651}/ug, '')
    // sukun
    const sukun = shadda.replace(/\u{0652}/ug, '')
    // alef
    const alef = sukun.replace(/\u{0627}/ug, '')
    const alternates = new Map([
      ['tanwin', tanwin],
      ['hamza', hamza],
      ['harakat', harakat],
      ['shadda', shadda],
      ['sukun', sukun],
      ['alef', alef]
    ])
    let fullList = [] // eslint-disable-line prefer-const
    if (encoding !== null && alternates.has(encoding)) {
      fullList = [alternates.get(encoding)]
    } else {
      fullList = Array.from(alternates.values())
    }
    if (!includeOriginal) {
      fullList = fullList.filter(w => w !== word)
    }
    return fullList
  }

  /**
   * Get a list of valid puncutation for this language
   *
   * @returns {string} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r\u200C\u200D"
  }

  /**
   * Aggregate inflections for display according to language model characteristics
   *
   * @param inflections
   */
  static aggregateInflectionsForDisplay (inflections) {
    // TODO at some point we might want to be able to check the provider in here
    // because this really only applies to the specifics of the Aramorph parser
    let aggregated = [] // eslint-disable-line prefer-const
    // eslint-disable-next-line prefer-const
    let aggregates = { [Constants.POFS_NOUN]: [], [Constants.POFS_ADJECTIVE]: [], [Constants.POFS_NOUN_PROPER]: [] }
    for (const infl of inflections) {
      if (infl[Feature.types.morph] && infl[Feature.types.morph].value.match(/ADJ[uaiNK]/)) {
        aggregates[Constants.POFS_ADJECTIVE].push(infl)
      } else if (infl[Feature.types.morph] && infl[Feature.types.morph].value.match(/NOUN[uaiNK]/)) {
        aggregates[Constants.POFS_NOUN].push(infl)
      } else if (infl[Feature.types.morph] && infl[Feature.types.morph].value.match(/NOUN_PROP[uaiNK]/)) {
        aggregates[Constants.POFS_NOUN_PROPER].push(infl)
      } else {
        // we are also going to keep the examples out of the display for now
        infl.example = null
        aggregated.push(infl)
      }
    }
    for (const type of Object.keys(aggregates)) {
      const base = aggregated.filter((i) => i[Feature.types.part].value === type)
      if (base.length !== 1) {
        // if we don't have the base form then we don't really know what to do here
        // so just put the inflection back in the ones available for display
        aggregated.push(...aggregates[type])
      }
      // we may decide we want to keep the extra suffix and morph information
      // from the alternate inflections but for now we just will drop it from
      // the inflections that are displayed
    }
    return aggregated
  }
}

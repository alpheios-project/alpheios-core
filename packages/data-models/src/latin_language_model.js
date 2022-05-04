import LanguageModel from './language_model.js'
import Feature from './feature.js'
import * as Constants from './constants.js'
import Logger from './logging/logger.js'

let typeFeatures = new Map() // eslint-disable-line prefer-const
let typeFeaturesInitialized = false

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
export default class LatinLanguageModel extends LanguageModel {
  static get languageID () { return Constants.LANG_LATIN }
  static get languageCode () { return Constants.STR_LANG_CODE_LAT }
  static get languageCodes () { return [Constants.STR_LANG_CODE_LA, Constants.STR_LANG_CODE_LAT] }
  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return Constants.LANG_DIR_LTR }
  static get baseUnit () { return Constants.LANG_UNIT_WORD }

  static get featureValues () {
    /*
    This could be a static variable, but then it will create a circular reference:
    Feature -> LanguageModelFactory -> LanguageModel -> Feature
     */
    return new Map([
      ...LanguageModel.featureValues,
      [
        Feature.types.grmClass,
        [
          Constants.CLASS_PERSONAL,
          Constants.CLASS_REFLEXIVE,
          Constants.CLASS_POSSESSIVE,
          Constants.CLASS_DEMONSTRATIVE,
          Constants.CLASS_RELATIVE,
          Constants.CLASS_INTERROGATIVE
        ]
      ],
      [
        Feature.types.number,
        [
          Constants.NUM_SINGULAR,
          Constants.NUM_PLURAL
        ]
      ],
      [
        Feature.types.grmCase,
        [
          Constants.CASE_NOMINATIVE,
          Constants.CASE_GENITIVE,
          Constants.CASE_DATIVE,
          Constants.CASE_ACCUSATIVE,
          Constants.CASE_ABLATIVE,
          Constants.CASE_LOCATIVE,
          Constants.CASE_VOCATIVE
        ]
      ],
      [
        Feature.types.declension,
        [
          Constants.ORD_1ST,
          Constants.ORD_2ND,
          Constants.ORD_3RD,
          Constants.ORD_4TH,
          Constants.ORD_5TH
        ]
      ],
      [
        Feature.types.tense,
        [
          Constants.TENSE_PRESENT,
          Constants.TENSE_IMPERFECT,
          Constants.TENSE_FUTURE,
          Constants.TENSE_PERFECT,
          Constants.TENSE_PLUPERFECT,
          Constants.TENSE_FUTURE_PERFECT
        ]
      ],
      [
        Feature.types.voice,
        [
          Constants.VOICE_ACTIVE,
          Constants.VOICE_PASSIVE
        ]
      ],
      [
        Feature.types.mood,
        [
          Constants.MOOD_INDICATIVE,
          Constants.MOOD_SUBJUNCTIVE,
          Constants.MOOD_IMPERATIVE,
          Constants.MOOD_PARTICIPLE,
          Constants.MOOD_SUPINE,
          Constants.MOOD_GERUNDIVE,
          Constants.MOOD_PARTICIPLE,
          Constants.MOOD_INFINITIVE
        ]
      ],
      [
        Feature.types.conjugation,
        [
          Constants.ORD_1ST,
          Constants.ORD_2ND,
          Constants.ORD_3RD,
          Constants.ORD_4TH
        ]
      ]
    ])
  }

  static get typeFeatures () {
    if (!typeFeaturesInitialized) {
      this.initTypeFeatures()
    }
    return typeFeatures
  }

  static initTypeFeatures () {
    for (const featureName of this.featureNames) {
      typeFeatures.set(featureName, this.getFeature(featureName))
    }
    typeFeaturesInitialized = true
  }

  /**
   * @override
   */
  static grammarFeatures () {
    // TODO this ideally might be grammar specific
    return [Feature.types.part, Feature.types.grmCase, Feature.types.mood, Feature.types.declension, Feature.types.tense, Feature.types.conjugation]
  }

  /**
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   */
  static canInflect (node) {
    return true
  }

  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} text the source word or a text string
   * @returns the normalized form of the word (Latin replaces accents and special chars)
   * @type String
   */
  static normalizeText (text) {
    if (text) {
      text = text.replace(/[\u00c0\u00c1\u00c2\u00c3\u00c4\u0100\u0102]/g, 'A')
      text = text.replace(/[\u00c8\u00c9\u00ca\u00cb\u0112\u0114]/g, 'E')
      text = text.replace(/[\u00cc\u00cd\u00ce\u00cf\u012a\u012c]/g, 'I')
      text = text.replace(/[\u00d2\u00d3\u00d4\u00df\u00d6\u014c\u014e]/g, 'O')
      text = text.replace(/[\u00d9\u00da\u00db\u00dc\u016a\u016c]/g, 'U')
      text = text.replace(/[\u00c6\u01e2]/g, 'AE')
      text = text.replace(/[\u0152]/g, 'OE')
      text = text.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u0101\u0103]/g, 'a')
      text = text.replace(/[\u00e8\u00e9\u00ea\u00eb\u0113\u0115]/g, 'e')
      text = text.replace(/[\u00ec\u00ed\u00ee\u00ef\u012b\u012d\u0129]/g, 'i')
      text = text.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6\u014d\u014f]/g, 'o')
      text = text.replace(/[\u00f9\u00fa\u00fb\u00fc\u016b\u016d]/g, 'u')
      text = text.replace(/[\u00e6\u01e3]/g, 'ae')
      text = text.replace(/[\u0153]/g, 'oe')
    }
    return text
  }

  /**
   * Return a normalized feature value, based upon the feature type  and supplied value
   *
   * @param {string} featureType the feature type
   * @param {string} featureValue the feature value
   * @returns {string} the alpheios-normalized feature value
   */
  static normalizeFeatureValue (featureType, featureValue) {
    // alpheios standard for Latin is currently following Whitaker, and
    // normalize the gerundive mood to participle
    if (featureType === Feature.types.mood && featureValue === Constants.MOOD_GERUNDIVE) {
      return Constants.MOOD_PARTICIPLE
    } else if (featureType === Feature.types.part && featureValue === Constants.POFS_EXCLAMATION) {
      return Constants.POFS_INTERJECTION
    } else {
      return featureValue
    }
  }

  /**
   * Return a normalized part of speech for a lexeme based upon the lemma and inflection data
   *
   * @param {Lexeme} lexeme the lexeme to normalize
   * @returns {string} the alpheios-normalized part of speech value
   */
  static normalizePartOfSpeechValue (lexeme) {
    if (lexeme.lemma.features[Feature.types.part]) {
      // Alpheios currently follows Whitaker for Latin and normalizes  exclamation
      // to interjection
      if (lexeme.lemma.features[Feature.types.part].value === Constants.POFS_EXCLAMATION) {
        return Constants.POFS_INTERJECTION
      } else {
        return lexeme.lemma.features[Feature.types.part].value
      }
    } else {
      return null
    }
  }

  /**
   * Get a list of valid punctuation for this language
   *
   * @returns {string} a string containing valid punctuation symbols
   */
  static getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u2020\u2021\u201C\u201D\u0387\u00B7\n\r\u200C\u200D"
  }

  /**
   * Sets inflection grammar properties based on its characteristics
   *
   * @param {Inflection} inflection - An inflection object
   * @returns {object} Inflection properties
   */
  static getInflectionConstraints (inflection) {
    // eslint-disable-next-line prefer-const
    let grammar = {
      fullFormBased: false,
      suffixBased: false,
      pronounClassRequired: false
    }
    if (inflection.hasOwnProperty(Feature.types.part)) { // eslint-disable-line no-prototype-builtins
      if ([Constants.POFS_VERB, Constants.POFS_VERB_PARTICIPLE, Constants.POFS_SUPINE, Constants.POFS_GERUNDIVE].includes(inflection[Feature.types.part].value)) {
        grammar.fullFormBased = true
        grammar.suffixBased = true
      } else if (inflection[Feature.types.part].value === Constants.POFS_PRONOUN) {
        grammar.fullFormBased = true
      } else {
        grammar.suffixBased = true
      }
    } else {
      Logger.getInstance().warn('Unable to set grammar: part of speech data is missing or is incorrect', inflection[Feature.types.part])
    }

    return grammar
  }
}

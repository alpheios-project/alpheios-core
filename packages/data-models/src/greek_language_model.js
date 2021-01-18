import LanguageModel from './language_model.js'
import LanguageModelFactory from './language_model_factory.js'
import * as Constants from './constants.js'
import Feature from './feature.js'
import Logger from './logging/logger.js'

import GreekChars from './languages/greek-chars.js'

let typeFeatures = new Map() // eslint-disable-line prefer-const
let typeFeaturesInitialized = false
/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
export default class GreekLanguageModel extends LanguageModel {
  static get languageID () { return Constants.LANG_GREEK }
  static get languageCode () { return Constants.STR_LANG_CODE_GRC }
  static get languageCodes () { return [Constants.STR_LANG_CODE_GRC] }
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
          Constants.CLASS_DEMONSTRATIVE,
          Constants.CLASS_GENERAL_RELATIVE,
          Constants.CLASS_INDEFINITE,
          Constants.CLASS_INTENSIVE,
          Constants.CLASS_INTERROGATIVE,
          Constants.CLASS_PERSONAL,
          Constants.CLASS_POSSESSIVE,
          Constants.CLASS_RECIPROCAL,
          Constants.CLASS_REFLEXIVE,
          Constants.CLASS_RELATIVE
        ]
      ],
      [
        Feature.types.number,
        [
          Constants.NUM_SINGULAR,
          Constants.NUM_PLURAL,
          Constants.NUM_DUAL
        ]
      ],
      [
        Feature.types.grmCase,
        [
          Constants.CASE_NOMINATIVE,
          Constants.CASE_GENITIVE,
          Constants.CASE_DATIVE,
          Constants.CASE_ACCUSATIVE,
          Constants.CASE_VOCATIVE
        ]
      ],
      [
        Feature.types.declension,
        [
          Constants.ORD_1ST,
          Constants.ORD_2ND,
          Constants.ORD_3RD
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
          Constants.TENSE_FUTURE_PERFECT,
          Constants.TENSE_AORIST
        ]
      ],
      [
        Feature.types.voice,
        [
          Constants.VOICE_PASSIVE,
          Constants.VOICE_ACTIVE,
          Constants.VOICE_MEDIOPASSIVE,
          Constants.VOICE_MIDDLE
        ]
      ],
      [
        Feature.types.mood,
        [
          Constants.MOOD_INDICATIVE,
          Constants.MOOD_SUBJUNCTIVE,
          Constants.MOOD_OPTATIVE,
          Constants.MOOD_IMPERATIVE
        ]
      ],
      [
        // TODO full list of greek dialects
        Feature.types.dialect,
        [
          'attic',
          'epic',
          'doric'
        ]
      ]
    ])
  }

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
    return true
  }

  /**
   * @override
   */
  static grammarFeatures () {
    // TODO this ideally might be grammar specific
    return [Feature.types.part, Feature.types.grmCase, Feature.types.mood, Feature.types.declension, Feature.types.tense, Feature.types.voice]
  }

  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} text the source word or the source text
   * @returns {string} the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type string
   */
  static normalizeText (text) {
    // we normalize greek to NFC - Normalization Form Canonical Composition
    if (text) {
      text = text.normalize('NFC')
      // normalize the right single quotation at the end (elision) to Greek Koronois \u1fbd
      text = text.replace(/\u2019$/, '\u1fbd')
    }
    return text
  }

  /**
   * Return a normalized part of speech for a lexeme based upon the lemma and inflection data
   * @param {Lexeme} lexeme the lexeme to normalize
   * @returns {string} the alpheios-normalized part of speech value
   *                   or null if no part of speech data is present on the lexeme
   **/
  static normalizePartOfSpeechValue( lexeme ) {
    if (lexeme.lemma.features[Feature.types.part]) {
      if (lexeme.lemma.features[Feature.types.part].value === Constants.POFS_PARTICLE) {
        // alpheios standard for Greek follows the Perseus Treebank Guidelines
        // which normalize particles as adverbs
        return Constants.POFS_ADVERB
      } else if (lexeme.lemma.features[Feature.types.part].value === Constants.POFS_EXCLAMATION) {
        // alpheios normalizes exclamation to interjection (following treebank guidelines)
        return Constants.POFS_INTERJECTION
      } else {
        return lexeme.lemma.features[Feature.types.part].value
      }
    } else {
      return null
    }
 }

  /**
   * Return a normalized feature value, based upon the feature type  and supplied value
   * @param {string} featureType the feature type
   * @param {string} featureValue the feature value
   * @returns {string} the alpheios-normalized feature value
   */
  static normalizeFeatureValue ( featureType, featureValue ) {
    // alpheios standard for Latin is currently following Whitaker, and
    // normalize the gerundive mood to participle
    if (featureType === Feature.types.part && featureValue === Constants.POFS_PARTICLE) {
      return Constants.POFS_ADVERB
    } else if (featureType === Feature.types.part && featureValue === Constants.POFS_EXCLAMATION) {
      // alpheios normalizes exclamation to interjection (following treebank guidelines)
      return Constants.POFS_INTERJECTION
    } else {
      return featureValue
    }
  }

  static _tonosToOxia (word) {
    return word.replace(
      /\u{03AC}/ug, '\u{1F71}').replace( // alpha
      /\u{03AD}/ug, '\u{1F73}').replace( // epsilon
      /\u{03AE}/ug, '\u{1F75}').replace( // eta
      /\u{03AF}/ug, '\u{1F77}').replace( // iota
      /\u{03CC}/ug, '\u{1F79}').replace( // omicron
      /\u{03CD}/ug, '\u{1F7B}').replace( // upsilon
      /\u{03CE}/ug, '\u{1F7D}').replace( // omega
      /\u{0390}/ug, '\u{1FD3}').replace( // iota with dialytika and tonos
      /\u{03B0}/ug, '\u{1FE3}') // upsilon with dialytika and tonos
  }

  /**
   * @override
   */
  static alternateWordEncodings ({
    word = null, preceding = null, following = null,
    encoding = null, preserveCase = false, includeOriginal = false
  } = {}) {
    // the original alpheios code used the following normalizations
    // 1. When looking up a lemma
    //    stripped vowel length
    //    stripped caps
    //    then if failed, tried again with out these
    // 2. when adding to a word list
    //    precombined unicode (vowel length/diacritics preserved)
    // 2. When looking up a verb in the verb paradigm tables
    //    it set e_normalize to false, otherwise it was true...
    if (!word) {
      return []
    }
    // make sure it's normalized to NFC
    let normalized = GreekLanguageModel.normalizeText(word) // eslint-disable-line prefer-const
    // and in lower case unless explicitly requested otherwise
    if (!preserveCase) {
      normalized = normalized.toLocaleLowerCase()
    }
    const strippedVowelLength = normalized.replace(
      /[\u{1FB0}\u{1FB1}]/ug, '\u{03B1}').replace(
      /[\u{1FB8}\u{1FB9}]/ug, '\u{0391}').replace(
      /[\u{1FD0}\u{1FD1}]/ug, '\u{03B9}').replace(
      /[\u{1FD8}\u{1FD9}]/ug, '\u{0399}').replace(
      /[\u{1FE0}\u{1FE1}]/ug, '\u{03C5}').replace(
      /[\u{1FE8}\u{1FE9}]/ug, '\u{03A5}').replace(
      /[\u{00AF}\u{0304}\u{0306}]/ug, '') // eslint-disable-line no-misleading-character-class

    // Per https://wiki.digitalclassicist.org/Greek_Unicode_duplicated_vowels
    // oxia and tonos are semantically identical and tonos should be preferred over oxia
    // both both should be processed as equivalent. the normalize('NFC') function will
    // normalize oxia to tonos, but some of our dictionary indicies may use oxia so
    // we should allow oxia back in as an alternate encoding
    const tonosToOxia = GreekLanguageModel._tonosToOxia(normalized)

    const strippedDiaeresis = normalized.replace(
      /\u{0390}/ug, '\u{03AF}').replace(
      /\u{03AA}/ug, '\u{0399}').replace(
      /\u{03AB}/ug, '\u{03A5}').replace(
      /\u{03B0}/ug, '\u{03CD}').replace(
      /\u{03CA}/ug, '\u{03B9}').replace(
      /\u{03CB}/ug, '\u{03C5}').replace(
      /\u{1FD2}/ug, '\u{1F76}').replace(
      /\u{1FD3}/ug, '\u{1F77}').replace(
      /\u{1FD7}/ug, '\u{1FD6}').replace(
      /\u{1FE2}/ug, '\u{1F7A}').replace(
      /\u{1FE3}/ug, '\u{1F7B}').replace(
      /\u{1FE7}/ug, '\u{1FE6}').replace(
      /\u{1FC1}/ug, '\u{1FC0}').replace(
      /\u{1FED}/ug, '\u{1FEF}').replace(
      /\u{1FEE}/ug, '\u{1FFD}').replace(
      /[\u{00A8}\u{0308}]/ug, '') // eslint-disable-line no-misleading-character-class
    // to strip diacritics, rather than list all possible combined vowels with
    // diacritis, decompose, remove the combining accents, and then recompose
    const strippedDiacritics = normalized.normalize('NFD').replace(
      /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}]/ug, '').normalize('NFC') // eslint-disable-line no-misleading-character-class

    let alternates = []
    if (encoding === 'strippedDiaeresis') {
      alternates.push(strippedDiaeresis)
    } else if (encoding === 'strippedDiacritics') {
      alternates.push(strippedDiacritics)
    } else if (encoding === 'strippedAll') {
      alternates.push(strippedDiaeresis.normalize('NFD').replace(
        /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}\u{314}\u{313}\u{345}]/ug, '').normalize('NFC')) // eslint-disable-line no-misleading-character-class
    } else {
      // default is to strip vowel lengths and replace tonos with oxia
      alternates.push(strippedVowelLength)
      if (tonosToOxia !== strippedVowelLength) {
        alternates.push(tonosToOxia)
      }
    }
    if (!includeOriginal) {
      alternates = alternates.filter(w => w !== word)
    }
    return alternates
  }

  /**
   * Get a list of valid puncutation for this language
   *
   * @returns {string} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return '.,;:!?"(){}\\[\\]<>\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u201C\u201D\u0387\u00B7\n\r\u200C\u200D'
  }

  /**
   * Sets inflection grammar properties based on its characteristics
   *
   * @param {Inflection} inflection - An inflection object
   * @returns {object} Inflection properties
   */
  static getInflectionConstraints (inflection) {
    const constraints = {
      fullFormBased: false,
      suffixBased: false,
      pronounClassRequired: false
    }
    const formBasedList = [Constants.POFS_PRONOUN, Constants.POFS_NUMERAL, Constants.POFS_ARTICLE]
    if (inflection.hasOwnProperty(Feature.types.part)) {
      if (formBasedList.includes(inflection[Feature.types.part].value)) {
        constraints.fullFormBased = true
      } else {
        constraints.suffixBased = true
      }
    } else {
      Logger.getInstance().warn('Unable to set grammar: part of speech data is missing or is incorrect', inflection[Feature.types.part])
    }

    constraints.pronounClassRequired =
      LanguageModelFactory.compareLanguages(GreekLanguageModel.languageID, inflection.languageID) &&
      inflection.hasOwnProperty(Feature.types.part) &&
      inflection[Feature.types.part].value === Constants.POFS_PRONOUN

    return constraints
  }

  /**
   * Determines a class of a given word (pronoun) by finding a matching word entry(ies)
   * in a pronoun source info (`forms`) and getting a single or multiple classes of those entries.
   * Some morphological analyzers provide class information that is unreliable or do not
   * provide class information at all. However, class information is essential in
   * deciding in what table should pronouns be grouped. For this, we have to
   * determine pronoun classes using this method.
   *
   * @param {Form[]} forms - An array of known forms of pronouns.
   * @param {string} word - A word we need to find a matching class for.
   * @param hdwd
   * @param {boolean} normalize - Whether normalized forms of words shall be used for comparison.
   * @returns {Feature} Matching classes found within a Feature objects. If no matching classes found,
   * returns undefined.
   */
  static getPronounClasses (forms, word, hdwd, normalize = true) {
    // eslint-disable-next-line prefer-const
    let matchingValues = new Set() // Will eliminate duplicated values
    const matchingForms = forms.filter(
      form => {
        let match = false
        // the following test intential looks for an exact equality on the headword rather than
        // using compareWord because exact match on diacritics matters -- the interrogative and indefinite
        // pronouns only differ by diacritics
        if (form.value && (!form.features[Feature.types.hdwd] || (form.features[Feature.types.hdwd].value === hdwd))) {
          match = GreekLanguageModel.compareWords(form.value, word, normalize)
        }
        return match
      }
    )
    for (const matchingForm of matchingForms) {
      if (matchingForm.features.hasOwnProperty(Feature.types.grmClass)) {
        for (const value of matchingForm.features[Feature.types.grmClass].values) {
          matchingValues.add(value)
        }
      }
    }
    if (matchingValues.size > 0) {
      return new Feature(Feature.types.grmClass, Array.from(matchingValues), GreekLanguageModel.languageID)
    }
  }

  /**
   * Checks if two words are equivalent.
   *
   * @override
   * @param {string} wordA - a first word to be compared.
   * @param {string} wordB - a second word to be compared.
   * @param {boolean} normalize - whether or not to apply normalization algorithms
   * with an `alternateWordEncodings()` function.
   * @param {object} options - Additional comparison criteria.
   * @param {boolean} options.normalizeTrailingDigit - whether to consider the form
   * of a trailing digit during comparison.
   */
  static compareWords (wordA, wordB, normalize = true,
    { normalizeTrailingDigit = false } = {}) {
    let matched = false
    if (normalize) {
      if (normalizeTrailingDigit) {
        /*
        If a trailing digit is `1` (e.g. `αἴγυπτος1`) remove it, because the word with it is an equivalent of
        a word without (e.g. `αἴγυπτος`).
         */
        wordA = this.normalizeTrailingDigit(wordA)
        wordB = this.normalizeTrailingDigit(wordB)
      }

      const altWordA = GreekLanguageModel.alternateWordEncodings({
        word: wordA,
        encoding: 'strippedDiacritics',
        includeOriginal: true
      })
      const altWordB = GreekLanguageModel.alternateWordEncodings({
        word: wordB,
        encoding: 'strippedDiacritics',
        includeOriginal: true
      })
      for (let i = 0; i < altWordA.length; i++) {
        matched = altWordA[i] === altWordB[i]
        if (matched) {
          break
        }
      }
      if (!matched) {
        matched = GreekLanguageModel.normalizeText(wordA) === GreekLanguageModel.normalizeText(wordB)
      }
    } else {
      matched = wordA === wordB
    }
    return matched
  }

  static isValidUnicode (word) {
    return GreekChars.chars.some(char => word.includes(char))
  }
}

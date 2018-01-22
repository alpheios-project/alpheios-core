import LMF from './language_model_factory.js'
import * as i18n from './i18n.js'
/**
 * Wrapper class for a (grammatical, usually) feature, such as part of speech or declension. Keeps both value and type information.
 */
class Feature {
    /**
     * Initializes a Feature object
     * @param {string | string[]} value - A single feature value or, if this feature could have multiple
     * values, an array of values.
     * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {String | Symbol} language - A language of a feature, allowed values are specified in 'languages' object.
     * @param {int} sortOrder - an integer used for sorting
     */
  constructor (value, type, language, sortOrder = 1) {
    if (!Feature.types.isAllowed(type)) {
      throw new Error('Features of "' + type + '" type are not supported.')
    }
    if (!value) {
      throw new Error('Feature should have a non-empty value.')
    }
    if (!type) {
      throw new Error('Feature should have a non-empty type.')
    }
    if (!language) {
      throw new Error('Feature constructor requires a language')
    }
    this.value = value
    this.type = type
    this.languageID = undefined
    this.languageCode = undefined
    ;({languageID: this.languageID, languageCode: this.languageCode} = LMF.getLanguageAttrs(language))
    this.sortOrder = sortOrder
  }

  /**
   * This is a compatibility function for legacy code.
   * @return {String} A language code.
   */
  get language () {
    console.warn(`Please use a "languageID" instead of a "language"`)
    return this.languageCode
  }

  isEqual (feature) {
    if (Array.isArray(feature.value)) {
      if (!Array.isArray(this.value) || this.value.length !== feature.value.length) {
        return false
      }
      let equal = this.type === feature.type && LMF.compareLanguages(this.languageID, feature.languageID)
      equal = equal && this.value.every(function (element, index) {
        return element === feature.value[index]
      })
      return equal
    } else {
      return this.value === feature.value && this.type === feature.type && LMF.compareLanguages(this.languageID, feature.languageID)
    }
  }

  /**
   * examine the feature for a specific value
   * @param {string} value
   * @returns {boolean} true if the value is included in the feature's values
   */
  hasValue (value) {
    if (Array.isArray(this.value)) {
      return this.value.includes(value)
    } else {
      return this.value === value
    }
  }

  /**
   * string representation of a feature
   * @return {string}
   */
  toString () {
    if (Array.isArray(this.value)) {
      return this.value.join(',')
    } else {
      return this.value
    }
  }

  /**
   * a locale-specific abbreviation for a feature's values
   * @return {string}
   */
  toLocaleStringAbbr (lang = 'en') {
    if (Array.isArray(this.value)) {
      return this.value.map((v) => this.toLocaleStringAbbr(v, lang))
    } else {
      return i18n.i18n[lang][this.value].abbr
    }
  }
}
// Should have no spaces in values in order to be used in HTML templates
Feature.types = {
  word: 'word',
  part: 'part of speech', // Part of speech
  number: 'number',
  'case': 'case',
  grmCase: 'case', // A synonym of `case`
  declension: 'declension',
  gender: 'gender',
  type: 'type',
  'class': 'class',
  grmClass: 'class', // A synonym of `class`
  conjugation: 'conjugation',
  comparison: 'comparison',
  tense: 'tense',
  voice: 'voice',
  mood: 'mood',
  person: 'person',
  frequency: 'frequency', // How frequent this word is
  meaning: 'meaning', // Meaning of a word
  source: 'source', // Source of word definition
  footnote: 'footnote', // A footnote for a word's ending
  dialect: 'dialect', // a dialect iderntifier
  note: 'note', // a general note
  pronunciation: 'pronunciation',
  age: 'age',
  area: 'area',
  geo: 'geo', // geographical data
  kind: 'kind', // verb kind informatin
  derivtype: 'derivtype',
  stemtype: 'stemtype',
  morph: 'morph', // general morphological information
  var: 'var', // variance?
  isAllowed (value) {
    let v = `${value}`
    return Object.values(this).includes(v)
  }
}
export default Feature

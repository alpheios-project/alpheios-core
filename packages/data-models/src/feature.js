/**
 * Wrapper class for a (grammatical, usually) feature, such as part of speech or declension. Keeps both value and type information.
 */
class Feature {

  /**
   * Initializes a Feature object
   * @param {string | string[]} value - A single feature value or, if this feature could have multiple
   * values, an array of values.
   * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
   * @param {string} language - A language of a feature, allowed values are specified in 'languages' object.
   */
  constructor (value, type, language) {
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
    this.language = language

  };

  isEqual (feature) {
    if (Array.isArray(feature.value)) {
      if (!Array.isArray(this.value) || this.value.length !== feature.value.length) {
        return false
      }
      let equal = this.type === feature.type && this.language === feature.language
      equal = equal && this.value.every(function (element, index) {
        return element === feature.value[index]
      })
      return equal
    }
    else {
      return this.value === feature.value && this.type === feature.type && this.language === feature.language
    }
  }
}

// Should have no spaces in values in order to be used in HTML templates
Feature.types = {
  word: 'word',
  part: 'part of speech', // Part of speech
  number: 'number',
  grmCase: 'case',
  declension: 'declension',
  gender: 'gender',
  type: 'type',
  conjugation: 'conjugation',
  tense: 'tense',
  voice: 'voice',
  mood: 'mood',
  person: 'person',
  frequency: 'frequency', // How frequent this word is
  meaning: 'meaning', // Meaning of a word
  source: 'source', // Source of word definition
  footnote: 'footnote', // A footnote for a word's ending
  isAllowed (value) {
    let v = `${value}`
    return Object.values(this).includes(v)
  }
}
export default Feature

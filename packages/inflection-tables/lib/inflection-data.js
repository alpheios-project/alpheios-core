// import * as Models from 'alpheios-data-models'
// import InflectionItemsGroup from './inflection-items-group.js'
// import Suffix from './suffix'
// import Footnote from './footnote'

/**
 * A return value for inflection queries. Stores suffixes, forms and corresponding footnotes.
 * Inflection data is grouped first by a part of speech within a [Models.Feature.types.part] property object.
 * Inside that object, it is grouped by type: suffixes, or forms.
 */
export default class InflectionData {
  constructor (homonym) {
    this.homonym = homonym
    this.pos = new Map()
  }

  addInflectionSet (infectionSet) {
    this.pos.set(infectionSet.partOfSpeech, infectionSet)
  }

  get targetWord () {
    if (this.homonym && this.homonym.targetWord) {
      return this.homonym.targetWord
    }
  }

  get languageID () {
    if (this.homonym) {
      return this.homonym.languageID
    }
  }

  get hasInflectionSets () {
    return this.pos.size > 0
  }

  /**
   * Returns a list of parts of speech that have any inflection data for them.
   * @return {string[]} Names of parts of speech, as strings, in an array.
   */
  get partsOfSpeech () {
    return Array.from(this.pos.keys())
  }

  /**
   * Returns either suffixes or forms of a given part of speech.
   * @param {string} partOfSpeech.
   * @param {string} inflectionType.
   * @return {Suffix[] | Form[]}
   */
  getMorphemes (partOfSpeech, inflectionType) {
    if (this.pos.has(partOfSpeech)) {
      let inflectionSet = this.pos.get(partOfSpeech)
      if (inflectionSet.types.has(inflectionType)) {
        return inflectionSet.types.get(inflectionType).types
      }
    }
    return []
  }

  /**
   * Returns footnotes for either suffixes or forms of a given part of speech.
   * @param {string} partOfSpeech.
   * @param {string} inflectionType.
   * @return {Map}
   */
  getFootnotesMap (partOfSpeech, inflectionType) {
    if (this.pos.has(partOfSpeech)) {
      let inflectionSet = this.pos.get(partOfSpeech)
      if (inflectionSet.types.has(inflectionType)) {
        return inflectionSet.types.get(inflectionType).footnotesMap
      }
    }
    return new Map()
  }

  /**
   * Retrieves all variants of feature values for a given part of speech.
   * @param partOfSpeech
   * @param featureName
   */
  /* getFeatureValues (partOfSpeech, featureName) {
    let values = []
    if (this.pos.has(partOfSpeech)) {
      for (const item of this[partOfSpeech].suffixes) {
        if (item.hasOwnProperty('features') && item.features.hasOwnProperty(featureName)) {
          let value = item.features[featureName]
          if (!values.includes(value)) {
            values.push(value)
          }
        }
      }
    }
    return values
  } */

  // Probably we won't need it any more
  /* static readObject (jsonObject) {
    // let homonym = Models.Homonym.readObject(jsonObject.homonym)

    let lexicalData = new InflectionData()
    lexicalData[Models.Feature.types.part] = jsonObject[Models.Feature.types.part]

    for (let part of lexicalData[Models.Feature.types.part]) {
      let partData = jsonObject[part]
      lexicalData[part] = {}

      if (partData.suffixes) {
        lexicalData[part].suffixes = []
        for (let suffix of partData.suffixes) {
          lexicalData[part].suffixes.push(Suffix.readObject(suffix))
        }
      }

      if (partData.footnotes) {
        lexicalData[part].footnotes = []
        for (let footnote of partData.footnotes) {
          lexicalData[part].footnotes.push(Footnote.readObject(footnote))
        }
      }
    }

    return lexicalData
  } */
}

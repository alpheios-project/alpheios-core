import * as Models from 'alpheios-data-models'
import Suffix from './suffix'
import Form from './form'
import Footnote from './footnote'
import InflectionData from './inflection-data'

/**
 * Stores inflection language data
 */
export default class LanguageDataset {
  /**
   * Initializes a LanguageDataset.
   * @param {string} languageID - A language ID of a data set.
   */
  constructor (languageID) {
    if (!languageID) {
      // Language is not supported
      throw new Error('Language ID cannot be empty.')
    }

    this.languageID = languageID
    this.suffixes = [] // An array of suffixes.
    this.forms = [] // An array of suffixes.
    this.footnotes = [] // Footnotes
  };

  /**
   * Each grammatical feature can be either a single or an array of Feature objects. The latter is the case when
   * an ending can belong to several grammatical features at once (i.e. belong to both 'masculine' and
   * 'feminine' genders
   *
   * @param {string | null} itemValue - A text of an item. It is either a string or null if there is no suffix.
   * @param {string} itemType - either LanguageDataset.FORM or LanguageDataset.SUFFIX
   * @param {Feature[]} featureValue
   * @return {Suffix} A newly added data value (Form or Suffix) (can be used to add more data to the suffix).
   */
  addItem (itemValue, itemType, featureValue, extendedLangData) {
    // TODO: implement run-time error checking
    let item
    let store
    if (itemType === LanguageDataset.SUFFIX) {
      item = new Suffix(itemValue)
      store = this.suffixes
    } else if (itemType === LanguageDataset.FORM) {
      item = new Form(itemValue)
      store = this.forms
    } else {
      throw new Error(`Unknown item type "${itemType}"`)
    }
    item.extendedLangData = extendedLangData

    // Build all possible combinations of features
    let multiValueFeatures = []

    // Go through all features provided
    for (let feature of featureValue) {
      // If this is a footnote. Footnotes should go in a flat array
      // because we don't need to split by them
      if (feature.type === Models.Feature.types.footnote) {
        item[Models.Feature.types.footnote] = item[Models.Feature.types.footnote] || []
        item[Models.Feature.types.footnote].push(feature.value)
        continue
      }

      // If this ending has several grammatical feature values then they will be in an array
      if (Array.isArray(feature)) {
        if (feature.length > 0) {
          if (feature[0]) {
            let type = feature[0].type
            // Store all multi-value features to create a separate copy of a a Suffix object for each of them
            multiValueFeatures.push({type: type, features: feature})
          } else {
            console.log(feature)
          }
        } else {
          // Array is empty
          throw new Error('An empty array is provided as a feature argument to the "addSuffix" method.')
        }
      } else {
        item.features[feature.type] = feature.value
      }
    }

    // Create a copy of an Suffix object for each multi-value item
    if (multiValueFeatures.length > 0) {
      for (let featureGroup of multiValueFeatures) {
        let endingItems = item.split(featureGroup.type, featureGroup.features)
        store.push(...endingItems)
      }
    } else {
      store.push(item)
    }
  };

  /**
   * Stores a footnote item.
   * @param {Feature} partOfSpeech - A part of speech this footnote belongs to
   * @param {number} index - A footnote's index.
   * @param {string} text - A footnote's text.
   */
  addFootnote (partOfSpeech, index, text) {
    if (!index) {
      throw new Error('Footnote index data should not be empty.')
    }

    if (!text) {
      throw new Error('Footnote text data should not be empty.')
    }

    let footnote = new Footnote(index, text, partOfSpeech.value)
    footnote.index = index

    this.footnotes.push(footnote)
  };

  getSuffixes (homonym) {
    // Add support for languages
    let result = new InflectionData(homonym.languageID)
    let inflections = {}

    // Find partial matches first, and then full among them

    // TODO: do we ever need lemmas?
    for (let lexema of homonym.lexemes) {
      for (let inflection of lexema.inflections) {
        // add the lemma to the inflection
        inflection[Models.Feature.types.word] =
          [new Models.Feature(lexema.lemma.word, Models.Feature.types.word, lexema.lemma.language)]
        // Group inflections by a part of speech
        let partOfSpeech = inflection[Models.Feature.types.part]
        if (!partOfSpeech) {
          throw new Error('Part of speech data is missing in an inflection')
        }
        if (!Array.isArray(partOfSpeech)) {
          throw new Error('Part of speech data should be in an array format')
        }
        if (partOfSpeech.length === 0 && partOfSpeech.length > 1) {
          throw new Error('Part of speech data should be an array with exactly one element')
        }
        partOfSpeech = partOfSpeech[0].value

        if (!inflections.hasOwnProperty(partOfSpeech)) {
          inflections[partOfSpeech] = []
        }
        inflections[partOfSpeech].push(inflection)
      }
    }

    // Scan for matches for all parts of speech separately
    for (const partOfSpeech in inflections) {
      if (inflections.hasOwnProperty(partOfSpeech)) {
        let inflectionsGroup = inflections[partOfSpeech]

        result[Models.Feature.types.part].push(partOfSpeech)
        result[partOfSpeech] = {}
        let items = this.forms.reduce(this['reducer'].bind(this, inflectionsGroup, LanguageDataset.FORM), [])
        if (items.length === 0) {
          items = this.suffixes.reduce(this['reducer'].bind(this, inflectionsGroup, LanguageDataset.SUFFIX), [])
        }
        result[partOfSpeech].suffixes = items
        result[partOfSpeech].footnotes = []

        // Create a set so all footnote indexes be unique
        let footnotesIndex = new Set()
        // Scan all selected suffixes to build a unique set of footnote indexes
        for (let item of result[partOfSpeech].suffixes) {
          if (item.hasOwnProperty(Models.Feature.types.footnote)) {
            // Footnote indexes are stored in an array
            for (let index of item[Models.Feature.types.footnote]) {
              footnotesIndex.add(index)
            }
          }
        }
        // Add footnote indexes and their texts to a result
        for (let index of footnotesIndex) {
          let footnote = this.footnotes.find(footnoteElement =>
            footnoteElement.index === index && footnoteElement[Models.Feature.types.part] === partOfSpeech
          )
          result[partOfSpeech].footnotes.push({index: index, text: footnote.text})
        }
        // Sort footnotes according to their index numbers
        result[partOfSpeech].footnotes.sort((a, b) => parseInt(a.index) - parseInt(b.index))
      }
    }

    return result
  }

  reducer (inflections, type, accumulator, item) {
    let result = this.matcher(inflections, type, item)
    if (result) {
      accumulator.push(result)
    }
    return accumulator
  }
}
LanguageDataset.SUFFIX = 'suffix'
LanguageDataset.FORM = 'form'

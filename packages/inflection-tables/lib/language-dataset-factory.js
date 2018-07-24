import InflectionData from './inflection-data.js'
import LatinDataset from './lang/latin/latin-language-dataset.js'
import GreekDataset from './lang/greek/greek-language-dataset.js'

// Stores a LanguageDatasetFactory's single instance
let datasetFactory

/**
 * Creates and stores datasets for all available languages. This is a singleton.
 * When created, datasets' data is not loaded yet. It will be loaded on a first call (lazy initialization).
 */
export default class LanguageDatasetFactory {
  /**
   * @param {Constructor[]} languageData - Language datasets of supported languages.
   */
  constructor (languageData = [LatinDataset, GreekDataset]) {
    this.sets = new Map()
    for (let Set of languageData) {
      this.sets.set(Set.languageID, new Set())
    }
  }

  /**
   * Returns a single instance of self.
   * @return {LanguageDatasetFactory} A self instances.
   */
  static get instance () {
    if (!datasetFactory) {
      datasetFactory = new LanguageDatasetFactory()
    }
    return datasetFactory
  }

  /**
   * Returns an instance of a dataset for a language ID given.
   * @param {symbol} languageID - A language ID of a dataset to be retrieved.
   * @return {LanguageDataset} An instance of a language dataset.
   */
  static getDataset (languageID) {
    let instance = this.instance
    if (instance.sets.has(languageID)) {
      let dataset = instance.sets.get(languageID)
      if (!dataset.dataLoaded) {
        dataset.loadData()
      }
      return dataset
    }
  }

  /**
   * Finds matching forms or suffixes for a homonym.
   * @deprecated Will be removed when will have no usages
   * @param {Homonym} homonym - A homonym for which matching suffixes must be found.
   * @return {InflectionData} A return value of an inflection query.
   */
  static getInflectionData (homonym) {
    let instance = this.instance
    if (instance.sets.has(homonym.languageID)) {
      let dataset = this.getDataset(homonym.languageID)
      for (let inflection of homonym.inflections) {
        // Set grammar rules for an inflection
        inflection.setConstraints()
        // dataset.setInflectionConstraints(inflection)
      }
      return dataset.getInflectionData(homonym)
    } else {
      return new InflectionData(homonym) // Return an empty inflection data set
    }
  }
}

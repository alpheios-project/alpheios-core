import InflectionData from './inflection-data'

/**
 * Stores one or several language datasets, one for each language
 */
export default class LanguageData {
  /**
   * Combines several language datasets for different languages. Allows to abstract away language data.
   * This function is chainable.
   * @param {LanguageDataset[]} languageData - Language datasets of different languages.
   * @return {LanguageData} Self instance for chaining.
   */
  constructor (languageData) {
    this.supportedLanguages = []

    if (languageData) {
      for (let dataset of languageData) {
        this[dataset.language] = dataset
        this.supportedLanguages.push(dataset.language)
      }
    }
    return this
  }

  /**
   * Loads data for all data sets.
   * This function is chainable.
   * @return {LanguageData} Self instance for chaining.
   */
  loadData () {
    for (let language of this.supportedLanguages) {
      try {
        this[language].loadData()
      } catch (e) {
        console.log(e)
      }
    }
    return this
  }

  /**
   * Finds matching suffixes for a homonym.
   * @param {Homonym} homonym - A homonym for which matching suffixes must be found.
   * @return {InflectionData} A return value of an inflection query.
   */
  getSuffixes (homonym) {
    let language = homonym.language
    if (this.supportedLanguages.includes(language)) {
      return this[homonym.language].getSuffixes(homonym)
    } else {
      // throw new Error(`"${language}" language data is missing. Unable to get suffix data.`)
      return new InflectionData(homonym)
    }
  }
}

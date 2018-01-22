import InflectionData from './inflection-data'
import LatinDataSet from './lang/latin/latin'
import { dataSet as GreekDataSet } from './lang/greek/greek'

/**
 * Stores one or several language datasets, one for each language
 */
export default class LanguageDataList {
  /**
   * Combines several language datasets for different languages. Allows to abstract away language data.
   * This function is chainable.
   * @param {LanguageDataset[]} languageData - Language datasets of different languages.
   */
  constructor (languageData = [LatinDataSet, GreekDataSet]) {
    this.sets = new Map(languageData.map(item => [item.languageID, item]))
  }

  /**
   * Loads data for all data sets.
   * This function is chainable.
   * @return {LanguageDataList} Self instance for chaining.
   */
  loadData () {
    try {
      for (let dataset of this.sets.values()) {
        dataset.loadData()
      }
    } catch (e) {
      console.log(e)
    }
    return this
  }

  /**
   * Finds matching suffixes for a homonym.
   * @param {Homonym} homonym - A homonym for which matching suffixes must be found.
   * @return {InflectionData} A return value of an inflection query.
   */
  getSuffixes (homonym) {
    if (this.sets.has(homonym.languageID)) {
      return this.sets.get(homonym.languageID).getSuffixes(homonym)
    } else {
      return new InflectionData(homonym) // Return an empty inflection data set
    }
  }
}

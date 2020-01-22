/* eslint-disable prefer-const */
import { Constants, LanguageModelFactory as LMF } from 'alpheios-data-models'
import ViewSet from './view-set.js'
import LatinViewSet from '../lang/latin/latin-view-set.js'
import GreekViewSet from '../lang/greek/greek-view-set.js'

export default class ViewSetFactory {
  static create (homonym) {
    let viewSet
    try {
      const Constructor = this.getConstructor(homonym.languageID)
      viewSet = new Constructor(homonym)
    } catch (e) {
      console.error(`Cannot build inflection tables: ${e}`)
      // Create an empty ViewSet with no inflection data
      viewSet = new ViewSet()
    }

    return viewSet
  }

  static hasInflectionsEnabled (languageID) {
    return LMF.getLanguageModel(languageID).canInflect()
  }

  static getConstructor (languageID) {
    switch (languageID) {
      case Constants.LANG_LATIN:
        return LatinViewSet
      case Constants.LANG_GREEK:
        return GreekViewSet
      default:
        return ViewSet
    }
  }

  /**
   * Returns a created and initialized instance of a standard form view
   * @param standardFormData
   * @param {Object} standardFormData - A data object for the standard form view
   * @param {symbol} standardFormData.langID - A language ID
   * @param {String} standardFormData.viewID - A view ID
   * @param {String} [standardFormData.title] - A view title (optional)
   * @param {String} [standardFormData.form] - A word form (optional)
   * @param {String} [standardFormData.suffix] - A word suffix (optional)
   * @param {String} [standardFormData.paradigmID] - A paradigm ID (for Greek paradigms only)
   * @return {View} An initialized view
   */
  static getStandardForm (standardFormData) {
    return this.getConstructor(standardFormData.langID).getStandardForm(standardFormData)
  }
}

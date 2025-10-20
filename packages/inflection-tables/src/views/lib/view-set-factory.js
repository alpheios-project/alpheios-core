/* eslint-disable prefer-const */
import { Constants, LanguageModelFactory as LMF, Logger } from '@alpheios-core/data-models'
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
      Logger.getInstance().error(`Cannot build inflection tables: ${e}`)
      // Create an empty ViewSet with no inflection data
      viewSet = new ViewSet()
    }

    return viewSet
  }

  static hasInflectionsEnabled (languageID) {
    return LMF.getLanguageModel(languageID).canInflect()
  }

  static getConstructor (languageID) {
    const langCode = LMF.getLanguageCodeFromId(languageID)
    if ((languageID === Constants.LANG_LATIN) || (langCode === Constants.STR_LANG_CODE_LAT))
      return LatinViewSet
    if ((languageID === Constants.LANG_GREEK) || (langCode === Constants.STR_LANG_CODE_GRC))
      return GreekViewSet

    return ViewSet
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

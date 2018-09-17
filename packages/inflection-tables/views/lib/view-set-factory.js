import { Constants, LanguageModelFactory as LMF } from 'alpheios-data-models'
import ViewSet from './view-set.js'
import LatinViewSet from '../lang/latin/latin-view-set.js'
import GreekViewSet from '../lang/greek/greek-view-set.js'

export default class ViewSetFactory {
  static create (homonym, locale) {
    let viewSet
    try {
      let Constructor = this.getConstructor(homonym.languageID)
      viewSet = new Constructor(homonym, locale)
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

  static getStandardForm (languageID, options, locale) {
    return this.getConstructor(languageID).getStandardForm(options, locale)
  }
}

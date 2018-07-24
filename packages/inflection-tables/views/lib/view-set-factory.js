import {Constants} from 'alpheios-data-models'
import ViewSet from './view-set.js'
import LatinViewSet from '../lang/latin/latin-view-set.js'
import GreekViewSet from '../lang/greek/greek-view-set.js'

export default class ViewSetFactory {
  static create (homonym, locale) {
    let Constructor = this.getConstructor(homonym.languageID)
    return new Constructor(homonym, locale)
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

  static getStandardForm (languageID, viewID, formID, messages) {
    return this.getConstructor(languageID).getStandardForm(viewID, formID, messages)
  }
}

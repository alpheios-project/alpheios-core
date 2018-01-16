import LatinViews from '../lang/latin.js'
import GreekViews from '../lang/greek.js'
import * as Models from 'alpheios-data-models'

export default class ViewSet {
  constructor () {
    this.views = new Map()
    this.views.set(Models.Constants.LANG_LATIN, LatinViews)
    this.views.set(Models.Constants.LANG_GREEK, GreekViews)
  }

  getViews (inflectionData) {
    if (this.views.has(inflectionData.languageID)) {
      return this.views.get(inflectionData.languageID)
        .filter(view => inflectionData[Models.Feature.types.part].includes(view.partOfSpeech))
    }
    return []
  }
}

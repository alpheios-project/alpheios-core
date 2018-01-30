import LatinViews from '../lang/latin.js'
import GreekViews from '../lang/greek.js'
import * as Models from 'alpheios-data-models'

export default class ViewSet {
  constructor (inflectionData = undefined) {
    this.views = new Map()
    this.views.set(Models.Constants.LANG_LATIN, LatinViews)
    this.views.set(Models.Constants.LANG_GREEK, GreekViews)
    this.inflectionData = inflectionData
    this.matchingViews = []

    if (this.views.has(inflectionData.languageID)) {
      this.matchingViews = this.views.get(inflectionData.languageID)
        .filter(view =>
          inflectionData[Models.Feature.types.part].includes(view.partOfSpeech) &&
          view.enabledForLexemes(inflectionData.homonym.lexemes))
    }

    this.partsOfSpeech = []
    this.partOfSpeechViews = {}
    for (const view of this.matchingViews) {
      if (!this.partsOfSpeech.includes(view.partOfSpeech)) {
        this.partsOfSpeech.push(view.partOfSpeech)
        this.partOfSpeechViews[view.partOfSpeech] = []
      }
      this.partOfSpeechViews[view.partOfSpeech].push(view)
    }
  }

  getViews (partOfSpeech = undefined) {
    if (this.partsOfSpeech.includes(partOfSpeech)) {
      return this.partOfSpeechViews[partOfSpeech]
    } else {
      return []
    }
  }
}

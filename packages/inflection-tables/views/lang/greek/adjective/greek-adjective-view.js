import { Constants } from 'alpheios-data-models'
import Suffix from '@lib/suffix.js'
import GreekView from '@views/lang/greek/greek-view.js'

export default class GreekAdjectiveView extends GreekView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.id = 'adjectiveDeclension'
    this.name = 'adjective declension'
    this.title = 'Adjective declension'

    this.createTable()
  }

  static get viewID () {
    return 'greek_adjective_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_ADJECTIVE]
  }

  static get inflectionType () {
    return Suffix
  }

  static getOrderedGenders (ancestorFeatures) {
    const ancestorValue = ancestorFeatures.length > 0 ? ancestorFeatures[ancestorFeatures.length - 1].value : ''
    if (ancestorValue === Constants.ORD_2ND) {
      return [
        this.featureMap.get(GreekView.datasetConsts.GEND_MASCULINE_FEMININE),
        this.featureMap.get(Constants.GEND_NEUTER)
      ]
    } else if (ancestorValue === Constants.ORD_3RD) {
      return [
        this.featureMap.get(Constants.GEND_FEMININE),
        this.featureMap.get(GreekView.datasetConsts.GEND_MASCULINE_FEMININE),
        this.featureMap.get(Constants.GEND_NEUTER)
      ]
    } else {
      return [
        this.featureMap.get(Constants.GEND_FEMININE),
        this.featureMap.get(Constants.GEND_MASCULINE),
        this.featureMap.get(Constants.GEND_NEUTER)
      ]
    }
  }
}

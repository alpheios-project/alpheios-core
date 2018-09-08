import { Constants } from 'alpheios-data-models'
import Morpheme from '@lib/morpheme.js'
import Suffix from '@lib/suffix.js'
import GreekView from '@views/lang/greek/greek-view.js'

export default class GreekNounView extends GreekView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.id = 'nounDeclension'
    this.name = 'noun declension'
    this.title = 'Noun declension'

    this.features.genders.addFeature(GreekView.datasetConsts.GEND_MASCULINE_FEMININE, [Constants.GEND_MASCULINE, Constants.GEND_FEMININE])
    this.features.genders.comparisonType = Morpheme.comparisonTypes.ALL_VALUES
    this.features.genders.getOrderedValues = this.constructor.getOrderedGenders

    this.createTable()
  }

  static get viewID () {
    return 'greek_noun_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_NOUN]
  }

  static get inflectionType () {
    return Suffix
  }

  static getOrderedGenders (ancestorFeatures) {
    const ancestorValue = ancestorFeatures[ancestorFeatures.length - 1].value
    if ([Constants.ORD_2ND, Constants.ORD_3RD].includes(ancestorValue)) {
      return [
        this.featureMap.get(GreekView.datasetConsts.GEND_MASCULINE_FEMININE),
        this.featureMap.get(Constants.GEND_NEUTER)
      ]
    } else {
      return [
        this.featureMap.get(Constants.GEND_MASCULINE),
        this.featureMap.get(Constants.GEND_FEMININE),
        this.featureMap.get(Constants.GEND_NEUTER)
      ]
    }
  }
}

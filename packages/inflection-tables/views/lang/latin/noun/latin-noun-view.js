import { Constants } from 'alpheios-data-models'
import Morpheme from '@lib/morpheme.js'
import Suffix from '@lib/suffix.js'
import LatinView from '@views/lang/latin/latin-view.js'

export default class LatinNounView extends LatinView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)
    this.id = 'noun_declension'
    this.name = 'noun declension'
    this.title = 'Noun declension'

    this.features.genders.addFeature(LatinView.datasetConsts.GEND_MASCULINE_FEMININE, [Constants.GEND_MASCULINE, Constants.GEND_FEMININE])
    this.features.genders.getOrderedFeatures = this.constructor.getOrderedGenders
    this.features.genders.getTitle = this.constructor.getGenderTitle
    this.features.genders.comparisonType = Morpheme.comparisonTypes.ALL_VALUES

    if (this.isImplemented) {
      this.createTable()
    }
  }

  static get viewID () {
    return 'latin_noun_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_NOUN]
  }

  static get inflectionType () {
    return Suffix
  }

  static getOrderedGenders (ancestorFeatures) {
    const ancestorValue = ancestorFeatures[ancestorFeatures.length - 1].value
    if ([Constants.ORD_2ND, Constants.ORD_3RD, Constants.ORD_4TH].includes(ancestorValue)) {
      return [
        this.featureMap.get(LatinView.datasetConsts.GEND_MASCULINE_FEMININE),
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

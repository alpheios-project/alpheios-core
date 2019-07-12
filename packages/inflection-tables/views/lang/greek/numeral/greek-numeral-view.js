import { Constants, Feature } from 'alpheios-data-models'
import Morpheme from '@lib/morpheme.js'
import Form from '@lib/form.js'
import Table from '@views/lib/table.js'

import GreekView from '../greek-view.js'
import GroupFeatureType from '../../../lib/group-feature-type.js'

export default class GreekNumeralView extends GreekView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)
    this.id = 'numeralDeclension'
    this.name = 'numeral declension'
    this.title = 'Numeral declension'
    this.partOfSpeech = this.constructor.mainPartOfSpeech

    this.lemmaTypeFeature = new Feature(Feature.types.hdwd, this.constructor.dataset.getNumeralGroupingLemmas(), GreekNumeralView.languageID)
    this.features.lemmas = new GroupFeatureType(Feature.types.hdwd, this.constructor.languageID, 'Lemma',
      this.constructor.dataset.getNumeralGroupingLemmaFeatures())

    this.features.genders.getOrderedFeatures = this.constructor.getOrderedGenders
    this.features.genders.getTitle = this.constructor.getGenderTitle
    this.features.genders.filter = this.constructor.genderFilter
    this.features.genders.comparisonType = Morpheme.comparisonTypes.PARTIAL

    if (this.isImplemented) {
      this.createTable()
    }
  }

  static get viewID () {
    return 'greek_numeral_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_NUMERAL]
  }

  static get inflectionType () {
    return Form
  }

  createTable () {
    this.table = new Table([this.features.lemmas, this.features.genders, this.features.types, this.features.numbers, this.features.cases])
    const features = this.table.features
    features.columns = [
      this.lemmaTypeFeature,
      this.constructor.model.typeFeature(Feature.types.gender),
      this.constructor.model.typeFeature(Feature.types.type)
    ]
    features.rows = [
      this.constructor.model.typeFeature(Feature.types.number),
      this.constructor.model.typeFeature(Feature.types.grmCase)
    ]
    features.columnRowTitles = [
      this.constructor.model.typeFeature(Feature.types.grmCase)
    ]
    features.fullWidthRowTitles = [this.constructor.model.typeFeature(Feature.types.number)]
  }

  static getOrderedGenders (ancestorFeatures) {
    const lemmaValues = GreekView.dataset.getNumeralGroupingLemmas()
    // Items below are lemmas
    const ancestorValue = ancestorFeatures[ancestorFeatures.length - 1].value
    if (ancestorValue === lemmaValues[1]) {
      return [
        this.featureMap.get(GreekView.datasetConsts.GEND_MASCULINE_FEMININE_NEUTER)
      ]
    } else if ([lemmaValues[2], lemmaValues[3]].includes(ancestorValue)) {
      return [
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

  static genderFilter (featureValues, suffix) {
    // If not an array, convert it to array for uniformity
    if (!Array.isArray(featureValues)) {
      featureValues = [featureValues]
    }
    for (const value of featureValues) {
      if (suffix.features[this.type] === value) {
        return true
      }
    }
    return false
  }

  static getGenderTitle (featureValue) {
    if (featureValue === Constants.GEND_MASCULINE) { return 'm.' }
    if (featureValue === Constants.GEND_FEMININE) { return 'f.' }
    if (featureValue === Constants.GEND_NEUTER) { return 'n.' }
    if (featureValue === GreekView.datasetConsts.GEND_MASCULINE_FEMININE) { return 'f./m.' }
    if (featureValue === GreekView.datasetConsts.GEND_MASCULINE_FEMININE_NEUTER) { return 'f./m./n.' }
    return featureValue
  }
}

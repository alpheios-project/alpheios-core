import { Constants, LanguageModelFactory, GreekLanguageModel, Feature } from 'alpheios-data-models'
import Form from '../../../../lib/form.js'
import Table from '../../../lib/table'

import GreekView from '../greek-view.js'
import GroupFeatureType from '../../../lib/group-feature-type.js'

export default class GreekNumeralView extends GreekView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.id = 'numeralDeclension'
    this.name = 'numeral declension'
    this.title = 'Numeral declension'
    this.partOfSpeech = Constants.POFS_NUMERAL
    this.inflectionType = Form

    this.featureTypes = {}

    const GEND_MASCULINE_FEMININE = 'masculine feminine'
    const GEND_MASCULINE_FEMININE_NEUTER = 'masculine feminine neuter'

    this.featureTypes.numbers = new Feature(
      Feature.types.number,
      [Constants.NUM_SINGULAR, Constants.NUM_DUAL, Constants.NUM_PLURAL],
      this.languageID
    )

    this.featureTypes.genders = new Feature(
      Feature.types.gender,
      [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, GEND_MASCULINE_FEMININE, Constants.GEND_NEUTER, GEND_MASCULINE_FEMININE_NEUTER],
      this.languageID
    )

    const lemmaValues = this.dataset.getNumeralGroupingLemmas()
    this.featureTypes.lemmas = new Feature(Feature.types.hdwd, lemmaValues, GreekNumeralView.languageID)

    this.features = {
      lemmas: new GroupFeatureType(this.featureTypes.lemmas, 'Lemma'),
      genders: new GroupFeatureType(this.featureTypes.genders, 'Gender'),
      types: new GroupFeatureType(this.model.typeFeature(Feature.types.type), 'Type'),
      numbers: new GroupFeatureType(this.featureTypes.numbers, 'Number'),
      cases: new GroupFeatureType(this.model.typeFeature(Feature.types.grmCase), 'Case')
    }

    this.features.genders.getTitle = function getTitle (featureValue) {
      if (featureValue === Constants.GEND_MASCULINE) { return 'm.' }
      if (featureValue === Constants.GEND_FEMININE) { return 'f.' }
      if (featureValue === Constants.GEND_NEUTER) { return 'n.' }
      if (featureValue === GEND_MASCULINE_FEMININE) { return 'm./f.' }
      if (featureValue === GEND_MASCULINE_FEMININE_NEUTER) { return 'm./f./n.' }
      return featureValue
    }

    this.features.genders.filter = function filter (featureValues, suffix) {
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
    this.createTable()
  }

  static get partOfSpeech () {
    return Constants.POFS_NUMERAL
  }

  static get inflectionType () {
    return Form
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param inflectionData
   * @return {boolean}
   */
  static matchFilter (inflectionData) {
    if (LanguageModelFactory.compareLanguages(GreekNumeralView.languageID, inflectionData.languageID)) {
      return inflectionData.pos.has(GreekNumeralView.partOfSpeech)
    }
  }

  createTable () {
    this.table = new Table([this.features.lemmas, this.features.genders, this.features.types, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.featureTypes.lemmas, this.featureTypes.genders, this.features.types]
    features.rows = [this.featureTypes.numbers, GreekLanguageModel.typeFeature(Feature.types.grmCase)]
    features.columnRowTitles = [GreekLanguageModel.typeFeature(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.featureTypes.numbers]
  }

  static getMorphemes (inflectionData) {
    return inflectionData.pos.get(this.partOfSpeech)
      .types.get(this.inflectionType).items
  }
}

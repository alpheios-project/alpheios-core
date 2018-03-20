import { Constants, LanguageModelFactory, Feature } from 'alpheios-data-models'
import LanguageDatasetFactory from '../../../lib/language-dataset-factory.js'
import Table from '../../lib/table.js'
import View from '../../lib/view.js'
import GroupFeatureType from '../../lib/group-feature-type.js'

export default class GreekView extends View {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.languageID = GreekView.languageID
    this.model = LanguageModelFactory.getLanguageModel(GreekView.languageID)
    this.dataset = LanguageDatasetFactory.getDataset(GreekView.languageID)

    /*
    Default grammatical features of a View. It child views need to have different feature values, redefine
    those values in child objects.
     */
    this.features = {
      numbers: new GroupFeatureType(this.model.typeFeature(Feature.types.number), 'Number'),
      cases: new GroupFeatureType(this.model.typeFeature(Feature.types.grmCase), 'Case'),
      declensions: new GroupFeatureType(this.model.typeFeature(Feature.types.declension), 'Declension'),
      genders: new GroupFeatureType(this.model.typeFeature(Feature.types.gender), 'Gender'),
      types: new GroupFeatureType(this.model.typeFeature(Feature.types.type), 'Type')
    }
  }

  static get languageID () {
    return Constants.LANG_GREEK
  }

  /**
   * Creates and initializes an inflection table. Redefine this method in child objects in order to create
   * an inflection table differently.
   */
  createTable () {
    this.table = new Table([this.features.declensions, this.features.genders,
      this.features.types, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [
      this.model.typeFeature(Feature.types.declension),
      this.model.typeFeature(Feature.types.gender),
      this.model.typeFeature(Feature.types.type)
    ]
    features.rows = [
      this.model.typeFeature(Feature.types.number),
      this.model.typeFeature(Feature.types.grmCase)
    ]
    features.columnRowTitles = [
      this.model.typeFeature(Feature.types.grmCase)
    ]
    features.fullWidthRowTitles = [
      this.model.typeFeature(Feature.types.number)
    ]
  }
}

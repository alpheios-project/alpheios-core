import { Constants, LanguageModelFactory, Feature } from 'alpheios-data-models'
import LanguageDatasetFactory from '@lib/language-dataset-factory.js'
import View from '@views/lib/view.js'
import GroupFeatureType from '@views/lib/group-feature-type.js'
import Table from '@views/lib/table.js'

export default class LatinView extends View {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.model = LanguageModelFactory.getLanguageModel(LatinView.languageID)
    this.dataset = LanguageDatasetFactory.getDataset(LatinView.languageID)
    this.language_features = this.model.features
    // limit regular verb moods
    this.language_features[Feature.types.mood] =
      new Feature(Feature.types.mood,
        [ Constants.MOOD_INDICATIVE,
          Constants.MOOD_SUBJUNCTIVE
        ], LatinView.languageID)

    /*
        Default grammatical features of a view. It child views need to have different feature values, redefine
        those values in child objects.
         */
    this.features = {
      numbers: new GroupFeatureType(this.model.typeFeature(Feature.types.number), 'Number'),
      cases: new GroupFeatureType(this.model.typeFeature(Feature.types.grmCase), 'Case'),
      declensions: new GroupFeatureType(this.model.typeFeature(Feature.types.declension), 'Declension'),
      genders: new GroupFeatureType(this.model.typeFeature(Feature.types.gender), 'Gender'),
      types: new GroupFeatureType(this.model.typeFeature(Feature.types.type), 'Type')
    }
    this.features.declensions.getTitle = LatinView.getDeclensionTitle
  }

  /**
   * Defines a language ID of a view. Should be redefined in child classes.
   * @return {symbol}
   */
  static get languageID () {
    return Constants.LANG_LATIN
  }

  /*
    Creates and initializes an inflection table. Redefine this method in child objects in order to create
    an inflection table differently
     */
  createTable () {
    this.table = new Table([this.features.declensions, this.features.genders,
      this.features.types, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.model.typeFeature(Feature.types.declension), this.model.typeFeature(Feature.types.gender), this.model.typeFeature(Feature.types.type)]
    features.rows = [this.model.typeFeature(Feature.types.number), this.model.typeFeature(Feature.types.grmCase)]
    features.columnRowTitles = [this.model.typeFeature(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.model.typeFeature(Feature.types.number)]
  }

  /**
   * Define declension group titles
   * @param {String} featureValue - A value of a declension
   * @return {string} - A title of a declension group, in HTML format
   */
  static getDeclensionTitle (featureValue) {
    if (featureValue === Constants.ORD_1ST) { return `First` }
    if (featureValue === Constants.ORD_2ND) { return `Second` }
    if (featureValue === Constants.ORD_3RD) { return `Third` }
    if (featureValue === Constants.ORD_4TH) { return `Fourth` }
    if (featureValue === Constants.ORD_5TH) { return `Fifth` }

    if (this.hasOwnProperty(featureValue)) {
      if (Array.isArray(this[featureValue])) {
        return this[featureValue].map((feature) => feature.value).join('/')
      } else {
        return this[featureValue].value
      }
    } else {
      return 'not available'
    }
  }
}

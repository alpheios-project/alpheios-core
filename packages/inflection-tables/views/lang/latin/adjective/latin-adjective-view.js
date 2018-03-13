import { Constants, LanguageModelFactory, Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LanguageDataset from '../../../../lib/language-dataset.js'
import LatinView from '../latin-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'

export default class LatinAdjectiveView extends LatinView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.id = 'adjectiveDeclension'
    this.name = 'adjective declension'
    this.title = 'Adjective declension'
    this.partOfSpeech = this.language_features[Feature.types.part].adjective.value
    this.inflectionType = LanguageDataset.SUFFIX

    // Feature that are different from base class values
    this.features.declensions = new GroupFeatureType(this.language_features[Feature.types.declension], 'Declension',
      [ this.language_features[Feature.types.declension][Constants.ORD_1ST],
        this.language_features[Feature.types.declension][Constants.ORD_2ND],
        this.language_features[Feature.types.declension][Constants.ORD_3RD]
      ])
    this.features.declensions.getTitle = LatinView.getDeclensionTitle

    this.createTable()
  }

  static get partOfSpeech () {
    return Constants.POFS_ADJECTIVE
  }

  static get inflectionType () {
    return Suffix
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
    if (LanguageModelFactory.compareLanguages(LatinAdjectiveView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(LatinAdjectiveView.partOfSpeech)
    }
  }
}

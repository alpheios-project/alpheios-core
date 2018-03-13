import { Constants, LanguageModelFactory, Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LatinView from '../latin-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'

export default class LatinNounView extends LatinView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.id = 'nounDeclension'
    this.name = 'noun declension'
    this.title = 'Noun declension'

    // Feature that are different from base class values
    this.features.genders = new GroupFeatureType(this.language_features[Feature.types.gender], 'Gender',
      [ this.language_features[Feature.types.gender][Constants.GEND_MASCULINE],
        this.language_features[Feature.types.gender][Constants.GEND_FEMININE],
        this.language_features[Feature.types.gender][Constants.GEND_NEUTER]
      ])
    this.createTable()
  }

  static get partOfSpeech () {
    return Constants.POFS_NOUN
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
    if (LanguageModelFactory.compareLanguages(LatinNounView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(LatinNounView.partOfSpeech)
    }
  }
}

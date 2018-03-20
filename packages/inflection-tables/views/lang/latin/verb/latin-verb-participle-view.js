import { Constants, LanguageModelFactory, Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LatinView from '../latin-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'
import Table from '../../../lib/table'

export default class LatinVerbParticipleView extends LatinView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.partOfSpeech = LatinVerbParticipleView.partOfSpeech
    this.id = 'verbParticiple'
    this.name = 'participle'
    this.title = 'Participle'
    this.language_features[Feature.types.tense] = new Feature(Feature.types.tense,
      [Constants.TENSE_PRESENT, Constants.TENSE_PERFECT, Constants.TENSE_FUTURE], this.model.languageID)
    this.features = {
      tenses: new GroupFeatureType(this.language_features[Feature.types.tense], 'Tenses'),
      voices: new GroupFeatureType(this.language_features[Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Feature.types.conjugation], 'Conjugation Stem')
    }
    this.createTable()
  }

  static get partOfSpeech () {
    return Constants.POFS_VERB_PARTICIPLE
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
    if (LanguageModelFactory.compareLanguages(LatinVerbParticipleView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(LatinVerbParticipleView.partOfSpeech)
    }
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.tenses])
    let features = this.table.features
    features.columns = [
      this.language_features[Feature.types.voice],
      this.language_features[Feature.types.conjugation]]
    features.rows = [this.language_features[Feature.types.tense]]
    features.columnRowTitles = [this.language_features[Feature.types.tense]]
    features.fullWidthRowTitles = []
  }
}

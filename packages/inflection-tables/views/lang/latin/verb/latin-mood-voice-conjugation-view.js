import { Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LatinVerbView from './latin-verb-view.js'
import Table from '../../../lib/table'

export default class LatinMoodVoiceConjugationView extends LatinVerbView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)
    this.id = 'verbMoodVoiceConjugation'
    this.name = 'mood-voice-conjugation'
    this.title = 'Verb Conjugation'

    if (this.isImplemented) {
      this.createTable()
    }
  }

  static get viewID () {
    return 'latin_mood_voice_conjugation_view'
  }

  static get inflectionType () {
    return Suffix
  }

  createTable () {
    this.table = new Table([this.features.moods, this.features.voices, this.features.conjugations,
      this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features // eslint-disable-line prefer-const
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.mood),
      this.constructor.model.typeFeature(Feature.types.voice),
      this.constructor.model.typeFeature(Feature.types.conjugation)
    ]
    features.rows = [
      this.constructor.model.typeFeature(Feature.types.tense),
      this.constructor.model.typeFeature(Feature.types.number),
      this.constructor.model.typeFeature(Feature.types.person)
    ]
    features.columnRowTitles = [
      this.constructor.model.typeFeature(Feature.types.number),
      this.constructor.model.typeFeature(Feature.types.person)
    ]
    features.fullWidthRowTitles = [this.constructor.model.typeFeature(Feature.types.tense)]
  }
}

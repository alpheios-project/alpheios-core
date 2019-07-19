import { Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LatinVerbView from './latin-verb-view.js'
import Table from '../../../lib/table'

export default class LatinVoiceConjugationMoodView extends LatinVerbView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)
    this.id = 'verbVoiceConjugationMood'
    this.name = 'voice-conjugation-mood'
    this.title = 'Verb Conjugation'

    if (this.isImplemented) {
      this.createTable()
    }
  }

  static get viewID () {
    return 'latin_voice_conjugation_mood_view'
  }

  static get inflectionType () {
    return Suffix
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations, this.features.moods,
      this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features // eslint-disable-line prefer-const
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.voice),
      this.constructor.model.typeFeature(Feature.types.conjugation),
      this.constructor.model.typeFeature(Feature.types.mood)
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

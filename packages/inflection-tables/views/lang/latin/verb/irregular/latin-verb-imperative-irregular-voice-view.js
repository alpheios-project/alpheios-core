import { Constants, Feature } from 'alpheios-data-models'
import LatinVerbIrregularLinkedBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-linked-base-view.js'
import Table from '@views/lib/table'

export default class LatinVerbImperativeIrregularVoiceView extends LatinVerbIrregularLinkedBaseView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    this.id = 'verbImperativeIrregularVoice'
    this.name = 'verb-imperative-irregular-voice'
    this.title = 'Verb Imperative Conjugation (Irregular with Voice)'

    if (this.isImplemented) {
      this.createTable()
      this.table.morphemeCellFilter = LatinVerbImperativeIrregularVoiceView.morphemeCellFilter
    }
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features // eslint-disable-line prefer-const
    features.columns = [this.features.voices]
    features.rows = [this.features.tenses, this.features.numbers, this.features.persons]
    features.columnRowTitles = [this.features.numbers, this.features.persons]
    features.fullWidthRowTitles = [this.features.tenses]
  }

  static get viewID () {
    return 'latin_imperative_irregular_voice_view'
  }

  static enabledForLinking (inflection) {
    return Boolean(
      inflection[Feature.types.part].value === this.mainPartOfSpeech &&
      inflection.constraints &&
      inflection.constraints.irregular &&
      inflection.word &&
      this.voiceEnabledHdwds.includes(inflection.word.value) // Must match headwords for irregular verb voice table
    )
  }

  static enabledForInflection (inflection) {
    return Boolean(
      inflection[Feature.types.part].value === this.mainPartOfSpeech &&
      inflection[Feature.types.mood].value === Constants.MOOD_IMPERATIVE &&
      inflection.constraints &&
      inflection.constraints.irregular &&
      inflection.word &&
      this.voiceEnabledHdwds.includes(inflection.word.value) // Must match headwords for irregular verb voice table
    )
  }

  static matchFilter (languageID, inflections) {
    return Boolean(
      this.languageID === languageID &&
      inflections.some(i => this.enabledForInflection(i)))
  }

  static getInflectionsData (homonym, options) {
    // Select only those inflections that are required for this view
    const inflections = homonym.inflections.filter(
      i => i[Feature.types.part].value === this.mainPartOfSpeech &&
        i.constraints && i.constraints.irregular
    )
    return this.dataset.createInflectionSet(this.mainPartOfSpeech, inflections, options)
  }

  static morphemeCellFilter (form) {
    return form.features[Feature.types.mood].values.includes(Constants.MOOD_IMPERATIVE)
  }

  static linkedViewConstructors (homonym) {
    return []
  }
}

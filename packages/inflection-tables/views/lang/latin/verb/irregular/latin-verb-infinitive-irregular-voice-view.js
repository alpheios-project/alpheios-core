import { Constants, Feature } from 'alpheios-data-models'
import LatinVerbIrregularLinkedBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-linked-base-view.js'
import Table from '@views/lib/table'

export default class LatinVerbInfinitiveIrregularVoiceView extends LatinVerbIrregularLinkedBaseView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    this.id = 'verbInfinitiveIrregularVoice'
    this.name = 'verb-infinitive-irregular-voice'
    this.title = 'Verb Infinitive Conjugation (Irregular with Voice)'

    if (this.isImplemented) {
      this.createTable()
      this.table.morphemeCellFilter = LatinVerbInfinitiveIrregularVoiceView.morphemeCellFilter
    }
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.tenses])
    let features = this.table.features // eslint-disable-line prefer-const
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.voice)
    ]
    features.rows = [this.constructor.model.typeFeature(Feature.types.tense)]
    features.columnRowTitles = [this.constructor.model.typeFeature(Feature.types.tense)]
    features.fullWidthRowTitles = []
  }

  static get viewID () {
    return 'latin_infinitive_irregular_voice_view'
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
      inflection[Feature.types.mood].value === Constants.MOOD_INFINITIVE &&
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
    return form.features[Feature.types.mood].values.includes(Constants.MOOD_INFINITIVE)
  }

  static linkedViewConstructors (homonym) {
    return []
  }
}

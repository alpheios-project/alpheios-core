import { Constants, Feature } from 'alpheios-data-models'
import LatinVerbIrregularBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-base-view.js'
import LatinVerbIrregularVoiceView from '@views/lang/latin/verb/irregular/latin-verb-irregular-voice-view.js'
import LatinVerbIrregularView from '@views/lang/latin/verb/irregular/latin-verb-irregular-view.js'
import LatinVerbParticipleIrregularView from '@views/lang/latin/verb/irregular/latin-verb-participle-irregular-view.js'
import LatinVerbSupineIrregularView from '@views/lang/latin/verb/irregular/latin-verb-supine-irregular-view.js'
import Table from '@views/lib/table'

export default class LatinVerbInfinitiveIrregularView extends LatinVerbIrregularBaseView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    this.id = 'verbInfinitiveIrregular'
    this.name = 'verbInfinitive-irregular'
    this.title = 'Verb Infinitive Conjugation (Irregular)'


    if (this.isImplemented) {
      this.createTable()
      this.table.morphemeCellFilter = LatinVerbInfinitiveIrregularView.morphemeCellFilter
    }
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.tenses])
    let features = this.table.features // eslint-disable-line prefer-const
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.voice),
      this.constructor.model.typeFeature(Feature.types.conjugation)
    ]
    features.rows = [this.constructor.model.typeFeature(Feature.types.tense)]
    features.columnRowTitles = [this.constructor.model.typeFeature(Feature.types.tense)]
    features.fullWidthRowTitles = []
  }

  static get viewID () {
    return 'latin_infinitive_irregular_view'
  }

  static enabledForInflection (inflection) {
    return Boolean(
      inflection[Feature.types.part].value === this.mainPartOfSpeech &&
      inflection[Feature.types.mood].value === Constants.MOOD_INFINITIVE &&
      inflection.constraints &&
      inflection.constraints.irregular &&
      inflection.word &&
      !this.voiceEnabledHdwds.includes(inflection.word.value) // Must NOT match headwords for irregular verb voice table
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
    let views = [LatinVerbIrregularView, LatinVerbIrregularVoiceView, LatinVerbParticipleIrregularView] // eslint-disable-line prefer-const
    if (homonym.inflections.some(i => this.supineEnabledHdwds.includes(i.word.value))) {
      views.push(LatinVerbSupineIrregularView)
    }
    return views
  }
}

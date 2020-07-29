import { Constants, Feature } from 'alpheios-data-models'
import GroupFeatureType from '@views/lib/group-feature-type.js'
import LatinVerbIrregularLinkedBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-linked-base-view.js'
import Table from '@views/lib/table'

export default class LatinVerbInfinitiveIrregularView extends LatinVerbIrregularLinkedBaseView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    this.id = 'verbInfinitiveIrregular'
    this.name = 'verb-infinitive-irregular'
    this.title = 'Verb Infinitive Conjugation (Irregular)'
    this.features.moods =
      new GroupFeatureType(Feature.types.mood, this.constructor.languageID, 'Mood', [
        this.constructor.model.typeFeature(Feature.types.mood).createFeature(Constants.MOOD_INFINITIVE)])

    if (this.isImplemented) {
      this.createTable()
      this.table.morphemeCellFilter = LatinVerbInfinitiveIrregularView.morphemeCellFilter
    }
  }

  createTable () {
    this.table = new Table([this.features.moods, this.features.tenses])
    let features = this.table.features // eslint-disable-line prefer-const
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.mood)
    ]
    features.rows = [this.constructor.model.typeFeature(Feature.types.tense)]
    features.columnRowTitles = [this.constructor.model.typeFeature(Feature.types.tense)]
    features.fullWidthRowTitles = []
  }

  static get viewID () {
    return 'latin_infinitive_irregular_view'
  }

  static enabledForLinking (inflection) {
    return Boolean(
      inflection[Feature.types.part].value === this.mainPartOfSpeech &&
      inflection.constraints &&
      inflection.constraints.irregular &&
      inflection.word
    )
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
    return []
  }
}

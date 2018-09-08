import { Constants } from 'alpheios-data-models'
import LatinVerbIrregularBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-base-view.js'
import LatinVerbIrregularView from '@views/lang/latin/verb/irregular/latin-verb-irregular-view.js'
import LatinVerbIrregularVoiceView from '@views/lang/latin/verb/irregular/latin-verb-irregular-voice-view.js'
import LatinVerbSupineIrregularView from '@views/lang/latin/verb/irregular/latin-verb-supine-irregular-view.js'
import Table from '@views/lib/table'

export default class LatinVerbParticipleIrregularView extends LatinVerbIrregularBaseView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)

    this.id = 'verbParticipleConjugationIrregular'
    this.name = 'verb-participle-irregular'
    this.title = 'Verb Participle Conjugation (Irregular)'

    this.createTable()
  }

  static get viewID () {
    return 'latin_verb_participle_irregular_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB_PARTICIPLE]
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.tenses])
    let features = this.table.features
    features.columns = [ this.features.voices ]
    features.rows = [this.features.tenses]
    features.columnRowTitles = [this.features.tenses]
    features.fullWidthRowTitles = []
  }

  static matchFilter (languageID, inflections) {
    return Boolean(
      this.languageID === languageID &&
      inflections.some(i => this.enabledForInflection(i)))
  }

  /**
   * A list of constructors of linked views.
   * @return {View[]}
   */
  static get linkedViewConstructors () {
    return [LatinVerbIrregularView, LatinVerbIrregularVoiceView, LatinVerbSupineIrregularView]
  }
}

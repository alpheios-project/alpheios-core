import { Constants, Feature } from 'alpheios-data-models'
import LatinVerbIrregularBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-base-view.js'
import LatinVerbIrregularView from '@views/lang/latin/verb/irregular/latin-verb-irregular-view.js'
import LatinVerbIrregularVoiceView from '@views/lang/latin/verb/irregular/latin-verb-irregular-voice-view.js'
import LatinVerbParticipleIrregularView from '@views/lang/latin/verb/irregular/latin-verb-participle-irregular-view.js'
import Table from '@views/lib/table'

export default class LatinVerbSupineIrregularView extends LatinVerbIrregularBaseView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    this.id = 'verbSupineConjugationIrregular'
    this.name = 'verb-supine-irregular'
    this.title = 'Verb Supine Conjugation (Irregular)'

    if (this.isImplemented) {
      this.createTable()
    }
  }

  static get viewID () {
    return 'latin_verb_supine_irregular_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_SUPINE]
  }

  createTable () {
    this.table = new Table([this.features.cases])
    const features = this.table.features
    features.columns = []
    features.rows = [this.features.cases]
    features.columnRowTitles = [this.features.cases]
    features.fullWidthRowTitles = []
  }

  static matchFilter (languageID, inflections) {
    return Boolean(
      this.languageID === languageID &&
      inflections.some(i => this.enabledForInflection(i)))
  }

  /**
   * Gets inflection data for a homonym. For this view we need to use irregular verb inflections only.
   * @param {Homonym} homonym - A homonym for which inflection data needs to be retrieved
   * @param {Object} options
   * @return {InflectionSet} Resulting inflection set.
   */
  static getInflectionsData (homonym, options) {
    // Select only those inflections that are required for this view
    const inflections = homonym.inflections.filter(
      i => i[Feature.types.part].value === this.mainPartOfSpeech &&
        i.constraints && i.constraints.irregular
    )
    return this.dataset.createInflectionSet(this.mainPartOfSpeech, inflections, options)
  }

  /**
   * A list of constructors of linked views.
   * @return {View[]}
   */
  static get linkedViewConstructors () {
    return [LatinVerbIrregularView, LatinVerbIrregularVoiceView, LatinVerbParticipleIrregularView]
  }
}

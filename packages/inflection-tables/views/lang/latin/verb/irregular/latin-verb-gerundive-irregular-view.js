import { Constants } from 'alpheios-data-models'
import LatinVerbIrregularBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-base-view.js'
import Table from '@views/lib/table'

export default class LatinVerbGerundiveIrregularView extends LatinVerbIrregularBaseView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    this.id = 'verbGerundiveConjugationIrregular'
    this.name = 'verb-gerundive-irregular'
    this.title = 'Verb Gerundive Conjugation (Irregular)'

    if (this.isImplemented) {
      this.createTable()
    }
  }

  static get viewID () {
    return 'latin_verb_gerundive_irregular_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_GERUNDIVE]
  }

  createTable () {
    this.table = new Table([this.features.cases])
    let features = this.table.features
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
}

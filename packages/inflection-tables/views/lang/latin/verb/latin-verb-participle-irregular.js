import { Constants, Feature } from 'alpheios-data-models'
import LatinVerbIrregularView from '@views/lang/latin/verb/latin-verb-irregular.js'
import Form from '@lib/form.js'
import Table from '@views/lib/table'

export default class LatinVerbParticipleIrregularView extends LatinVerbIrregularView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)

    this.id = 'verbParticipleConjugationIrregular'
    this.name = 'verb-participle-irregular'
    this.title = 'Verb Participle Conjugation (Irregular)'
  }

  static get viewID () {
    return 'latin_verb_participle_irregular_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB_PARTICIPLE]
  }

  static get inflectionType () {
    return Form
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.tenses])
    let features = this.table.features
    features.columns = [ this.features.voices ]
    features.rows = [this.features.tenses]
    features.columnRowTitles = [this.features.tenses]
    features.fullWidthRowTitles = []
  }

  static matchFilter (homonym) {
    return (this.languageID === homonym.languageID &&
      homonym.inflections.some(i => i[Feature.types.part].value === this.mainPartOfSpeech) &&
      this.enabledForLexemes(homonym.lexemes))
  }
}

import { Feature } from 'alpheios-data-models'
import LatinVerbIrregularVoiceView from '@views/lang/latin/verb/latin-verb-irregular-voice.js'
import Table from '@views/lib/table'

/**
 * An inflection table for Latin irregular verbs that have no voice information in our local data.
 * For the ones that do, a LatinVerbIrregularVoiceView is used.
 * The only way to distinguish between them the two is to analyze a headword
 * which is stored in a `word` feature of an inflection.
 */
export default class LatinVerbIrregularView extends LatinVerbIrregularVoiceView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)

    this.id = 'verbConjugationIrregular'
    this.name = 'verb-irregular'
    this.title = 'Verb Conjugation (Irregular)'

    this.createTable()
  }

  static get viewID () {
    return 'latin_verb_irregular_view'
  }

  createTable () {
    this.table = new Table([this.features.moods, this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [ this.features.moods ]
    features.rows = [this.features.tenses, this.features.numbers, this.features.persons]
    features.columnRowTitles = [this.features.numbers, this.features.persons]
    features.fullWidthRowTitles = [this.features.tenses]
  }

  static matchFilter (homonym) {
    return (this.languageID === homonym.languageID &&
      homonym.inflections.some(i => i[Feature.types.part].value === this.mainPartOfSpeech) &&
      this.enabledForLexemes(homonym.lexemes) && this.enabledForHeadwords(homonym))
  }

  static enabledForHeadwords (homonym) {
    let excluded = true
    for (const inflection of homonym.inflections) {
      excluded = excluded && inflection.word && LatinVerbIrregularVoiceView.enabledHdwds.includes(inflection.word.value)
    }
    return !excluded
  }
}

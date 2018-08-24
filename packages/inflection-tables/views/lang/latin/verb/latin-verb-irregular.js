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
    this.title = 'Verb Conjugation (Irregular, Voice)'

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

  /**
   * Checks whether this view shall be displayed for an inflection given.
   * It should match all the requirements of an irregular verb view and
   * should not match irregular verb voice view (either this or
   * irregular verb voice view shall be shown for a single inflection).
   * @param {Inflection} inflection - Inflection that is checked on matching this view.
   * @return {boolean} - True if this view shall be displayed for an inflection, false otherwise.
   */
  static enabledForInflection (inflection) {
    return Boolean(
      inflection[Feature.types.part].value === this.mainPartOfSpeech &&
      inflection.constraints &&
      inflection.constraints.irregularVerb &&
      !LatinVerbIrregularVoiceView.enabledForInflection(inflection)
    )
  }
}

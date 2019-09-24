import { Feature } from 'alpheios-data-models'
import LatinVerbIrregularBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-base-view.js'
import LatinVerbParicipleIrregularView from '@views/lang/latin/verb/irregular/latin-verb-participle-irregular-view.js'
import LatinVerbSupineIrregularView from '@views/lang/latin/verb/irregular/latin-verb-supine-irregular-view.js'
import Table from '@views/lib/table'

/**
 * An inflection table for Latin irregular verbs that have no voice information in our local data.
 * For the ones that do, a LatinVerbIrregularVoiceView is used.
 * The only way to distinguish between them the two is to analyze a headword
 * which is stored in a `word` feature of an inflection.
 */
export default class LatinVerbIrregularView extends LatinVerbIrregularBaseView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    this.id = 'verbConjugationIrregular'
    this.name = 'verb-irregular'
    this.title = 'Verb Conjugation (Irregular)'

    if (this.isImplemented) {
      const inflections = this.homonym.inflections.filter(item => item.constraints.implemented)
      const lemmas = this.constructor.dataset.getMatchingIrregularLemmas(inflections)
      this.additionalTitle = lemmas.length > 0 ? `${lemmas[0].word}, ${lemmas[0].principalParts}` : ``
      this.createTable()
    }
  }

  static get viewID () {
    return 'latin_verb_irregular_view'
  }

  createTable () {
    this.table = new Table([this.features.moods, this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features // eslint-disable-line prefer-const
    features.columns = [this.features.moods]
    features.rows = [this.features.tenses, this.features.numbers, this.features.persons]
    features.columnRowTitles = [this.features.numbers, this.features.persons]
    features.fullWidthRowTitles = [this.features.tenses]
  }

  static matchFilter (languageID, inflections) {
    return Boolean(
      this.languageID === languageID && inflections.some(i => this.enabledForInflection(i))
    )
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
      inflection.constraints.irregular &&
      inflection.word &&
      !this.voiceEnabledHdwds.includes(inflection.word.value) // Must NOT match headwords for irregular verb voice table
    )
  }

  /**
   * A list of constructors of linked views.
   * @return {View[]}
   */
  static linkedViewConstructors (homonym) {
    let views = [LatinVerbParicipleIrregularView] // eslint-disable-line prefer-const
    if (homonym.inflections.some(i => this.supineEnabledHdwds.includes(i.word.value))) {
      views.push(LatinVerbSupineIrregularView)
    }
    return views
  }
}

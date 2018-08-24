import { Constants, Feature } from 'alpheios-data-models'
import LatinView from '@views/lang/latin/latin-view.js'
import Form from '@lib/form.js'
import Table from '@views/lib/table'

/**
 * An inflection table for Latin irregular verbs that have voice information in our local data.
 * For the ones that don't, a LatinVerbIrregularView is used.
 * The only way to distinguish between them the two is to analyze a headword
 * which is stored in a `word` feature of an inflection.
 */
export default class LatinVerbIrregularVoiceView extends LatinView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)

    this.id = 'verbConjugationIrregularVoice'
    this.name = 'verb-irregular-voice'
    this.title = 'Verb Conjugation (Irregular)'

    const inflectionsWords = this.homonym.inflections.map(item => item[Feature.types.word].value)
    const lemma = this.constructor.dataset.verbsIrregularLemmas.filter(item => inflectionsWords.indexOf(item.word) > -1)[0]

    this.additionalTitle = lemma.word + ', ' + lemma.principalParts

    this.createTable()
  }

  static get viewID () {
    return 'latin_verb_irregular_voice_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB]
  }

  static get inflectionType () {
    return Form
  }

  static get enabledHdwds () {
    return ['fero']
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.moods, this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [ this.features.voices, this.features.moods ]
    features.rows = [this.features.tenses, this.features.numbers, this.features.persons]
    features.columnRowTitles = [this.features.numbers, this.features.persons]
    features.fullWidthRowTitles = [this.features.tenses]
  }

  static matchFilter (homonym) {
    return Boolean(
      this.languageID === homonym.languageID &&
      homonym.inflections.some(i => this.enabledForInflection(i))
    )
  }

  /**
   * Checks whether this view shall be displayed for an inflection given.
   * @param {Inflection} inflection - Inflection that is checked on matching this view.
   * @return {boolean} - True if this view shall be displayed for an inflection, false otherwise.
   */
  static enabledForInflection (inflection) {
    return Boolean(
      inflection[Feature.types.part].value === this.mainPartOfSpeech &&
      inflection.constraints &&
      inflection.constraints.irregularVerb && // Must be an irregular verb
      inflection.word &&
      this.enabledHdwds.includes(inflection.word.value) // Must match headwords for irregular verb voice table
    )
  }

  /**
   * Gets inflection data for a homonym. For this view we need to use irregular verb inflections only.
   * @param {Homonym} homonym - A homonym for which inflection data needs to be retrieved
   * @return {InflectionSet} Resulting inflection set.
   */
  static getInflectionsData (homonym) {
    // Select only those inflections that are required for this view
    let inflections = homonym.inflections.filter(
      i => i[Feature.types.part].value === this.mainPartOfSpeech &&
        i.constraints && i.constraints.irregularVerb
    )
    return this.dataset.createInflectionSet(this.mainPartOfSpeech, inflections)
  }
}

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
    this.name = 'verb-irregular'
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
    return (this.languageID === homonym.languageID &&
      homonym.inflections.some(i => i[Feature.types.part].value === this.mainPartOfSpeech) &&
      this.enabledForLexemes(homonym.lexemes) && this.enabledForHeadwords(homonym))
  }

  static enabledForLexemes (lexemes) {
    for (let lexeme of lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection.constraints && inflection.constraints.irregularVerb) {
          return true
        }
      }
    }
    return false
  }

  static enabledForHeadwords (homonym) {
    for (let inflection of homonym.inflections) {
      if (inflection.word && this.enabledHdwds.includes(inflection.word.value)) {
        return true
      }
    }
    return false
  }
}

import { Constants, Feature } from 'alpheios-data-models'
import LatinView from '@views/lang/latin/latin-view.js'

import GroupFeatureType from '@views/lib/group-feature-type'
import Form from '@lib/form.js'
import Table from '@views/lib/table'

export default class LatinVerbIrregularView extends LatinView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)

    this.id = 'verbConjugationIrregular'
    this.name = 'verb-irregular'
    this.title = 'Verb Conjugation (Irregular)'

    const inflectionsWords = inflectionData.homonym.inflections.map(item => item[Feature.types.word].value)
    const lemma = this.dataset.verbsIrregularLemmas.filter(item => inflectionsWords.indexOf(item.word) > -1)[0]

    this.additionalTitle = lemma.word + ', ' + lemma.principalParts

    this.language_features[Feature.types.hdwd] = new Feature(Feature.types.hdwd, [lemma.word], LatinVerbIrregularView.languageID)

    this.language_features[Feature.types.voice] = new Feature(Feature.types.voice,
      [Constants.VOICE_ACTIVE, Constants.VOICE_PASSIVE, '-'], this.model.languageID)

    this.features = {
      lemmas: new GroupFeatureType(this.language_features[Feature.types.hdwd], 'Lemma'),
      tenses: new GroupFeatureType(this.language_features[Feature.types.tense], 'Tenses'),
      numbers: new GroupFeatureType(this.language_features[Feature.types.number], 'Number'),
      persons: new GroupFeatureType(this.language_features[Feature.types.person], 'Person'),
      moods: new GroupFeatureType(this.language_features[Feature.types.mood], 'Mood'),
      voices: new GroupFeatureType(this.language_features[Feature.types.voice], 'Voice')
    }
    this.createTable()
  }

  static get viewID () {
    return 'latin_verb_irregular_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB]
  }

  static get inflectionType () {
    return Form
  }

  createTable () {
    this.table = new Table([this.features.lemmas, this.features.voices, this.features.moods, this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [ this.features.voices, this.features.moods ]
    features.rows = [this.features.tenses, this.features.numbers, this.features.persons]
    features.columnRowTitles = [this.features.numbers, this.features.persons]
    features.fullWidthRowTitles = [this.features.tenses]
  }

  static matchFilter (homonym) {
    return (this.languageID === homonym.languageID &&
      homonym.inflections.some(i => i[Feature.types.part].value === this.mainPartOfSpeech) &&
      this.enabledForLexemes(homonym.lexemes))
  }

  static enabledForLexemes (lexemes) {
    // default is true
    for (let lexeme of lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection.constraints && inflection.constraints.irregularVerb) {
          return true
        }
      }
    }
    return false
  }
}

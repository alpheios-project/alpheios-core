import * as Models from 'alpheios-data-models'
import View from '../lib/view'
import GroupFeatureType from '../lib/group-feature-type'
import Table from '../lib/table'

class LatinView extends View {
  constructor () {
    super()
    this.languageID = Models.Constants.LANG_LATIN
    this.languageModel = new Models.LatinLanguageModel() // TODO: Do we really need to create it every time?
    this.language_features = this.languageModel.features
    // limit regular verb moods
    this.language_features[Models.Feature.types.mood] =
      new Models.FeatureType(Models.Feature.types.mood,
        [ Models.Constants.MOOD_INDICATIVE,
          Models.Constants.MOOD_SUBJUNCTIVE
        ], this.languageModel.toCode())

        /*
        Default grammatical features of a view. It child views need to have different feature values, redefine
        those values in child objects.
         */
    this.features = {
      numbers: new GroupFeatureType(this.language_features[Models.Feature.types.number], 'Number'),
      cases: new GroupFeatureType(this.language_features[Models.Feature.types.grmCase], 'Case'),
      declensions: new GroupFeatureType(this.language_features[Models.Feature.types.declension], 'Declension'),
      genders: new GroupFeatureType(this.language_features[Models.Feature.types.gender], 'Gender'),
      types: new GroupFeatureType(this.language_features[Models.Feature.types.type], 'Type')
    }
  }

    /*
    Creates and initializes an inflection table. Redefine this method in child objects in order to create
    an inflection table differently
     */
  createTable () {
    this.table = new Table([this.features.declensions, this.features.genders,
      this.features.types, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.language_features[Models.Feature.types.declension], this.language_features[Models.Feature.types.gender], this.language_features[Models.Feature.types.type]]
    features.rows = [this.language_features[Models.Feature.types.number], this.language_features[Models.Feature.types.grmCase]]
    features.columnRowTitles = [this.language_features[Models.Feature.types.grmCase]]
    features.fullWidthRowTitles = [this.language_features[Models.Feature.types.number]]
  }
}

class NounView extends LatinView {
  constructor () {
    super()
    this.id = 'nounDeclension'
    this.name = 'noun declension'
    this.title = 'Noun declension'
    this.partOfSpeech = this.language_features[Models.Feature.types.part][Models.Constants.POFS_NOUN].value

        // Models.Feature that are different from base class values
    this.features.genders = new GroupFeatureType(this.language_features[Models.Feature.types.gender], 'Gender',
      [ this.language_features[Models.Feature.types.gender][Models.Constants.GEND_MASCULINE],
        this.language_features[Models.Feature.types.gender][Models.Constants.GEND_FEMININE],
        this.language_features[Models.Feature.types.gender][Models.Constants.GEND_NEUTER]
      ])
    this.createTable()
  }
}

class AdjectiveView extends LatinView {
  constructor () {
    super()
    this.id = 'adjectiveDeclension'
    this.name = 'adjective declension'
    this.title = 'Adjective declension'
    this.partOfSpeech = this.language_features[Models.Feature.types.part].adjective.value

        // Models.Feature that are different from base class values
    this.features.declensions = new GroupFeatureType(this.language_features[Models.Feature.types.declension], 'Declension',
      [ this.language_features[Models.Feature.types.declension][Models.Constants.ORD_1ST],
        this.language_features[Models.Feature.types.declension][Models.Constants.ORD_2ND],
        this.language_features[Models.Feature.types.declension][Models.Constants.ORD_3RD]
      ])
    this.createTable()
  }
}

class VerbParticipleView extends LatinView {
  constructor () {
    super()
    this.partOfSpeech = this.language_features[Models.Feature.types.part][Models.Constants.POFS_VERB_PARTICIPLE].value
    this.id = 'verbParticiple'
    this.name = 'verb participle'
    this.title = 'Verb Participle'
    this.language_features[Models.Feature.types.tense] = new Models.FeatureType(Models.Feature.types.tense,
      [Models.Constants.TENSE_PRESENT, Models.Constants.TENSE_PERFECT, Models.Constants.TENSE_FUTURE], this.languageModel.toCode())
    this.features = {
      tenses: new GroupFeatureType(this.language_features[Models.Feature.types.tense], 'Tenses'),
      voices: new GroupFeatureType(this.language_features[Models.Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Models.Feature.types.conjugation], 'Conjugation Stem')
    }
    this.createTable()
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.tenses])
    let features = this.table.features
    features.columns = [
      this.language_features[Models.Feature.types.voice],
      this.language_features[Models.Feature.types.conjugation]]
    features.rows = [this.language_features[Models.Feature.types.tense]]
    features.columnRowTitles = [this.language_features[Models.Feature.types.tense]]
    features.fullWidthRowTitles = []
  }
}

class VerbView extends LatinView {
  constructor () {
    super()
    this.partOfSpeech = this.language_features[Models.Feature.types.part][Models.Constants.POFS_VERB].value

    this.features = {
      tenses: new GroupFeatureType(this.language_features[Models.Feature.types.tense], 'Tenses'),
      numbers: new GroupFeatureType(this.language_features[Models.Feature.types.number], 'Number'),
      persons: new GroupFeatureType(this.language_features[Models.Feature.types.person], 'Person'),
      voices: new GroupFeatureType(this.language_features[Models.Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Models.Feature.types.conjugation], 'Conjugation Stem'),
      moods: new GroupFeatureType(this.language_features[Models.Feature.types.mood], 'Mood')
    }
  }
}

class VerbMoodView extends VerbView {
  constructor () {
    super()
    this.features = {
      tenses: new GroupFeatureType(this.language_features[Models.Feature.types.tense], 'Tenses'),
      numbers: new GroupFeatureType(this.language_features[Models.Feature.types.number], 'Number'),
      persons: new GroupFeatureType(this.language_features[Models.Feature.types.person], 'Person'),
      voices: new GroupFeatureType(this.language_features[Models.Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Models.Feature.types.conjugation], 'Conjugation Stem')
    }
  }
}

class VoiceConjugationMoodView extends VerbView {
  constructor () {
    super()
    this.id = 'verbVoiceConjugationMood'
    this.name = 'verb voice-conjugation-mood'
    this.title = 'Voice-Conjugation-Mood'

    this.createTable()
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations, this.features.moods,
      this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [
      this.language_features[Models.Feature.types.voice],
      this.language_features[Models.Feature.types.conjugation],
      this.language_features[Models.Feature.types.mood]]
    features.rows = [
      this.language_features[Models.Feature.types.tense],
      this.language_features[Models.Feature.types.number],
      this.language_features[Models.Feature.types.person]]
    features.columnRowTitles = [
      this.language_features[Models.Feature.types.number],
      this.language_features[Models.Feature.types.person]]
    features.fullWidthRowTitles = [this.language_features[Models.Feature.types.tense]]
  }
}

class VoiceMoodConjugationView extends VerbView {
  constructor () {
    super()
    this.id = 'verbVoiceMoodConjugation'
    this.name = 'verb voice-mood-conjugation'
    this.title = 'Verb (Voice-Mood-Conjugation)'

    this.createTable()
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.moods, this.features.conjugations,
      this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [
      this.language_features[Models.Feature.types.voice],
      this.language_features[Models.Feature.types.mood],
      this.language_features[Models.Feature.types.conjugation]]
    features.rows = [
      this.language_features[Models.Feature.types.tense],
      this.language_features[Models.Feature.types.number],
      this.language_features[Models.Feature.types.person]]
    features.columnRowTitles = [
      this.language_features[Models.Feature.types.number],
      this.language_features[Models.Feature.types.person]]
    features.fullWidthRowTitles = [this.language_features[Models.Feature.types.tense]]
  }
}

class ConjugationVoiceMoodView extends VerbView {
  constructor () {
    super()
    this.id = 'verbConjugationVoiceMood'
    this.name = 'verb conjugation-voice-mood'
    this.title = 'Verb (Conjugation-Voice-Mood)'

    this.createTable()
  }

  createTable () {
    this.table = new Table([this.features.conjugations, this.features.voices, this.features.moods,
      this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [
      this.language_features[Models.Feature.types.conjugation],
      this.language_features[Models.Feature.types.voice], this.language_features[Models.Feature.types.mood]]
    features.rows = [
      this.language_features[Models.Feature.types.tense],
      this.language_features[Models.Feature.types.number],
      this.language_features[Models.Feature.types.person]]
    features.columnRowTitles = [
      this.language_features[Models.Feature.types.number],
      this.language_features[Models.Feature.types.person]]
    features.fullWidthRowTitles = [this.language_features[Models.Feature.types.tense]]
  }
}

class ConjugationMoodVoiceView extends VerbView {
  constructor () {
    super()
    this.id = 'verbConjugationMoodVoice'
    this.name = 'verb conjugation-mood-voice'
    this.title = 'Verb (Conjugation-Mood-Voice)'

    this.createTable()
  }

  createTable () {
    this.table = new Table([this.features.conjugations, this.features.moods, this.features.voices,
      this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [
      this.language_features[Models.Feature.types.conjugation],
      this.language_features[Models.Feature.types.mood],
      this.language_features[Models.Feature.types.voice]]
    features.rows = [
      this.language_features[Models.Feature.types.tense],
      this.language_features[Models.Feature.types.number],
      this.language_features[Models.Feature.types.person]]
    features.columnRowTitles = [
      this.language_features[Models.Feature.types.number],
      this.language_features[Models.Feature.types.person]]
    features.fullWidthRowTitles = [this.language_features[Models.Feature.types.tense]]
  }
}

class MoodVoiceConjugationView extends VerbView {
  constructor () {
    super()
    this.id = 'verbMoodVoiceConjugation'
    this.name = 'verb mood-voice-conjugation'
    this.title = 'Verb (Mood-Voice-Conjugation)'

    this.createTable()
  }

  createTable () {
    this.table = new Table([this.features.moods, this.features.voices, this.features.conjugations,
      this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [this.language_features[Models.Feature.types.mood], this.language_features[Models.Feature.types.voice], this.language_features[Models.Feature.types.conjugation]]
    features.rows = [this.language_features[Models.Feature.types.tense], this.language_features[Models.Feature.types.number], this.language_features[Models.Feature.types.person]]
    features.columnRowTitles = [this.language_features[Models.Feature.types.number], this.language_features[Models.Feature.types.person]]
    features.fullWidthRowTitles = [this.language_features[Models.Feature.types.tense]]
  }
}

class MoodConjugationVoiceView extends VerbView {
  constructor () {
    super()
    this.id = 'verbMoodConjugationVoice'
    this.name = 'verb mood-conjugation-voice'
    this.title = 'Verb (Mood-Conjugation-Voice)'

    this.createTable()
  }

  createTable () {
    this.table = new Table([this.features.moods, this.features.conjugations, this.features.voices,
      this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [this.language_features[Models.Feature.types.mood], this.language_features[Models.Feature.types.conjugation], this.language_features[Models.Feature.types.voice]]
    features.rows = [this.language_features[Models.Feature.types.tense], this.language_features[Models.Feature.types.number], this.language_features[Models.Feature.types.person]]
    features.columnRowTitles = [this.language_features[Models.Feature.types.number], this.language_features[Models.Feature.types.person]]
    features.fullWidthRowTitles = [this.language_features[Models.Feature.types.tense]]
  }
}

class ImperativeView extends VerbMoodView {
  constructor () {
    super()
    this.id = 'verbImperative'
    this.name = 'verb imperative'
    this.title = 'Verb (Imperative)'
    this.features.moods = new GroupFeatureType(
      new Models.FeatureType(Models.Feature.types.mood, [Models.Constants.MOOD_IMPERATIVE], this.languageModel.toCode()),
      'Mood')
    this.language_features[Models.Feature.types.person] = new Models.FeatureType(Models.Feature.types.person, [Models.Constants.ORD_2ND, Models.Constants.ORD_3RD], this.languageModel.toCode())
    this.features.persons = new GroupFeatureType(this.language_features[Models.Feature.types.person], 'Person')
    this.language_features[Models.Feature.types.tense] = new Models.FeatureType(Models.Feature.types.tense,
      [Models.Constants.TENSE_PRESENT, Models.Constants.TENSE_FUTURE], this.languageModel.toCode())
    this.features.tenses = new GroupFeatureType(this.language_features[Models.Feature.types.tense], 'Tense')
    this.createTable()
    this.table.suffixCellFilter = ImperativeView.suffixCellFilter
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [
      this.language_features[Models.Feature.types.voice],
      this.language_features[Models.Feature.types.conjugation]]
    features.rows = [this.language_features[Models.Feature.types.tense], this.language_features[Models.Feature.types.number], this.language_features[Models.Feature.types.person]]
    features.columnRowTitles = [this.language_features[Models.Feature.types.number], this.language_features[Models.Feature.types.person]]
    features.fullWidthRowTitles = [this.language_features[Models.Feature.types.tense]]
  }

  enabledForLexemes (lexemes) {
      // default is true
    for (let lexeme of lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection[Models.Feature.types.mood] &&
          inflection[Models.Feature.types.mood].filter((f) => f.value.includes(Models.Constants.MOOD_IMPERATIVE)).length > 0) {
          return true
        }
      }
    }
    return false
  }

  static suffixCellFilter (suffix) {
    return suffix.features[Models.Feature.types.mood].includes(Models.Constants.MOOD_IMPERATIVE)
  }
}

export default [new NounView(), new AdjectiveView(),
    // Verbs
  new VoiceConjugationMoodView(), new VoiceMoodConjugationView(), new ConjugationVoiceMoodView(),
  new ConjugationMoodVoiceView(), new MoodVoiceConjugationView(), new MoodConjugationVoiceView(),
  new ImperativeView(), new VerbParticipleView()]

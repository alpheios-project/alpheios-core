/* eslint-env jest */
/* eslint-disable no-unused-vars */
import * as Constants from '@/constants.js'
import Language from '@/language.js'
import Lexeme from '@/lexeme.js'
import Lemma from '@/lemma.js'
import Feature from '@/feature.js'
import Inflection from '@/inflection.js'
import Definition from '@/definition.js'
import DefinitionSet from '@/definition-set.js'
import LMF from '@/language_model_factory'
import InflectionGroup from '@/inflection_group'

describe('lexeme.test.js', () => {
  let lemma, inflection1, inflection2, definition

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    inflection1 = new Inflection('stem1', 'grc')
    inflection2 = new Inflection('stem2', 'grc')
    lemma = new Lemma('word', Language.GREEK)
    definition = new DefinitionSet('word', Language.GREEK)
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Lexeme - check required arguments for Lexeme constructor', () => {
    expect(function () {
      const l = new Lexeme()
      console.log(l)
    }).toThrowError(/empty/)

    expect(function () {
      const l = new Lexeme('foolemma')
      console.log(l)
    }).toThrowError(/Lemma object type/)

    expect(function () {
      const l = new Lexeme(lemma)
      console.log(l)
    }).toThrowError(/empty/)

    expect(function () {
      const l = new Lexeme(lemma, 'fooinflection')
      console.log(l)
    }).toThrowError(/array/)

    expect(function () {
      const l = new Lexeme(lemma, ['fooinflection'])
      console.log(l)
    }).toThrowError(/Inflection object type/)

    expect(function () {
      const l = new Lexeme(lemma, [inflection1], 'foomeaning')
      console.log(l)
    }).toThrowError(/DefinitionSet object type/)
  })

  it('2 Lexeme - create with min arguments', () => {
    const lex = new Lexeme(lemma, [inflection1, inflection2])

    expect(lex.lemma).toEqual(lemma)
    expect(lex.inflections).toEqual([inflection1, inflection2])
    expect(lex.meaning).toBeInstanceOf(DefinitionSet)

    const lex2 = new Lexeme(lemma, [inflection1, inflection2], definition)
    expect(lex2.meaning).toEqual(definition)
  })

  it('3 Lexeme - isPopulated method', () => {
    const lex = new Lexeme(lemma, [inflection1, inflection2])
    expect(lex.isPopulated()).toBeTruthy()

    const empty = new Lexeme(lemma, [])
    expect(empty.isPopulated()).toBeFalsy()

    let flemma = new Lemma('word', Language.GREEK) // eslint-disable-line prefer-const
    flemma.addFeature(new Feature(Feature.types.tense, ['noun'], Constants.LANG_GREEK))

    const withFeatures = new Lexeme(flemma, [])
    expect(withFeatures.isPopulated()).toBeTruthy()

    const def = new Definition('shortdef', Language.ENGLISH, Constants.MIMETypes.TEXT_PLAIN)
    let withDef = new Lexeme(lemma, []) // eslint-disable-line prefer-const
    withDef.meaning.appendShortDefs([def])
    expect(withDef.isPopulated()).toBeTruthy()
  })

  it('4 Lexeme - getGroupedInflections method', () => {
    const lex = new Lexeme(lemma, [inflection1, inflection2])
    const res = lex.getGroupedInflections()

    expect(Array.isArray(res)).toBeTruthy()
    expect(res[0]).toBeInstanceOf(InflectionGroup)
  })

  it('5 Lexeme - Sorting on feature order', () => {
    const mockLexemeOne = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['most frequent', 5]], Constants.LANG_GREEK, 1),
          pofs: new Feature(Feature.types.part, ['least important pofs', 1], Constants.LANG_GREEK, 1)
        }
      }
    }
    const mockLexemeTwo = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['less frequent', 3]], Constants.LANG_GREEK, 1),
          pofs: new Feature(Feature.types.part, [['more important pofs', 6]], Constants.LANG_GREEK, 1)
        }
      }
    }
    const mockLexemeThree = {
      lemma: {
        features: {
          pofs: new Feature(Feature.types.part, [['most important pofs', 7]], Constants.LANG_GREEK, 1)
        }
      }
    }
    const mockLexemeFour = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['most frequent', 5]], Constants.LANG_GREEK, 1),
          pofs: new Feature(Feature.types.part, [['more important pofs', 6]], Constants.LANG_GREEK, 1)
        }
      }
    }

    const mockLexemeFive = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['most frequent', 5]], Constants.LANG_GREEK, 2)
        }
      }
    }

    const mockLexemeSix = {
      lemma: {
        features: {}
      }
    }

    const mockLexemeSeven = {
      lemma: {
        features: {}
      }
    }

    const mockLexemeEight = {
      lemma: {
        features: {
          pofs: new Feature(Feature.types.part, [['more important pofs', 6]], Constants.LANG_GREEK, 1)
        }
      }
    }

    const mockLexemeNine = {
      lemma: {
        features: {
          pofs: new Feature(Feature.types.part, [['less important pofs', 1]], Constants.LANG_GREEK, 1)
        }
      }
    }

    const mockLexemeTen = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['most frequent', 5]], Constants.LANG_GREEK, 2)
        }
      }
    }

    const mockLexemeEleven = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['less frequent', 4]], Constants.LANG_GREEK, 2)
        }
      }
    }

    let lexemes = [mockLexemeTwo, mockLexemeOne] // freq=3, freq=5
    const sortFunc = Lexeme.getSortByTwoLemmaFeatures('freq', 'pofs')

    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeOne, mockLexemeTwo])

    lexemes = [mockLexemeOne, mockLexemeFour] // freq=5, freq=5, pofs=1, pofs=6
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFour, mockLexemeOne])

    lexemes = [mockLexemeFour, mockLexemeOne] // freq=5, freq=5, pofs=6, pofs=1
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFour, mockLexemeOne])

    lexemes = [mockLexemeFive, mockLexemeFour] // freq=5, freq=5, pofs=null, pofs=6
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFour, mockLexemeFive])

    lexemes = [mockLexemeFour, mockLexemeFive] // freq=5, freq=5, pofs=6, pofs=null
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFour, mockLexemeFive])

    lexemes = [mockLexemeOne, mockLexemeThree] // freq=3, freq=null, pofs=1, pofs=7
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeOne, mockLexemeThree])

    lexemes = [mockLexemeThree, mockLexemeOne] // freq=null, freq=3, pofs=7, pofs=1
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeOne, mockLexemeThree])

    lexemes = [mockLexemeFive, mockLexemeSix] // freq=5, pofs=null, freq=null, pofs=null
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFive, mockLexemeSix])

    lexemes = [mockLexemeSix, mockLexemeFive] // freq=null, pofs=null, freq=5, pofs=null
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFive, mockLexemeSix])

    lexemes = [mockLexemeSix, mockLexemeSeven] // null, null
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeSix, mockLexemeSeven])

    lexemes = [mockLexemeEight, mockLexemeNine] // freq=null, freq=null, pofs=6, pofs=1
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeEight, mockLexemeNine])

    lexemes = [mockLexemeTen, mockLexemeEleven] // freq=5, freq=4, pofs=null, pofs=null
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeTen, mockLexemeEleven])
  })

  it('6A Lexeme - disambiguate: case A', () => {
    /*
    Base and disambiguator lexemes have same features. Base lexeme has two inflections, for passive and active voices.
    Disambiguator lexeme has one inflection, for passive voice.
    A disambiguated lexeme should have a one passive voice inflection from a base lexeme (passive voice inflection
    provided by disambiguator is more precise within a given context and thus we should keep only
    a passive voice inflection; we do not replace a passive voice inflection from a base lexeme
    because an inflection from a disambiguator does not add any additional info to it.
     */
    lemma.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    let inflection1 = new Inflection('stem1', 'grc') // eslint-disable-line prefer-const
    inflection1.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let inflection2 = new Inflection('stem2', 'grc') // eslint-disable-line prefer-const
    inflection2.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    const lexeme = new Lexeme(lemma, [inflection1, inflection2])
    expect(lexeme.inflections).toEqual([inflection1, inflection2])

    const disambiguatorLemma = new Lemma('word', Language.GREEK)
    disambiguatorLemma.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    let inflection3 = new Inflection('word', 'grc') // eslint-disable-line prefer-const
    inflection3.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    const disambiguator = new Lexeme(disambiguatorLemma, [inflection3])

    const disambiguated = Lexeme.disambiguate(lexeme, disambiguator)

    // Disambiguated lexeme must have inflections that matches inflection2
    expect(disambiguated.inflections).toEqual([inflection2])
    expect(disambiguated.lemma).toEqual(lexeme.lemma)
    expect(disambiguated.meaning).toEqual(lexeme.meaning)
    expect(disambiguated.disambiguated).toBeTruthy()

    // the original lexeme's inflections should be untouched
    expect(lexeme.disambiguated).toBeFalsy()
    expect(lexeme.inflections).toEqual([inflection1, inflection2])
  })

  it('6B Lexeme - disambiguate: case B', () => {
    /*
    Base and disambiguator lexemes have same features. Base lexeme has two inflections, for passive and active voices.
    Disambiguator lexeme has no inflections.
    A disambiguated lexeme should not be disambiguated and should have the same inflections as a base lexeme:
    disambiguator has not enough information to disambiguate a base lexeme.
     */
    lemma.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    let inflection1 = new Inflection('stem1', 'grc') // eslint-disable-line prefer-const
    inflection1.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let inflection2 = new Inflection('stem1', 'grc') // eslint-disable-line prefer-const
    inflection2.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    const lexeme = new Lexeme(lemma, [inflection1, inflection2])
    expect(lexeme.inflections).toEqual([inflection1, inflection2])

    const disambiguatorLemma = new Lemma('word', Language.GREEK)
    disambiguatorLemma.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    const disambiguator = new Lexeme(disambiguatorLemma, [])

    const disambiguated = Lexeme.disambiguate(lexeme, disambiguator)

    // Disambiguated lexeme must have inflections that matches inflection2
    expect(disambiguated.inflections).toEqual([inflection1, inflection2])
    expect(disambiguated.lemma).toEqual(lexeme.lemma)
    expect(disambiguated.meaning).toEqual(lexeme.meaning)
    expect(disambiguated.disambiguated).toBeFalsy()

    // the original lexeme's inflections should be untouched
    expect(lexeme.disambiguated).toBeFalsy()
    expect(lexeme.inflections).toEqual([inflection1, inflection2])
  })

  it('6C Lexeme - disambiguate: case C', () => {
    /*
    Base and disambiguator lexemes have same features. Base lexeme has two inflections, for passive and active voices.
    Disambiguator lexeme has two inflections, for passive and mediopassive voices.
    A disambiguated lexeme should have a one passive voice inflection from a base lexeme.
    TODO: Do we ignore a mediapassive voice inflection from a disambiguator?
     */
    lemma.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    let inflection1 = new Inflection('stem1', 'grc') // eslint-disable-line prefer-const
    inflection1.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let inflection2 = new Inflection('stem2', 'grc') // eslint-disable-line prefer-const
    inflection2.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    const lexeme = new Lexeme(lemma, [inflection1, inflection2])
    expect(lexeme.inflections).toEqual([inflection1, inflection2])

    const disambiguatorLemma = new Lemma('word', Language.GREEK)
    disambiguatorLemma.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    let inflection3 = new Inflection('stem3', 'grc') // eslint-disable-line prefer-const
    inflection3.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let inflection4 = new Inflection('stem4', 'grc') // eslint-disable-line prefer-const
    inflection4.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection4.addFeature(new Feature(Feature.types.voice, Constants.VOICE_MEDIOPASSIVE, Constants.LANG_GREEK))
    const disambiguator = new Lexeme(disambiguatorLemma, [inflection3, inflection4])

    const disambiguated = Lexeme.disambiguate(lexeme, disambiguator)

    // Disambiguated lexeme must have inflections that matches inflection2
    expect(disambiguated.inflections).toEqual([inflection2])
    expect(disambiguated.lemma).toEqual(lexeme.lemma)
    expect(disambiguated.meaning).toEqual(lexeme.meaning)
    expect(disambiguated.disambiguated).toBeTruthy()

    // the original lexeme's inflections should be untouched
    expect(lexeme.disambiguated).toBeFalsy()
    expect(lexeme.inflections).toEqual([inflection1, inflection2])
  })

  it('7 Lexeme - adds alternate Lemmas', () => {
    const lemma2 = new Lemma('word', Language.GREEK)
    let lex = new Lexeme(lemma, []) // eslint-disable-line prefer-const
    expect(lex.altLemmas.length).toEqual(0)
    lex.addAltLemma(lemma2)
    expect(lex.altLemmas).toEqual([lemma2])
  })
})

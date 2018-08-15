/* eslint-env jest */
/* eslint-disable no-unused-vars */
import * as Constants from '@/constants.js'
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
    lemma = new Lemma('word', 'grc')
    definition = new DefinitionSet('word', Constants.LANG_GREEK)
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Lexeme - check required arguments for Lexeme constructor', () => {
    expect(function () {
      let l = new Lexeme()
      console.log(l)
    }).toThrowError(/empty/)

    expect(function () {
      let l = new Lexeme('foolemma')
      console.log(l)
    }).toThrowError(/Lemma object type/)

    expect(function () {
      let l = new Lexeme(lemma)
      console.log(l)
    }).toThrowError(/empty/)

    expect(function () {
      let l = new Lexeme(lemma, 'fooinflection')
      console.log(l)
    }).toThrowError(/array/)

    expect(function () {
      let l = new Lexeme(lemma, ['fooinflection'])
      console.log(l)
    }).toThrowError(/Inflection object type/)

    expect(function () {
      let l = new Lexeme(lemma, [inflection1], 'foomeaning')
      console.log(l)
    }).toThrowError(/DefinitionSet object type/)
  })

  it('2 Lexeme - create with min arguments', () => {
    let lex = new Lexeme(lemma, [inflection1, inflection2])

    expect(lex.lemma).toEqual(lemma)
    expect(lex.inflections).toEqual([inflection1, inflection2])
    expect(lex.meaning).toBeInstanceOf(DefinitionSet)

    let lex2 = new Lexeme(lemma, [inflection1, inflection2], definition)
    expect(lex2.meaning).toEqual(definition)
  })

  it('3 Lexeme - isPopulated method', () => {
    let lex = new Lexeme(lemma, [inflection1, inflection2])
    expect(lex.isPopulated()).toBeTruthy()

    let empty = new Lexeme(lemma, [])
    expect(empty.isPopulated()).toBeFalsy()

    let flemma = new Lemma('word', 'grc')
    flemma.addFeature(new Feature(Feature.types.tense, ['noun'], Constants.LANG_GREEK))

    let withFeatures = new Lexeme(flemma, [])
    expect(withFeatures.isPopulated()).toBeTruthy()

    let def = new Definition('shortdef', 'eng', 'text/plain')
    let withDef = new Lexeme(lemma, [])
    withDef.meaning.appendShortDefs([def])
    expect(withDef.isPopulated()).toBeTruthy()
  })

  it('4 Lexeme - getGroupedInflections method', () => {
    let lex = new Lexeme(lemma, [inflection1, inflection2])
    let res = lex.getGroupedInflections()

    expect(Array.isArray(res)).toBeTruthy()
    expect(res[0]).toBeInstanceOf(InflectionGroup)
  })

  it('5 Lexeme - create Lexeme from readObject method', () => {
    let testJson = {
      lemma: lemma,
      inflections: [ inflection1, inflection2 ],
      meaning: definition
    }

    let lex = Lexeme.readObject(testJson)
    expect(lex).toBeInstanceOf(Lexeme)
    expect(lex.lemma).toBeInstanceOf(Lemma)
    expect(lex.inflections[0]).toBeInstanceOf(Inflection)
    expect(lex.meaning).toBeInstanceOf(DefinitionSet)
  })

  it('6 Lexeme - Sorting on feature order', () => {
    let mockLexemeOne = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['most frequent', 5]], Constants.LANG_GREEK, 1),
          pofs: new Feature(Feature.types.part, ['least important pofs', 1], Constants.LANG_GREEK, 1)
        }
      }
    }
    let mockLexemeTwo = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['less frequent', 3]], Constants.LANG_GREEK, 1),
          pofs: new Feature(Feature.types.part, [['more important pofs', 6]], Constants.LANG_GREEK, 1)
        }
      }
    }
    let mockLexemeThree = {
      lemma: {
        features: {
          pofs: new Feature(Feature.types.part, [['most important pofs', 7]], Constants.LANG_GREEK, 1)
        }
      }
    }
    let mockLexemeFour = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['most frequent', 5]], Constants.LANG_GREEK, 1),
          pofs: new Feature(Feature.types.part, [['more important pofs', 6]], Constants.LANG_GREEK, 1)
        }
      }
    }

    let mockLexemeFive = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['most frequent', 5]], Constants.LANG_GREEK, 2)
        }
      }
    }

    let mockLexemeSix = {
      lemma: {
        features: {}
      }
    }

    let mockLexemeSeven = {
      lemma: {
        features: {}
      }
    }

    let mockLexemeEight = {
      lemma: {
        features: {
          pofs: new Feature(Feature.types.part, [['more important pofs', 6]], Constants.LANG_GREEK, 1)
        }
      }
    }

    let mockLexemeNine = {
      lemma: {
        features: {
          pofs: new Feature(Feature.types.part, [['less important pofs', 1]], Constants.LANG_GREEK, 1)
        }
      }
    }

    let mockLexemeTen = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['most frequent', 5]], Constants.LANG_GREEK, 2)
        }
      }
    }

    let mockLexemeEleven = {
      lemma: {
        features: {
          freq: new Feature(Feature.types.frequency, [['less frequent', 4]], Constants.LANG_GREEK, 2)
        }
      }
    }

    let lexemes = [ mockLexemeTwo, mockLexemeOne ] // freq=3, freq=5
    let sortFunc = Lexeme.getSortByTwoLemmaFeatures('freq', 'pofs')

    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeOne, mockLexemeTwo])

    lexemes = [ mockLexemeOne, mockLexemeFour ] // freq=5, freq=5, pofs=1, pofs=6
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFour, mockLexemeOne])

    lexemes = [ mockLexemeFour, mockLexemeOne ] // freq=5, freq=5, pofs=6, pofs=1
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFour, mockLexemeOne])

    lexemes = [ mockLexemeFive, mockLexemeFour ] // freq=5, freq=5, pofs=null, pofs=6
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFour, mockLexemeFive])

    lexemes = [ mockLexemeFour, mockLexemeFive ] // freq=5, freq=5, pofs=6, pofs=null
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFour, mockLexemeFive])

    lexemes = [ mockLexemeOne, mockLexemeThree ] // freq=3, freq=null, pofs=1, pofs=7
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeOne, mockLexemeThree])

    lexemes = [ mockLexemeThree, mockLexemeOne ] // freq=null, freq=3, pofs=7, pofs=1
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeOne, mockLexemeThree])

    lexemes = [ mockLexemeFive, mockLexemeSix ] // freq=5, pofs=null, freq=null, pofs=null
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFive, mockLexemeSix])

    lexemes = [ mockLexemeSix, mockLexemeFive ] // freq=null, pofs=null, freq=5, pofs=null
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeFive, mockLexemeSix])

    lexemes = [ mockLexemeSix, mockLexemeSeven ] // null, null
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeSix, mockLexemeSeven])

    lexemes = [ mockLexemeEight, mockLexemeNine ] // freq=null, freq=null, pofs=6, pofs=1
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeEight, mockLexemeNine])

    lexemes = [ mockLexemeTen, mockLexemeEleven ] // freq=5, freq=4, pofs=null, pofs=null
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeTen, mockLexemeEleven])
  })
  it('7 Lexeme - disambiguate', () => {
    let lemma2 = new Lemma('word', 'grc')
    lemma.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    lemma2.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    let inflection1 = new Inflection('stem1', 'grc')
    inflection1.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let inflection2 = new Inflection('stem1', 'grc')
    inflection2.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let lex = new Lexeme(lemma, [inflection1, inflection2])
    let inflection3 = new Inflection('word', 'grc')
    inflection3.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflection3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let disambiguator = new Lexeme(lemma2, [inflection3])
    expect(lex.inflections).toEqual([inflection1, inflection2])
    let retval = Lexeme.disambiguate(lex, disambiguator)
    // disambiguator is a lexeme with an inflection which matches inflection2
    expect(retval.inflections).toEqual([inflection2])
    expect(retval.lemma).toEqual(lex.lemma)
    expect(retval.meaning).toEqual(lex.meaning)
    expect(retval.disambiguated).toBeTruthy()
    // the original lexeme's inflections should be untouched
    expect(lex.disambiguated).toBeFalsy()
    expect(lex.inflections).toEqual([inflection1, inflection2])
  })
})

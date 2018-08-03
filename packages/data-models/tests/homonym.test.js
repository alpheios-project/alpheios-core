/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Homonym from '@/homonym.js'

import * as Constants from '@/constants.js'
import Lexeme from '@/lexeme.js'
import Lemma from '@/lemma.js'
import Inflection from '@/inflection.js'
import Feature from '@/feature.js'

describe('homonym.test.js', () => {
  let lexeme1, lexeme2

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    lexeme1 = new Lexeme(
      new Lemma('word1', 'grc'),
      [
        new Inflection('stem1', 'grc'),
        new Inflection('stem2', 'grc')
      ]
    )
    lexeme2 = new Lexeme(
      new Lemma('word2', 'grc'),
      [
        new Inflection('stem3', 'grc'),
        new Inflection('stem4', 'grc')
      ]
    )
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Homonym - check required arguments for Homonym constructor', () => {
    expect(function () {
      let l = new Homonym()
      console.log(l)
    }).toThrowError(/empty/)

    expect(function () {
      let l = new Homonym('foodata')
      console.log(l)
    }).toThrowError(/array/)

    expect(function () {
      let l = new Homonym(['foodata'])
      console.log(l)
    }).toThrowError(/Lexeme object type/)
  })

  it('2 Homonym - create with min arguments', () => {
    let homonym = new Homonym([lexeme1], 'fooform')
    expect(homonym.lexemes).toEqual([lexeme1])
    expect(homonym.targetWord).toEqual('fooform')
  })

  it('3 Homonym - create homonym from json using readObject', () => {
    let testJson = {
      lexemes: [ lexeme1, lexeme2 ],
      targetWord: 'fooTargetWord'
    }

    Lexeme.readObject = jest.fn((l) => l)

    let hRes1 = Homonym.readObject(testJson)
    expect(Lexeme.readObject).toHaveBeenCalledTimes(2)

    expect(hRes1.targetWord).toEqual('fooTargetWord')
    expect(hRes1.lexemes).toEqual([ lexeme1, lexeme2 ])

    delete testJson.targetWord
    let hRes2 = Homonym.readObject(testJson)
    expect(hRes2.targetWord).toBeUndefined()

    delete testJson.lexemes

    expect(function () {
      let l = Homonym.readObject(testJson)
      console.log(l)
    }).toThrowError(/empty/)
  })

  it('4 Homonym - language method', () => {
    let homonym = new Homonym([lexeme1], 'fooform')
    let res = homonym.language

    expect(res).toEqual('grc')
  })

  it('5 Homonym - languageID method', () => {
    let homonym = new Homonym([lexeme1])
    let res = homonym.languageID

    expect(res).toEqual(Constants.LANG_GREEK)

    delete lexeme2.lemma.languageID

    homonym = new Homonym([lexeme2])
    expect(function () {
      let l = homonym.languageID
      console.log(l)
    }).toThrowError(/language ID/)
  })

  it('6 Homonym - inflections method', () => {
    let infl1 = new Inflection('stem1', 'grc')
    let infl2 = new Inflection('stem2', 'grc')

    let lexeme = new Lexeme(
      new Lemma('word1', 'grc'),
      [
        infl1, infl2
      ]
    )

    let homonym = new Homonym([lexeme])
    expect(homonym.inflections).toEqual([infl1, infl2])
  })

  it('7 Homonym - disambiguate method', () => {
    let infl1 = new Inflection('stem1', 'grc')
    infl1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_GREEK))
    let infl2 = new Inflection('stem1', 'grc')
    infl2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let lem = new Lemma('word1', 'grc')
    lem.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    let lexeme = new Lexeme(
      lem,
      [
        infl1, infl2
      ]
    )
    let homonym = new Homonym([lexeme])
    let lexeme2 = new Lexeme(
      lem,
      [
        infl1
      ]
    )
    let homonym2 = new Homonym([lexeme2])
    // simplest case - homonym with single lexeme, two possible inflections, disambiguator reduces to one
    let disambiguated = Homonym.disambiguate(homonym, [homonym2])
    expect(disambiguated.isDisambiguated()).toBeTruthy()
    expect(disambiguated.inflections).toEqual([infl1])
    // homonym with single lexeme, two possible inflections, disambiguator adds a new lexeme
    let infl3 = new Inflection('stem2', 'grc')
    infl3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_GREEK))
    let lexeme3 = new Lexeme(
      new Lemma('word2', 'grc'),
      [
        infl3
      ]
    )
    let homonym3 = new Homonym([lexeme3])
    disambiguated = Homonym.disambiguate(homonym, [homonym3])
    expect(disambiguated.isDisambiguated()).toBeTruthy()
    expect(disambiguated.lexemes.length).toEqual(2)
    expect(disambiguated.lexemes[0].inflections).toEqual([infl1, infl2])
    expect(disambiguated.lexemes[0].disambiguated).toBeFalsy()
    expect(disambiguated.lexemes[1].inflections).toEqual([infl3])
    expect(disambiguated.lexemes[1].disambiguated).toBeTruthy()
  })
})

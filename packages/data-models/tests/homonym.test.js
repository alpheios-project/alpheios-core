/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Homonym from '@/homonym.js'

import * as Constants from '@/constants.js'
import Lexeme from '@/lexeme.js'
import Lemma from '@/lemma.js'
import Inflection from '@/inflection.js'

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
})

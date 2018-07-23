/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Inflection } from 'alpheios-data-models'

import InflectionSet from '@lib/inflection-set.js'
import Inflections from '@lib/inflections.js'
import Form from '@lib/form.js'
import Paradigm from '@lib/paradigm.js'

import paradigm01 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-01.json'

describe('inflection-set.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 InflectionSet - constructor inits arguments with default values', () => {
    let infls = new InflectionSet('numeral')

    expect(infls.partOfSpeech).toEqual('numeral')
    expect(infls.types.size).toEqual(0)
  })

  it('2 InflectionSet - hasTypes returns true if types has items', () => {
    let infls = new InflectionSet('numeral')

    expect(infls.hasTypes).toBeFalsy()

    infls.types.set('fooKey', 'fooValue')
    expect(infls.hasTypes).toBeTruthy()
  })

  it('3 InflectionSet - inflectionTypes returns keys from types set', () => {
    let infls = new InflectionSet('numeral')

    expect(infls.inflectionTypes).toEqual([])

    infls.types.set('fooKey', 'fooValue')

    expect(infls.inflectionTypes).toEqual(['fooKey'])
  })

  it('4 InflectionSet - addInflectionItem executes addInflectionItems with array argument', () => {
    let infls = new InflectionSet('numeral')
    infls.addInflectionItems = jest.fn()

    infls.addInflectionItem('fooItem')
    expect(infls.addInflectionItems).toHaveBeenCalledWith(['fooItem'])
  })

  it('5 InflectionSet - addInflectionItems adds inflections to types', () => {
    let infls = new InflectionSet('numeral')

    let inflectionsTest = [ new Form('foo1') ]
    infls.addInflectionItems(inflectionsTest)
    expect(Array.from(infls.types.keys())).toEqual([Form])
  })

  it('6 InflectionSet - addInflectionsObject throw Error if argument is empty', () => {
    let infls = new InflectionSet('numeral')
    expect(() => infls.addInflectionsObject()).toThrow(new Error(`Inflection items object must not be empty`))
  })

  it('7 InflectionSet - addInflectionsObject throw Error if argument is not Inflections', () => {
    let infls = new InflectionSet('numeral')
    expect(() => infls.addInflectionsObject('foo')).toThrow(new Error(`Inflection items object must be of InflectionItems type`))
  })

  it('8 InflectionSet - addInflectionsObject throw Error if Inflections doesn\'t have type', () => {
    let infls = new InflectionSet('numeral')
    expect(() => infls.addInflectionsObject(new Inflections())).toThrow(new Error(`Inflection items must have a valid type`))
  })

  it('9 InflectionSet - addInflectionsObject adds Inflections to types', () => {
    let infls = new InflectionSet('numeral')
    infls.addInflectionsObject(new Inflections(Form))

    expect(infls.types.size).toEqual(1)
    expect(Array.from(infls.types.keys())).toEqual([Form])
    expect(infls.types.get(Form)).toBeInstanceOf(Inflections)
  })

  it('10 InflectionSet - addFootnote adds footnote to types', () => {
    let infls = new InflectionSet('numeral')

    infls.addFootnote(Form, 1, 'fooFootNote')

    expect(infls.types.size).toEqual(1)
    expect(Array.from(infls.types.keys())).toEqual([Form])
    expect(infls.types.get(Form).footnotesMap.size).toEqual(1)
  })

  it('11 InflectionSet - getMatchingParadigms returns empty array if there are no Paradigms in types', () => {
    let infls = new InflectionSet('verb')
    expect(infls.getMatchingParadigms().length).toEqual(0)
  })

  it('12 InflectionSet - getMatchingParadigms executes getMatches for each Paradigm from types', () => {
    let infls = new InflectionSet('verb')
    let paradigm = new Paradigm(Constants.LANG_GREEK, 'verb', paradigm01)
    paradigm.getMatches = jest.fn()
    infls.addInflectionItem(paradigm)

    let inflection = new Inflection('stem', 'grc', 'suffix')

    let res = infls.getMatchingParadigms(inflection)
    expect(infls.getMatchingParadigms().length).toEqual(0)
  })
})

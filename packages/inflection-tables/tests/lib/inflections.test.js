/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Feature } from 'alpheios-data-models'

import Inflections from '@lib/inflection-list.js'
import Form from '@lib/form.js'

describe('inflections.test.js', () => {
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

  it('1 Inflections - constructor inits arguments with default values', () => {
    let infls = new Inflections(Form)

    expect(infls.type).toEqual(Form)
    expect(infls.items.length).toEqual(0)
    expect(infls.footnotesMap.size).toEqual(0)
  })

  it('2 Inflections - addItem throw error for empty item', () => {
    let infls = new Inflections(Form)
    expect(() => infls.addItem()).toThrow(new Error(`Inflection item cannot be empty`))
  })

  it('3 Inflections - addItem adds item to item array', () => {
    let infls = new Inflections(Form)
    infls.addItem('fooItem')
    expect(infls.items).toEqual([ 'fooItem' ])
  })

  it('4 Inflections - addItems throw error for empty items', () => {
    let infls = new Inflections(Form)
    expect(() => infls.addItems()).toThrow(new Error(`Inflection items cannot be empty`))
  })

  it('5 Inflections - addItems throw error for non-array items', () => {
    let infls = new Inflections(Form)
    expect(() => infls.addItems('fooItem')).toThrow(new Error(`Inflection items must be in an array`))
  })

  it('6 Inflections - addItems throw error for an empty array', () => {
    let infls = new Inflections(Form)
    expect(() => infls.addItems([])).toThrow(new Error(`Inflection items array must not be empty`))
  })

  it('7 Inflections - addItems adds all values from an argument to the items attribute', () => {
    let infls = new Inflections(Form)
    infls.addItems([{id: 'fooItem1'}, {id: 'fooItem2'}])
    expect(infls.items).toEqual([{id: 'fooItem1'}, {id: 'fooItem2'}])
  })
  it('8 Inflections - addFootnote adds item to footnotesMap attribute', () => {
    let infls = new Inflections(Form)
    infls.addFootnote(1, 'fooFootNote')
    expect(infls.footnotesMap.size).toEqual(1)
  })

  it('9 Inflections - getMatches returns matched items for current inflection (for paradigm) - success match', () => {
    let infls = new Inflections(Form)

    let formItem1 = new Form('δύο')
    formItem1.matches = jest.fn(() => 'δύο1')

    let formItem2 = new Form('δύο')
    formItem2.matches = jest.fn(() => false)

    infls.addItems([ formItem1, formItem2 ])

    expect(infls.getMatches('fooInflection')).toEqual([formItem1])
  })

  it('10 Inflections - footnotesInUse returns footnotes indexes', () => {
    let infls = new Inflections(Form)

    let formItem1 = new Form('δύο1')
    formItem1[Feature.types.footnote] = [4]

    let formItem2 = new Form('δύο2')
    formItem2[Feature.types.footnote] = [2]

    let formItem3 = new Form('δύο3')

    infls.addItems([ formItem1, formItem2, formItem3 ])

    expect(infls.footnotesInUse).toEqual([ 2, 4 ])
  })
})

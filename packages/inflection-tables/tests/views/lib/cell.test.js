/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import Cell from '@views/lib/cell.js'

import { Constants, Feature } from 'alpheios-data-models'

import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'
import GreekLanguageDatasetJSON from '@tests/lib/lang/greek-language-dataset-json.js'
import LanguageDatasetFactory from '@lib/language-dataset-factory.js'
import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'

import L10nJSON from '@tests/l10n/l10n-json.js'
import L10n from '@l10n/l10n.js'
import MessageBundle from '@l10n/message-bundle.js'

import Form from '@lib/form.js'
import * as Styles from '@views/styles/styles'

describe('cell.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let maAdapter, testHomonym, testInflectionData, testMorphemes, testFeatures

  const testLocale = 'en-US'

  /*  Object.defineProperty(GreekLanguageDataset, 'verbParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParadigmTables),
    set: jest.fn()
  })
  Object.defineProperty(GreekLanguageDataset, 'verbParticipleParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParticipleParadigmTables),
    set: jest.fn()
  }) */

  L10n.getMessages = jest.fn((locale) => L10nJSON.getMessages(locale))

  beforeAll(async () => {
    maAdapter = new AlpheiosTuftsAdapter()
    testHomonym = await maAdapter.getHomonym(Constants.LANG_GREEK, 'δύο')
    testInflectionData = await LanguageDatasetFactory.getInflectionData(testHomonym)
    testMorphemes = testInflectionData.pos.get('numeral').types.get(Form).items.slice(0, 1)

    testFeatures = []
    testFeatures.push(new Feature(Feature.types.hdwd, 'εἱς - μία - ἑν (1)', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.type, 'regular', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.case, 'nominative', Constants.LANG_GREEK))
  })

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

  it('1 Cell - constructor creates Cell with values from attributes and executes render', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    expect(cell.morphemes.length).toEqual(1)
    expect(cell.features.length).toEqual(5)
    expect(cell.empty).toBeFalsy()
    expect(cell.suffixMatches).toBeTruthy()
    expect(cell.wNode).toBeInstanceOf(window.HTMLDivElement)
    expect(cell.nNode).toBeInstanceOf(window.HTMLDivElement)
  })

  it('2 Cell - constructor saves empty array if suffixes are not defined', () => {
    let cell = new Cell(null, testFeatures)
    expect(cell.morphemes.length).toEqual(0)
  })

  it('3 Cell - index method sets index wNode and nNode', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    cell.index = 100
    expect(cell._index).toEqual(100)
    expect(cell.wNode.dataset.index).toEqual('100')
    expect(cell.nNode.dataset.index).toEqual('100')
  })

  it('4 Cell - addEventListener method executes addEventListener for wNode and nNode', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    cell.wNode.addEventListener = jest.fn()
    cell.nNode.addEventListener = jest.fn()

    cell.addEventListener('fooType', 'fooListener')

    expect(cell.wNode.addEventListener).toHaveBeenCalledWith('fooType', 'fooListener')
    expect(cell.nNode.addEventListener).toHaveBeenCalledWith('fooType', 'fooListener')
  })

  it('5 Cell - hide adds hidden styles for wNode and nNode', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    cell.hide()
    expect(cell.wNode.classList.contains(Styles.classNames.hidden)).toBeTruthy()
    expect(cell.nNode.classList.contains(Styles.classNames.hidden)).toBeTruthy()
  })

  it('6 Cell - show removes hidden styles for wNode and nNode', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    cell.hide()

    cell.show()
    expect(cell.wNode.classList.contains(Styles.classNames.hidden)).toBeFalsy()
    expect(cell.nNode.classList.contains(Styles.classNames.hidden)).toBeFalsy()
  })

  it('7 Cell - highlight adds highlight styles for wNode and nNode', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    cell.highlight()
    expect(cell.wNode.classList.contains(Styles.classNames.highlight)).toBeTruthy()
    expect(cell.nNode.classList.contains(Styles.classNames.highlight)).toBeTruthy()
  })

  it('8 Cell - clearHighlighting removes highlight styles for wNode and nNode', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    cell.highlight()

    cell.clearHighlighting()
    expect(cell.wNode.classList.contains(Styles.classNames.highlight)).toBeFalsy()
    expect(cell.nNode.classList.contains(Styles.classNames.highlight)).toBeFalsy()
  })

  it('9 Cell - highlightRowAndColumn throw error if column is not defined', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    expect(() => cell.highlightRowAndColumn()).toThrow(new Error('Column is undefined.'))
  })

  it('10 Cell - highlightRowAndColumn throw error if row is not defined', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    cell.column = 'fooColumn'

    expect(() => cell.highlightRowAndColumn()).toThrow(new Error('Row is undefined.'))
  })

  it('11 Cell - highlightRowAndColumn executes highlight methods for column and row', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    cell.column = { highlight: jest.fn() }
    cell.row = { highlight: jest.fn() }
    cell.highlightRowAndColumn()

    expect(cell.column.highlight).toHaveBeenCalled()
    expect(cell.row.highlight).toHaveBeenCalled()
  })

  it('12 Cell - clearRowAndColumnHighlighting throw error if column is not defined', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    expect(() => cell.clearRowAndColumnHighlighting()).toThrow(new Error('Column is undefined.'))
  })

  it('13 Cell - clearRowAndColumnHighlighting throw error if row is not defined', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    cell.column = 'fooColumn'

    expect(() => cell.clearRowAndColumnHighlighting()).toThrow(new Error('Row is undefined.'))
  })

  it('14 Cell - clearRowAndColumnHighlighting executes clearHighlighting methods for column and row', () => {
    let cell = new Cell(testMorphemes, testFeatures)
    cell.column = { clearHighlighting: jest.fn() }
    cell.row = { clearHighlighting: jest.fn() }
    cell.clearRowAndColumnHighlighting()

    expect(cell.column.clearHighlighting).toHaveBeenCalled()
    expect(cell.row.clearHighlighting).toHaveBeenCalled()
  })
})

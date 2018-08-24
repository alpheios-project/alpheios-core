/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import Column from '@views/lib/column.js'
import Cell from '@views/lib/cell.js'
import HeaderCell from '@views/lib/header-cell.js'

import { Constants, Feature } from 'alpheios-data-models'

import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'
import GreekLanguageDatasetJSON from '@tests/lib/lang/greek-language-dataset-json.js'
import LanguageDatasetFactory from '@lib/language-dataset-factory.js'
import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'

import GroupFeatureType from '@views/lib/group-feature-type.js'

import L10nJSON from '@tests/l10n/l10n-json.js'
import L10n from '@l10n/l10n.js'
import MessageBundle from '@l10n/message-bundle.js'

import Form from '@lib/form.js'
import * as Styles from '@views/styles/styles'

describe('column.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let maAdapter, testHomonym, testInflectionData, testMorphemes, testFeatures, testCells
  let testGroupingFeature, testGroupFeatureType, testHeaderCell

  const testLocale = 'en-US'
  /*
  Object.defineProperty(GreekLanguageDataset, 'verbParadigmTables', {
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
    testMorphemes = testInflectionData.pos.get('numeral').types.get(Form).items

    testFeatures = []
    testFeatures.push(new Feature(Feature.types.hdwd, 'εἱς - μία - ἑν (1)', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.type, 'regular', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.case, 'nominative', Constants.LANG_GREEK))

    testCells = []
    testCells.push(new Cell([testMorphemes[11]], testFeatures))
    testCells.push(new Cell([testMorphemes[10]], testFeatures))
    testCells.push(new Cell([testMorphemes[13]], testFeatures))
    testCells.push(new Cell([testMorphemes[8]], testFeatures))

    testGroupingFeature = new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK)
    testGroupFeatureType = new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [testGroupingFeature])
    testHeaderCell = new HeaderCell('masculine', testGroupFeatureType)
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

  it('1 Column - constructor fills properties and saves column to each cells', () => {
    let column = new Column(testCells)

    expect(column.cells.length).toEqual(4)
    expect(column.hidden).toBeFalsy()
    expect(column.empty).toBeFalsy()
    expect(column.suffixMatches).toBeFalsy()
    expect(testCells.every(cell => cell.column !== undefined)).toBeTruthy()
  })

  it('2 Column - constructor creates column even if cells are not defined', () => {
    let column = new Column()
    expect(column.cells.length).toEqual(0)
  })

  it('3 Column - headerCell sets _headerCell and column for headerCell', () => {
    let column = new Column(testCells)

    testHeaderCell.addColumn = jest.fn()

    column.headerCell = testHeaderCell
    expect(column._headerCell.title).toEqual('masculine')
    expect(testHeaderCell.addColumn).toHaveBeenCalled()
  })

  it('4 Column - length returns count of cells', () => {
    let column = new Column(testCells)
    expect(column.length).toEqual(4)
  })

  it('5 Column - hide method makes hidden the column and each cells and headerCell', () => {
    let column = new Column(testCells)
    testCells.forEach(cell => { cell.hide = jest.fn() })

    testHeaderCell.columnStateChange = jest.fn()
    column.headerCell = testHeaderCell

    expect(column.hidden).toBeFalsy()

    column.hide()
    expect(column.hidden).toBeTruthy()
    testCells.forEach(cell => { expect(cell.hide).toHaveBeenCalled() })
    expect(testHeaderCell.columnStateChange).toHaveBeenCalled()
  })

  it('6 Column - hide method does nothing if column is alredy hidden', () => {
    let column = new Column(testCells)
    column.hide()

    testCells.forEach(cell => { cell.hide = jest.fn() })
    testHeaderCell.columnStateChange = jest.fn()
    column.headerCell = testHeaderCell

    column.hide()
    testCells.forEach(cell => { expect(cell.hide).not.toHaveBeenCalled() })
    expect(testHeaderCell.columnStateChange).not.toHaveBeenCalled()
  })

  it('7 Column - show method makes shown the column and each cells and headerCell', () => {
    let column = new Column(testCells)
    column.headerCell = testHeaderCell
    column.hide()

    testCells.forEach(cell => { cell.show = jest.fn() })
    testHeaderCell.columnStateChange = jest.fn()

    expect(column.hidden).toBeTruthy()

    column.show()

    expect(column.hidden).toBeFalsy()
    testCells.forEach(cell => { expect(cell.show).toHaveBeenCalled() })
    expect(testHeaderCell.columnStateChange).toHaveBeenCalled()
  })

  it('8 Column - show method does nothing if the column is already shown', () => {
    let column = new Column(testCells)
    column.headerCell = testHeaderCell
    column.show()

    testCells.forEach(cell => { cell.show = jest.fn() })
    testHeaderCell.columnStateChange = jest.fn()

    column.show()

    testCells.forEach(cell => { expect(cell.show).not.toHaveBeenCalled() })
    expect(testHeaderCell.columnStateChange).not.toHaveBeenCalled()
  })

  it('9 Column - highlight method highlights each cells and headerCell', () => {
    let column = new Column(testCells)
    column.headerCell = testHeaderCell

    testCells.forEach(cell => { cell.highlight = jest.fn() })
    testHeaderCell.highlight = jest.fn()

    column.highlight()

    testCells.forEach(cell => { expect(cell.highlight).toHaveBeenCalled() })
    expect(testHeaderCell.highlight).toHaveBeenCalled()
  })

  it('10 Column - clearHighlighting method executes clearHighlighting for each cells and headerCell', () => {
    let column = new Column(testCells)
    column.headerCell = testHeaderCell

    column.highlight()

    testCells.forEach(cell => { cell.clearHighlighting = jest.fn() })
    testHeaderCell.clearHighlighting = jest.fn()

    column.clearHighlighting()

    testCells.forEach(cell => { expect(cell.clearHighlighting).toHaveBeenCalled() })
    expect(testHeaderCell.clearHighlighting).toHaveBeenCalled()
  })
})

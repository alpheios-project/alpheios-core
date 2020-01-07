/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import Row from '@views/lib/row.js'
import Cell from '@views/lib/cell.js'

import RowTitleCell from '@views/lib/row-title-cell.js'

import Form from '@lib/form.js'

import { Constants, Feature } from 'alpheios-data-models'
import BaseTestHelp from '@tests/data/base-test-help.js'
import GreekView from '@views/lang/greek/greek-view.js'

import GroupFeatureType from '@views/lib/group-feature-type.js'
import GroupFeatureList from '@views/lib/group-feature-list.js'

describe('row.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testMorphemes, testFeatures, testCells, testTitleCell

  beforeAll(async () => {
    let testHomonym = await BaseTestHelp.getHomonym('δύο', Constants.LANG_GREEK)
    const dataset = GreekView.dataset
    let testInflectionData = dataset.getInflectionData(testHomonym)
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

    let testGroupingFeature = new Feature(Feature.types.case, 'nominative', Constants.LANG_GREEK)
    let testGroupFeatureType = new GroupFeatureType(Feature.types.case, Constants.LANG_GREEK, 'Case', [testGroupingFeature])
    testGroupFeatureType.groupFeatureList = new GroupFeatureList([])
    testTitleCell = new RowTitleCell('nominative', testGroupFeatureType, 4)
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

  it('1 Row - constructor adds cells and adds row to each cells', () => {
    let row = new Row(testCells)

    expect(row.cells.length).toEqual(4)
    testCells.forEach(cell => expect(cell.row).toBeDefined())
  })

  it('2 Row - add method adds cell and adds row for this cell', () => {
    let row = new Row(testCells)
    let newCell = new Cell([testMorphemes[10]], testFeatures)
    row.add(newCell)

    expect(row.cells.length).toEqual(5)
    expect(newCell.row).toBeDefined()
  })

  it('3 Row - length method returns count of cells', () => {
    let row = new Row(testCells)
    expect(row.length).toEqual(5)
  })

  it('4 Row - empty returns true if all cells are empty', () => {
    let row1 = new Row(testCells)
    expect(row1.empty).toBeFalsy()

    let row2 = new Row()
    expect(row2.empty).toBeTruthy()
  })

  // it('5 Row - slice method returns error if from is out of range', () => {
  //   let row = new Row(testCells)
  //   expect(() => row.slice(6, 7)).toThrow(new Error('"from" parameter is out of range.'))
  // })

  // it('6 Row - slice method returns error if upto is out of range', () => {
  //   let row = new Row(testCells)
  //   expect(() => row.slice(0, 7)).toThrow(new Error('"upto" parameter is out of range.'))
  // })

  it('7 Row - slice method returns new Row with sliced cells', () => {
    let row = new Row(testCells)
    row.titleCell = testTitleCell

    let slicedRow = row.slice(1, 2)

    expect(slicedRow.cells.length).toEqual(1)
    expect(slicedRow.titleCell).toBeDefined()
  })

  it('8 Row - highlight method executes highlight for each cell and for titleCell', () => {
    let row = new Row(testCells)
    row.titleCell = testTitleCell

    testTitleCell.highlight = jest.fn()
    testCells.forEach(cell => { cell.highlight = jest.fn() })

    row.highlight()

    expect(testTitleCell.highlight).toHaveBeenCalled()
    testCells.forEach(cell => { expect(cell.highlight).toHaveBeenCalled() })
  })

  it('9 Row - clearHighlighting method executes clearHighlighting for each cell and for titleCell', () => {
    let row = new Row(testCells)
    row.titleCell = testTitleCell

    row.highlight()

    testTitleCell.clearHighlighting = jest.fn()
    testCells.forEach(cell => { cell.clearHighlighting = jest.fn() })

    row.clearHighlighting()

    expect(testTitleCell.clearHighlighting).toHaveBeenCalled()
    testCells.forEach(cell => { expect(cell.clearHighlighting).toHaveBeenCalled() })
  })
})

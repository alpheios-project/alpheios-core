/* eslint-env jest */
/* eslint-disable no-unused-vars */
import RowTitleCell from '@views/lib/row-title-cell.js'

import Row from '@views/lib/row.js'
import Cell from '@views/lib/cell.js'

import { Constants, Feature } from 'alpheios-data-models'
import GroupFeatureType from '@views/lib/group-feature-type.js'

describe('row-title-cell.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testGroupFeatureType, testParentGroupFeatureType

  beforeAll(async () => {
    let testGroupingFeature = new Feature(Feature.types.case, 'nominative', Constants.LANG_GREEK)
    testGroupFeatureType = new GroupFeatureType(testGroupingFeature, 'Case')

    let testParentGroupingFeature = new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK)
    testParentGroupFeatureType = new GroupFeatureType(testParentGroupingFeature, 'Number')
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

  it('1 RowTitleCell - constructor creates title cell and renders it', () => {
    let rowTitleCell = new RowTitleCell('nominative', testGroupFeatureType, 4)

    expect(rowTitleCell.title).toEqual('nominative')
    expect(rowTitleCell.feature.type).toEqual('case')
    expect(rowTitleCell.nvGroupQty).toEqual(4)

    expect(rowTitleCell.wNode).toBeInstanceOf(window.HTMLDivElement)
    expect(rowTitleCell.nNodes.length).toBeGreaterThan(0)
  })

  it('2 RowTitleCell - getNvNode returns vNode by index', () => {
    let rowTitleCell = new RowTitleCell('nominative', testGroupFeatureType, 4)
    expect(rowTitleCell.getNvNode(0)).toBeInstanceOf(window.HTMLDivElement)
  })

  it('3 RowTitleCell - placeholder returns window.HTMLDivElement', () => {
    expect(RowTitleCell.placeholder()).toBeInstanceOf(window.HTMLDivElement)
  })

  it('4 RowTitleCell - hierarchyList returns an array of this and all parentCells', () => {
    let rowTitleCell = new RowTitleCell('nominative', testGroupFeatureType, 4)
    expect(rowTitleCell.hierarchyList.length).toEqual(1)

    let parentRowTitleCell = new RowTitleCell('singular', testParentGroupFeatureType, 4)
    rowTitleCell.parent = parentRowTitleCell

    expect(rowTitleCell.hierarchyList.length).toEqual(2)
  })

  it('5 RowTitleCell - highlight adds class to wNode and all nNodes', () => {
    let rowTitleCell = new RowTitleCell('nominative', testGroupFeatureType, 4)
    rowTitleCell.wNode.classList.add = jest.fn()
    rowTitleCell.nNodes.forEach(nNode => { nNode.classList.add = jest.fn() })

    rowTitleCell.highlight()

    expect(rowTitleCell.wNode.classList.add).toHaveBeenCalled()
    rowTitleCell.nNodes.forEach(nNode => { expect(nNode.classList.add).toHaveBeenCalled() })
  })

  it('6 RowTitleCell - clearHighlighting removes class from wNode and all nNodes', () => {
    let rowTitleCell = new RowTitleCell('nominative', testGroupFeatureType, 4)
    rowTitleCell.highlight()

    rowTitleCell.wNode.classList.remove = jest.fn()
    rowTitleCell.nNodes.forEach(nNode => { nNode.classList.remove = jest.fn() })

    rowTitleCell.clearHighlighting()

    expect(rowTitleCell.wNode.classList.remove).toHaveBeenCalled()
    rowTitleCell.nNodes.forEach(nNode => { expect(nNode.classList.remove).toHaveBeenCalled() })
  })
})

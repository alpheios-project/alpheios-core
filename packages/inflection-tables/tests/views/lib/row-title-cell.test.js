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
    testGroupFeatureType = new GroupFeatureType(Feature.types.case, Constants.LANG_GREEK, 'Case', [testGroupingFeature])

    let testParentGroupingFeature = new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK)
    testParentGroupFeatureType = new GroupFeatureType(Feature.types.number, Constants.LANG_GREEK, 'Number', [testParentGroupingFeature])
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
  })

  it('2 RowTitleCell - hierarchyList returns an array of this and all parentCells', () => {
    let rowTitleCell = new RowTitleCell('nominative', testGroupFeatureType, 4)
    expect(rowTitleCell.hierarchyList.length).toEqual(1)

    let parentRowTitleCell = new RowTitleCell('singular', testParentGroupFeatureType, 4)
    rowTitleCell.parent = parentRowTitleCell

    expect(rowTitleCell.hierarchyList.length).toEqual(2)
  })

  it('3 RowTitleCell - highlight should set a highlighted flag', () => {
    let rowTitleCell = new RowTitleCell('nominative', testGroupFeatureType, 4)

    rowTitleCell.highlight()

    expect(rowTitleCell.highlighted).toBeTruthy()
  })

  it('4 RowTitleCell - clearHighlighting should clear a highlighted flag', () => {
    let rowTitleCell = new RowTitleCell('nominative', testGroupFeatureType, 4)
    rowTitleCell.highlight()

    rowTitleCell.clearHighlighting()

    expect(rowTitleCell.highlighted).toBeFalsy()
  })
})

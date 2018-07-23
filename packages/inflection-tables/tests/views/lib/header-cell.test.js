/* eslint-env jest */
/* eslint-disable no-unused-vars */
import HeaderCell from '@views/lib/header-cell.js'
import { Constants, Feature } from 'alpheios-data-models'

import GroupFeatureType from '@views/lib/group-feature-type.js'
import Column from '@views/lib/column.js'

describe('header-cell.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testGroupFeatureType, testParentGroupFeatureType, testChildGroupFeatureType

  beforeAll(() => {
    let testGroupingFeature = new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK)
    testGroupFeatureType = new GroupFeatureType(testGroupingFeature, 'Gender')

    let testParentGroupingFeature = new Feature(Feature.types.hdwd, 'Εἱς - Μία - Ἑν (1)', Constants.LANG_GREEK)
    testParentGroupFeatureType = new GroupFeatureType(testParentGroupingFeature, 'Lemma')

    let testChildGroupingFeature = new Feature(Feature.types.type, 'regular', Constants.LANG_GREEK)
    testChildGroupFeatureType = new GroupFeatureType(testChildGroupingFeature, 'Type')
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

  it('1 HeaderCell - constructor fills properties and executes render', () => {
    let headerCell = new HeaderCell('masculine', testGroupFeatureType)

    expect(headerCell.feature.type).toEqual(Feature.types.gender)
    expect(headerCell.title).toEqual('masculine')
    expect(headerCell.span).toEqual(1)

    expect(headerCell.children.length).toEqual(0)
    expect(headerCell.columns.length).toEqual(0)

    expect(headerCell.wNode).toBeInstanceOf(window.HTMLDivElement)
    expect(headerCell.nNode).toBeInstanceOf(window.HTMLDivElement)
  })

  it('2 HeaderCell - addColumn adds column to column attribute and to parent cell too', () => {
    let headerCell = new HeaderCell('masculine', testGroupFeatureType)
    let parentHeaderCell = new HeaderCell('Εἱς - Μία - Ἑν (1)', testParentGroupFeatureType)
    let testColumn = new Column()

    headerCell.parent = parentHeaderCell
    parentHeaderCell.addColumn = jest.fn()

    headerCell.addColumn(testColumn)
    expect(headerCell.columns.length).toEqual(1)
    expect(parentHeaderCell.addColumn).toHaveBeenCalled()
  })

  it('3 HeaderCell - changeSpan adds value to span and changes classList in wNode,nNode ', () => {
    let headerCell = new HeaderCell('masculine', testGroupFeatureType)

    headerCell.wNode.classList.replace = jest.fn()
    headerCell.nNode.classList.replace = jest.fn()

    headerCell.changeSpan(10)

    expect(headerCell.wNode.classList.replace).toHaveBeenCalled()
    expect(headerCell.nNode.classList.replace).toHaveBeenCalled()
    expect(headerCell.span).toEqual(11)
  })

  it('4 HeaderCell - columnStateChange executes changeSpan and columnStateChange for children and parent ', () => {
    let headerCell = new HeaderCell('masculine', testGroupFeatureType)
    let parentHeaderCell = new HeaderCell('Εἱς - Μία - Ἑν (1)', testParentGroupFeatureType)
    let childHeaderCell = new HeaderCell('regular', testChildGroupFeatureType)

    headerCell.parent = parentHeaderCell
    headerCell.children.push(childHeaderCell)

    headerCell.changeSpan = jest.fn()
    parentHeaderCell.columnStateChange = jest.fn()
    childHeaderCell.columnStateChange = jest.fn()

    headerCell.columnStateChange()

    expect(headerCell.changeSpan).toHaveBeenCalled()
    expect(parentHeaderCell.columnStateChange).toHaveBeenCalled()
    expect(childHeaderCell.columnStateChange).toHaveBeenCalled()
  })

  it('5 HeaderCell - highlight adds classes for highlight and executes highlight for the parent ', () => {
    let headerCell = new HeaderCell('masculine', testGroupFeatureType)
    let parentHeaderCell = new HeaderCell('Εἱς - Μία - Ἑν (1)', testParentGroupFeatureType)

    headerCell.parent = parentHeaderCell
    parentHeaderCell.highlight = jest.fn()

    headerCell.wNode.classList.add = jest.fn()
    headerCell.nNode.classList.add = jest.fn()

    headerCell.highlight()

    expect(headerCell.wNode.classList.add).toHaveBeenCalled()
    expect(headerCell.nNode.classList.add).toHaveBeenCalled()
    expect(parentHeaderCell.highlight).toHaveBeenCalled()
  })

  it('6 HeaderCell - clearHighlighting removes classes for highlight and executes clearHighlighting for the parent ', () => {
    let headerCell = new HeaderCell('masculine', testGroupFeatureType)
    let parentHeaderCell = new HeaderCell('Εἱς - Μία - Ἑν (1)', testParentGroupFeatureType)

    headerCell.parent = parentHeaderCell

    headerCell.highlight()

    parentHeaderCell.clearHighlighting = jest.fn()

    headerCell.wNode.classList.remove = jest.fn()
    headerCell.nNode.classList.remove = jest.fn()

    headerCell.clearHighlighting()

    expect(headerCell.wNode.classList.remove).toHaveBeenCalled()
    expect(headerCell.nNode.classList.remove).toHaveBeenCalled()
    expect(parentHeaderCell.clearHighlighting).toHaveBeenCalled()
  })
})

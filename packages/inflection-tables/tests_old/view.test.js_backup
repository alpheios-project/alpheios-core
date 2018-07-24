/* eslint-env jest */
import { Constants, LatinLanguageModel, Feature } from 'alpheios-data-models'
import MessageBundle from '../../../l10n/message-bundle.js'
import MatchData from '../../../lib/match-data.js'
import Suffix from '../../../lib/suffix.js'
// import InflectionData from '../../../lib/inflection-data.js'
// import Footnote from '../../../lib/footnote.js'
import { classNames as CLASS_NAMES, wideView as WIDE_VIEW } from '../../styles/styles.js'
import Cell from '../cell.js'
import GroupFeatureType from '../group-feature-type.js'
import GroupFeatureList from '../group-feature-list.js'
import HeaderCell from '../header-cell.js'
import RowTitleCell from '../row-title-cell.js'
import Row from '../row.js'
import Column from '../column.js'
// import View from '../view.js'
import WideView from '../wide-view.js'
import NarrowView from '../narrow-view.js'
import Table from '../table.js'

describe('Cell', () => {
  let suffixes, cell

  beforeAll(() => {
    let emptyMatchData = new MatchData()
    let suffixMatchData = new MatchData()
    suffixMatchData.suffixMatch = true
    let suffixOne = new Suffix('endingOne')
    suffixOne.match = emptyMatchData
    let suffixTwo = new Suffix('endingTwo')
    suffixTwo.match = suffixMatchData
    suffixes = [suffixOne, suffixTwo]
    cell = new Cell(suffixes, [])
    if (!cell.wNode.dataset) { cell.wNode.dataset = {} }
    if (!cell.nNode.dataset) { cell.nNode.dataset = {} }
  })

  // TODO: update this test
  test.skip('Should be initialized properly.', () => {
    expect(cell).toEqual(expect.objectContaining({
      suffixes: suffixes,
      empty: false,
      suffixMatches: true
    }))
  })

  test('render() should create node elements properly.', () => {
    // Render is called in constructor so we don't need to call it explicitly
    expect(cell.wNode.outerHTML).toMatch(`<div class="infl-cell"><span class="infl-suff">endingOne</span>, <span class="infl-suff infl-suff--suffix-match">endingTwo</span></div>`)
    expect(cell.wNode.outerHTML).toMatch(cell.nNode.outerHTML)
  })

  test('Node elements for wide and narrow views should be the same.', () => {
    expect(cell.wNode.outerHTML).toMatch(cell.nNode.outerHTML)
  })

  test('wvNode() should return a wide view node', () => {
    expect(cell.wvNode).toEqual(cell.wNode)
  })

  test('nvNode() should return a narrow view node', () => {
    expect(cell.nvNode).toEqual(cell.nNode)
  })

  /*
  Jest does not support testing functions with 'dataset' node because it has not been upgraded to the latest jsdom yet:
  https://github.com/facebook/jest/issues/4537
  However, this can be fixed using a custom jsdom 11 environment by installing a package like jest-environment-jsdom-11.0.0
   */
  test('Index should add index value to the object and to both wide and narrow node elements.', () => {
    cell.index = 32

    expect(cell._index).toBe(32)
  })

  test('addEventListener() should proxy to wide and narrow nodes.', () => {
    const mockAddEventListener = jest.fn()
    const testListener = function () {}
    cell.wNode.addEventListener = mockAddEventListener
    cell.nNode.addEventListener = mockAddEventListener
    cell.addEventListener('type', testListener)

    // Event listener should be called twice
    expect(mockAddEventListener.mock.calls.length).toBe(2)
    // Event type should be passed to both nodes
    expect(mockAddEventListener.mock.calls[0][0]).toBe('type')
    expect(mockAddEventListener.mock.calls[1][0]).toBe('type')
    // Event type should be passed to both nodes
    expect(mockAddEventListener.mock.calls[0][1]).toBe(testListener)
    expect(mockAddEventListener.mock.calls[1][1]).toBe(testListener)
  })

  test('hide() should add a "hidden" class to both wide and narrow nodes.', () => {
    cell.hide()

    expect(cell.wNode.classList.contains(CLASS_NAMES.hidden)).toBeTruthy()
    expect(cell.nNode.classList.contains(CLASS_NAMES.hidden)).toBeTruthy()
  })

  test('show() should remove a "hidden" class to both wide and narrow nodes.', () => {
    cell.hide()
    cell.show()

    expect(cell.wNode.classList.contains(CLASS_NAMES.hidden)).toBeFalsy()
    expect(cell.nNode.classList.contains(CLASS_NAMES.hidden)).toBeFalsy()
  })

  test('highlight() should add a "highlight" class to both wide and narrow nodes.', () => {
    cell.highlight()

    expect(cell.wNode.classList.contains(CLASS_NAMES.highlight)).toBeTruthy()
    expect(cell.nNode.classList.contains(CLASS_NAMES.highlight)).toBeTruthy()
  })

  test('clearHighlighting() should remove a "highlight" class from both wide and narrow nodes.', () => {
    cell.highlight()
    cell.clearHighlighting()

    expect(cell.wNode.classList.contains(CLASS_NAMES.highlight)).toBeFalsy()
    expect(cell.nNode.classList.contains(CLASS_NAMES.highlight)).toBeFalsy()
  })

  test('highlightRowAndColumn() should proxy calls to column and row of a cell', () => {
    const mockHighlightColumn = jest.fn()
    const mockHighlightRow = jest.fn()
    cell.column = {
      highlight: mockHighlightColumn
    }
    cell.row = {
      highlight: mockHighlightRow
    }
    cell.highlightRowAndColumn()

    expect(mockHighlightColumn.mock.calls.length).toBe(1)
    expect(mockHighlightRow.mock.calls.length).toBe(1)

    // Teardown
    cell.column = undefined
    cell.row = undefined
  })

  test('clearRowAndColumnHighlighting() should proxy calls to column and row of a cell', () => {
    const mockClearColumnHighlighting = jest.fn()
    const mockClearRowHighlighting = jest.fn()
    cell.column = {
      clearHighlighting: mockClearColumnHighlighting
    }
    cell.row = {
      clearHighlighting: mockClearRowHighlighting
    }
    cell.clearRowAndColumnHighlighting()

    expect(mockClearColumnHighlighting.mock.calls.length).toBe(1)
    expect(mockClearRowHighlighting.mock.calls.length).toBe(1)

    // Teardown
    cell.column = undefined
    cell.row = undefined
  })

  afterAll(() => {
    // Clean a test environment up
    suffixes = undefined
    cell = undefined
  })
})

describe('RowTitleCell', () => {
  let groupFeatureType, title, groupQty, cell, parentCell, titleColumnQty, latin

  beforeAll(() => {
    title = 'Row title'
    titleColumnQty = 2
    latin = new LatinLanguageModel()
    groupFeatureType = new GroupFeatureType(latin.features[Feature.types.gender], 'Gender')
    groupFeatureType.formsColumn = true
    groupFeatureType.hasColumnRowTitle = true
    groupFeatureType.groupFeatureList = {
      titleColumnsQuantity: titleColumnQty
    }
    groupQty = 5
    cell = new RowTitleCell(title, groupFeatureType, groupQty)
    let parentGroupFeatureType = new GroupFeatureType(latin.features[Feature.types.gender], 'Gender')
    parentGroupFeatureType.GroupFeatureTypeList = {
      titleColumnsQuantity: titleColumnQty
    }
    parentCell = new RowTitleCell(title, parentGroupFeatureType, groupQty)
    cell.parent = parentCell
  })

  test('Should be initialized properly.', () => {
    expect(cell).toEqual(expect.objectContaining({
      nvGroupQty: groupQty,
      parent: parentCell,
      title: title
    }))
  })

  test('render() should generate HTML representation properly.', () => {
    let headerRowHtml = '<div class="' + CLASS_NAMES.cell + ' ' + CLASS_NAMES.rowTitleCell +
      ' ' + CLASS_NAMES.header + ' ' + CLASS_NAMES.widthPrefix + titleColumnQty + '">Row title</div>'
    let parentHeaderRowHtml = '<div class="' + CLASS_NAMES.cell + ' ' + CLASS_NAMES.rowTitleCell + '">Row title</div>'
    // Render is called in constructor so we don't need to call it explicitly
    expect(cell.wNode.outerHTML).toMatch(headerRowHtml)
    expect(cell.nNodes.length).toBe(groupQty)
    expect(cell.nNodes).toContainEqual(expect.objectContaining({outerHTML: headerRowHtml}))
    expect(cell.parent.nNodes[0].outerHTML).toEqual(parentHeaderRowHtml)
  })

  test('wvNode() should return a wide view node.', () => {
    expect(cell.wvNode).toEqual(cell.wNode)
  })

  test('getNvNode() should return a particular narrow view node.', () => {
    let index = 3
    expect(cell.getNvNode(index)).toEqual(cell.nNodes[index])
  })

  test('placeholder() should build a proper HTML element.', () => {
    let placeholderWidth = 2
    let placeholder = RowTitleCell.placeholder(placeholderWidth)

    // Event listener should be called twice
    expect(placeholder.outerHTML).toBe('<div class="' + CLASS_NAMES.cell + ' ' +
      CLASS_NAMES.widthPrefix + placeholderWidth + '"></div>')
  })

  test('hierarchyList() should return current cell and a full list of parent.', () => {
    expect(cell.hierarchyList).toEqual([
      parentCell,
      cell
    ])
  })

  test('highlight() should add a "highlight" class to both wide and narrow nodes.', () => {
    cell.highlight()
    let nNodes = []
    for (let node of cell.nNodes) {
      nNodes.push(node.classList.contains(CLASS_NAMES.highlight))
    }

    expect(cell.wNode.classList.contains(CLASS_NAMES.highlight)).toBeTruthy()
    expect(nNodes).toEqual([
      true,
      true,
      true,
      true,
      true
    ])
  })

  test('clearHighlighting() should remove a "highlight" class from both wide and narrow nodes.', () => {
    cell.highlight()
    cell.clearHighlighting()

    let nNodes = []
    for (let node of cell.nNodes) {
      nNodes.push(node.classList.contains(CLASS_NAMES.highlight))
    }

    expect(cell.wNode.classList.contains(CLASS_NAMES.highlight)).toBeFalsy()
    expect(nNodes).toEqual([
      false,
      false,
      false,
      false,
      false
    ])
  })

  afterAll(() => {
    // Teardown
    groupFeatureType = undefined
    cell = undefined
    parentCell = undefined
  })
})

describe('HeaderCell', () => {
  let groupFeatureType, title, cell, parentCell, childCell, span, parentSpan, childSpan, latin

  beforeAll(() => {
    title = 'feminine'
    span = 2
    latin = new LatinLanguageModel()
    groupFeatureType = new GroupFeatureType(latin.features[Feature.types.gender], 'Gender')
    groupFeatureType.formsColumn = true
    groupFeatureType.hasColumnRowTitle = true
    cell = new HeaderCell(title, groupFeatureType, span)
    let parentGroupFeatureType = new GroupFeatureType(latin.features[Feature.types.gender], 'Gender')
    parentGroupFeatureType.formsColumn = true
    parentSpan = span * 2
    parentCell = new HeaderCell(title, parentGroupFeatureType, parentSpan)
    childSpan = 1
    childCell = new HeaderCell(title, groupFeatureType, childSpan)

    cell.parent = parentCell
    cell.children.push(childCell)
  })

  test('Should be initialized properly.', () => {
    expect(cell).toEqual(expect.objectContaining({
      feature: groupFeatureType,
      title: title,
      span: span,
      parent: parentCell
    }))
  })

  test('render() should generate HTML representation of elements properly.', () => {
    let headerCellHtml = '<div class="' + CLASS_NAMES.cell + ' ' + CLASS_NAMES.header + ' ' +
      CLASS_NAMES.widthPrefix + span + '">' + title + '</div>'
    let parentHeaderCellHtml = `<div class="infl-cell infl-cell--hdr infl-cell--sp4">${title}</div>`
    // Render is called in constructor so we don't need to call it explicitly
    expect(cell.wNode.outerHTML).toMatch(headerCellHtml)
    expect(cell.nNode.outerHTML).toMatch(headerCellHtml)
    expect(cell.parent.wNode.outerHTML).toMatch(parentHeaderCellHtml)
  })

  test('wvNode() should return a wide view node.', () => {
    expect(cell.wvNode).toEqual(cell.wNode)
  })

  test('nvNode() should return a narrow view node.', () => {
    expect(cell.nvNode).toEqual(cell.nNode)
  })

  test('addColumn() should add column to itself and to its parent.', () => {
    let column = new Column()
    column.addonProperty = 'test'
    cell.addColumn(column)

    // Event listener should be called twice
    expect(cell.columns).toEqual([column])
    expect(cell.parent.columns).toEqual([column])

    // Remove column after the test
    cell.columns = []
  })

  test('changeSpan() should change a width of its cell.', () => {
    // Let's test what will happen if two columns be hidden
    let firstChange = -2
    cell.changeSpan(firstChange)
    expect(cell.span).toBe(span + firstChange)
    expect(cell.wNode.classList.contains(CLASS_NAMES.widthPrefix + (span + firstChange)))

    // A change in the reverse direction should restore initial values
    let secondChange = -firstChange
    cell.changeSpan(secondChange)
    expect(cell.span).toBe(span)
    expect(cell.wNode.classList.contains(CLASS_NAMES.widthPrefix + span))
  })

  test('columnStateChange() should initiate a span change on itself and on parent.', () => {
    let hiddenColumn = new Column()
    hiddenColumn.hidden = true
    let column = new Column()

    cell.columns = [column, hiddenColumn]
    cell.parent.columns = [column, hiddenColumn, column, hiddenColumn]
    childCell.columns = [hiddenColumn]

    cell.children.push(childCell)

    cell.columnStateChange()

    expect(cell.span).toBe(span - 1)
    expect(cell.parent.span).toBe(parentSpan - 2)
    expect(childCell.span).toBe(childSpan - 1)

    // Cleanup
    cell.columns = []
    cell.parent.columns = []
    childCell.columns = []
  })

  test('highlight() should add a "highlight" to both wide and narrow nodes of the cell itself and its parent, but not its children.', () => {
    cell.highlight()

    expect(cell.wNode.classList.contains(CLASS_NAMES.highlight)).toBeTruthy()
    expect(cell.nNode.classList.contains(CLASS_NAMES.highlight)).toBeTruthy()
    expect(cell.parent.wNode.classList.contains(CLASS_NAMES.highlight)).toBeTruthy()
    expect(cell.parent.nNode.classList.contains(CLASS_NAMES.highlight)).toBeTruthy()
    expect(cell.children[0].wNode.classList.contains(CLASS_NAMES.highlight)).toBeFalsy()
    expect(cell.children[0].nNode.classList.contains(CLASS_NAMES.highlight)).toBeFalsy()
  })

  test('clearHighlighting() should remove a "highlight" from both wide and narrow nodes of the cell itself and its parent.', () => {
    cell.highlight()
    cell.clearHighlighting()

    expect(cell.wNode.classList.contains(CLASS_NAMES.highlight)).toBeFalsy()
    expect(cell.nNode.classList.contains(CLASS_NAMES.highlight)).toBeFalsy()
    expect(cell.parent.wNode.classList.contains(CLASS_NAMES.highlight)).toBeFalsy()
    expect(cell.parent.nNode.classList.contains(CLASS_NAMES.highlight)).toBeFalsy()
  })

  afterAll(() => {
    // Teardown
    groupFeatureType = undefined
    cell = undefined
    parentCell = undefined
    childCell = undefined
  })
})

describe('Column', () => {
  let groupFeatureType, noMatchCell, emptyCell, suffixMatchCell, headerCell, span, title,
    noMatchColumn, emptyColumn, suffixMatchColumn, latin

  beforeAll(() => {
    title = 'masculine'
    span = 2
    latin = new LatinLanguageModel()
    groupFeatureType = new GroupFeatureType(latin.features[Feature.types.gender], 'Gender')
    groupFeatureType.formsColumn = true
    groupFeatureType.hasColumnRowTitle = true
    headerCell = new HeaderCell(title, groupFeatureType, span)

    let emptyMatchData = new MatchData()
    let suffixMatchData = new MatchData()
    suffixMatchData.suffixMatch = true
    let suffixOne = new Suffix('endingOne')
    suffixOne.match = emptyMatchData
    let suffixTwo = new Suffix('endingTwo')
    suffixTwo.match = emptyMatchData
    let suffixThree = new Suffix('endingThree')
    suffixThree.match = suffixMatchData
    noMatchCell = new Cell([suffixOne, suffixTwo])
    emptyCell = new Cell()
    suffixMatchCell = new Cell([suffixOne, suffixThree])

    noMatchColumn = new Column([noMatchCell])

    emptyColumn = new Column([emptyCell])

    suffixMatchColumn = new Column([suffixMatchCell])
  })

  test('Should be initialized properly.', () => {
    expect(noMatchColumn).toEqual(expect.objectContaining({
      hidden: false,
      empty: false,
      suffixMatches: false,
      cells: expect.arrayContaining([noMatchCell])
    }))

    expect(emptyColumn).toEqual(expect.objectContaining({
      hidden: false,
      empty: true,
      suffixMatches: false,
      cells: expect.arrayContaining([emptyCell])
    }))

    expect(suffixMatchColumn).toEqual(expect.objectContaining({
      hidden: false,
      empty: false,
      suffixMatches: true,
      cells: expect.arrayContaining([suffixMatchCell])
    }))

    let noCellsColumn = new Column()
    expect(noCellsColumn.cells.length).toBe(0)
  })

  test('headerCell() should add a header cell to the column.', () => {
    noMatchColumn.headerCell = headerCell
    // Render is called in constructor so we don't need to call it explicitly
    expect(noMatchColumn._headerCell).toEqual(headerCell)
    expect(noMatchColumn._headerCell.columns).toContainEqual(noMatchColumn)
  })

  test('length() should return a number of cells in a column.', () => {
    expect(noMatchColumn.length).toBe(1)
  })

  test('hide() should hide all cells in a column and notify a header cell about a state change.', () => {
    const columnStateChange = jest.fn()
    const hide = jest.fn()
    headerCell.columnStateChange = columnStateChange
    noMatchColumn.headerCell = headerCell
    noMatchCell.hide = hide

    noMatchColumn.hide()
    expect(noMatchColumn.hidden).toBeTruthy()
    expect(columnStateChange.mock.calls.length).toBe(1)
    expect(hide.mock.calls.length).toBe(1)
  })

  test('show() should hide all cells in a column and notify a header cell about a state change.', () => {
    // Set state to hidden first, then show
    noMatchColumn.hide()

    const columnStateChange = jest.fn()
    const show = jest.fn()
    headerCell.columnStateChange = columnStateChange
    noMatchColumn.headerCell = headerCell
    noMatchCell.show = show
    noMatchColumn.show()

    expect(noMatchColumn.hidden).toBeFalsy()
    expect(columnStateChange.mock.calls.length).toBe(1)
    expect(show.mock.calls.length).toBe(1)
  })

  test('highlight() should highlight all cells in a column and notify a header cell about a state change.', () => {
    const headerHighligh = jest.fn()
    const highlight = jest.fn()
    headerCell.highlight = headerHighligh
    noMatchColumn.headerCell = headerCell
    noMatchCell.highlight = highlight

    noMatchColumn.highlight()
    expect(headerHighligh.mock.calls.length).toBe(1)
    expect(highlight.mock.calls.length).toBe(1)
  })

  test('clearHighlighting() should highlight all cells in a column and notify a header cell about a state change.', () => {
    const headerClearHighlighting = jest.fn()
    const clearHighlighting = jest.fn()
    headerCell.clearHighlighting = headerClearHighlighting
    noMatchColumn.headerCell = headerCell
    noMatchCell.clearHighlighting = clearHighlighting

    noMatchColumn.clearHighlighting()
    expect(headerClearHighlighting.mock.calls.length).toBe(1)
    expect(clearHighlighting.mock.calls.length).toBe(1)
  })

  afterAll(() => {
    // Teardown
    groupFeatureType = undefined
    noMatchCell = undefined
    emptyCell = undefined
    suffixMatchCell = undefined
    headerCell = undefined
    noMatchColumn = undefined
    emptyColumn = undefined
    suffixMatchColumn = undefined
  })
})

describe('Row', () => {
  let cell, cell2, row

  beforeAll(() => {
    cell = new Cell()
    cell2 = new Cell()
    cell2.uniqueProperty = 'test' // To distinguish it from another cell
    row = new Row([cell])
  })

  test('Should be initialized properly.', () => {
    expect(row.cells).toContain(cell)
    expect(row.cells[0].row).toEqual(row)
  })

  test('add() should add a cell to the column.', () => {
    row.add(cell2)
    expect(row.cells).toContainEqual(cell)
    expect(row.cells).toContainEqual(cell2)
    row.cells.pop()
  })

  test('length() should return a portion of cells.', () => {
    row.add(cell2)
    expect(row.length).toBe(2)
    row.cells.pop()
  })

  test('slice() should return a Row object with correct number of cells in it.', () => {
    row.add(cell2)
    let slice = row.slice(1, 2)
    expect(slice.cells.length).toBe(1)
    row.cells.pop()
  })

  test('slice() should return correct cells objects.', () => {
    row.add(cell2)
    let slice = row.slice(1, 2)
    expect(slice.cells[0]).toBe(cell2)
    row.cells.pop()
  })

  test('slice() should copy a reference to the title cell.', () => {
    row.add(cell2)
    let slice = row.slice(1, 2)
    expect(slice.titleCell).toBe(row.titleCell)
    row.cells.pop()
  })

  test('highlight() should highlight all cells in a column and notify a header cell about a state change.', () => {
    const titleHighlight = jest.fn()
    const highlight = jest.fn()
    row.titleCell = {
      highlight: titleHighlight
    }
    cell.highlight = highlight

    row.highlight()
    expect(titleHighlight.mock.calls.length).toBe(1)
    expect(highlight.mock.calls.length).toBe(1)
  })

  test('clearHighlighting() should highlight all cells in a column and notify a header cell about a state change.', () => {
    const titleClearHighlighting = jest.fn()
    const clearHighlighting = jest.fn()
    row.titleCell = {
      clearHighlighting: titleClearHighlighting
    }
    cell.clearHighlighting = clearHighlighting

    row.clearHighlighting()
    expect(titleClearHighlighting.mock.calls.length).toBe(1)
    expect(clearHighlighting.mock.calls.length).toBe(1)
  })

  afterAll(() => {
    // Teardown
    cell = undefined
    cell2 = undefined
    row = undefined
  })
})

describe('GroupFeatureType', () => {
  let groupFeatureType, featureType, groupTitle

  beforeAll(() => {
    groupTitle = 'Gender'
    featureType = new Feature(
      Feature.types.gender,
      [['masculine', 'feminine'], 'neuter'],
      Constants.LANG_LATIN)

    groupFeatureType = new GroupFeatureType(featureType, groupTitle)
  })

  test('Constructor should set simple properties properly.', () => {
    expect(groupFeatureType).toEqual(expect.objectContaining({
      groupTitle: groupTitle,
      type: featureType.type,
      languageID: featureType.languageID
    }))
  })

  test('Should be initialized properly.', () => {
    expect(groupFeatureType).toEqual(expect.objectContaining({
      groupTitle: groupTitle
    }))
    expect(groupFeatureType).toEqual(expect.objectContaining({
      type: featureType.type,
      languageID: featureType.languageID
    }))
  })

  test('formsColumn() should return a value installed by a setter.', () => {
    groupFeatureType.formsColumn = true
    expect(groupFeatureType.formsColumn).toBeTruthy()
  })

  test('formsRow() should return a value installed by a setter.', () => {
    groupFeatureType.formsRow = true
    expect(groupFeatureType.formsRow).toBeTruthy()
  })

  afterAll(() => {
    // Teardown
    groupFeatureType = undefined
    featureType = undefined
  })
})

describe('GroupFeatureList', () => {
  let groupFeatureTypeList, featureOne, featureTwo, featureThree, featureList, latin

  beforeAll(() => {
    latin = new LatinLanguageModel()
    featureOne = new GroupFeatureType(latin.features[Feature.types.gender], 'Gender')
    featureOne.formsColumn = true

    featureTwo = new GroupFeatureType(latin.features[Feature.types.type], 'Type')
    featureTwo.formsRow = true
    featureTwo.hasColumnRowTitle = true

    featureThree = new GroupFeatureType(latin.features[Feature.types.number], 'Number')
    featureThree.formsRow = true
    featureThree.hasFullWidthRowTitle = true

    featureList = [featureOne, featureTwo, featureThree]

    groupFeatureTypeList = new GroupFeatureList(featureList)
    groupFeatureTypeList.columns = [featureOne]
    groupFeatureTypeList.rows = [featureTwo, featureThree]
  })

  test('Constructor should store a list of grouping features.', () => {
    expect(groupFeatureTypeList._features).toEqual(featureList)
  })

  test('Constructor should create a list of column features.', () => {
    expect(groupFeatureTypeList._columnFeatures).toEqual([featureOne])
  })

  test('Constructor should create a list of row features.', () => {
    expect(groupFeatureTypeList._rowFeatures).toEqual([featureTwo, featureThree])
  })

  test('columnFeatures() should return a list of column features.', () => {
    expect(groupFeatureTypeList.columnFeatures).toEqual([featureOne])
  })

  test('firstColumnFeature() should return a first column feature item.', () => {
    expect(groupFeatureTypeList.firstColumnFeature).toEqual(featureOne)
  })

  test('lastColumnFeature() should return a last column feature item.', () => {
    expect(groupFeatureTypeList.lastColumnFeature).toEqual(featureOne)
  })

  test('rowFeatures() should return a list of row features.', () => {
    expect(groupFeatureTypeList.rowFeatures).toEqual([featureTwo, featureThree])
  })

  test('firstRowFeature() should return a first row feature item.', () => {
    expect(groupFeatureTypeList.firstRowFeature).toEqual(featureTwo)
  })

  test('lastRowFeature() should return a last row feature item.', () => {
    expect(groupFeatureTypeList.lastRowFeature).toEqual(featureThree)
  })

  test('length() should return a quantity of feature items.', () => {
    'use strict'

    expect(groupFeatureTypeList.length).toEqual(featureList.length)
  })

  test('titleColumnsQuantity() should return a number of row title columns.', () => {
    expect(groupFeatureTypeList.titleColumnsQuantity).toBe(1)
  })

  afterAll(() => {
    // Teardown
    groupFeatureTypeList = undefined
    featureOne = undefined
    featureTwo = undefined
    featureThree = undefined
    featureList = undefined
  })
})

describe('WideView', () => {
  let visibleColumn, hiddenColumn, columns, rows, headers, titleColumnQty, wideView

  beforeAll(() => {
    visibleColumn = new Column()
    hiddenColumn = new Column()
    hiddenColumn.hidden = true
    columns = [visibleColumn, hiddenColumn]
    rows = [new Row()]
    headers = [new Row()]
    titleColumnQty = 1

    wideView = new WideView(columns, rows, headers, titleColumnQty)
  })

  test('Constructor should initialize object properties.', () => {
    expect(wideView).toEqual(expect.objectContaining({
      columns: columns,
      rows: rows,
      headers: headers,
      titleColumnQty: titleColumnQty
    }))
  })

  test('Constructor should create an HTML element and assign proper CSS classes.', () => {
    expect(wideView.nodes.outerHTML).toBe('<div class="' + CLASS_NAMES.inflectionTable + ' ' +
      CLASS_NAMES.wideView + '"></div>')
  })

  test('visibleColumnQty() should return a number of visible columns.', () => {
    expect(wideView.visibleColumnQty).toBe(1)
  })

  test('render() should create an HTML representation of a view.', () => {
    let emptyView = new WideView([], [], [], 0)
    let rendered = emptyView.render()
    expect(rendered.outerHTML).toBe('<div class="' + CLASS_NAMES.inflectionTable + ' ' +
      CLASS_NAMES.wideView + '"></div>')
    expect(rendered.style).toEqual(expect.objectContaining({
      gridTemplateColumns: 'repeat(0, ' + WIDE_VIEW.column.width + WIDE_VIEW.column.unit + ')'
    }))
  })

  afterAll(() => {
    visibleColumn = undefined
    hiddenColumn = undefined
    columns = undefined
    rows = undefined
    headers = undefined
    wideView = undefined
  })
})

describe('NarrowView', () => {
  let visibleColumn, hiddenColumn, columns, rows, headers, titleColumnQty, groupQty, narrowView

  beforeAll(() => {
    visibleColumn = new Column()
    hiddenColumn = new Column()
    hiddenColumn.hidden = true
    columns = [visibleColumn, hiddenColumn]
    rows = [new Row()]
    headers = [new Row()]
    titleColumnQty = 1
    groupQty = 2
    narrowView = new NarrowView(groupQty, columns, rows, headers, titleColumnQty)
  })

  test('Constructor should initialize object properties.', () => {
    expect(narrowView).toEqual(expect.objectContaining({
      groupQty: groupQty,
      groupSize: columns.length / groupQty,
      columns: columns,
      rows: rows,
      headers: headers,
      titleColumnQty: titleColumnQty
    }))
  })

  test('Constructor should create an HTML element and assign proper CSS classes.', () => {
    expect(narrowView.nodes.classList.contains(CLASS_NAMES.narrowViewsContainer)).toBeTruthy()
  })

  /* test('createGroup() should create a NarrowViewGroup object.', () => {

      let emptyNarrowView = new t.View.NarrowView(0, [], [], [{cells: [{columns: 0}]}], 0);
      emptyNarrowView.createGroup();

      expect(emptyNarrowView.nodes.childNodes.length).toBe(1);
      expect(emptyNarrowView.nodes.innerHTML).toBe('<div class="' + ClassNames.inflectionTable + ' '
          + ClassNames.narrowView + '"></div>');

  }); */

  /* test('render() should call render methods of groups and return an HTMLElement object.', () => {

      const renderFn = jest.fn();

      for (let group of narrowView.groups) {
          group.render = renderFn;
      }
      let render = narrowView.render();

      expect(render.outerHTML).toBe('<div class="' + ClassNames.narrowViewsContainer + '">' +
          '<div class="' + ClassNames.inflectionTable + ' ' + ClassNames.narrowView + '"></div>' +
          '<div class="' + ClassNames.inflectionTable + ' ' + ClassNames.narrowView + '"></div>' +
          '</div>');

      expect(renderFn.mock.calls.length).toBe(2);

  }); */

  afterAll(() => {
    visibleColumn = undefined
    hiddenColumn = undefined
    columns = undefined
    rows = undefined
    headers = undefined
    narrowView = undefined
  })
})

describe('NarrowViewGroup', () => {
  // let index, columns, headers, rows, visibleColumn, hiddenColumn, titleColumnQty, groupQty, narrowViewGroup

  beforeAll(() => {
    // visibleColumn = new t.View.Column()
    // hiddenColumn = new t.View.Column()
    // hiddenColumn.hidden = true
    // columns = [visibleColumn, hiddenColumn]
    // rows = [new t.View.Row(), new t.View.Row()]
    // headers = [new t.View.Row(), new t.View.Row(), new t.View.Row()]
    // index = 0
    // titleColumnQty = 1
    // groupQty = 1
    // narrowViewGroup = new t.View.NarrowViewGroup(index, headers, rows, titleColumnQty);

    // let a = 1
  })

  /* test('Constructor should initialize object properties.', () => {

      expect(narrowViewGroup).toEqual(expect.objectContaining({
          index: index,
          groupSize: columns.length / groupQty,
          titleColumnQty: titleColumnQty
      }));

  });

  test('Constructor should store columns.', () => {

      expect(narrowViewGroup.columns.length).toBe(2);

  });

  test('Constructor should store rows.', () => {

      expect(narrowViewGroup.rows.length).toBe(2);

  });

  test('Constructor should store headers.', () => {

      expect(narrowViewGroup.headers.length).toBe(3);

  });

  test('Constructor should create an HTML element and assign proper CSS classes.', () => {

      expect(narrowViewGroup.nodes.outerHTML).toBe('<div class="' + ClassNames.inflectionTable + ' '
          + ClassNames.narrowView + '"></div>');

  });

  test('visibleColumnQty() should return a number of visible columns.', () => {

      expect(narrowViewGroup.visibleColumnQty).toBe(1);

  });

  test('render() should crate an HTML representation of a view.', () => {
      "use strict";

      let emptyNarrowView = new t.View.NarrowView(1, 0, [], [], [], 0);
      let render = emptyNarrowView.render();
      expect(render.innerHTML).toBe('<div class="' + ClassNames.inflectionTable + ' '
          + ClassNames.narrowView + ' ' + ClassNames.hidden + '"></div>');

  }); */

  afterAll(() => {
    // narrowViewGroup = undefined
  })
})

/*
   Because Jest 20.x does not support jsdom 11 yet, and because Cell uses a dataset node, for testing a Table object
   a custom jsdom 11 environment is required. See Cell.index() for more information.
*/
describe('Table', () => {
  'use strict'

  let featureOne, featureTwo, featureThree, features, messages, messageBundle, table, latin

  beforeAll(() => {
    latin = new LatinLanguageModel()
    featureOne = new GroupFeatureType(latin.features[Feature.types.gender], 'Gender')
    featureOne.formsColumn = true

    featureTwo = new GroupFeatureType(latin.features[Feature.types.type], 'Type')
    featureTwo.formsRow = true
    featureTwo.hasColumnRowTitle = true

    featureThree = new GroupFeatureType(latin.features[Feature.types.number], 'Number')
    featureThree.formsRow = true
    featureThree.hasFullWidthRowTitle = true

    features = [featureOne, featureTwo, featureThree]

    messages = {
      Number: 'Number',
      Case: 'Case',
      Declension: 'Declension',
      Gender: 'Gender',
      Type: 'Type',
      Voice: 'Voice',
      'Conjugation Stem': 'Conjugation Stem',
      Mood: 'Mood',
      Person: 'Person'
    }

    messageBundle = new MessageBundle('en-US', messages)

    table = new Table(features)
    table.messages = messageBundle
  })

  test('Constructor should initialize object properties.', () => {
    let featureList = new GroupFeatureList(features)

    expect(table).toEqual(expect.objectContaining({
      emptyColumnsHidden: false,
      features: featureList,
      messages: messageBundle
    }))
  })

  /*
  Not testing construct() and constructViews() for now.
   */

  test('dataColumnQty() should return a number of columns.', () => {
    table.columns = [new Column(), new Column()]
    expect(table.dataColumnQty).toBe(2)
    table.columns = []
  })

  test('titleColumnQty() should return a number of columns.', () => {
    expect(table.titleColumnQty).toBe(1)
  })

  test('dataRowQty() should return a number of rows with suffixes.', () => {
    table.columns = [new Column()]
    table.columns[0].cells = [new Cell(), new Cell()]
    expect(table.dataRowQty).toBe(2)
    table.columns = []
  })

  /*
  Skip groupByFeature(), constructColumns(), constructRows(), constructHeaders() for now.
   */

  test('addEventListeners() should add "mouseenter" and "mouseleave" listeners to every cell.', () => {
    let cell = new Cell()
    const addEventListener = jest.fn()
    cell.addEventListener = addEventListener
    table.cells = [cell, cell]
    table.addEventListeners()

    expect(addEventListener.mock.calls.length).toBe(4)
    expect(addEventListener.mock.calls[0][0]).toBe('mouseenter')
    expect(addEventListener.mock.calls[1][0]).toBe('mouseleave')
    table.cells = []
  })

  test('highlightRowAndColumn() should call corresponding method of a specific cell.', () => {
    let index = 1
    let event = {currentTarget: {dataset: {index: index}}}
    let cell = new Cell()
    const highlightRowAndColumn = jest.fn()
    table.cells = [cell, cell]
    table.cells[index].highlightRowAndColumn = highlightRowAndColumn
    table.highlightRowAndColumn(event)

    expect(highlightRowAndColumn.mock.calls.length).toBe(1)
    table.cells = []
  })

  test('clearRowAndColumnHighlighting() should call corresponding method of a specific cell.', () => {
    let index = 1
    let event = {currentTarget: {dataset: {index: index}}}
    let cell = new Cell()
    const clearRowAndColumnHighlighting = jest.fn()
    table.cells = [cell, cell]
    table.cells[index].clearRowAndColumnHighlighting = clearRowAndColumnHighlighting
    table.clearRowAndColumnHighlighting(event)

    expect(clearRowAndColumnHighlighting.mock.calls.length).toBe(1)
    table.cells = []
  })

  test('hideEmptyColumns() should hide those columns that are empty.', () => {
    const hide = jest.fn()
    let columnOne = new Column()
    columnOne.hide = hide
    columnOne.empty = false
    let columnTwo = new Column()
    columnTwo.hide = hide
    table.columns = [columnOne, columnTwo]
    table.hideEmptyColumns()

    expect(hide.mock.calls.length).toBe(1)
    expect(table.emptyColumnsHidden).toBeTruthy()
    table.columns = []
  })

  test('showEmptyColumns() should show those columns that are empty.', () => {
    const show = jest.fn()
    let columnOne = new Column()
    columnOne.show = show
    columnOne.hidden = true
    let columnTwo = new Column()
    columnTwo.show = show
    table.columns = [columnOne, columnTwo]
    table.showEmptyColumns()

    expect(show.mock.calls.length).toBe(1)
    expect(table.emptyColumnsHidden).toBeFalsy()
    table.columns = []
  })

  test('hideNoSuffixGroups() should hide those columns that are empty.', () => {
    let featureOne = new GroupFeatureType(latin.features[Feature.types.gender], 'Gender')
    let featureTwo = new GroupFeatureType(latin.features[Feature.types.type], 'Type')
    const hide = jest.fn()
    let headerOne = new HeaderCell(`feminine`, featureOne)
    let headerTwo = new HeaderCell(`irregular`, featureTwo)
    let noMatchesColumn = new Column()
    noMatchesColumn.suffixMatches = false
    noMatchesColumn.hide = hide
    headerTwo.columns = [noMatchesColumn]
    table.headers = [new Row([headerOne, headerTwo])]
    table.hideNoSuffixGroups()

    expect(hide.mock.calls.length).toBe(1)
    expect(table.suffixMatchesHidden).toBeTruthy()
    table.headers = []
  })

  test('showNoSuffixGroups() should hide those columns that are empty.', () => {
    const show = jest.fn()
    let column = new Column()
    column.show = show
    table.columns = [column, column]
    table.showNoSuffixGroups()

    expect(show.mock.calls.length).toBe(2)
    expect(table.suffixMatchesHidden).toBeFalsy()
    table.headers = []
  })

  afterAll(() => {
    featureOne = undefined
    featureTwo = undefined
    featureThree = undefined
    features = undefined
    messages = undefined
    messageBundle = undefined
    table = undefined
  })
})

// TODO: Tests that rely on importing JSON are skipped for now because of difference in parsing between node.js and webpack imports
describe('View', () => {
  // let partOfSpeech
  let featureOne
  let featureTwo
  let featureThree
  // let features
  // let messages
  // let messageBundle
  // let footnotesList
  // let inflectionData
  let view
  // let word
  // let title
  let latin

  beforeAll(() => {
    // partOfSpeech = 'noun'
    // title = 'Test Title'
    // word = 'Test'
    latin = new LatinLanguageModel()

    featureOne = new GroupFeatureType(latin.features[Feature.types.gender], 'Gender')
    featureOne.formsColumn = true

    featureTwo = new GroupFeatureType(latin.features[Feature.types.type], 'Type')
    featureTwo.formsRow = true
    featureTwo.hasColumnRowTitle = true

    featureThree = new GroupFeatureType(latin.features[Feature.types.number], 'Number')
    featureThree.formsRow = true
    featureThree.hasFullWidthRowTitle = true

    // features = [featureOne, featureTwo, featureThree]

    /* messages = {
      Number: 'Number',
      Case: 'Case',
      Declension: 'Declension',
      Gender: 'Gender',
      Type: 'Type',
      Voice: 'Voice',
      'Conjugation Stem': 'Conjugation Stem',
      Mood: 'Mood',
      Person: 'Person'
    } */

    /* messageBundle = new MessageBundle('en-US', messages)

    footnotesList = [new Footnote(1, 'FootnoteOne'), new Footnote(2, 'FootnoteTwo')]
    // footnotes = new t.View.Footnotes(footnotesList)

    inflectionData = new InflectionData()
    inflectionData.homonym = {targetWord: word}
    inflectionData[partOfSpeech] = {
      suffixes: [],
      footnotesView: footnotesList
    }

    // container = document.createElement('div')

    view = new View()
    view.title = title
    view.partOfSpeech = partOfSpeech
    view.table = new Table(features)
    view.table.messages = messageBundle
    view.table.features.columns = [featureOne]
    view.table.features.rows = [featureTwo, featureThree] */
  })

  /*
  Skip test of render() for now.
   */

  /* test('display() should insert a view\'s HTML into a container.', () => {

       view.container = container;
       view.wordData = inflectionData;
       view.footnotes = new t.View.Footnotes(inflectionData[partOfSpeech].footnotes);
       view.table = new t.View.Table(features);
       view.table.messages = messageBundle;
       view.table.features.columns = [featureOne];
       view.table.features.rows = [featureTwo, featureThree];
       view.table.construct(inflectionData[partOfSpeech].suffixes).constructViews();
       view.table.wideView.render();

       view.display();
       expect(container.outerHTML).toMatch(new RegExp('<div><h2>' + word + '</h2><h3>' + title + '</h3>' +
           '<div>' + t.Styles.pageHeader.html + '</div>.*</div>'));

   }); */

  test.skip('hideEmptyColumns() should proxy request to the table and and update the view.', () => {
    let hideEmptyColumnsStored = view.table.hideEmptyColumns
    const hideEmptyColumns = jest.fn()
    view.table.hideEmptyColumns = hideEmptyColumns

    view.hideEmptyColumns()
    expect(hideEmptyColumns.mock.calls.length).toBe(1)
    view.table.hideEmptyColumns = hideEmptyColumnsStored
  })

  test.skip('showEmptyColumns() should proxy request to the table and and update the view.', () => {
    let showEmptyColumnsStored = view.table.hideEmptyColumns
    const showEmptyColumns = jest.fn()
    view.table.showEmptyColumns = showEmptyColumns

    view.showEmptyColumns()
    expect(showEmptyColumns.mock.calls.length).toBe(1)
    view.table.showEmptyColumns = showEmptyColumnsStored
  })

  test.skip('hideNoSuffixGroups() should proxy request to the table and and update the view.', () => {
    let hideNoSuffixGroupsStored = view.table.hideNoSuffixGroups
    const hideNoSuffixGroups = jest.fn()
    view.table.hideNoSuffixGroups = hideNoSuffixGroups

    view.hideNoSuffixGroups()
    expect(hideNoSuffixGroups.mock.calls.length).toBe(1)
    view.table.hideNoSuffixGroups = hideNoSuffixGroupsStored
  })

  test.skip('showNoSuffixGroups() should proxy request to the table and and update the view.', () => {
    let showNoSuffixGroupsStored = view.table.showNoSuffixGroups
    const showNoSuffixGroups = jest.fn()
    view.table.showNoSuffixGroups = showNoSuffixGroups

    view.showNoSuffixGroups()
    expect(showNoSuffixGroups.mock.calls.length).toBe(1)
    view.table.showNoSuffixGroups = showNoSuffixGroupsStored
  })
})

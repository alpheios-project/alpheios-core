const t = require('../../../tests/test-bundle');

describe('Cell', () => {

    let suffixes, cell;

    beforeAll(() => {
        let emptyMatchData = new t.MatchData();
        let suffixMatchData = new t.MatchData();
        suffixMatchData.suffixMatch = true;
        let suffixOne =  new t.Suffix('endingOne');
        suffixOne.match = emptyMatchData;
        let suffixTwo = new t.Suffix('endingTwo');
        suffixTwo.match = suffixMatchData;
        suffixes = [suffixOne, suffixTwo];
        cell = new t.View.Cell(suffixes);
    });

    test('Should be initialized properly.', () => {

        expect(cell).toEqual(expect.objectContaining({
            suffixes: suffixes,
            empty: false,
            suffixMatches: true
        }));

    });

    test('render() should create node elements properly.', () => {

        // Render is called in constructor so we don't need to call it explicitly
        expect(cell.wNode.outerHTML).toMatch('<div class="infl-cell"><a class="infl-suff">endingOne</a>,&nbsp;<a class="infl-suff infl-suff--suffix-match">endingTwo</a></div>');
        expect(cell.wNode.outerHTML).toMatch(cell.nNode.outerHTML);

    });

    test('Node elements for wide and narrow views should be the same.', () => {

        expect(cell.wNode.outerHTML).toMatch(cell.nNode.outerHTML);

    });

    test('wvNode() should return a wide view node', () => {

        expect(cell.wvNode).toEqual(cell.wNode);

    });

    test('nvNode() should return a narrow view node', () => {

        expect(cell.nvNode).toEqual(cell.nNode);

    });

    /*
    Jest does not support testing functions with 'dataset' node because it has not been upgraded to the latest jsdom yet:
    https://github.com/facebook/jest/issues/4537
    However, this can be fixed using a custom jsdom 11 environment by installing a package like jest-environment-jsdom-11.0.0
     */
    test('Index should add index value to the object and to both wide and narrow node elements.', () => {

        cell.index = 32;

        expect(cell._index).toBe(32);

    });

    test('addEventListener() should proxy to wide and narrow nodes.', () => {

        const mockAddEventListener = jest.fn();
        const testListener = function() {};
        cell.wNode.addEventListener = mockAddEventListener;
        cell.nNode.addEventListener = mockAddEventListener;
        cell.addEventListener('type', testListener);

        // Event listener should be called twice
        expect(mockAddEventListener.mock.calls.length).toBe(2);
        // Event type should be passed to both nodes
        expect(mockAddEventListener.mock.calls[0][0]).toBe('type');
        expect(mockAddEventListener.mock.calls[1][0]).toBe('type');
        // Event type should be passed to both nodes
        expect(mockAddEventListener.mock.calls[0][1]).toBe(testListener);
        expect(mockAddEventListener.mock.calls[1][1]).toBe(testListener);

    });

    test('hide() should add a "hidden" class to both wide and narrow nodes.', () => {

        cell.hide();

        expect(cell.wNode.classList.contains(t.Styles.classNames.hidden)).toBeTruthy();
        expect(cell.nNode.classList.contains(t.Styles.classNames.hidden)).toBeTruthy();

    });

    test('show() should remove a "hidden" class to both wide and narrow nodes.', () => {

        cell.hide();
        cell.show();

        expect(cell.wNode.classList.contains(t.Styles.classNames.hidden)).toBeFalsy();
        expect(cell.nNode.classList.contains(t.Styles.classNames.hidden)).toBeFalsy();

    });

    test('highlight() should add a "highlight" class to both wide and narrow nodes.', () => {

        cell.highlight();

        expect(cell.wNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();
        expect(cell.nNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();

    });

    test('clearHighlighting() should remove a "highlight" class from both wide and narrow nodes.', () => {

        cell.highlight();
        cell.clearHighlighting();

        expect(cell.wNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();
        expect(cell.nNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();

    });

    test('highlightRowAndColumn() should proxy calls to column and row of a cell', () => {

        const mockHighlightColumn = jest.fn();
        const mockHighlightRow = jest.fn();
        cell.column = {
            highlight: mockHighlightColumn
        };
        cell.row = {
            highlight: mockHighlightRow
        };
        cell.highlightRowAndColumn();

        expect(mockHighlightColumn.mock.calls.length).toBe(1);
        expect(mockHighlightRow.mock.calls.length).toBe(1);

        // Teardown
        cell.column = undefined;
        cell.row = undefined;

    });

    test('clearRowAndColumnHighlighting() should proxy calls to column and row of a cell', () => {

        const mockClearColumnHighlighting = jest.fn();
        const mockClearRowHighlighting = jest.fn();
        cell.column = {
            clearHighlighting: mockClearColumnHighlighting
        };
        cell.row = {
            clearHighlighting: mockClearRowHighlighting
        };
        cell.clearRowAndColumnHighlighting();

        expect(mockClearColumnHighlighting.mock.calls.length).toBe(1);
        expect(mockClearRowHighlighting.mock.calls.length).toBe(1);

        // Teardown
        cell.column = undefined;
        cell.row = undefined;

    });

    afterAll(() => {
        // Clean a test environment up
        suffixes = undefined;
        cell = undefined;
    });
});

describe('RowTitleCell', () => {

    let groupingFeature, title, groupQty, cell, parentCell, titleColumnQty;

    beforeAll(() => {

        title = "Row title";
        titleColumnQty = 2;
        groupingFeature = new t.View.GroupingFeature(t.Latin.genders, 'Gender');
        groupingFeature.formsColumn = true;
        groupingFeature.hasColumnRowTitle = true;
        groupingFeature.groupFeatureList = {
            titleColumnsQuantity: titleColumnQty
        };
        groupQty = 5;
        cell = new t.View.RowTitleCell(title, groupingFeature, groupQty);
        let parentGroupingFeature = new t.View.GroupingFeature(t.Latin.genders, 'Gender');
        parentGroupingFeature.groupingFeatureList = {
            titleColumnsQuantity: titleColumnQty
        };
        parentCell = new t.View.RowTitleCell(title, parentGroupingFeature, groupQty);
        cell.parent = parentCell;

    });

    test('Should be initialized properly.', () => {

        expect(cell).toEqual(expect.objectContaining({
            nvGroupQty: groupQty,
            parent: parentCell,
            title: title
        }));

    });

    test('render() should generate HTML representation properly.', () => {

        let headerRowHtml = '<div class="' + t.Styles.classNames.cell + ' ' + t.Styles.classNames.header + ' '
            + t.Styles.classNames.widthPrefix + titleColumnQty + '">Row title</div>';
        let parentHeaderRowHtml = '<div class="' + t.Styles.classNames.cell + '">Row title</div>';
        // Render is called in constructor so we don't need to call it explicitly
        expect(cell.wNode.outerHTML).toMatch(headerRowHtml);
        expect(cell.nNodes.length).toBe(groupQty);
        expect(cell.nNodes).toContainEqual(expect.objectContaining({ outerHTML: headerRowHtml }));
        expect(cell.parent.nNodes).toContainEqual(expect.objectContaining({ outerHTML: parentHeaderRowHtml }));

    });

    test('wvNode() should return a wide view node.', () => {

        expect(cell.wvNode).toEqual(cell.wNode);

    });

    test('getNvNode() should return a particular narrow view node.', () => {

        let index = 3;
        expect(cell.getNvNode(index)).toEqual(cell.nNodes[index]);

    });

    test('placeholder() should build a proper HTML element.', () => {

        let placeholderWidth = 2;
        let placeholder = t.View.RowTitleCell.placeholder(placeholderWidth);

        // Event listener should be called twice
        expect(placeholder.outerHTML).toBe('<div class="' + t.Styles.classNames.cell + ' '
            + t.Styles.classNames.widthPrefix + placeholderWidth + '"></div>');

    });

    test('hierarchyList() should return current cell and a full list of parent.', () => {

        expect(cell.hierarchyList).toEqual([
            parentCell,
            cell
        ]);

    });

    test('highlight() should add a "highlight" class to both wide and narrow nodes.', () => {

        cell.highlight();
        let nNodes = [];
        for (let node of cell.nNodes) {
            nNodes.push(node.classList.contains(t.Styles.classNames.highlight));
        }

        expect(cell.wNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();
        expect(nNodes).toEqual([
            true,
            true,
            true,
            true,
            true
        ]);

    });

    test('clearHighlighting() should remove a "highlight" class from both wide and narrow nodes.', () => {

        cell.highlight();
        cell.clearHighlighting();

        let nNodes = [];
        for (let node of cell.nNodes) {
            nNodes.push(node.classList.contains(t.Styles.classNames.highlight));
        }

        expect(cell.wNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();
        expect(nNodes).toEqual([
            false,
            false,
            false,
            false,
            false
        ]);

    });

    afterAll(() => {
        // Teardown
       groupingFeature = undefined;
       cell = undefined;
       parentCell = undefined;
    });
});

describe('HeaderCell', () => {

    let groupingFeature, title, cell, parentCell, childCell, span, parentSpan, childSpan;

    beforeAll(() => {

        title = "Header title";
        span = 2;
        groupingFeature = new t.View.GroupingFeature(t.Latin.genders, 'Gender');
        groupingFeature.formsColumn = true;
        groupingFeature.hasColumnRowTitle = true;
        cell = new t.View.HeaderCell(title, groupingFeature, span);
        let parentGroupingFeature = new t.View.GroupingFeature(t.Latin.genders, 'Gender');
        parentGroupingFeature.formsColumn = true;
        parentSpan = span*2;
        parentCell = new t.View.HeaderCell(title, parentGroupingFeature, parentSpan);
        childSpan = 1;
        childCell = new t.View.HeaderCell(title, groupingFeature, childSpan);

        cell.parent = parentCell;
        cell.children.push(childCell);
    });

    test('Should be initialized properly.', () => {

        expect(cell).toEqual(expect.objectContaining({
            feature: groupingFeature,
            title: title,
            span: span,
            parent: parentCell
        }));

    });

    test('render() should generate HTML representation of elements properly.', () => {

        let headerCellHtml = '<div class="' + t.Styles.classNames.cell + ' ' + t.Styles.classNames.header + ' '
            + t.Styles.classNames.widthPrefix + span + '">' + title + '</div>';
        let parentHeaderCellHtml = '<div class="infl-cell infl-cell--hdr infl-cell--sp4">Header title</div>';
        // Render is called in constructor so we don't need to call it explicitly
        expect(cell.wNode.outerHTML).toMatch(headerCellHtml);
        expect(cell.nNode.outerHTML).toMatch(headerCellHtml);
        expect(cell.parent.wNode.outerHTML).toMatch(parentHeaderCellHtml);

    });

    test('wvNode() should return a wide view node.', () => {

        expect(cell.wvNode).toEqual(cell.wNode);

    });

    test('nvNode() should return a narrow view node.', () => {

        expect(cell.nvNode).toEqual(cell.nNode);

    });

    test('addColumn() should add column to itself and to its parent.', () => {

        let column = new t.View.Column();
        column.addonProperty = 'test';
        cell.addColumn(column);

        // Event listener should be called twice
        expect(cell.columns).toEqual([column]);
        expect(cell.parent.columns).toEqual([column]);

        // Remove column after the test
        cell.columns = [];

    });

    test('changeSpan() should change a width of its cell.', () => {

        // Let's test what will happen if two columns be hidden
        let firstChange = -2;
        cell.changeSpan(firstChange);
        expect(cell.span).toBe(span + firstChange);
        expect(cell.wNode.classList.contains(t.Styles.classNames.widthPrefix + (span + firstChange)));

        // A change in the reverse direction should restore initial values
        let secondChange = -firstChange;
        cell.changeSpan(secondChange);
        expect(cell.span).toBe(span);
        expect(cell.wNode.classList.contains(t.Styles.classNames.widthPrefix + span));

    });

    test('columnStateChange() should initiate a span change on itself and on parent.', () => {

        let hiddenColumn = new t.View.Column();
        hiddenColumn.hidden = true;
        let column = new t.View.Column();

        cell.columns = [column, hiddenColumn];
        cell.parent.columns = [column, hiddenColumn, column, hiddenColumn];
        childCell.columns = [hiddenColumn];

        cell.children.push(childCell);

        cell.columnStateChange();

        expect(cell.span).toBe(span - 1);
        expect(cell.parent.span).toBe(parentSpan - 2);
        expect(childCell.span).toBe(childSpan - 1);

        // Cleanup
        cell.columns = [];
        cell.parent.columns = [];
        childCell.columns = [];

    });

    test('highlight() should add a "highlight" to both wide and narrow nodes of the cell itself and its parent, but not its children.', () => {

        cell.highlight();

        expect(cell.wNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();
        expect(cell.nNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();
        expect(cell.parent.wNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();
        expect(cell.parent.nNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();
        expect(cell.children[0].wNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();
        expect(cell.children[0].nNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();

    });

    test('clearHighlighting() should remove a "highlight" from both wide and narrow nodes of the cell itself and its parent.', () => {

        cell.highlight();
        cell.clearHighlighting();

        expect(cell.wNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();
        expect(cell.nNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();
        expect(cell.parent.wNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();
        expect(cell.parent.nNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();

    });

    afterAll(() => {
        // Teardown
        groupingFeature = undefined;
        cell = undefined;
        parentCell = undefined;
        childCell = undefined;
    });
});


describe('Column', () => {

    let groupingFeature, noMatchCell, emptyCell, suffixMatchCell, headerCell, span, title,
        noMatchColumn, emptyColumn, suffixMatchColumn;

    beforeAll(() => {

        title = "Header title";
        span = 2;
        groupingFeature = new t.View.GroupingFeature(t.Latin.genders, 'Gender');
        groupingFeature.formsColumn = true;
        groupingFeature.hasColumnRowTitle = true;
        headerCell = new t.View.HeaderCell(title, groupingFeature, span);

        let emptyMatchData = new t.MatchData();
        let suffixMatchData = new t.MatchData();
        suffixMatchData.suffixMatch = true;
        let suffixOne = new t.Suffix('endingOne');
        suffixOne.match = emptyMatchData;
        let suffixTwo = new t.Suffix('endingTwo');
        suffixTwo.match = emptyMatchData;
        let suffixThree = new t.Suffix('endingThree');
        suffixThree.match = suffixMatchData;
        noMatchCell = new t.View.Cell([suffixOne, suffixTwo]);
        emptyCell = new t.View.Cell();
        suffixMatchCell = new t.View.Cell([suffixOne, suffixThree]);

        noMatchColumn = new t.View.Column([noMatchCell]);

        emptyColumn = new t.View.Column([emptyCell]);

        suffixMatchColumn = new t.View.Column([suffixMatchCell]);
    });

    test('Should be initialized properly.', () => {

        expect(noMatchColumn).toEqual(expect.objectContaining({
            hidden: false,
            empty: false,
            suffixMatches: false,
            cells: expect.arrayContaining([noMatchCell])
        }));

        expect(emptyColumn).toEqual(expect.objectContaining({
            hidden: false,
            empty: true,
            suffixMatches: false,
            cells: expect.arrayContaining([emptyCell])
        }));

        expect(suffixMatchColumn).toEqual(expect.objectContaining({
            hidden: false,
            empty: false,
            suffixMatches: true,
            cells: expect.arrayContaining([suffixMatchCell])
        }));

        let noCellsColumn = new t.View.Column();
        expect(noCellsColumn.cells.length).toBe(0);

    });

    test('headerCell() should add a header cell to the column.', () => {

        noMatchColumn.headerCell = headerCell;
        // Render is called in constructor so we don't need to call it explicitly
        expect(noMatchColumn._headerCell).toEqual(headerCell);
        expect(noMatchColumn._headerCell.columns).toContainEqual(noMatchColumn);

    });

    test('length() should return a number of cells in a column.', () => {

        expect(noMatchColumn.length).toBe(1);

    });

    test('hide() should hide all cells in a column and notify a header cell about a state change.', () => {

        const columnStateChange = jest.fn();
        const hide = jest.fn();
        headerCell.columnStateChange = columnStateChange;
        noMatchColumn.headerCell = headerCell;
        noMatchCell.hide = hide;

        noMatchColumn.hide();
        expect(noMatchColumn.hidden).toBeTruthy();
        expect(columnStateChange.mock.calls.length).toBe(1);
        expect(hide.mock.calls.length).toBe(1);
    });

    test('show() should hide all cells in a column and notify a header cell about a state change.', () => {

        // Set state to hidden first, then show
        noMatchColumn.hide();

        const columnStateChange = jest.fn();
        const show = jest.fn();
        headerCell.columnStateChange = columnStateChange;
        noMatchColumn.headerCell = headerCell;
        noMatchCell.show = show;
        noMatchColumn.show();

        expect(noMatchColumn.hidden).toBeFalsy();
        expect(columnStateChange.mock.calls.length).toBe(1);
        expect(show.mock.calls.length).toBe(1);
    });

    test('highlight() should highlight all cells in a column and notify a header cell about a state change.', () => {

        const headerHighligh = jest.fn();
        const highlight = jest.fn();
        headerCell.highlight = headerHighligh;
        noMatchColumn.headerCell = headerCell;
        noMatchCell.highlight = highlight;

        noMatchColumn.highlight();
        expect(headerHighligh.mock.calls.length).toBe(1);
        expect(highlight.mock.calls.length).toBe(1);
    });

    test('clearHighlighting() should highlight all cells in a column and notify a header cell about a state change.', () => {

        const headerClearHighlighting = jest.fn();
        const clearHighlighting = jest.fn();
        headerCell.clearHighlighting = headerClearHighlighting;
        noMatchColumn.headerCell = headerCell;
        noMatchCell.clearHighlighting = clearHighlighting;

        noMatchColumn.clearHighlighting();
        expect(headerClearHighlighting.mock.calls.length).toBe(1);
        expect(clearHighlighting.mock.calls.length).toBe(1);
    });

    afterAll(() => {
        // Teardown
        groupingFeature = undefined;
        noMatchCell = undefined;
        emptyCell = undefined;
        suffixMatchCell = undefined;
        headerCell = undefined;
        noMatchColumn = undefined;
        emptyColumn = undefined;
        suffixMatchColumn = undefined;
    });
});


describe('Row', () => {

    let cell, cell2, row;

    beforeAll(() => {

        cell = new t.View.Cell();
        cell2 = new t.View.Cell();
        cell2.uniqueProperty = 'test'; // To distinguish it from another cell
        row = new t.View.Row([cell]);
    });

    test('Should be initialized properly.', () => {

        expect(row.cells).toContain(cell);
        expect(row.cells[0].row).toEqual(row);

    });

    test('add() should add a cell to the column.', () => {

        row.add(cell2);
        expect(row.cells).toContainEqual(cell);
        expect(row.cells).toContainEqual(cell2);
        row.cells.pop();

    });

    test('length() should return a portion of cells.', () => {

        row.add(cell2);
        expect(row.length).toBe(2);
        row.cells.pop();

    });

    test('slice() should return a Row object with correct number of cells in it.', () => {

        row.add(cell2);
        let slice = row.slice(1, 2);
        expect(slice.cells.length).toBe(1);
        row.cells.pop();

    });

    test('slice() should return correct cells objects.', () => {

        row.add(cell2);
        let slice = row.slice(1, 2);
        expect(slice.cells[0]).toBe(cell2);
        row.cells.pop();

    });

    test('slice() should copy a reference to the title cell.', () => {

        row.add(cell2);
        let slice = row.slice(1, 2);
        expect(slice.titleCell).toBe(row.titleCell);
        row.cells.pop();

    });

    test('highlight() should highlight all cells in a column and notify a header cell about a state change.', () => {

        const titleHighlight = jest.fn();
        const highlight = jest.fn();
        row.titleCell = {
            highlight: titleHighlight
        };
        cell.highlight = highlight;

        row.highlight();
        expect(titleHighlight.mock.calls.length).toBe(1);
        expect(highlight.mock.calls.length).toBe(1);
    });

    test('clearHighlighting() should highlight all cells in a column and notify a header cell about a state change.', () => {

        const titleClearHighlighting = jest.fn();
        const clearHighlighting = jest.fn();
        row.titleCell = {
            clearHighlighting: titleClearHighlighting
        };
        cell.clearHighlighting = clearHighlighting;

        row.clearHighlighting();
        expect(titleClearHighlighting.mock.calls.length).toBe(1);
        expect(clearHighlighting.mock.calls.length).toBe(1);
    });

    afterAll(() => {
        // Teardown
        cell = undefined;
        cell2 = undefined;
        row = undefined;
    });
});


describe('GroupFeatureType', () => {

    let groupingFeature, featureType, groupTitle;

    beforeAll(() => {

        groupTitle = 'Gender';
        featureType = new t.FeatureType(
            t.types.gender,
            [['masculine', 'feminine'], 'neuter'],
            t.languages.latin);

        groupingFeature = new t.View.GroupingFeature(featureType, groupTitle);
    });

    test('Constructor should set simple properties properly.', () => {

        expect(groupingFeature).toEqual(expect.objectContaining({
            groupTitle: groupTitle,
            type: featureType.type,
            language: featureType.language,
            _orderIndex: featureType._orderIndex
        }));

    });

    test('Should be initialized properly.', () => {

        expect(groupingFeature).toEqual(expect.objectContaining({
            groupTitle: groupTitle
        }));
        expect(groupingFeature).toEqual(expect.objectContaining({
            type: featureType.type,
            language: featureType.language,
            _orderIndex: featureType._orderIndex
        }));

    });


    test('formsColumn() should return a value installed by a setter.', () => {

        groupingFeature.formsColumn = true;
        expect(groupingFeature.formsColumn).toBeTruthy();

    });

    test('formsRow() should return a value installed by a setter.', () => {

        groupingFeature.formsRow = true;
        expect(groupingFeature.formsRow).toBeTruthy();

    });

    afterAll(() => {
        // Teardown
        groupingFeature = undefined;
        featureType = undefined;
    });
});


describe('GroupFeatureList', () => {

    let groupingFeatureList, featureOne, featureTwo, featureThree, featureList;

    beforeAll(() => {

        featureOne = new t.View.GroupingFeature(t.Latin.genders, 'Gender');
        featureOne.formsColumn = true;

        featureTwo = new t.View.GroupingFeature(t.Latin.types, 'Type');
        featureTwo.formsRow = true;
        featureTwo.hasColumnRowTitle = true;

        featureThree = new t.View.GroupingFeature(t.Latin.numbers, 'Number');
        featureThree.formsRow;
        featureThree.hasFullWidthRowTitle = true;

        featureList = [featureOne, featureTwo, featureThree];

        groupingFeatureList = new t.View.GroupingFeatureList(featureList);
        groupingFeatureList.columns = [featureOne];
        groupingFeatureList.rows = [featureTwo, featureThree];
    });

    test('Constructor should store a list of grouping features.', () => {

        expect(groupingFeatureList._features).toEqual(featureList);

    });

    test('Constructor should create a list of column features.', () => {

        expect(groupingFeatureList._columnFeatures).toEqual([featureOne]);

    });

    test('Constructor should create a list of row features.', () => {

        expect(groupingFeatureList._rowFeatures).toEqual([featureTwo, featureThree]);

    });

    test('items() should return a list of features.', () => {

        expect(groupingFeatureList.items).toEqual(featureList);

    });

    test('columnFeatures() should return a list of column features.', () => {

        expect(groupingFeatureList.columnFeatures).toEqual([featureOne]);

    });

    test('firstColumnFeature() should return a first column feature item.', () => {

        expect(groupingFeatureList.firstColumnFeature).toEqual(featureOne);

    });

    test('lastColumnFeature() should return a last column feature item.', () => {

        expect(groupingFeatureList.lastColumnFeature).toEqual(featureOne);

    });

    test('rowFeatures() should return a list of row features.', () => {

        expect(groupingFeatureList.rowFeatures).toEqual([featureTwo, featureThree]);

    });

    test('firstRowFeature() should return a first row feature item.', () => {

        expect(groupingFeatureList.firstRowFeature).toEqual(featureTwo);

    });

    test('lastRowFeature() should return a last row feature item.', () => {

        expect(groupingFeatureList.lastRowFeature).toEqual(featureThree);

    });

    test('length() should return a quantity of feature items.', () => {
        "use strict";

        expect(groupingFeatureList.length).toEqual(featureList.length);

    });

    test('titleColumnsQuantity() should return a number of row title columns.', () => {

        expect(groupingFeatureList.titleColumnsQuantity).toBe(1);
    });

    afterAll(() => {
        // Teardown
        groupingFeatureList = undefined;
        featureOne = undefined;
        featureTwo = undefined;
        featureThree = undefined;
        featureList = undefined;
    });
});


describe('WideView', () => {

    let visibleColumn, hiddenColumn, columns, rows, headers, titleColumnQty, wideView;

    beforeAll(() => {

        visibleColumn = new t.View.Column();
        hiddenColumn = new t.View.Column();
        hiddenColumn.hidden = true;
        columns = [visibleColumn, hiddenColumn];
        rows = [new t.View.Row()];
        headers = [new t.View.Row()];
        titleColumnQty = 1;

        wideView = new t.View.WideView(columns, rows, headers, titleColumnQty);
    });

    test('Constructor should initialize object properties.', () => {

        expect(wideView).toEqual(expect.objectContaining({
            columns: columns,
            rows: rows,
            headers: headers,
            titleColumnQty: titleColumnQty
        }));

    });

    test('Constructor should create an HTML element and assign proper CSS classes.', () => {

        expect(wideView.nodes.outerHTML).toBe('<div class="' + t.Styles.classNames.inflectionTable + ' '
            + t.Styles.classNames.wideView + '"></div>');

    });

    test('visibleColumnQty() should return a number of visible columns.', () => {

        expect(wideView.visibleColumnQty).toBe(1);

    });

    test('render() should create an HTML representation of a view.', () => {

        let emptyView = new t.View.WideView([], [], [], 0);
        let rendered = emptyView.render();
        expect(rendered.outerHTML).toBe('<div class="' + t.Styles.classNames.inflectionTable + ' '
            + t.Styles.classNames.wideView + '"></div>');
        expect(rendered.style).toEqual(expect.objectContaining({
            gridTemplateColumns: 'repeat(0, ' + t.Styles.wideView.column.width + t.Styles.wideView.column.unit + ')'
        }));

    });

    afterAll(() => {

        visibleColumn = undefined;
        hiddenColumn = undefined;
        columns = undefined;
        rows = undefined;
        headers = undefined;
        wideView = undefined;

    });
});


describe('NarrowView', () => {

    let visibleColumn, hiddenColumn, columns, rows, headers, titleColumnQty, groupQty, narrowView;

    beforeAll(() => {

        visibleColumn = new t.View.Column();
        hiddenColumn = new t.View.Column();
        hiddenColumn.hidden = true;
        columns = [visibleColumn, hiddenColumn];
        rows = [new t.View.Row()];
        headers = [new t.View.Row()];
        titleColumnQty = 1;
        groupQty = 2;
        narrowView = new t.View.NarrowView(groupQty, columns, rows, headers, titleColumnQty);

    });

    test('Constructor should initialize object properties.', () => {

        expect(narrowView).toEqual(expect.objectContaining({
            groupQty: groupQty,
            groupSize: columns.length / groupQty,
            columns: columns,
            rows: rows,
            headers: headers,
            titleColumnQty: titleColumnQty
        }));

    });

    test('Constructor should create an HTML element and assign proper CSS classes.', () => {

        expect(narrowView.nodes.classList.contains(t.Styles.classNames.narrowViewsContainer)).toBeTruthy();

    });

    /*test('createGroup() should create a NarrowViewGroup object.', () => {

        let emptyNarrowView = new t.View.NarrowView(0, [], [], [{cells: [{columns: 0}]}], 0);
        emptyNarrowView.createGroup();

        expect(emptyNarrowView.nodes.childNodes.length).toBe(1);
        expect(emptyNarrowView.nodes.innerHTML).toBe('<div class="' + t.Styles.classNames.inflectionTable + ' '
            + t.Styles.classNames.narrowView + '"></div>');

    });*/

    /*test('render() should call render methods of groups and return an HTMLElement object.', () => {

        const renderFn = jest.fn();

        for (let group of narrowView.groups) {
            group.render = renderFn;
        }
        let render = narrowView.render();

        expect(render.outerHTML).toBe('<div class="' + t.Styles.classNames.narrowViewsContainer + '">' +
            '<div class="' + t.Styles.classNames.inflectionTable + ' ' + t.Styles.classNames.narrowView + '"></div>' +
            '<div class="' + t.Styles.classNames.inflectionTable + ' ' + t.Styles.classNames.narrowView + '"></div>' +
            '</div>');

        expect(renderFn.mock.calls.length).toBe(2);

    });*/

    afterAll(() => {

        visibleColumn = undefined;
        hiddenColumn = undefined;
        columns = undefined;
        rows = undefined;
        headers = undefined;
        narrowView = undefined;

    });
});


describe('NarrowViewGroup', () => {

    let index, visibleColumn, hiddenColumn, columns, rows, headers, titleColumnQty, groupQty, narrowViewGroup;

    beforeAll(() => {

        visibleColumn = new t.View.Column();
        hiddenColumn = new t.View.Column();
        hiddenColumn.hidden = true;
        columns = [visibleColumn, hiddenColumn];
        rows = [new t.View.Row(), new t.View.Row()];
        headers = [new t.View.Row(), new t.View.Row(), new t.View.Row()];
        index = 0;
        titleColumnQty = 1;
        groupQty = 1;
        //narrowViewGroup = new t.View.NarrowViewGroup(index, headers, rows, titleColumnQty);

        let a = 1;
    });

    /*test('Constructor should initialize object properties.', () => {

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

        expect(narrowViewGroup.nodes.outerHTML).toBe('<div class="' + t.Styles.classNames.inflectionTable + ' '
            + t.Styles.classNames.narrowView + '"></div>');

    });

    test('visibleColumnQty() should return a number of visible columns.', () => {

        expect(narrowViewGroup.visibleColumnQty).toBe(1);

    });

    test('render() should crate an HTML representation of a view.', () => {
        "use strict";

        let emptyNarrowView = new t.View.NarrowView(1, 0, [], [], [], 0);
        let render = emptyNarrowView.render();
        expect(render.innerHTML).toBe('<div class="' + t.Styles.classNames.inflectionTable + ' '
            + t.Styles.classNames.narrowView + ' ' + t.Styles.classNames.hidden + '"></div>');

    });*/

    afterAll(() => {

        narrowViewGroup = undefined;

    });
});

/*
   Because Jest 20.x does not support jsdom 11 yet, and because Cell uses a dataset node, for testing a Table object
   a custom jsdom 11 environment is required. See Cell.index() for more information.
*/
describe('Table', () => {
    "use strict";

    let featureOne, featureTwo, featureThree, features, messages, messageBundle, table;

    beforeAll(() => {

        featureOne = new t.View.GroupingFeature(t.Latin.genders, 'Gender');
        featureOne.formsColumn = true;

        featureTwo = new t.View.GroupingFeature(t.Latin.types, 'Type');
        featureTwo.formsRow = true;
        featureTwo.hasColumnRowTitle = true;

        featureThree = new t.View.GroupingFeature(t.Latin.numbers, 'Number');
        featureThree.formsRow;
        featureThree.hasFullWidthRowTitle = true;

        features = [featureOne, featureTwo, featureThree];

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
        };

        messageBundle = new t.L10n.MessageBundle('en-US', messages);

        table = new t.View.Table(features);
        table.messages = messageBundle;
    });

    test('Constructor should initialize object properties.', () => {

        let featureList = new t.View.GroupingFeatureList(features);

        expect(table).toEqual(expect.objectContaining({
            emptyColumnsHidden: false,
            features: featureList,
            messages: messageBundle
        }));

    });

    /*
    Not testing construct() and constructViews() for now.
     */

    test('suffixColumnQty() should return a number of columns.', () => {

        table.columns = [new t.View.Column(), new t.View.Column()];
        expect(table.suffixColumnQty).toBe(2);
        table.columns = [];

    });

    test('titleColumnQty() should return a number of columns.', () => {

        expect(table.titleColumnQty).toBe(1);

    });

    test('suffixRowQty() should return a number of rows with suffixes.', () => {

        table.columns = [new t.View.Column()];
        table.columns[0].cells = [new t.View.Cell(), new t.View.Cell()];
        expect(table.suffixRowQty).toBe(2);
        table.columns = [];

    });

    test('filter() should check whether a feature value matches the one stored in a suffix.', () => {

        let suffix = new t.Suffix('suffixValue', undefined);
        suffix.features[t.types.gender] = 'neuter';
        expect(t.View.Table.filter(t.types.gender, 'neuter', suffix)).toBeTruthy();
        expect(t.View.Table.filter(t.types.gender, 'feminine', suffix)).toBeFalsy();
        expect(t.View.Table.filter(t.types.tense, 'imperfect', suffix)).toBeFalsy();

    });

    /*
    Skip groupByFeature(), constructColumns(), constructRows(), constructHeaders() for now.
     */

    test('addEventListeners() should add "mouseenter" and "mouseleave" listeners to every cell.', () => {

        let cell = new t.View.Cell();
        const addEventListener = jest.fn();
        cell.addEventListener = addEventListener;
        table.cells = [cell, cell];
        table.addEventListeners();

        expect(addEventListener.mock.calls.length).toBe(4);
        expect(addEventListener.mock.calls[0][0]).toBe('mouseenter');
        expect(addEventListener.mock.calls[1][0]).toBe('mouseleave');
        table.cells = [];

    });

    test('highlightRowAndColumn() should call corresponding method of a specific cell.', () => {

        let index = 1;
        let event = { currentTarget: { dataset: {index: index } } };
        let cell = new t.View.Cell();
        const highlightRowAndColumn = jest.fn();
        table.cells = [cell, cell];
        table.cells[index].highlightRowAndColumn = highlightRowAndColumn;
        table.highlightRowAndColumn(event);

        expect(highlightRowAndColumn.mock.calls.length).toBe(1);
        table.cells = [];

    });

    test('clearRowAndColumnHighlighting() should call corresponding method of a specific cell.', () => {

        let index = 1;
        let event = { currentTarget: { dataset: {index: index } } };
        let cell = new t.View.Cell();
        const clearRowAndColumnHighlighting = jest.fn();
        table.cells = [cell, cell];
        table.cells[index].clearRowAndColumnHighlighting = clearRowAndColumnHighlighting;
        table.clearRowAndColumnHighlighting(event);

        expect(clearRowAndColumnHighlighting.mock.calls.length).toBe(1);
        table.cells = [];

    });

    test('hideEmptyColumns() should hide those columns that are empty.', () => {

        const hide = jest.fn();
        let columnOne = new t.View.Column();
        columnOne.hide = hide;
        columnOne.empty = false;
        let columnTwo = new t.View.Column();
        columnTwo.hide = hide;
        table.columns = [columnOne, columnTwo];
        table.hideEmptyColumns();

        expect(hide.mock.calls.length).toBe(1);
        expect(table.emptyColumnsHidden).toBeTruthy();
        table.columns = [];

    });


    test('showEmptyColumns() should show those columns that are empty.', () => {

        const show = jest.fn();
        let columnOne = new t.View.Column();
        columnOne.show = show;
        columnOne.hidden = true;
        let columnTwo = new t.View.Column();
        columnTwo.show = show;
        table.columns = [columnOne, columnTwo];
        table.showEmptyColumns();

        expect(show.mock.calls.length).toBe(1);
        expect(table.emptyColumnsHidden).toBeFalsy();
        table.columns = [];

    });


    test('hideNoSuffixGroups() should hide those columns that are empty.', () => {

        const hide = jest.fn();
        let headerOne = new t.View.HeaderCell();
        let headerTwo = new t.View.HeaderCell();
        let noMatchesColumn = new t.View.Column();
        noMatchesColumn.suffixMatches = false;
        noMatchesColumn.hide = hide;
        headerTwo.columns = [noMatchesColumn];
        table.headers = [new t.View.Row([headerOne, headerTwo])];
        table.hideNoSuffixGroups();

        expect(hide.mock.calls.length).toBe(1);
        expect(table.suffixMatchesHidden).toBeTruthy();
        table.headers = [];

    });


    test('showNoSuffixGroups() should hide those columns that are empty.', () => {

        const show = jest.fn();
        let column = new t.View.Column();
        column.show = show;
        table.columns = [column, column];
        table.showNoSuffixGroups();

        expect(show.mock.calls.length).toBe(2);
        expect(table.suffixMatchesHidden).toBeFalsy();
        table.headers = [];

    });


    afterAll(() => {

        featureOne = undefined;
        featureTwo = undefined;
        featureThree= undefined;
        features = undefined;
        messages = undefined;
        messageBundle = undefined;
        table = undefined;

    });
});


describe('Footnotes', () => {

    let footnotes, footnotesList;

    beforeAll(() => {

        footnotesList = [new t.Footnote(1, 'FootnoteOne'), new t.Footnote(2, 'FootnoteTwo')];
        footnotes = new t.View.Footnotes(footnotesList);
    });

    test('Constructor should initialize object properties.', () => {

        expect(footnotes).toEqual(expect.objectContaining({
            footnotes: footnotesList
        }));

    });

    test('Constructor should create an HTML representation of a footnotes object.', () => {

        expect(footnotes.nodes.outerHTML).toBe('<dl id="' + t.Styles.footnotes.id + '" class="' +
            t.Styles.classNames.footnotesContainer + '">' +
            '<dt>1</dt><dd>FootnoteOne</dd><dt>2</dt><dd>FootnoteTwo</dd></dl>');

    });

    test('html() should return a nodes list.', () => {

        expect(footnotes.html).toEqual(footnotes.nodes);

    });

    afterAll(() => {

        footnotes = undefined;
        footnotesList = undefined;

    });
});


describe('View', () => {

    let partOfSpeech, featureOne, featureTwo, featureThree, features, messages, messageBundle,
        footnotes, footnotesList, viewOptions, resultSet, view, word, title, container;

    beforeAll(() => {

        partOfSpeech = 'noun';
        title = 'Test Title';
        word = 'Test';

        featureOne = new t.View.GroupingFeature(t.Latin.genders, 'Gender');
        featureOne.formsColumn = true;

        featureTwo = new t.View.GroupingFeature(t.Latin.types, 'Type');
        featureTwo.formsRow = true;
        featureTwo.hasColumnRowTitle = true;

        featureThree = new t.View.GroupingFeature(t.Latin.numbers, 'Number');
        featureThree.formsRow;
        featureThree.hasFullWidthRowTitle = true;

        features = [featureOne, featureTwo, featureThree];

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
        };

        messageBundle = new t.L10n.MessageBundle('en-US', messages);

        footnotesList = [new t.Footnote(1, 'FootnoteOne'), new t.Footnote(2, 'FootnoteTwo')];
        footnotes = new t.View.Footnotes(footnotesList);

        resultSet = new t.ResultSet();
        resultSet.homonym = { targetWord: word };
        resultSet[partOfSpeech] = {
            suffixes: [],
            footnotes: footnotesList
        };

        container = document.createElement('div');

        view = new t.View.View();
        view.title = title;
        view.partOfSpeech = partOfSpeech;
        view.table = new t.View.Table(features);
        view.table.messages = messageBundle;
        view.table.features.columns = [featureOne];
        view.table.features.rows = [featureTwo, featureThree];
    });

    /*
    Skip test of render() for now.
     */

   /* test('display() should insert a view\'s HTML into a container.', () => {

        view.container = container;
        view.wordData = resultSet;
        view.footnotes = new t.View.Footnotes(resultSet[partOfSpeech].footnotes);
        view.table = new t.View.Table(features);
        view.table.messages = messageBundle;
        view.table.features.columns = [featureOne];
        view.table.features.rows = [featureTwo, featureThree];
        view.table.construct(resultSet[partOfSpeech].suffixes).constructViews();
        view.table.wideView.render();

        view.display();
        expect(container.outerHTML).toMatch(new RegExp('<div><h2>' + word + '</h2><h3>' + title + '</h3>' +
            '<div>' + t.Styles.pageHeader.html + '</div>.*</div>'));

    });*/

    test('hideEmptyColumns() should proxy request to the table and and update the view.', () => {
        let hideEmptyColumnsStored = view.table.hideEmptyColumns;
        let displayStored = view.display;
        const hideEmptyColumns = jest.fn();
        const display = jest.fn();
        view.table.hideEmptyColumns = hideEmptyColumns;
        view.display = display;

        let hideEmptyColumnsBtnStored = view.pageHeader.hideEmptyColumnsBtn;
        let showEmptyColumnsBtnStored = view.pageHeader.showEmptyColumnsBtn;
        view.pageHeader.hideEmptyColumnsBtn = document.createElement('div');
        view.pageHeader.showEmptyColumnsBtn = document.createElement('div');
        view.pageHeader.showEmptyColumnsBtn.classList.add(t.Styles.classNames.hidden);
        view.hideEmptyColumns();
        expect(hideEmptyColumns.mock.calls.length).toBe(1);
        expect(display.mock.calls.length).toBe(1);
        expect(view.pageHeader.hideEmptyColumnsBtn.classList.contains(t.Styles.classNames.hidden)).toBeTruthy();
        expect(view.pageHeader.showEmptyColumnsBtn.classList.contains(t.Styles.classNames.hidden)).toBeFalsy();
        view.table.hideEmptyColumns = hideEmptyColumnsStored;
        view.display = displayStored;
        view.pageHeader.hideEmptyColumnsBtn = hideEmptyColumnsBtnStored;
        view.pageHeader.showEmptyColumnsBtn = showEmptyColumnsBtnStored;
    });

    test('showEmptyColumns() should proxy request to the table and and update the view.', () => {
        let showEmptyColumnsStored = view.table.hideEmptyColumns;
        let displayStored = view.display;
        const showEmptyColumns = jest.fn();
        const display = jest.fn();
        view.table.showEmptyColumns = showEmptyColumns;
        view.display = display;

        let hideEmptyColumnsBtnStored = view.pageHeader.hideEmptyColumnsBtn;
        let showEmptyColumnsBtnStored = view.pageHeader.showEmptyColumnsBtn;
        view.pageHeader.hideEmptyColumnsBtn = document.createElement('div');
        view.pageHeader.showEmptyColumnsBtn = document.createElement('div');
        view.pageHeader.hideEmptyColumnsBtn.classList.add(t.Styles.classNames.hidden);
        view.showEmptyColumns();
        expect(showEmptyColumns.mock.calls.length).toBe(1);
        expect(display.mock.calls.length).toBe(1);
        expect(view.pageHeader.showEmptyColumnsBtn.classList.contains(t.Styles.classNames.hidden)).toBeTruthy();
        expect(view.pageHeader.hideEmptyColumnsBtn.classList.contains(t.Styles.classNames.hidden)).toBeFalsy();
        view.table.showEmptyColumns = showEmptyColumnsStored;
        view.display = displayStored;
        view.pageHeader.hideEmptyColumnsBtn = hideEmptyColumnsBtnStored;
        view.pageHeader.showEmptyColumnsBtn = showEmptyColumnsBtnStored;
    });

    test('hideNoSuffixGroups() should proxy request to the table and and update the view.', () => {
        let hideNoSuffixGroupsStored = view.table.hideNoSuffixGroups;
        let displayStored = view.display;
        const hideNoSuffixGroups = jest.fn();
        const display = jest.fn();
        view.table.hideNoSuffixGroups = hideNoSuffixGroups;
        view.display = display;

        let hideNoSuffixGroupsBtnStored = view.pageHeader.hideNoSuffixGroupsBtn;
        let showNoSuffixGroupsBtnStored = view.pageHeader.showNoSuffixGroupsBtn;
        view.pageHeader.hideNoSuffixGroupsBtn = document.createElement('div');
        view.pageHeader.showNoSuffixGroupsBtn = document.createElement('div');
        view.pageHeader.showNoSuffixGroupsBtn.classList.add(t.Styles.classNames.hidden);
        view.hideNoSuffixGroups();
        expect(hideNoSuffixGroups.mock.calls.length).toBe(1);
        expect(display.mock.calls.length).toBe(1);
        expect(view.pageHeader.hideNoSuffixGroupsBtn.classList.contains(t.Styles.classNames.hidden)).toBeTruthy();
        expect(view.pageHeader.showNoSuffixGroupsBtn.classList.contains(t.Styles.classNames.hidden)).toBeFalsy();
        view.table.hideNoSuffixGroups = hideNoSuffixGroupsStored;
        view.display = displayStored;
        view.pageHeader.hideNoSuffixGroupsBtn = hideNoSuffixGroupsBtnStored;
        view.pageHeader.showNoSuffixGroupsBtn = showNoSuffixGroupsBtnStored;
    });

    test('showNoSuffixGroups() should proxy request to the table and and update the view.', () => {
        let showNoSuffixGroupsStored = view.table.showNoSuffixGroups;
        let displayStored = view.display;
        const showNoSuffixGroups = jest.fn();
        const display = jest.fn();
        view.table.showNoSuffixGroups = showNoSuffixGroups;
        view.display = display;

        let hideNoSuffixGroupsBtnStored = view.pageHeader.hideNoSuffixGroupsBtn;
        let showNoSuffixGroupsBtnStored = view.pageHeader.showNoSuffixGroupsBtn;
        view.pageHeader.showNoSuffixGroupsBtn = document.createElement('div');
        view.pageHeader.showNoSuffixGroupsBtn.classList.add(t.Styles.classNames.hidden);
        view.pageHeader.hideNoSuffixGroupsBtn = document.createElement('div');
        view.showNoSuffixGroups();
        expect(showNoSuffixGroups.mock.calls.length).toBe(1);
        expect(display.mock.calls.length).toBe(1);
        expect(view.pageHeader.hideNoSuffixGroupsBtn.classList.contains(t.Styles.classNames.hidden)).toBeTruthy();
        expect(view.pageHeader.showNoSuffixGroupsBtn.classList.contains(t.Styles.classNames.hidden)).toBeFalsy();
        view.table.showNoSuffixGroups = showNoSuffixGroupsStored;
        view.display = displayStored;
        view.pageHeader.hideNoSuffixGroupsBtn = hideNoSuffixGroupsBtnStored;
        view.pageHeader.showNoSuffixGroupsBtn = showNoSuffixGroupsBtnStored;
    });
});
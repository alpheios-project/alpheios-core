const t = require('../../../tests/test-bundle');

describe('Cell', () => {
    "use strict";

    let suffixes, cell;

    beforeAll(() => {
        let emptyMatchData = new t.MatchData();
        let suffixMatchData = new t.MatchData();
        suffixMatchData.suffixMatch = true;
        suffixes = [
            new t.Suffix('endingOne', emptyMatchData),
            new t.Suffix('endingTwo', suffixMatchData)
        ];
        cell = new t.View.Cell(suffixes);
    });

    test('Should be initialized properly.', () => {
        "use strict";

        expect(cell).toEqual(expect.objectContaining({
            suffixes: suffixes,
            empty: false,
            suffixMatches: true
        }));

    });

    test('Render should create node elements properly.', () => {
        "use strict";

        // Render is called in constructor so we don't need to call it explicitly
        expect(cell.wNode.outerHTML).toMatch('<div class="infl-cell"><a class="infl-suff">endingOne</a>,&nbsp;<a class="infl-suff infl-suff--suffix-match">endingTwo</a></div>');
        expect(cell.wNode.outerHTML).toMatch(cell.nNode.outerHTML);

    });

    test('Node elements for wide and narrow views should be the same.', () => {
        "use strict";

        expect(cell.wNode.outerHTML).toMatch(cell.nNode.outerHTML);

    });

    test('wvNode should return a wide view node', () => {
        "use strict";

        expect(cell.wvNode).toEqual(cell.wNode);

    });

    test('nvNode should return a narrow view node', () => {
        "use strict";

        expect(cell.nvNode).toEqual(cell.nNode);

    });

    /*
    Can't test methods with 'dataset' node because Jest has not been upgraded to the latest jsdom yet:
    https://github.com/facebook/jest/issues/4537
     */
    /*test('Index should add index value to the object and to both wide and narrow node elements.', () => {
        "use strict";

        cell.index = 32;

        expect(cell._index).toBe(32);

    });*/

    test('addEventListener should proxy to wide and narrow nodes.', () => {
        "use strict";

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

    test('Hide should add a "hidden" class to both wide and narrow nodes.', () => {
        "use strict";

        cell.hide();

        expect(cell.wNode.classList.contains(t.Styles.classNames.hidden)).toBeTruthy();
        expect(cell.nNode.classList.contains(t.Styles.classNames.hidden)).toBeTruthy();

    });

    test('Show should remove a "hidden" class to both wide and narrow nodes.', () => {
        "use strict";

        cell.hide();
        cell.show();

        expect(cell.wNode.classList.contains(t.Styles.classNames.hidden)).toBeFalsy();
        expect(cell.nNode.classList.contains(t.Styles.classNames.hidden)).toBeFalsy();

    });

    test('Highlight should add a "highlight" class to both wide and narrow nodes.', () => {
        "use strict";

        cell.highlight();

        expect(cell.wNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();
        expect(cell.nNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();

    });

    test('clearHighlighting should remove a "highlight" class from both wide and narrow nodes.', () => {
        "use strict";

        cell.highlight();
        cell.clearHighlighting();

        expect(cell.wNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();
        expect(cell.nNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();

    });

    test('highlightRowAndColumn should proxy calls to column and row of a cell', () => {
        "use strict";

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

    test('clearRowAndColumnHighlighting should proxy calls to column and row of a cell', () => {
        "use strict";

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
    "use strict";

    let groupingFeature, title, groupQty, cell, parentCell, titleColumnQty;

    beforeAll(() => {

        title = "Row title";
        titleColumnQty = 2;
        groupingFeature = new t.View.GroupingFeature(
            t.types.gender,
            ['masculine', 'feminine', 'neuter'],
            t.languages.latin,
            'Gender')
            .setColumnGroupType()
            .setRowGroupTitleLocation();
        groupingFeature.groupingFeatureList = {
            titleColumnsQuantity: titleColumnQty
        };
        groupQty = 5;
        cell = new t.View.RowTitleCell(title, groupingFeature, groupQty);
        let parentGroupingFeature = new t.View.GroupingFeature(
            t.types.gender,
            ['masculine', 'feminine', 'neuter'],
            t.languages.latin,
            'Gender')
            .setRowGroupType();
        parentGroupingFeature.groupingFeatureList = {
            titleColumnsQuantity: titleColumnQty
        };
        parentCell = new t.View.RowTitleCell(title, parentGroupingFeature, groupQty);
        cell.parent = parentCell;

    });

    test('Should be initialized properly.', () => {
        "use strict";

        expect(cell).toEqual(expect.objectContaining({
            nvGroupQty: groupQty,
            parent: parentCell,
            title: title
        }));

    });

    test('render should generate HTML representation properly.', () => {
        "use strict";

        let headerRowHtml = '<div class="' + t.Styles.classNames.cell + ' ' + t.Styles.classNames.header + ' '
            + t.Styles.classNames.widthPrefix + titleColumnQty + '">Row title</div>';
        let parentHeaderRowHtml = '<div class="' + t.Styles.classNames.cell + '">Row title</div>';
        // Render is called in constructor so we don't need to call it explicitly
        expect(cell.wNode.outerHTML).toMatch(headerRowHtml);
        expect(cell.nNodes.length).toBe(groupQty);
        expect(cell.nNodes).toContainEqual(expect.objectContaining({ outerHTML: headerRowHtml }));
        expect(cell.parent.nNodes).toContainEqual(expect.objectContaining({ outerHTML: parentHeaderRowHtml }));

    });

    test('wvNode should return a wide view node.', () => {
        "use strict";

        expect(cell.wvNode).toEqual(cell.wNode);

    });

    test('getNvNode should return a particular narrow view node.', () => {
        "use strict";

        let index = 3;
        expect(cell.getNvNode(index)).toEqual(cell.nNodes[index]);

    });

    test('placeholder method should build a proper HTML element.', () => {
        "use strict";

        let placeholderWidth = 2;
        let placeholder = t.View.RowTitleCell.placeholder(placeholderWidth);

        // Event listener should be called twice
        expect(placeholder.outerHTML).toBe('<div class="' + t.Styles.classNames.cell + ' '
            + t.Styles.classNames.widthPrefix + placeholderWidth + '"></div>');

    });

    test('hierarchyList should return current cell and a full list of parent.', () => {
        "use strict";

        expect(cell.hierarchyList).toEqual([
            parentCell,
            cell
        ]);

    });

    test('Highlight should add a "highlight" class to both wide and narrow nodes.', () => {
        "use strict";

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

    test('clearHighlighting should remove a "highlight" class from both wide and narrow nodes.', () => {
        "use strict";

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
    "use strict";

    let groupingFeature, title, cell, parentCell, childCell, span, parentSpan, childSpan;

    beforeAll(() => {

        title = "Header title";
        span = 2;
        groupingFeature = new t.View.GroupingFeature(
            t.types.gender,
            ['masculine', 'feminine', 'neuter'],
            t.languages.latin,
            'Gender')
            .setColumnGroupType()
            .setColumnGroupTitleLocation();
        cell = new t.View.HeaderCell(title, groupingFeature, span);
        let parentGroupingFeature = new t.View.GroupingFeature(
            t.types.gender,
            ['masculine', 'feminine', 'neuter'],
            t.languages.latin,
            'Gender')
            .setColumnGroupType();
        parentSpan = span*2;
        parentCell = new t.View.HeaderCell(title, parentGroupingFeature, parentSpan);
        childSpan = 1;
        childCell = new t.View.HeaderCell(title, groupingFeature, childSpan);

        cell.parent = parentCell;
        cell.children.push(childCell);
    });

    test('Should be initialized properly.', () => {
        "use strict";

        expect(cell).toEqual(expect.objectContaining({
            feature: groupingFeature,
            title: title,
            span: span,
            parent: parentCell
        }));

    });

    test('Render should generate HTML representation of elements properly.', () => {
        "use strict";

        let headerCellHtml = '<div class="' + t.Styles.classNames.cell + ' ' + t.Styles.classNames.header + ' '
            + t.Styles.classNames.widthPrefix + span + '">' + title + '</div>';
        let parentHeaderCellHtml = '<div class="infl-cell infl-cell--hdr infl-cell--sp4">Header title</div>';
        // Render is called in constructor so we don't need to call it explicitly
        expect(cell.wNode.outerHTML).toMatch(headerCellHtml);
        expect(cell.nNode.outerHTML).toMatch(headerCellHtml);
        expect(cell.parent.wNode.outerHTML).toMatch(parentHeaderCellHtml);

    });

    test('wvNode should return a wide view node.', () => {
        "use strict";

        expect(cell.wvNode).toEqual(cell.wNode);

    });

    test('nvNode should return a narrow view node.', () => {
        "use strict";

        expect(cell.nvNode).toEqual(cell.nNode);

    });

    test('addColumn should add column to itself and to its parent.', () => {
        "use strict";

        let column = new t.View.Column();
        column.addonProperty = 'test';
        cell.addColumn(column);

        // Event listener should be called twice
        expect(cell.columns).toEqual([column]);
        expect(cell.parent.columns).toEqual([column]);

        // Remove column after the test
        cell.columns = [];

    });

    test('changeSpan should change a width of its cell.', () => {
        "use strict";

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

    test('columnStateChange should initiate a span change on itself and on parent.', () => {
        "use strict";

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

    test('highlight should add a "highlight" to both wide and narrow nodes of the cell itself and its parent, but not its children.', () => {
        "use strict";

        cell.highlight();

        expect(cell.wNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();
        expect(cell.nNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();
        expect(cell.parent.wNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();
        expect(cell.parent.nNode.classList.contains(t.Styles.classNames.highlight)).toBeTruthy();
        expect(cell.children[0].wNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();
        expect(cell.children[0].nNode.classList.contains(t.Styles.classNames.highlight)).toBeFalsy();

    });

    test('clearHighlighting should remove a "highlight" from both wide and narrow nodes of the cell itself and its parent.', () => {
        "use strict";

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
    "use strict";

    let groupingFeature, noMatchCell, emptyCell, suffixMatchCell, headerCell, span, title,
        noMatchColumn, emptyColumn, suffixMatchColumn;

    beforeAll(() => {

        title = "Header title";
        span = 2;
        groupingFeature = new t.View.GroupingFeature(
            t.types.gender,
            ['masculine', 'feminine', 'neuter'],
            t.languages.latin,
            'Gender')
            .setColumnGroupType()
            .setColumnGroupTitleLocation();
        headerCell = new t.View.HeaderCell(title, groupingFeature, span);

        let emptyMatchData = new t.MatchData();
        let suffixMatchData = new t.MatchData();
        suffixMatchData.suffixMatch = true;
        noMatchCell = new t.View.Cell([
            new t.Suffix('endingOne', emptyMatchData),
            new t.Suffix('endingTwo', emptyMatchData)
        ]);
        emptyCell = new t.View.Cell();
        suffixMatchCell = new t.View.Cell([
            new t.Suffix('endingOne', emptyMatchData),
            new t.Suffix('endingTwo', suffixMatchData)
        ]);

        noMatchColumn = new t.View.Column([noMatchCell]);

        emptyColumn = new t.View.Column([emptyCell]);

        suffixMatchColumn = new t.View.Column([suffixMatchCell]);
    });

    test('Should be initialized properly.', () => {
        "use strict";

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

    test('headerCell should add a header cell to the column.', () => {
        "use strict";

        noMatchColumn.headerCell = headerCell;
        // Render is called in constructor so we don't need to call it explicitly
        expect(noMatchColumn._headerCell).toEqual(headerCell);
        expect(noMatchColumn._headerCell.columns).toContainEqual(noMatchColumn);

    });

    test('length should return a number of cells in a column.', () => {
        "use strict";

        expect(noMatchColumn.length).toBe(1);

    });

    test('hide should hide all cells in a column and notify a header cell about a state change.', () => {
        "use strict";

        noMatchColumn.hide();
        expect(noMatchColumn.hidden).toBeTruthy();

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
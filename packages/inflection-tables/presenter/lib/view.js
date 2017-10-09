import * as Lib from "../../lib/lib";
import * as Styles from "../styles/styles";
export {Cell, RowTitleCell, HeaderCell, Column, Row, GroupingFeature, GroupingFeatureList, View};

class Cell {
    /**
     * Creates a cell for an inflection table.
     * @param {Suffix[]} suffixes - A list of suffixes that belongs to this cell.
     * @param {Feature[]} features - A list of features this cell corresponds to.
     */
    constructor(suffixes, features) {
        this.suffixes = suffixes;
        if (!this.suffixes) {
            this.suffixes = [];
        }
        this.features = features;
        this.empty = (this.suffixes.length === 0);
        this.suffixMatches = !!this.suffixes.find(element => {
            if (element.match && element.match.suffixMatch) {
                return element.match.suffixMatch;
            }
        });

        this.column = undefined; // A column this cell belongs to
        this.row = undefined; // A row this cell belongs to

        this._index = undefined;

        this.render();
    }

    /**
     * Renders an element's HTML representation.
     */
    render() {
        let element = document.createElement('div');
        element.classList.add(Styles.classNames.cell);
        for (let [index, suffix] of this.suffixes.entries()) {
            // Render each suffix
            let suffixElement = document.createElement('a');
            suffixElement.classList.add(Styles.classNames.suffix);
            if (suffix.match && suffix.match.suffixMatch) {
                suffixElement.classList.add(Styles.classNames.suffixMatch);
            }
            if (suffix.match && suffix.match.fullMatch) {
                suffixElement.classList.add(Styles.classNames.suffixFullFeatureMatch);
            }
            let suffixValue = suffix.value? suffix.value: '-';
            if (suffix.footnote && suffix.footnote.length) {
                suffixValue += '[' + suffix.footnote + ']';
            }
            suffixElement.innerHTML = suffixValue;
            element.appendChild(suffixElement);
            if (index < this.suffixes.length - 1) {
                element.appendChild(document.createTextNode(',\u00A0'));
            }
        }
        this.wNode = element;
        this.nNode = element.cloneNode(true);
    }

    /**
     * Returns an HTML element for a wide view.
     * @returns {HTMLElement}
     */
    get wvNode() {
        return this.wNode;
    }

    /**
     * Returns an HTML element for a narrow view.
     * @returns {HTMLElement}
     */
    get nvNode() {
        return this.nNode;
    }

    /**
     * Sets a unique index of the cell that can be used for cell identification via 'data-index' attribute.
     * @param {number} index - A unique cell index.
     */
    set index(index) {
        this._index = index;
        this.wNode.dataset.index = this._index;
        this.nNode.dataset.index = this._index;
    }

    /**
     * A proxy for adding an event listener for both wide and narrow view HTML elements.
     * @param {string} type - Listener type.
     * @param {EventListener} listener - Event listener function.
     */
    addEventListener(type, listener) {
        this.wNode.addEventListener(type, listener);
        this.nNode.addEventListener(type, listener);
    }

    /**
     * Hides an element.
     */
    hide() {
        if (!this.wNode.classList.contains(Styles.classNames.hidden)) {
            this.wNode.classList.add(Styles.classNames.hidden);
            this.nNode.classList.add(Styles.classNames.hidden);
        }
    }

    /**
     * Shows a previously hidden element.
     */
    show() {
        if (this.wNode.classList.contains(Styles.classNames.hidden)) {
            this.wNode.classList.remove(Styles.classNames.hidden);
            this.nNode.classList.remove(Styles.classNames.hidden);
        }
    }

    /**
     * Highlights a cell with color.
     */
    highlight() {
        if (!this.wNode.classList.contains(Styles.classNames.highlight)) {
            this.wNode.classList.add(Styles.classNames.highlight);
            this.nNode.classList.add(Styles.classNames.highlight);
        }
    }

    /**
     * Removes highlighting from a previously highlighted cell.
     */
    clearHighlighting() {
        if (this.wNode.classList.contains(Styles.classNames.highlight)) {
            this.wNode.classList.remove(Styles.classNames.highlight);
            this.nNode.classList.remove(Styles.classNames.highlight);
        }
    }

    /**
     * Highlights a row and a column this cell belongs to.
     */
    highlightRowAndColumn() {
        if (!this.column) {
            throw new Error('Column is undefined.');
        }
        if (!this.row) {
            throw new Error('Row is undefined.');
        }
        this.column.highlight();
        this.row.highlight();
    }

    /**
     * Removes highlighting form a previously highlighted row and column.
     */
    clearRowAndColumnHighlighting() {
        if (!this.column) {
            throw new Error('Column is undefined.');
        }
        if (!this.row) {
            throw new Error('Row is undefined.');
        }
        this.column.clearHighlighting();
        this.row.clearHighlighting();
    }
}

/**
 * A cell that specifies a title for a row in an inflection table.
 */
class RowTitleCell {

    /**
     * Initializes a row title cell.
     * @param {string} title - A text that will be shown within the cell.
     * @param {GroupingFeature} groupingFeature - A grouping feature that specifies a row for which a title cell
     * is created.
     * @param {number} nvGroupQty - A number of narrow view groups. Because each group will be shown separately
     * and will have its own title cells, we need to create a copy of a title cell for each such group.
     */
    constructor(title, groupingFeature, nvGroupQty) {
        this.parent = undefined;
        this.title = title;
        this.feature = groupingFeature;
        this.nvGroupQty = nvGroupQty;

        this.render();
    }

    /**
     * Renders an element's HTML representation.
     */
    render() {
        // Generate HTML representation for a wide view node
        this.wNode = document.createElement('div');
        this.wNode.classList.add(Styles.classNames.cell);
        if (this.feature.isColumnGroup) {
            this.wNode.classList.add(Styles.classNames.header);
        }
        if (this.feature.isRowGroup && this.feature.isGroupTitleInRow) {
            // This cell is taking entire row
            this.wNode.classList.add(Styles.classNames.fullWidth);
        }
        if (this.feature.isColumnGroup && this.feature.groupingFeatureList.titleColumnsQuantity > 1) {
            this.wNode.classList.add(Styles.classNames.widthPrefix + this.feature.groupingFeatureList.titleColumnsQuantity);
        }
        this.wNode.innerHTML = this.title;

        // Copy HTML representation to all narrow view nodes (each narrow view group has its own node)
        this.nNodes = []; // Narrow nodes, one for each group
        for (let i = 0; i < this.nvGroupQty; i++) {
            this.nNodes.push(this.wNode.cloneNode(true));
        }
    }

    /**
     * Returns an HTML element for a wide view
     * @returns {HTMLElement} HTML element for a wide view's cell.
     */
    get wvNode() {
        return this.wNode;
    }

    /**
     * Returns an array HTML element for narrow view groups
     * @returns {HTMLElement[]} Array of HTML elements for narrow view group's cells.
     */
    getNvNode(index) {
        return this.nNodes[index];
    }

    /**
     * Generates an empty cell placeholder of a certain width. Useful for situation when empty title cells need to be
     * inserted into a table structure (i.e. when title cells occupy multiple columns.
     * @param {number} width - A number of columns placeholder cell will occupy.
     * @returns {HTMLElement} HTML element of a placeholder cell.
     */
    static placeholder(width = 1) {
        let placeholder = document.createElement('div');
        placeholder.classList.add(Styles.classNames.cell, Styles.classNames.widthPrefix + width);
        return placeholder;
    }

    /**
     * Some table layouts require multiple title cells to be shown for a row. These could be, for example, a title
     * cell for a parent category that will follow a title cell for a category that defines a row. In such situation a
     * title cell will have a parent, which will represent a parent cell object.
     * This function returns an array of title cells for a row, starting from the topmost parent and moving down
     * tot the current title cell.
     * @returns {RowTitleCell[]} An array of title row cells representing a title cell hierarchy list.
     */
    get hierarchyList() {
        let parentCells = [];
        if (this.parent) {
            parentCells = this.parent.hierarchyList;
        }
        return parentCells.concat(this);
    }

    /**
     * Highlights this row title cell
     */
    highlight() {
        this.wNode.classList.add(Styles.classNames.highlight);
        for (let nNode of this.nNodes) {
            nNode.classList.add(Styles.classNames.highlight);
        }
    }

    /**
     * Removes highlighting from this row title cell
     */
    clearHighlighting() {
        this.wNode.classList.remove(Styles.classNames.highlight);
        for (let nNode of this.nNodes) {
            nNode.classList.remove(Styles.classNames.highlight);
        }
    }
}

/**
 * A cell in a header row, a column title cell.
 */
class HeaderCell {
    /**
     * Initializes a header cell.
     * @param {string} title - A title text that will be shown in the header cell.
     * @param {GroupingFeature} groupingFeature - A feature that defines one or several columns this header forms.
     * @param {number} [span=1] - How many columns in a table this header cell forms.
     */
    constructor(title, groupingFeature, span = 1) {
        this.feature = groupingFeature;
        this.title = title;
        this.span = span;

        this.parent = undefined;
        this.children = [];
        this.columns = [];

        this.render();
    }

    /**
     * Renders an element's HTML representation.
     */
    render() {
        let element = document.createElement('div');
        element.classList.add(Styles.classNames.cell, Styles.classNames.header, Styles.classNames.widthPrefix + this.span);
        element.innerHTML = this.title;
        this.wNode = element;
        this.nNode = element.cloneNode(true);
    }

    /**
     * Returns an HTML element for a wide view
     * @returns {HTMLElement} HTML element for a wide view's cell.
     */
    get wvNode() {
        return this.wNode;
    }

    /**
     * Returns an HTML element for a narrow view
     * @returns {HTMLElement} HTML element for a narrow view's cell.
     */
    get nvNode() {
        return this.nNode;
    }

    /**
     * Registers a column that's being formed by this header cell. Adds column to itself and to its parent(s).
     * @param {Column} column - A column that is formed by this header cell.
     */
    addColumn(column) {
        this.columns = this.columns.concat([column]);

        if (this.parent) {
            this.parent.addColumn(column);
        }
    }

    /**
     * Temporary changes a width of a header cell. This happens when one or several columns
     * that this header forms are hidden or shown.
     * @param value
     */
    changeSpan(value) {
        let currentWidthClass = Styles.classNames.widthPrefix + this.span;
        this.span += value;
        let newWidthClass = Styles.classNames.widthPrefix + this.span;
        this.wNode.classList.replace(currentWidthClass, newWidthClass);
        this.nNode.classList.replace(currentWidthClass, newWidthClass);
    }

    /**
     * This function will notify all parents and children of a title column that some columns under this headers cell
     * changed their state (i.e. were hidden or shown). This way parents and children will be able to update their
     * states accordingly.
     */
    columnStateChange() {
        let visibleColumns = 0;
        for (let column of this.columns) {
            if (!column.hidden) {
                visibleColumns++;
            }
        }
        if (this.span !== visibleColumns) {
            // Number of visible columns has been changed
            let change = visibleColumns - this.span;
            this.changeSpan(change);

            // Notify parents and children
            if (this.children.length) {
                for (let child of this.children) {
                    child.columnStateChange();
                }
            }
            if (this.parent) {
                this.parent.columnStateChange();
            }
        }
    }

    /**
     * Highlights a header cell, its parent and children
     */
    highlight() {
        if (!this.wNode.classList.contains(Styles.classNames.highlight)) {
            this.wNode.classList.add(Styles.classNames.highlight);
            this.nNode.classList.add(Styles.classNames.highlight);

            if (this.parent) {
                this.parent.highlight();
            }
        }
    }

    /**
     * Removes highlighting from a header cell, its parent and children
     */
    clearHighlighting() {
        if (this.wNode.classList.contains(Styles.classNames.highlight)) {
            this.wNode.classList.remove(Styles.classNames.highlight);
            this.nNode.classList.remove(Styles.classNames.highlight);

            if (this.parent) {
                this.parent.clearHighlighting();
            }
        }
    }
}

/**
 * Represent a column of cells in an inflection table.
 */
class Column {

    /**
     * Initializes column with a provided set of cells.
     * @param {Cell} cells - Cells that are within this column.
     */
    constructor(cells) {
        this.cells = cells;
        if (!cells) {
            this.cells = [];
        }
        this._headerCell = undefined;
        this.hidden = false;
        this.empty = this.cells.every(cell => cell.empty);
        this.suffixMatches = !!this.cells.find(cell => cell.suffixMatches);
        
        for (let cell of this.cells) {
            cell.column = this;
        }
    }

    /**
     * Assigns a header cell to the column.
     * @param {HeaderCell} headerCell - A header cell of this column.
     */
    set headerCell(headerCell) {
        this._headerCell = headerCell;
        headerCell.addColumn(this);
    }

    /**
     * Returns a number of cells within this column.
     * @returns {Number} A number of cells this column contains.
     */
    get length() {
        return this.cells.length;
    }

    /**
     * Hides the column. Notifies a header about a state change.
     */
    hide() {
        if (!this.hidden) {
            this.hidden = true;

            for (let cell of this.cells) {
                cell.hide();
            }
            this._headerCell.columnStateChange();
        }
    }

    /**
     * Shows the column. Notifies a header about a state change.
     */
    show() {
        if (this.hidden) {
            this.hidden = false;

            for (let cell of this.cells) {
                cell.show();
            }
            this._headerCell.columnStateChange();
        }
    }

    /**
     * Highlights a column and its header.
     */
    highlight() {
        for (let cell of this.cells) {
            cell.highlight();
        }
        this._headerCell.highlight();
    }

    /**
     * Removes highlighting from a column and its header.
     */
    clearHighlighting() {
        for (let cell of this.cells) {
            cell.clearHighlighting();
        }
        this._headerCell.clearHighlighting();
    }
}

class Row {
    constructor(cells) {
        if (!cells) {
            cells = [];
        }
        this.cells = cells;
        this.titleCell = undefined;

        for (let cell of this.cells) {
            cell.row = this;
        }
    }

    add(cell) {
        cell.row = this;
        this.cells.push(cell);
    }

    get length() {
        return this.cells.length;
    }

    highlight() {
        for (let cell of this.cells) {
            cell.highlight();
        }
        if (this.titleCell) {
            this.titleCell.highlight();
        }
    }

    clearHighlighting() {
        for (let cell of this.cells) {
            cell.clearHighlighting();
        }
        if (this.titleCell) {
            this.titleCell.clearHighlighting();
        }
    }
}

class GroupingFeature {
    constructor(type, values, language, titleMessageID) {
        this._feature = new Lib.FeatureType(type, values, language);

        this.groupTitle = titleMessageID;
        this._groupType = undefined;
        this._titleLocation = undefined;

        this.groupingFeatureList = undefined;
        return this;
    }

    clone() {
        let clone = new GroupingFeature(this._feature.type, this._feature.orderIndex, this._feature.language);
        clone._groupType = this._groupType;
        clone.groupTitle = this.groupTitle;
        clone._titleLocation = this._titleLocation;
        return clone;
    }

    get feature() {
        return this._feature;
    }

    get type() {
        return this._feature.type;
    }

    get isColumnGroup() {
        return this._groupType === 'column';
    }

    get isRowGroup() {
        return this._groupType === 'row';
    }

    setColumnGroupType() {
        this._groupType = 'column';
        return this;
    }

    setRowGroupType() {
        this._groupType = 'row';
        return this;
    }

    get isTitleInColumn() {
        return this._titleLocation === 'column';
    }

    setColumnGroupTitleLocation() {
        this._titleLocation = 'column';
        return this;
    }

    setRowGroupTitleLocation() {
        this._titleLocation = 'row';
        return this;
    }

    get isGroupTitleInRow() {
        return this._titleLocation === 'row';
    }

    get size() {
        return this._feature.orderIndex.length;
    }

    get orderIndex() {
        return this._feature.orderIndex;
    }

    get orderValues() {
        let values = [];
        for (let value of this._feature.orderValues) {
            // Modify some properties here
            values.push(value);
        }
        return values;
    }

    isSameType(groupingFeature) {
        return this._feature.type === groupingFeature.feature.type;
    }

    createTitleCell(text, nvGroupSize) {
        return new RowTitleCell(text, this, nvGroupSize);
    }
}

class GroupingFeatureList {
    constructor(features) {
        this._features = features;
        this._columnFeatures = [];
        this._rowFeatures = [];

        for (let feature of features) {
            feature.groupingFeatureList = this;
        }

        for (let feature of features) {
            if (feature.isColumnGroup) {
                this._columnFeatures.push(feature);
            }
            if (feature.isRowGroup) {
                this._rowFeatures.push(feature);
            }
        }

        for (let feature of features) {
            if (feature.isColumnGroup) {
                this.firstColumnFeature = feature;
                break;
            }
        }

        for (let feature of features) {
            if (feature.isColumnGroup) {
                this.lastColumnFeature = feature;
            }
        }

        for (let feature of features) {
            if (feature.isRowGroup) {
                this.firstRowFeature = feature;
                break;
            }
        }
        for (let feature of features) {
            if (feature.isRowGroup) {
                this.lastRowFeature = feature;
            }
        }

        this.titleColumnsQuantity = 0;
        for (let feature of features) {
            if (feature.isTitleInColumn) {
                this.titleColumnsQuantity++;
            }
        }
    }

    get items() {
        return this._features;
    }

    get columnFeatures() {
        return this._columnFeatures;
    }

    get rowFeatures() {
        return this._rowFeatures;
    }

    get length() {
        return this._features.length;
    }
}

class FeatureGroup {
    constructor() {
        this.subgroups = []; // Each value of the feature
        this.cells = []; // All cells within this group and below
        this.parent = undefined;
        this.header = undefined;
    }

    /*hide() {
        for (let element of this.elements) {
            element.node.style.background = 'red';
        }
    }*/
}

class Table {
    constructor(suffixes, rowTitleColumnsQty, groupingFeatures, messages) {
        this.suffixes = suffixes;
        this.features = new GroupingFeatureList(groupingFeatures);

        this.cells = [];
        this.columns = [];
        this.rows = [];

        this.headers = [];

        this.rowTitleColumnsQty = rowTitleColumnsQty;
        this.messages = messages;

        this.emptyColumnsHidden = false;
        this.suffixMatchesHidden = false;

        // Tree contains elements grouped by features according to groupingFeatures order
        //this.tree = new Tree();

        // Holds all cell node HTML children
        this.docFragment = document.createDocumentFragment();



        this.titleCells = {};

        // Temporary wrapper to hold cell's generated HTML
        this.cellWrapper = document.createElement('div');

        this.tree = this.groupByFeature(this.suffixes);

        // Additional cell initialization
        for (let [index, cell] of this.cells.entries()) {
            // Store index value to reference back to the cell
            cell.index = index;
        }

        this.headers = this.constructHeaders();

        // Construct columns
        this.columns = this.constructColumns();
        for (let [index, column] of this.columns.entries()) {
            column.headerCell = this.headers[this.headers.length-1].cells[index];
        }

        // Construct rows
        this.columnNum = this.columns.length;
        this.rowNum = this.columns[0].length;
        for (let rowIndex = 0; rowIndex < this.rowNum; rowIndex++) {
            this.rows[rowIndex] = new Row();
            this.rows[rowIndex].titleCell = this.columns[0].cells[rowIndex].titleCell;
            for (let columnIndex = 0; columnIndex < this.columnNum; columnIndex++) {
                this.rows[rowIndex].add(this.columns[columnIndex].cells[rowIndex]);
            }
        }

        this.wideView = {
            nodes: document.createElement('div')
        };
        this.wideView.nodes.classList.add('infl-table', 'wide');

        this.narrowView = {
            groups: [],
            groupNum: this.features.firstColumnFeature.size,
            groupSize: this.columns.length / this.features.firstColumnFeature.size, // Default group size
            nodes: document.createElement('div')
        };
        this.narrowView.nodes.classList.add('narrow-view-container');
        for (let i = 0; i < this.narrowView.groupNum; i++) {
            this.narrowView.groups.push({
                groupSize: this.narrowView.groupSize, // Default group size
                nodes: document.createElement('div')
            });
            this.narrowView.groups[i].nodes.classList.add('infl-table', 'narrow');
            this.narrowView.nodes.appendChild(this.narrowView.groups[i].nodes);
        }
    }

    select(features) {
        let group = new FeatureGroup();
        group.elements = this.tree.elements.filter(element => {
            for (let feature of features) {
                let found = false;
                for (let elementFeature of element.features) {
                    if (elementFeature.isEqual(feature)) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    return false;
                }
            }
            return true;
        });
        return group;
    }

    /**
     * Returns true if an ending grammatical feature defined by featureType has value that is listed in featureValues array.
     * This function is for use with Array.prototype.filter().
     * @param {FeatureType} featureType - a grammatical feature type we need to filter on
     * @param {Feature[]} featureValues - a list of possible values of a type specified by featureType that
     * this ending should have
     * @param {Suffix} suffix - an ending we need to filter out
     * @returns {boolean}
     */
    static filter(featureType, featureValues, suffix) {
        "use strict";

        // If not an array, convert it to array for uniformity
        if (!Array.isArray(featureValues)) {
            featureValues = [featureValues];
        }
        for (const value of featureValues) {
            if (suffix.features[featureType] === value) {
                return true;
            }
        }

        return false;
    };

    /**
     * This function provide a view-specific logic that is used to merge two suffixes together when they are combined.
     * @param {Suffix} suffixA - A first of two suffixes to merge (to be returned).
     * @param {Suffix} suffixB - A second ending to merge (to be discarded).
     * @returns {Suffix} A modified value of ending A.
     */
    static merge(suffixA, suffixB) {
        let commonGroups = Lib.Suffix.getCommonGroups([suffixA, suffixB]);
        for (let type of commonGroups) {
            // Combine values using a comma separator. Can do anything else if we need to.
            suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type];
        }
        return suffixA;
    };

    groupByFeature(suffixes, featureTrail = [], currentLevel = 0) {
        let group = new FeatureGroup();
        group.feature = this.features.items[currentLevel];

        // Iterate over each value of the feature
        for (const featureValue of group.feature.orderValues) {
            if (featureTrail.length>0 && featureTrail[featureTrail.length-1].type === group.feature.type) {
                // Remove previously inserted feature of the same type
                featureTrail.pop();
            }
            featureTrail.push(featureValue);

            // Suffixes that are selected for current combination of feature values
            let selectedSuffixes = suffixes.filter(Table.filter.bind(this, group.feature.type, featureValue.value));

            if (currentLevel < this.features.length - 1) {
                // Divide to further groups
                let subGroup = this.groupByFeature(selectedSuffixes, featureTrail, currentLevel + 1);
                group.subgroups.push(subGroup);
                group.cells = group.cells.concat(subGroup.cells);
            }
            else {
                // This is the last level. This represent a cell with suffixes
                // Split result has a list of suffixes in a table cell. We can now combine duplicated items if we want
                if (selectedSuffixes.length > 0) {
                    selectedSuffixes = Lib.Suffix.combine(selectedSuffixes, Table.merge);
                }

                let cell = new Cell(selectedSuffixes, featureTrail.slice());
                group.subgroups.push(cell);
                group.cells.push(cell);
                this.cells.push(cell);
            }
        }
        featureTrail.pop();
        return group;
    }

    constructColumns(tree = this.tree, columns = [], currentLevel = 0) {
        let currentFeature = this.features.items[currentLevel];

        let groups = [];
        for (let [index, featureValue] of currentFeature.orderIndex.entries()) {
            let cellGroup = tree.subgroups[index];

            // Iterate until it is the last row feature
            if (!currentFeature.isSameType(this.features.lastRowFeature)) {
                let currentResult = this.constructColumns(cellGroup, columns, currentLevel + 1);
                if (currentFeature.isRowGroup) {
                    // TODO: Avoid creating extra cells


                    let group = {
                        titleText: featureValue,
                        groups: currentResult,
                        titleCell: currentFeature.createTitleCell(featureValue, this.features.firstColumnFeature.size)
                    };
                    group.groups[0].titleCell.parent = group.titleCell;
                    groups.push(group);
                }
                else if (currentFeature.isSameType(this.features.lastColumnFeature)) {
                    let column = new Column(cellGroup.cells);
                    column.groups = currentResult;
                    column.header = featureValue;
                    columns.push(column);
                }
            }
            else {
                // Last level
                cellGroup.titleCell = currentFeature.createTitleCell(featureValue, this.features.firstColumnFeature.size);
                let group = {
                    titleText: featureValue,
                    cell: cellGroup,
                    titleCell: cellGroup.titleCell
                };
                groups.push(group);
            }
        }
        if (currentFeature.isRowGroup) {
            return groups;
        }
        return columns;
    }

    constructHeaders(tree = this.tree, tableHeaders = [], currentLevel = 0) {
        let currentFeature = this.features.columnFeatures[currentLevel];

        let cells = [];
        for (let [index, featureValue] of currentFeature.orderIndex.entries()) {
            let cellGroup = tree.subgroups[index];

            // Iterate over all column features (features that form columns)
            if (currentLevel < this.features.columnFeatures.length - 1) {
                let subCells = this.constructHeaders(cellGroup, tableHeaders, currentLevel + 1);


                let columnSpan = 0;
                for (let cell of subCells) {
                    columnSpan += cell.span;
                }


                let headerCell = new HeaderCell(featureValue, currentFeature, columnSpan);
                headerCell.children = subCells;
                for (let cell of subCells) {
                    cell.parent = headerCell;
                }

                if (!tableHeaders[currentLevel]) {
                    tableHeaders[currentLevel] = new Row();
                }
                tableHeaders[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size);

                tableHeaders[currentLevel].add(headerCell);
                cells.push(headerCell);
            }
            else {
                // Last level
                let headerCell = new HeaderCell(featureValue, currentFeature);

                if (!tableHeaders[currentLevel]) {
                    tableHeaders[currentLevel] = new Row();
                }

                tableHeaders[currentLevel].add(headerCell);
                tableHeaders[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size);
                cells.push(headerCell);
            }
        }
        if (currentLevel === 0) {
            return tableHeaders;
        }
        else {
            return cells;
        }
    }

    renderViews() {

        // Regular (wide) view
        // Clean any previously inserted nodes
        this.wideView.nodes.innerHTML = '';

        // Calculate a number of visible columns
        let colNum = 0;
        let firstRow = this.rows[0];
        for (let cell of firstRow.cells) {
            if (!cell.column.hidden) {
                colNum++;
            }
        }


        for (let row of this.headers) {
            this.wideView.nodes.appendChild(row.titleCell.wvNode);
            for (let cell of row.cells) {
                this.wideView.nodes.appendChild(cell.wvNode);
            }
        }

        for (let row of this.rows) {
            let titleCells = row.titleCell.hierarchyList;
            if (titleCells.length < this.features.titleColumnsQuantity) {
                this.wideView.nodes.appendChild(RowTitleCell.placeholder(this.features.titleColumnsQuantity - titleCells.length));
            }
            for (let titleCell of titleCells) {
                this.wideView.nodes.appendChild(titleCell.wvNode);
            }

            for (let cell of row.cells) {
                this.wideView.nodes.appendChild(cell.wvNode);
            }
        }
        this.wideView.nodes.style.gridTemplateColumns = 'repeat(' + (colNum + this.features.titleColumnsQuantity) + ', 1fr)';


        // Narrow view
        for (let [groupIndex, group] of this.narrowView.groups.entries()) {
            // Clean any previously inserted nodes
            group.nodes.innerHTML = '';

            // Calculate a number of visible columns
            let colNum = 0;
            let firstRow = this.rows[0];
            for (let i = groupIndex * this.narrowView.groupSize; i < ((groupIndex + 1) * this.narrowView.groupSize); i++) {
                if (!firstRow.cells[i].column.hidden) {
                    colNum++;
                }
            }

            if (colNum) {
                // This group is visible
                for (let row of this.headers) {
                    group.nodes.appendChild(row.titleCell.getNvNode(groupIndex));
                    let headerCellNum = row.cells.length / this.narrowView.groupNum;
                    for (let i = groupIndex * headerCellNum; i < (groupIndex + 1) * headerCellNum; i++) {
                        group.nodes.appendChild(row.cells[i].nvNode);
                    }
                }

                for (let row of this.rows) {
                    let titleCells = row.titleCell.hierarchyList;
                    if (titleCells.length < this.features.titleColumnsQuantity) {
                        group.nodes.appendChild(RowTitleCell.placeholder(this.features.titleColumnsQuantity - titleCells.length));
                    }
                    for (let titleCell of titleCells) {
                        group.nodes.appendChild(titleCell.getNvNode(groupIndex));
                    }

                    for (let i = groupIndex * this.narrowView.groupSize; i < (groupIndex + 1) * this.narrowView.groupSize; i++) {
                        group.nodes.appendChild(row.cells[i].nvNode);
                    }
                }
                group.nodes.classList.remove(Styles.classNames.hidden);
                group.nodes.style.gridTemplateColumns = 'repeat(' + (colNum + this.features.titleColumnsQuantity) + ', 100px)';
                group.nodes.style.width = (colNum + this.features.titleColumnsQuantity) * 100 + 'px';
            }
            else {
                // This group is hidden
                group.nodes.classList.add(Styles.classNames.hidden);
            }


        }

        for (let cell of this.cells) {
            cell.addEventListener('mouseenter', this.highlightRowAndColumn.bind(this));
            cell.addEventListener('mouseleave', this.removeRowAndColumnHighlighting.bind(this));
        }
    }

    highlightRowAndColumn(event) {
        let index = event.currentTarget.dataset.index;
        this.cells[index].highlightRowAndColumn();
    }

    removeRowAndColumnHighlighting(event) {
        let index = event.currentTarget.dataset.index;
        this.cells[index].clearRowAndColumnHighlighting();
    }

    hideEmptyColumns() {
        for (let column of this.columns) {
            if (column.empty) {
                column.hide();
            }
        }
        this.emptyColumnsHidden = true;
    }

    showEmptyColumns() {
        for (let column of this.columns) {
            if (column.hidden) {
                column.show();
            }
        }
        this.emptyColumnsHidden = false;
    }

    hideNoSuffixGroups() {
        for (let headerCell of this.headers[0].cells) {
            let matches = !!headerCell.columns.find(column => column.suffixMatches);
            if (!matches) {
                for (let column of headerCell.columns) {
                    column.hide();
                }
            }
        }
        this.suffixMatchesHidden = true;
    }

    showNoSuffixGroups() {
        for (let column of this.columns) {
            column.show();
        }
        if (this.emptyColumnsHidden) {
            this.hideEmptyColumns();
        }
        this.suffixMatchesHidden = false;
    }
}

class Footnotes {
    constructor(footnotes) {
        this.footnotes = footnotes;

        this.nodes = document.createElement('dl');
        this.nodes.id = "inlection-table-footer";
        this.nodes.classList.add(Styles.classNames.footnotesContainer);
        for (let footnote of footnotes) {
            let index = document.createElement('dt');
            index.innerHTML = footnote.index;
            this.nodes.appendChild(index);
            let text = document.createElement('dd');
            text.innerHTML = footnote.text;
            this.nodes.appendChild(text);
        }
    }

    get html() {
        return this.nodes;
    }
}

class View {

    constructor(viewOptions) {

        this.options = viewOptions;
        this.pageHeader = {};
        this.table = {};

        // An HTML element where this view is rendered
        this.container = undefined;
    }

    get partOfSpeech() {
        return this.options.partOfSpeech;
    }

    get id() {
        return this.options.id;
    }

    /**
     * Converts a ResultSet, returned from inflection tables library, into an HTML representation of an inflection table.
     * @param {ResultSet} resultSet - A result set from inflection tables library.
     * @returns {string} HTML code representing an inflection table.
     */
    render(container, resultSet, messages) {
        "use strict";

        this.messages = messages;
        this.container = container;
        this.resultSet = resultSet;
        let selection = resultSet[this.options.partOfSpeech];

        this.footnotes = new Footnotes(selection.footnotes);

        this.table = new Table(selection.suffixes, this.rowTitleColumnsQty, this.options.groupingFeatures, messages);
        this.display();
    }

    display() {

        this.table.renderViews();
        // Clear the container
        this.container.innerHTML = '';

        let word = document.createElement('h2');
        word.innerHTML = this.resultSet.word;
        this.container.appendChild(word);

        let title = document.createElement('h3');
        title.innerHTML = this.options.title;
        this.container.appendChild(title);

        this.pageHeader = document.createElement('div');
        this.pageHeader.innerHTML = `
        <button id="hide-empty-columns" class="switch-btn">Hide empty columns</button><button id="show-empty-columns" class="switch-btn hidden">Show empty columns</button>
        <button id="hide-no-suffix-groups" class="switch-btn">Hide top-level groups with no suffix matches</button><button id="show-no-suffix-groups" class="switch-btn hidden">Show top-level groups with no suffix matches</button><br>
        <p>Hover over the suffix to see its grammar features</p>
        `;
        this.container.appendChild(this.pageHeader);


        // Insert a wide view
        this.container.appendChild(this.table.wideView.nodes);
        // Insert narrow views
        this.container.appendChild(this.table.narrowView.nodes);

        this.container.appendChild(this.footnotes.html);

        this.pageHeader.querySelector('#hide-empty-columns').addEventListener('click', this.hideEmptyColumns.bind(this));
        this.pageHeader.querySelector('#show-empty-columns').addEventListener('click', this.showEmptyColumns.bind(this));

        this.pageHeader.querySelector('#hide-no-suffix-groups').addEventListener('click', this.hideNoSuffixGroups.bind(this));
        this.pageHeader.querySelector('#show-no-suffix-groups').addEventListener('click', this.showNoSuffixGroups.bind(this));
    }


    hideEmptyColumns() {
        this.table.hideEmptyColumns();
        this.display();
        this.pageHeader.querySelector('#hide-empty-columns').classList.add(Styles.classNames.hidden);
        this.pageHeader.querySelector('#show-empty-columns').classList.remove(Styles.classNames.hidden);
    }

    showEmptyColumns() {
        this.table.showEmptyColumns();
        this.display();
        this.pageHeader.querySelector('#show-empty-columns').classList.add(Styles.classNames.hidden);
        this.pageHeader.querySelector('#hide-empty-columns').classList.remove(Styles.classNames.hidden);
    }

    hideNoSuffixGroups() {
        this.table.hideNoSuffixGroups();
        this.display();
        this.pageHeader.querySelector('#hide-no-suffix-groups').classList.add(Styles.classNames.hidden);
        this.pageHeader.querySelector('#show-no-suffix-groups').classList.remove(Styles.classNames.hidden);
    }

    showNoSuffixGroups() {
        this.table.showNoSuffixGroups();
        this.display();
        this.pageHeader.querySelector('#show-no-suffix-groups').classList.add(Styles.classNames.hidden);
        this.pageHeader.querySelector('#hide-no-suffix-groups').classList.remove(Styles.classNames.hidden);
    }
}
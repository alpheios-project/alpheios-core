import * as Lib from "../../lib/lib.js";
import Handlebars from "../support/handlebars-4.0.10/handlebars-v4.0.10";  // CommonJS module
export {GroupingFeature, View};

let widthClassBase = 'infl-cell--sp';
let highlightClass = 'infl-cell--hl';
let classHidden = 'hidden';

/**
 * Returns true if an ending grammatical feature defined by featureType has value that is listed in featureValues array.
 * This function is for use with Array.prototype.filter().
 * @param {FeatureType} featureType - a grammatical feature type we need to filter on
 * @param {Feature[]} featureValues - a list of possible values of a type specified by featureType that
 * this ending should have
 * @param {Suffix} suffix - an ending we need to filter out
 * @returns {boolean}
 */
let filter = function(featureType, featureValues, suffix) {
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
let merge = function(suffixA, suffixB) {
    let commonGroups = Lib.Suffix.getCommonGroups([suffixA, suffixB]);
    for (let type of commonGroups) {
        // Combine values using a comma separator. Can do anything else if we need to.
        suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type];
    }
    return suffixA;
};

class Cell {
    constructor() {
        this.wNode = undefined; // A wide view node
        this.nNode = undefined; // A narrow view node

        this.empty = false;
        this.suffixMatches = false;

        this.column = undefined; // A column this cell belongs to
        this.row = undefined; // A row this cell belongs to

        this.zeroWidthClass = widthClassBase + 0;
        this.initialWidthClass = widthClassBase + 1;

        this._index = undefined;
    }

    set node(node) {
        this.wNode = node;
        this.nNode = node.cloneNode(true);
    }

    get wvNode() {
        return this.wNode;
    }

    get nvNode() {
        return this.nNode;
    }

    set index(index) {
        this._index = index;
        this.wNode.dataset.index = this._index;
        this.nNode.dataset.index = this._index;
    }

    addEventListener(type, listener) {
        this.wNode.addEventListener(type, listener);
        this.nNode.addEventListener(type, listener);
    }

    hide() {
        this.wNode.classList.replace(this.initialWidthClass, this.zeroWidthClass);
        this.nNode.classList.replace(this.initialWidthClass, this.zeroWidthClass);
    }

    show() {
        this.wNode.classList.replace(this.zeroWidthClass, this.initialWidthClass);
        this.nNode.classList.replace(this.zeroWidthClass, this.initialWidthClass);
    }

    highlight() {
        this.wNode.classList.add(highlightClass);
        this.nNode.classList.add(highlightClass);
    }

    clearHighlighting() {
        this.wNode.classList.remove(highlightClass);
        this.nNode.classList.remove(highlightClass);
    }

    highlightRowAndColumn() {
        this.column.highlight();
        this.row.highlight();
    }

    clearRowAndColumnHighlighting() {
        this.column.clearHighlighting();
        this.row.clearHighlighting();
    }
}

class TitleCell {
    constructor(node, nvGroupSize) {
        this.wNode = node; // A wide view node
        this.nvGroupSize = nvGroupSize;
        this.nNodes = []; // Narrow nodes, one for each group
        for (let i = 0; i < nvGroupSize; i++) {
            this.nNodes.push(node.cloneNode(true));
        }

        this.parent = undefined;

        this.zeroWidthClass = widthClassBase + 0;
        this.initialWidthClass = widthClassBase + 1;
    }

    get wvNode() {
        return this.wNode;
    }

    getNvNode(index) {
        return this.nNodes[index];
    }

    clone() {
        let clone = new TitleCell(this.nvGroupSize);
        //clone.node = this.node.cloneNode(true);
        if (this.parent) {
            clone.parent = this.parent.clone();
        }
        return clone;
    }

    hide() {
        this.wNode.classList.replace(this.initialWidthClass, this.zeroWidthClass);
        for (let nNode of this.nNodes) {
            nNode.classList.replace(this.initialWidthClass, this.zeroWidthClass);
        }
    }

    show() {
        this.wNode.classList.replace(this.zeroWidthClass, this.initialWidthClass);
        for (let nNode of this.nNodes) {
            nNode.classList.replace(this.initialWidthClass, this.zeroWidthClass);
        }
    }

    highlight() {
        this.wNode.classList.add(highlightClass);
        for (let nNode of this.nNodes) {
            nNode.classList.add(highlightClass);
        }
    }

    clearHighlighting() {
        this.wNode.classList.remove(highlightClass);
        for (let nNode of this.nNodes) {
            nNode.classList.remove(highlightClass);
        }
    }
}


class HeaderCell {
    constructor(span) {
        this.wNode = undefined; // A wide view node
        this.nNode = undefined; // A narrow view node

        this.parent = undefined;
        this.child = undefined;

        this.span = span;

        this.columns = [];
    }

    set node(node) {
        this.wNode = node;
        this.nNode = node.cloneNode(true);
    }

    get wvNode() {
        return this.wNode;
    }

    get nvNode() {
        return this.nNode;
    }

    addColumn(column) {
        this.columns = this.columns.concat([column]);

        if (this.parent) {
            this.parent.addColumn(column);
        }
    }

    changeSpan(value) {
        let currentWidthClass = widthClassBase + this.span;
        this.span += value;
        let newWidthClass = widthClassBase + this.span;
        this.wNode.classList.replace(currentWidthClass, newWidthClass);
        this.nNode.classList.replace(currentWidthClass, newWidthClass);

        if (this.parent) {
            this.parent.changeSpan(value);
        }
    }

    /**
     * Some columns were hidden or shown
     */
    columnStateChange() {
        let visibleColumns = 0;
        for (let column of this.columns) {
            if (!column.hidden) {
                visibleColumns++;
            }
        }
        if (this.span !== visibleColumns) {
            // Number of visible columns has changed
            let change = visibleColumns - this.span;
            this.changeSpan(change);
        }

        // Notify parents and children
        if (this.child) {
            this.child.columnStateChange();
        }
        if (this.parent) {
            this.parent.columnStateChange();
        }
    }

    highlight() {
        this.wNode.classList.add(highlightClass);
        this.nNode.classList.add(highlightClass);
        
        if (this.parent) {
            this.parent.highlight();
        }
    }
    
    clearHighlighting() {
        this.wNode.classList.remove(highlightClass);
        this.nNode.classList.remove(highlightClass);
        
        if (this.parent) {
            this.parent.clearHighlighting();
        }
    }
}

class FeatureGroup {
    constructor() {
        this.subgroups = []; // Each value of the feature
        this.cells = []; // All cells within this group and below
        this.parent = undefined;
        this.header = undefined;
    }

    hide() {
        for (let element of this.elements) {
            element.node.style.background = 'red';
        }
    }
}

class Column {
    constructor(cells) {
        if (!cells) {
            cells = [];
        }
        this.cells = cells;
        this._headerCell = undefined;
        this.hidden = false;
        this.isEmpty = this.cells.every(cell => cell.empty);
        this.suffixMatches = !!this.cells.find(cell => cell.suffixMatches);
        
        for (let cell of this.cells) {
            cell.column = this;
        }
    }

    set headerCell(headerCell) {
        this._headerCell = headerCell;
        headerCell.addColumn(this);
    }

    get length() {
        return this.cells.length;
    }

    hide() {
        this.hidden = true;

        for (let cell of this.cells) {
            cell.hide();
        }
        this._headerCell.columnStateChange();
    }

    show() {
        this.hidden = false;

        for (let cell of this.cells) {
            cell.show();
        }
        this._headerCell.columnStateChange();
    }

    highlight() {
        for (let cell of this.cells) {
            cell.highlight();
        }
        this._headerCell.highlight();
    }

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
    constructor(type, values, language) {
        this._feature = new Lib.FeatureType(type, values, language);
        this.isColumn = false;
        this.isRow = false;
    }

    clone() {
        let clone = new GroupingFeature(this._feature.type, this._feature.values, this._feature.language);
        clone.isColumn = this.isColumn;
        clone.isRow = this.isRow;
        return clone;
    }

    get feature() {
        return this._feature;
    }

    get type() {
        return this._feature.type;
    }

    setColumnGroupType() {
        this.isColumn = true;
        this.isRow = false;
    }

    setRowGroupType() {
        this.isColumn = false;
        this.isRow = true;
    }

    get(value) {
        let feature = this._feature.get(value);
        feature.isColumn = this.isColumn;
        feature.isRow = this.isRow;
        return feature;
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
}

class GroupingFeatures {
    constructor(features) {
        this._features = features;
        this._columnFeatures = [];
        this._rowFeatures = [];

        for (let feature of features) {
            if (feature.isColumn) {
                this._columnFeatures.push(feature);
            }
            if (feature.isRow) {
                this._rowFeatures.push(feature);
            }
        }

        for (let feature of features) {
            if (feature.isColumn) {
                this.firstColumnFeature = feature;
                break;
            }
        }

        for (let feature of features) {
            if (feature.isColumn) {
                this.lastColumnFeature = feature;
            }
        }

        for (let feature of features) {
            if (feature.isRow) {
                this.firstRowFeature = feature;
                break;
            }
        }
        for (let feature of features) {
            if (feature.isRow) {
                this.lastRowFeature = feature;
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

class Table {
    constructor(suffixes, groupingFeatures, headerCellTemplate, cellTemplate) {
        this.suffixes = suffixes;
        this.features = new GroupingFeatures(groupingFeatures);

        this.cells = [];
        this.columns = [];
        this.rows = [];

        this.headers = [];

        this.templates = {
            headerCell: headerCellTemplate,
            cell: cellTemplate
        };

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

        this.getHeaders();

        // Construct columns
        this.columns = this.getColumns();
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
            groupSize: this.columns.length / this.features.firstColumnFeature.size // Default group size
        };
        for (let i = 0; i < this.narrowView.groupNum; i++) {
            this.narrowView.groups.push({
                groupSize: this.narrowView.groupSize, // Default group size
                nodes: document.createElement('div')
            });
            this.narrowView.groups[i].nodes.classList.add('infl-table', 'narrow');
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
            let selectedSuffixes = suffixes.filter(filter.bind(this, group.feature.type, featureValue.value));

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
                    selectedSuffixes = Lib.Suffix.combine(selectedSuffixes, merge);
                }

                let cell = new Cell();
                cell.suffixes = selectedSuffixes;
                cell.features = featureTrail.slice();

                if (selectedSuffixes.length === 0) {
                    cell.empty = true;
                }

                cell.suffixMatches = !!selectedSuffixes.find(element => element.match.suffixMatch);

                // Render HTML
                this.cellWrapper.innerHTML = this.templates.cell(cell);
                let element = this.cellWrapper.childNodes[0];
                this.docFragment.appendChild(element);
                cell.node = element;

                group.subgroups.push(cell);
                group.cells.push(cell);
                this.cells.push(cell);
            }
        }
        featureTrail.pop();
        return group;
    }

    getColumns(tree = this.tree, columns = [], currentLevel = 0) {
        let currentFeature = this.features.items[currentLevel];

        let groups = [];
        for (let [index, featureValue] of currentFeature.orderIndex.entries()) {
            let cellGroup = tree.subgroups[index];

            // Iterate until the last row feature
            if (!currentFeature.isSameType(this.features.lastRowFeature)) {
                let currentResult = this.getColumns(cellGroup, columns, currentLevel + 1);
                if (currentFeature.isRow) {
                    // TODO: Avoid creating extra cells
                    let titleCellNode = document.createElement('div');
                    titleCellNode.classList.add(...currentFeature.groupTitleStyles);
                    titleCellNode.innerHTML = featureValue;
                    let titleCell = new TitleCell(titleCellNode, this.features.firstColumnFeature.size);

                    let group = {
                        titleText: featureValue,
                        groups: currentResult,
                        titleCell: titleCell
                    };
                    group.groups[0].titleCell.parent = titleCell;
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
                let titleCellNode = document.createElement('div');
                titleCellNode.classList.add(...currentFeature.groupTitleStyles);
                titleCellNode.innerHTML = featureValue;

                let titleCell = new TitleCell(titleCellNode, this.features.firstColumnFeature.size);
                cellGroup.titleCell = titleCell;
                let group = {
                    titleText: featureValue,
                    cell: cellGroup,
                    titleCell: titleCell
                };
                groups.push(group);
            }
        }
        if (currentFeature.isRow) {
            return groups;
        }
        return columns;
    }

    getHeaders(tree = this.tree, currentLevel = 0) {
        let currentFeature = this.features.columnFeatures[currentLevel];

        let cells = [];
        for (let [index, featureValue] of currentFeature.orderIndex.entries()) {
            let cellGroup = tree.subgroups[index];

            // Iterate until the last row feature
            if (currentLevel < this.features.columnFeatures.length - 1) {
                let subCells = this.getHeaders(cellGroup, currentLevel + 1);

                // Last level
                let columnSpan = 0;
                for (let cell of subCells) {
                    columnSpan += cell.span;
                }


                let headerCell = new HeaderCell(columnSpan);
                headerCell.feature = currentFeature;
                headerCell.value = featureValue;
                headerCell.titleText = currentFeature.groupTitle;

                this.cellWrapper.innerHTML = this.templates.headerCell(headerCell);
                let element = this.cellWrapper.childNodes[0];
                this.docFragment.appendChild(element);
                headerCell.node = element;

                headerCell.children = subCells;
                for (let cell of subCells) {
                    cell.parent = headerCell;
                }

                let titleCellNode = document.createElement('div');
                titleCellNode.classList.add(...currentFeature.groupTitleStyles);
                titleCellNode.innerHTML = currentFeature.groupTitle;
                let titleCell = new TitleCell(titleCellNode, this.features.firstColumnFeature.size);

                if (!this.headers[currentLevel]) {
                    this.headers[currentLevel] = new Row();
                }
                this.headers[currentLevel].titleCell = titleCell;

                this.headers[currentLevel].add(headerCell);
                cells.push(headerCell);
            }
            else {
                // Last level
                let columnSpan = 1;
                let headerCell = new HeaderCell(columnSpan);
                headerCell.feature = currentFeature;
                headerCell.value = featureValue;
                headerCell.titleText = currentFeature.groupTitle;

                this.cellWrapper.innerHTML = this.templates.headerCell(headerCell);
                let element = this.cellWrapper.childNodes[0];
                this.docFragment.appendChild(element);
                headerCell.node = element;

                if (!this.headers[currentLevel]) {
                    this.headers[currentLevel] = new Row();
                }

                this.headers[currentLevel].add(headerCell);

                let titleCellNode = document.createElement('div');
                titleCellNode.classList.add(...currentFeature.groupTitleStyles);
                titleCellNode.innerHTML = currentFeature.groupTitle;
                let titleCell = new TitleCell(titleCellNode, this.features.firstColumnFeature.size);
                titleCell.node = titleCellNode;

                this.headers[currentLevel].titleCell = titleCell;
                cells.push(headerCell);
            }
        }
        return cells;
    }

    renderViews() {

        // Regular (wide) view
        // Clean any previously inserted nodes
        this.wideView.nodes.innerHTML = '';

        // Calculate a number of visible columns
        let colNum = 0;
        for (let [index, row] of this.rows.entries()) {
            // Count a number of non-hidden columns
            if (index === 0) {
                for (let cell of row.cells) {
                    if (!cell.column.hidden) {
                        colNum++;
                    }
                }
            }
        }


        for (let row of this.headers) {
            this.wideView.nodes.appendChild(row.titleCell.wvNode);
            for (let cell of row.cells) {
                this.wideView.nodes.appendChild(cell.wvNode);
            }
        }

        for (let row of this.rows) {
            if (row.titleCell.parent) {
                this.wideView.nodes.appendChild(row.titleCell.parent.wvNode);
            }
            this.wideView.nodes.appendChild(row.titleCell.wvNode);
            for (let cell of row.cells) {
                this.wideView.nodes.appendChild(cell.wvNode);
            }
        }
        this.wideView.nodes.style.gridTemplateColumns = 'repeat(' + (colNum + 1) + ', 1fr)';


        // Narrow view
        for (let [groupIndex, group] of this.narrowView.groups.entries()) {
            // Clean any previously inserted nodes
            group.nodes.innerHTML = '';

            // Calculate a number of visible columns
            let colNum = 0;
            for (let [index, row] of this.rows.entries()) {
                for (let i = groupIndex * this.narrowView.groupSize; i < (groupIndex + 1) * this.narrowView.groupSize; i++) {
                    if (index === 0) {
                        if (!row.cells[i].column.hidden) {
                            colNum++;
                        }
                    }
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

                for (let [index, row] of this.rows.entries()) {
                    if (row.titleCell.parent) {
                        group.nodes.appendChild(row.titleCell.parent.getNvNode(groupIndex));
                    }
                    group.nodes.appendChild(row.titleCell.getNvNode(groupIndex));
                    for (let i = groupIndex * this.narrowView.groupSize; i < (groupIndex + 1) * this.narrowView.groupSize; i++) {
                        group.nodes.appendChild(row.cells[i].nvNode);
                    }
                }
                group.nodes.classList.remove(classHidden);
                group.nodes.style.gridTemplateColumns = 'repeat(' + (colNum + 1) + ', 12vw)';
                group.nodes.style.width = (colNum + 1) * 12 + 'vw';
            }
            else {
                // This group is hidden
                group.nodes.classList.add(classHidden);
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
            if (column.isEmpty) {
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

    hideNoSuffixDeclensions() {
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

    showNoSuffixDeclensions() {
        for (let column of this.columns) {
            column.show();
        }
        if (this.emptyColumnsHidden) {
            this.hideEmptyColumns();
        }
        this.suffixMatchesHidden = false;
    }
}

class View {

    constructor() {
        this.pageHeader = {};
        this.table = {};

        // An HTML element where view is rendered
        this.container = undefined;

        this.nodes = {

        };
    }

    /**
     * A compare function that can be used to sort ending according to specific requirements of the current view.
     * This function is for use with Array.prototype.sort().
     * @param {FeatureType[]} featureOrder
     * @param {Suffix} a
     * @param {Suffix} b
     */
    compare(featureOrder, a, b) {
        "use strict";

        // Set custom sort order if necessary
        // Custom sort order for each declension
        //LibLatin.genders.order = [LibLatin.genders.feminine];


        for (let [index, feature] of this.featureOrder.entries()) {
            let featureTypeA = a.features[feature.type],
                featureTypeB = b.features[feature.type];

            if (feature.orderLookup[featureTypeA] > feature.orderLookup[featureTypeB]) {
                return 1;
            }
            else if (feature.orderLookup[featureTypeA] < feature.orderLookup[featureTypeB]) {
                return -1;
            }
            /*
             If values on this level are equal, continue comparing using values of the next level.
             If we are at the last level of comparison (defined by featureOrder) and children are equal, return 0.
             */
            else if (index === this.featureOrder.length - 1) {
                // This is the last sort order item
                return 0;
            }
        }

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
    filter(featureType, featureValues, suffix) {
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
    }

    filterByFeature(features, suffixMatch, suffix) {
        "use strict";

        let result = true;
        for (let feature of features) {
            let featureValues = feature.value;
            let featureType = feature.type;
            if (!Array.isArray(featureValues)) {
                featureValues = [featureValues];
            }
            result = result && featureValues.includes(suffix.features[featureType]);
        }
        // Whether to check for a suffix match
        if (suffixMatch) {
            result = result && suffix.match.suffixMatch;
        }

        return result;
    }

    /**
     * Converts a ResultSet, returned from inflection tables library, into an HTML representation of an inflection table.
     * @param {ResultSet} resultSet - A result set from inflection tables library.
     * @returns {string} HTML code representing an inflection table.
     */
    render(container, resultSet) {
        "use strict";

        this.container = container;
        // Create data structure for a template
        this.displayData = {};

        this.displayData.word = resultSet.word;
        this.displayData.title = this.title;
        let selection = resultSet[this.partOfSpeech];

        this.displayData.footnotes = selection.footnotes;

        this.pageHeader.nodes = document.createElement('div');
        this.pageHeader.nodes.innerHTML = this.pageHeaderTemplate(this.displayData);
        this.footnotes = { nodes: document.createElement('div') };
        this.footnotes.nodes.innerHTML = this.footnotesTemplate(this.displayData);

        this.table = new Table(selection.suffixes, this.groupingFeatures, this.headerCellTemplate, this.suffixCellTemplate);

        this.display();
    }

    display() {

        this.table.renderViews();
        // Clear the container
        this.container.innerHTML = '';

        this.container.appendChild(this.pageHeader.nodes);


        // Insert a wide view
        this.container.appendChild(this.table.wideView.nodes);
        // Insert narrow views
        for (let group of this.table.narrowView.groups) {
            this.container.appendChild(group.nodes);
        }
        this.container.appendChild(this.footnotes.nodes);

        this.pageHeader.nodes.querySelector('#hide-empty-columns').addEventListener('click', this.hideEmptyColumns.bind(this));
        this.pageHeader.nodes.querySelector('#show-empty-columns').addEventListener('click', this.showEmptyColumns.bind(this));

        this.pageHeader.nodes.querySelector('#hide-no-suffix-declensions').addEventListener('click', this.hideNoSuffixDeclensions.bind(this));
        this.pageHeader.nodes.querySelector('#show-no-suffix-declensions').addEventListener('click', this.showNoSuffixDeclensions.bind(this));
    }


    hideEmptyColumns() {
        this.table.hideEmptyColumns();
        this.display();
        this.pageHeader.nodes.querySelector('#hide-empty-columns').classList.add(classHidden);
        this.pageHeader.nodes.querySelector('#show-empty-columns').classList.remove(classHidden);
    }

    showEmptyColumns() {
        this.table.showEmptyColumns();
        this.display();
        this.pageHeader.nodes.querySelector('#show-empty-columns').classList.add(classHidden);
        this.pageHeader.nodes.querySelector('#hide-empty-columns').classList.remove(classHidden);
    }

    hideNoSuffixDeclensions() {
        this.table.hideNoSuffixDeclensions();
        this.display();
        this.pageHeader.nodes.querySelector('#hide-no-suffix-declensions').classList.add(classHidden);
        this.pageHeader.nodes.querySelector('#show-no-suffix-declensions').classList.remove(classHidden);
    }

    showNoSuffixDeclensions() {
        this.table.showNoSuffixDeclensions();
        this.display();
        this.pageHeader.nodes.querySelector('#show-no-suffix-declensions').classList.add(classHidden);
        this.pageHeader.nodes.querySelector('#hide-no-suffix-declensions').classList.remove(classHidden);
    }
}
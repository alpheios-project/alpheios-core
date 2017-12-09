import * as Lib from '../../lib/lib'
import * as Models from 'alpheios-data-models'
import * as Styles from '../styles/styles'

class Cell {
    /**
     * Creates a cell for an inflection table.
     * @param {Suffix[]} suffixes - A list of suffixes that belongs to this cell.
     * @param {Feature[]} features - A list of features this cell corresponds to.
     */
  constructor (suffixes, features) {
    this.suffixes = suffixes
    if (!this.suffixes) {
      this.suffixes = []
    }
    this.features = features
    this.empty = (this.suffixes.length === 0)
    this.suffixMatches = !!this.suffixes.find(element => {
      if (element.match && element.match.suffixMatch) {
        return element.match.suffixMatch
      }
    })

    this.column = undefined // A column this cell belongs to
    this.row = undefined // A row this cell belongs to

    this._index = undefined

    this.render()
  }

    /**
     * Renders an element's HTML representation.
     */
  render () {
    let element = document.createElement('div')
    element.classList.add(Styles.classNames.cell)
    for (let [index, suffix] of this.suffixes.entries()) {
            // Render each suffix
      let suffixElement = document.createElement('a')
      suffixElement.classList.add(Styles.classNames.suffix)
      if (suffix.match && suffix.match.suffixMatch) {
        suffixElement.classList.add(Styles.classNames.suffixMatch)
      }
      if (suffix.match && suffix.match.fullMatch) {
        suffixElement.classList.add(Styles.classNames.suffixFullFeatureMatch)
      }
      let suffixValue = suffix.value ? suffix.value : '-'
      if (suffix.footnote && suffix.footnote.length) {
        suffixValue += '[' + suffix.footnote + ']'
      }
      suffixElement.innerHTML = suffixValue
      element.appendChild(suffixElement)
      if (index < this.suffixes.length - 1) {
        element.appendChild(document.createTextNode(',\u00A0'))
      }
    }
    this.wNode = element
    this.nNode = element.cloneNode(true)
  }

    /**
     * Returns an HTML element for a wide view.
     * @returns {HTMLElement}
     */
  get wvNode () {
    return this.wNode
  }

    /**
     * Returns an HTML element for a narrow view.
     * @returns {HTMLElement}
     */
  get nvNode () {
    return this.nNode
  }

    /**
     * Sets a unique index of the cell that can be used for cell identification via 'data-index' attribute.
     * @param {number} index - A unique cell index.
     */
  set index (index) {
    this._index = index
    this.wNode.dataset.index = this._index
    this.nNode.dataset.index = this._index
  }

    /**
     * A proxy for adding an event listener for both wide and narrow view HTML elements.
     * @param {string} type - Listener type.
     * @param {EventListener} listener - Event listener function.
     */
  addEventListener (type, listener) {
    this.wNode.addEventListener(type, listener)
    this.nNode.addEventListener(type, listener)
  }

    /**
     * Hides an element.
     */
  hide () {
    if (!this.wNode.classList.contains(Styles.classNames.hidden)) {
      this.wNode.classList.add(Styles.classNames.hidden)
      this.nNode.classList.add(Styles.classNames.hidden)
    }
  }

    /**
     * Shows a previously hidden element.
     */
  show () {
    if (this.wNode.classList.contains(Styles.classNames.hidden)) {
      this.wNode.classList.remove(Styles.classNames.hidden)
      this.nNode.classList.remove(Styles.classNames.hidden)
    }
  }

    /**
     * Highlights a cell with color.
     */
  highlight () {
    if (!this.wNode.classList.contains(Styles.classNames.highlight)) {
      this.wNode.classList.add(Styles.classNames.highlight)
      this.nNode.classList.add(Styles.classNames.highlight)
    }
  }

    /**
     * Removes highlighting from a previously highlighted cell.
     */
  clearHighlighting () {
    if (this.wNode.classList.contains(Styles.classNames.highlight)) {
      this.wNode.classList.remove(Styles.classNames.highlight)
      this.nNode.classList.remove(Styles.classNames.highlight)
    }
  }

    /**
     * Highlights a row and a column this cell belongs to.
     */
  highlightRowAndColumn () {
    if (!this.column) {
      throw new Error('Column is undefined.')
    }
    if (!this.row) {
      throw new Error('Row is undefined.')
    }
    this.column.highlight()
    this.row.highlight()
  }

    /**
     * Removes highlighting form a previously highlighted row and column.
     */
  clearRowAndColumnHighlighting () {
    if (!this.column) {
      throw new Error('Column is undefined.')
    }
    if (!this.row) {
      throw new Error('Row is undefined.')
    }
    this.column.clearHighlighting()
    this.row.clearHighlighting()
  }
}

/**
 * A cell that specifies a title for a row in an inflection table.
 */
class RowTitleCell {
    /**
     * Initializes a row title cell.
     * @param {string} title - A text that will be shown within the cell.
     * @param {GroupFeatureType} groupingFeature - A grouping feature that specifies a row for which a title cell
     * is created.
     * @param {number} nvGroupQty - A number of narrow view groups. Because each group will be shown separately
     * and will have its own title cells, we need to create a copy of a title cell for each such group.
     */
  constructor (title, groupingFeature, nvGroupQty) {
    this.parent = undefined
    this.title = title
    this.feature = groupingFeature
    this.nvGroupQty = nvGroupQty

    this.render()
  }

    /**
     * Renders an element's HTML representation.
     */
  render () {
        // Generate HTML representation for a wide view node
    this.wNode = document.createElement('div')
    this.wNode.classList.add(Styles.classNames.cell)
    if (this.feature.formsColumn) {
      this.wNode.classList.add(Styles.classNames.header)
    }
    if (this.feature.hasFullWidthRowTitle) {
            // This cell is taking an entire row
      this.wNode.classList.add(Styles.classNames.fullWidth)
    }
    if (this.feature.formsColumn && this.feature.groupFeatureList.titleColumnsQuantity > 1) {
      this.wNode.classList.add(Styles.classNames.widthPrefix + this.feature.groupFeatureList.titleColumnsQuantity)
    }
    this.wNode.innerHTML = this.title

        // Copy HTML representation to all narrow view nodes (each narrow view group has its own node)
    this.nNodes = [] // Narrow nodes, one for each group
    for (let i = 0; i < this.nvGroupQty; i++) {
      this.nNodes.push(this.wNode.cloneNode(true))
    }
  }

    /**
     * Returns an HTML element for a wide view
     * @returns {HTMLElement} HTML element for a wide view's cell.
     */
  get wvNode () {
    return this.wNode
  }

    /**
     * Returns an array HTML element for narrow view groups
     * @returns {HTMLElement[]} Array of HTML elements for narrow view group's cells.
     */
  getNvNode (index) {
    return this.nNodes[index]
  }

    /**
     * Generates an empty cell placeholder of a certain width. Useful for situation when empty title cells need to be
     * inserted into a table structure (i.e. when title cells occupy multiple columns.
     * @param {number} width - A number of columns placeholder cell will occupy.
     * @returns {HTMLElement} HTML element of a placeholder cell.
     */
  static placeholder (width = 1) {
    let placeholder = document.createElement('div')
    placeholder.classList.add(Styles.classNames.cell, Styles.classNames.widthPrefix + width)
    return placeholder
  }

    /**
     * Some table layouts require multiple title cells to be shown for a row. These could be, for example, a title
     * cell for a parent category that will follow a title cell for a category that defines a row. In such situation a
     * title cell will have a parent, which will represent a parent cell object.
     * This function returns an array of title cells for a row, starting from the topmost parent and moving down
     * tot the current title cell.
     * @returns {RowTitleCell[]} An array of title row cells representing a title cell hierarchy list.
     */
  get hierarchyList () {
    let parentCells = []
    if (this.parent) {
      parentCells = this.parent.hierarchyList
    }
    return parentCells.concat(this)
  }

    /**
     * Highlights this row title cell
     */
  highlight () {
    this.wNode.classList.add(Styles.classNames.highlight)
    for (let nNode of this.nNodes) {
      nNode.classList.add(Styles.classNames.highlight)
    }
  }

    /**
     * Removes highlighting from this row title cell
     */
  clearHighlighting () {
    this.wNode.classList.remove(Styles.classNames.highlight)
    for (let nNode of this.nNodes) {
      nNode.classList.remove(Styles.classNames.highlight)
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
     * @param {GroupFeatureType} groupingFeature - A feature that defines one or several columns this header forms.
     * @param {number} [span=1] - How many columns in a table this header cell forms.
     */
  constructor (title, groupingFeature, span = 1) {
    this.feature = groupingFeature
    this.title = title
    this.span = span

    this.parent = undefined
    this.children = []
    this.columns = []

    this.render()
  }

    /**
     * Renders an element's HTML representation.
     */
  render () {
    let element = document.createElement('div')
    element.classList.add(Styles.classNames.cell, Styles.classNames.header, Styles.classNames.widthPrefix + this.span)
    element.innerHTML = this.title
    this.wNode = element
    this.nNode = element.cloneNode(true)
  }

    /**
     * Returns an HTML element for a wide view
     * @returns {HTMLElement} HTML element for a wide view's cell.
     */
  get wvNode () {
    return this.wNode
  }

    /**
     * Returns an HTML element for a narrow view
     * @returns {HTMLElement} HTML element for a narrow view's cell.
     */
  get nvNode () {
    return this.nNode
  }

    /**
     * Registers a column that's being formed by this header cell. Adds column to itself and to its parent(s).
     * @param {Column} column - A column that is formed by this header cell.
     */
  addColumn (column) {
    this.columns = this.columns.concat([column])

    if (this.parent) {
      this.parent.addColumn(column)
    }
  }

    /**
     * Temporary changes a width of a header cell. This happens when one or several columns
     * that this header forms are hidden or shown.
     * @param value
     */
  changeSpan (value) {
    let currentWidthClass = Styles.classNames.widthPrefix + this.span
    this.span += value
    let newWidthClass = Styles.classNames.widthPrefix + this.span
    this.wNode.classList.replace(currentWidthClass, newWidthClass)
    this.nNode.classList.replace(currentWidthClass, newWidthClass)
  }

    /**
     * This function will notify all parents and children of a title column that some columns under this headers cell
     * changed their state (i.e. were hidden or shown). This way parents and children will be able to update their
     * states accordingly.
     */
  columnStateChange () {
    let visibleColumns = 0
    for (let column of this.columns) {
      if (!column.hidden) {
        visibleColumns++
      }
    }
    if (this.span !== visibleColumns) {
            // Number of visible columns has been changed
      let change = visibleColumns - this.span
      this.changeSpan(change)

            // Notify parents and children
      if (this.children.length) {
        for (let child of this.children) {
          child.columnStateChange()
        }
      }
      if (this.parent) {
        this.parent.columnStateChange()
      }
    }
  }

    /**
     * Highlights a header cell, its parent and children
     */
  highlight () {
    if (!this.wNode.classList.contains(Styles.classNames.highlight)) {
      this.wNode.classList.add(Styles.classNames.highlight)
      this.nNode.classList.add(Styles.classNames.highlight)

      if (this.parent) {
        this.parent.highlight()
      }
    }
  }

    /**
     * Removes highlighting from a header cell, its parent and children
     */
  clearHighlighting () {
    if (this.wNode.classList.contains(Styles.classNames.highlight)) {
      this.wNode.classList.remove(Styles.classNames.highlight)
      this.nNode.classList.remove(Styles.classNames.highlight)

      if (this.parent) {
        this.parent.clearHighlighting()
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
  constructor (cells) {
    this.cells = cells
    if (!cells) {
      this.cells = []
    }
    this._headerCell = undefined
    this.hidden = false
    this.empty = this.cells.every(cell => cell.empty)
    this.suffixMatches = !!this.cells.find(cell => cell.suffixMatches)

    for (let cell of this.cells) {
      cell.column = this
    }
  }

    /**
     * Assigns a header cell to the column.
     * @param {HeaderCell} headerCell - A header cell of this column.
     */
  set headerCell (headerCell) {
    this._headerCell = headerCell
    headerCell.addColumn(this)
  }

    /**
     * Returns a number of cells within this column.
     * @returns {Number} A number of cells this column contains.
     */
  get length () {
    return this.cells.length
  }

    /**
     * Hides the column. Notifies a header about a state change.
     */
  hide () {
    if (!this.hidden) {
      this.hidden = true

      for (let cell of this.cells) {
        cell.hide()
      }
      if (this._headerCell) {
        this._headerCell.columnStateChange()
      }
    }
  }

    /**
     * Shows the column. Notifies a header about a state change.
     */
  show () {
    if (this.hidden) {
      this.hidden = false

      for (let cell of this.cells) {
        cell.show()
      }
      if (this._headerCell) {
        this._headerCell.columnStateChange()
      }
    }
  }

    /**
     * Highlights a column and its header.
     */
  highlight () {
    for (let cell of this.cells) {
      cell.highlight()
    }
    if (this._headerCell) {
      this._headerCell.highlight()
    }
  }

    /**
     * Removes highlighting from a column and its header.
     */
  clearHighlighting () {
    for (let cell of this.cells) {
      cell.clearHighlighting()
    }
    if (this._headerCell) {
      this._headerCell.clearHighlighting()
    }
  }
}

/**
 * Represents a row of cells
 */
class Row {
    /**
     * Populates row with cells
     * @param {Cell[]} cells - Cells that belong to this row
     */
  constructor (cells) {
    this.cells = cells
    if (!cells) {
      this.cells = []
    }
    this.titleCell = undefined

    for (let cell of this.cells) {
      cell.row = this
    }
  }

    /**
     * Adds a cell to the row.
     * This is a chainable function.
     * @param {Cell} cell - A cell to be added to the row
     */
  add (cell) {
    cell.row = this
    this.cells.push(cell)
    return this
  }

    /**
     * Returns a number of cells in a row
     * @returns {Number} A number of cells in a row
     */
  get length () {
    return this.cells.length
  }

    /**
     * Returns a portion of a cells array starting from `from` item and up to, but not including, `upto` element.
     * It does not create new copies of cells to populate a newly created array; this array contains references to
     * the same cells that original Row refers to. It also does not update row reference within Cell objects.
     *
     * This function presents a way to create another structure of existing table's cells.
     * It can be useful for views that have a different structure (i.e. narrow view).
     * @param {number} from
     * @param {number} upto
     */
  slice (from, upto) {
    let slice = new Row()
    if (from < 0 && from > this.cells.length) {
      throw new Error('"from" parameter is out of range.')
    }
    if (upto < 0 && upto > this.cells.length) {
      throw new Error('"upto" parameter is out of range.')
    }
    for (let index = from; index < upto; index++) {
      slice.cells.push(this.cells[index])
    }
    slice.titleCell = this.titleCell
    return slice
  }

    /**
     * Highlights all cells in a row, and a title cells
     */
  highlight () {
    for (let cell of this.cells) {
      cell.highlight()
    }
    if (this.titleCell) {
      this.titleCell.highlight()
    }
  }

    /**
     * Removes highlighting from all cells in a row, and from a title cell
     */
  clearHighlighting () {
    for (let cell of this.cells) {
      cell.clearHighlighting()
    }
    if (this.titleCell) {
      this.titleCell.clearHighlighting()
    }
  }
}

/**
 * This is a wrapper around a FeatureType object. When a Table object creates a
 * hierarchical tree of suffixes, it uses grammatical features as tree nodes.
 * GroupFeatureType extends a Feature object so that it'll be able to store additional information
 * that is required for that.
 */
class GroupFeatureType extends Models.FeatureType {
    /**
     * GroupFeatureType extends FeatureType to serve as a grouping feature (i.e. a feature that forms
     * either a column or a row in an inflection table). For that, it adds some additional functionality,
     * such as custom feature orders that will allow to combine suffixes from several grammatical features
     * (i.e. masculine and feminine) into a one column of a table.
     * @param {FeatureType} featureType - A feature that defines a type of this item.
     * @param {string} titleMessageID - A message ID of a title, used to get a formatted title from a
     * language-specific message bundle.
     * @param {Feature[]} order - A custom sort order for this feature that redefines
     * a default one stored in FeatureType object (optional).
     * Use this parameter to redefine a deafult sort order for a type.
     */
  constructor (featureType, titleMessageID, order = featureType.orderedFeatures) {
    super(featureType.type, GroupFeatureType.featuresToValues(order), featureType.language)

    this.groupTitle = titleMessageID
    this._groupType = undefined

    this.groupFeatureList = undefined

        // Properties below are required to store information during tree creation
    this.subgroups = [] // Each value of the feature
    this.cells = [] // All cells within this group and below
    this.parent = undefined
    this.header = undefined

    this._formsColumn = false
    this._formsRow = false
    this.hasColumnRowTitle = false // Whether this feature has a title of a suffix row in the left-side column.
    this.hasFullWidthRowTitle = false // Whether this feature has a title of suffix rows that spans the whole table width.
  }

    /**
     * Converts a list of Feature objects into a list of strings that represent their values. Keeps tha original
     * array structure intact (work with up two two array levels).
     * @param {Feature[] | Feature[][]} features - An array of feature objects.
     * @return {string[] | strings[][]} A matching array of strings with feature values.
     */
  static featuresToValues (features) {
    return features.map((feature) => {
      if (Array.isArray(feature)) {
        return feature.map((feature) => feature.value)
      } else {
        return feature.value
      }
    })
  }

    /**
     * This is a wrapper around orderedFeatures() that allows to set a custom feature order for particular columns.
     * @returns {Feature[] | Feature[][]} A sorted array of feature values.
     */
  getOrderedFeatures (ancestorFeatures) {
    return this.getOrderedValues(ancestorFeatures).map((value) => new Models.Feature(value, this.type, this.language))
  }

    /**
     * This is a wrapper around orderedValues() that allows to set a custom feature order for particular columns.
     * By default it returns features in the same order that is defined in a base FeatureType class.
     * Redefine it to provide a custom grouping and sort order.
     * @returns {string[] | string[][]} A sorted array of feature values.
     */
  getOrderedValues (ancestorFeatures) {
    return this._orderIndex
  }

    /**
     * Whether this feature forms a columns group.
     * @returns {boolean} True if this feature forms a column.
     */
  get formsColumn () {
    return this._formsColumn
  }

    /**
     * Sets that this feature would form a column.
     * @param {boolean} value
     */
  set formsColumn (value) {
    this._formsColumn = value
    this._formsRow = !value // Can't do both
  }

    /**
     * Whether this feature forms a row group.
     * @returns {boolean} True if this feature forms a row.
     */
  get formsRow () {
    return this._formsRow
  }

    /**
     * Sets that this feature would form a row.
     * @param {boolean} value
     */
  set formsRow (value) {
    this._formsRow = value
    this._formsColumn = !value // Can't do both
  }

    /**
     * How many groups this feature would form.
     * @returns {Number} A number of groupes formed by this feature.
     */
  get size () {
    return this.orderedValues.length
  }

    /**
     * Checks if two grouping features are of the same type.
     * @param {GroupFeatureType} groupingFeature - A grouping feature to compare with the current one.
     * @returns {boolean} True if grouping features are of the same type.
     */
  isSameType (groupingFeature) {
    return this.type === groupingFeature.type
  }

    /**
     * Creates a title cell for a feature from the current group.
     * @param {string} title - A text that will be shown within a cell.
     * @param {number} nvGroupQty - A number of narrow view groups.
     * @returns {RowTitleCell} A created RowTitleCell object.
     */
  createTitleCell (title, nvGroupQty) {
    return new RowTitleCell(title, this, nvGroupQty)
  }
}

/**
 * Holds a list of all grouping features of a table.
 */
class GroupFeatureList extends Models.FeatureList {
    /**
     * Initializes object with an array of grouping feature objects.
     * @param {GroupFeatureType[]} features - An array of features that form a table.
     * An order of features defines in what order a table tree would be built.
     */
  constructor (features) {
    super(features)
    this._columnFeatures = [] // Features that group cells into columns
    this._rowFeatures = [] // Features that group cells into rows

    this.forEach((feature) => { feature.groupFeatureList = this })
  }

    /**
     * Return a list of all grouping features that form columns.
     * @returns {GroupFeatureType[]} - An array of grouping features.
     */
  get columnFeatures () {
    return this._columnFeatures
  }

    /**
     * Defines what features form columns. An order of items specifies an order in which columns be shown.
     * @param {Feature[] | GroupingFeature[]} features - What features form columns and what order
     * these columns would follow.
     */
  set columns (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type)
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.formsColumn = true
      this._columnFeatures.push(matchingFeature)
    }
  }

    /**
     * Returns a first column feature item.
     * @returns {GroupFeatureType} A fist column feature.
     */
  get firstColumnFeature () {
    if (this._columnFeatures && this._columnFeatures.length) {
      return this._columnFeatures[0]
    }
  }

    /**
     * Returns a last column feature item.
     * @returns {GroupFeatureType} A last column feature.
     */
  get lastColumnFeature () {
    if (this._columnFeatures && this._columnFeatures.length) {
      return this._columnFeatures[this._columnFeatures.length - 1]
    }
  }

    /**
     * Return a list of all grouping features that form rows.
     * @returns {GroupFeatureType[]} - An array of grouping rows.
     */
  get rowFeatures () {
    return this._rowFeatures
  }

    /**
     * Defines what features form rows. An order of items specifies an order in which columns be shown.
     * @param {Feature[] | GroupingFeature[]} features - What features form rows and what order
     * these rows would follow.
     */
  set rows (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type)
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.formsRow = true
      this._rowFeatures.push(matchingFeature)
    }
    return this
  }

    /**
     * Returns a first row feature item.
     * @returns {GroupFeatureType} A fist row feature.
     */
  get firstRowFeature () {
    if (this._rowFeatures && this._rowFeatures.length) {
      return this._rowFeatures[0]
    }
  }

    /**
     * Returns a last row feature item.
     * @returns {GroupFeatureType} A last row feature.
     */
  get lastRowFeature () {
    if (this._rowFeatures && this._rowFeatures.length) {
      return this._rowFeatures[this._rowFeatures.length - 1]
    }
  }

    /**
     * Defines what are the titles of suffix cell rows within a table body.
     * The number of such items defines how many left-side title columns this table would have (default is one).
     * Full width titles (see below) does not need to be specified here.
     * @param {Feature | GroupingFeature} features - What suffix row titles this table would have.
     */
  set columnRowTitles (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type)
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.hasColumnRowTitle = true
    }
  }

    /**
     * In inflection tables, titles of features are usually located in left-side columns. However, some titles that
     * group several rows together may span the whole table width. This setters defines
     * what those features are.
     * @param {Feature | GroupingFeature} features - What feature titles would take a whole row
     */
  set fullWidthRowTitles (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type)
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.hasFullWidthRowTitle = true
    }
  }

    /**
     * Returns a quantity of grouping features.
     * @returns {number} - A number of grouping features.
     */
  get length () {
    return this._features.length
  }

    /**
     * Calculate a number of title columns.
     * @returns {number} A number of title columns.
     */
  get titleColumnsQuantity () {
    let quantity = 0
    for (let feature of this._features) {
      if (feature.hasColumnRowTitle) {
        quantity++
      }
    }
    return quantity
  }
}

/**
 * Stores group data during feature tree construction.
 */
class NodeGroup {
    /**
     * Creates feature group data structures.
     */
  constructor () {
    this.subgroups = [] // Each value of the feature
    this.cells = [] // All cells within this group and below
    this.parent = undefined
    this.header = undefined

    this.groupFeatureType = undefined // Defines a feature type that forms a tree level this node is in.
    this.ancestorFeatures = undefined // Defines feature values of this node's parents.
  }
}

/**
 * A representation of a table that is shown on wide screens (desktops).
 */
class WideView {
    /**
     * Initializes a wide view.
     * @param {Column[]} columns - Table columns.
     * @param {Row[]} rows - Table rows.
     * @param {Row[]} headers - Table headers.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
  constructor (columns, rows, headers, titleColumnQty) {
    this.columns = columns
    this.rows = rows
    this.headers = headers
    this.titleColumnQty = titleColumnQty
    this.nodes = document.createElement('div')
    this.nodes.classList.add(Styles.classNames.inflectionTable, Styles.classNames.wideView)
  }

    /**
     * Calculates a number of visible columns in this view.
     * @returns {number} A number of visible columns.
     */
  get visibleColumnQty () {
    let qty = 0
    for (let column of this.columns) {
      if (!column.hidden) {
        qty++
      }
    }
    return qty
  }

    /**
     * Renders an HTML representation of a wide table view.
     * @returns {HTMLElement} A rendered HTML Element.
     */
  render () {
        // Remove any previously inserted nodes
    this.nodes.innerHTML = ''

    for (let row of this.headers) {
      this.nodes.appendChild(row.titleCell.wvNode)
      for (let cell of row.cells) {
        this.nodes.appendChild(cell.wvNode)
      }
    }

    for (let row of this.rows) {
      let titleCells = row.titleCell.hierarchyList
      if (titleCells.length < this.titleColumnQty) {
        this.nodes.appendChild(RowTitleCell.placeholder(this.titleColumnQty - titleCells.length))
      }
      for (let titleCell of titleCells) {
        this.nodes.appendChild(titleCell.wvNode)
      }

      for (let cell of row.cells) {
        this.nodes.appendChild(cell.wvNode)
      }
    }
    this.nodes.style.gridTemplateColumns = 'repeat(' + (this.visibleColumnQty + this.titleColumnQty) + ', ' +
            Styles.wideView.column.width + Styles.wideView.column.unit + ')'

    return this.nodes
  }
}

/**
 * A representation of a table that is shown on narrow screens (mobile devices).
 */
class NarrowView {
    /**
     * Initializes a narrow view.
     * @param {number} groupQty - A number of visible groups (sub tables) within a narrow view.
     * @param {Column[]} columns - Table columns.
     * @param {Row[]} rows - Table rows.
     * @param {Row[]} headers - Table headers.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
  constructor (groupQty, columns, rows, headers, titleColumnQty) {
    this.columns = columns
    this.rows = rows
    this.headers = headers
    this.titleColumnQty = titleColumnQty
    this.groups = []
    this.groupQty = groupQty
    this.groupSize = 0
    if (groupQty) {
      this.groupSize = this.columns.length / groupQty
    }

    this.nodes = document.createElement('div')
    this.nodes.classList.add(Styles.classNames.narrowViewsContainer)

    for (let [index, headerCell] of this.headers[0].cells.entries()) {
      this.createGroup(index, headerCell)
    }
  }

    /**
     * Creates a group within a table.
     * @returns {NarrowViewGroup} A newly created group.
     */
  createGroup (index, headerCell) {
    let group = new NarrowViewGroup(index, this.headers, this.rows, this.titleColumnQty)
    this.nodes.appendChild(group.nodes)
    this.groups.push(group)
  }

    /**
     * Generates an HTML representation of a view.
     * @returns {HTMLElement} - HTML representation of a view.
     */
  render () {
    for (let group of this.groups) {
      group.render()
    }
    return this.nodes
  }
}

/**
 * Represents a group within a narrow view. A narrow view is split into separate sub tables
 * by values of a first grammatical feature that forms columns. Then each sub table would contain
 * a suffixes that belong to that grammatical feature value only. Each sub table becomes a
 * separated object and can be reflown on devices with narrow screens.
 */
class NarrowViewGroup {
    // TODO: Review constructor parameters

    /**
     * Initializes a narrow view group. Please note that column, rows, and headers are those of a whole table,
     * not of this particular group. NarrowViewGroup constructor will use this data to build
     * the corresponding objects of the group itself.
     * @param {number} index - An index of this group within a groups array, starting from zero.
     * @param {Row[]} headers - Table headers.
     * @param {Row[]} rows - Table rows.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
  constructor (index, headers, rows, titleColumnQty) {
    this.index = index
    this.columns = headers[0].cells[index].columns
    this.groupSize = this.columns.length
    let columnsStartIndex = this.columns[0].index
    let columnsEndIndex = this.columns[this.columns.length - 1].index

    this.rows = []
    for (let row of rows) {
      this.rows.push(row.slice(columnsStartIndex, columnsEndIndex + 1))
    }
    this.headers = []
        /**
         * Since we group by the first column feature, there will be a single feature in a first header row,
         * its children in the second row, children of its children in a third row and so on.
         */
    for (let [headerIndex, headerRow] of headers.entries()) {
      let row = new Row()
      row.titleCell = headerRow.titleCell
      if (headerIndex === 0) {
        row.cells.push(headerRow.cells[index])
      } else {
        for (let headerCell of this.headers[headerIndex - 1].cells) {
          row.cells = row.cells.concat(headerCell.children)
        }
      }
      this.headers.push(row)
    }
    this.titleColumnQty = titleColumnQty

    this.nodes = document.createElement('div')
    this.nodes.classList.add(Styles.classNames.inflectionTable, Styles.classNames.narrowView)
  }

    /**
     * Calculates a number of visible columns in this view.
     * @returns {number} A number of visible columns.
     */
  get visibleColumnQty () {
    let qty = 0
    for (let column of this.columns) {
      if (!column.hidden) {
        qty++
      }
    }
    return qty
  }

    /**
     * Renders an HTML representation of a narrow view group.
     */
  render () {
    this.nodes.innerHTML = ''

    if (this.visibleColumnQty) {
            // This group is visible
      for (let headerRow of this.headers) {
        this.nodes.appendChild(headerRow.titleCell.getNvNode(this.index))
        for (let headerCell of headerRow.cells) {
          this.nodes.appendChild(headerCell.nvNode)
        }
      }

      for (let row of this.rows) {
        let titleCells = row.titleCell.hierarchyList
        if (titleCells.length < this.titleColumnQty) {
          this.nodes.appendChild(RowTitleCell.placeholder(this.titleColumnQty - titleCells.length))
        }
        for (let titleCell of titleCells) {
          this.nodes.appendChild(titleCell.getNvNode(this.index))
        }

        for (let cell of row.cells) {
          this.nodes.appendChild(cell.nvNode)
        }
      }
      this.nodes.classList.remove(Styles.classNames.hidden)
      this.nodes.style.gridTemplateColumns = 'repeat(' + (this.visibleColumnQty + this.titleColumnQty) + ', ' +
                Styles.narrowView.column.width + Styles.narrowView.column.unit + ')'
      this.nodes.style.width = (this.visibleColumnQty + this.titleColumnQty) * Styles.narrowView.column.width +
                Styles.narrowView.column.unit
    } else {
            // This group is hidden
      this.nodes.classList.add(Styles.classNames.hidden)
    }
  }
}

/**
 * Represents an inflection table.
 */
class Table {
    /**
     * Initializes an inflection table.
     * @param {GroupFeatureType[]} features - An array of grouping features. An order of elements in this array
     */
  constructor (features) {
    this.features = new GroupFeatureList(features)
    this.emptyColumnsHidden = false
    this.cells = [] // Will be populated by groupByFeature()

        /*
        This is a special filter function that, if defined will do additional filtering of suffixes within a cell.
         */
    this.suffixCellFilter = undefined
  }

    /**
     * Creates a table tree and other data structures (columns, rows, headers).
     * This function is chainabe.
     * @param {Suffix[]} suffixes - An array of suffixes to build table from.
     * @returns {Table} Reference to self for chaining.
     */
  construct (suffixes) {
    this.suffixes = suffixes
    this.tree = this.groupByFeature(suffixes)
    this.headers = this.constructHeaders()
    this.columns = this.constructColumns()
    this.rows = this.constructRows()
    this.emptyColumnsHidden = false
    return this
  }

    /**
     * Builds wide and narrow views of the table.
     * This function is chainabe.
     * @returns {Table} Reference to self for chaining.
     */
  constructViews () {
    this.wideView = new WideView(this.columns, this.rows, this.headers, this.titleColumnQty)
    this.narrowView = new NarrowView(
            this.features.firstColumnFeature.size, this.columns, this.rows, this.headers, this.titleColumnQty)
    return this
  }

    /**
     * Returns a number of columns with suffix cells in a table.
     * @returns {number} A number of columns with suffix cells in a table.
     */
  get suffixColumnQty () {
    if (!this.columns) {
      throw new Error('Columns are not populated yet.')
    }
    return this.columns.length
  }

    /**
     * Returns a number of columns with row titles in a table.
     * @returns {number} A number of columns with row titles.
     */
  get titleColumnQty () {
    if (!this.features) {
      throw new Error('Features are not defined.')
    }
    return this.features.titleColumnsQuantity
  }

    /**
     * Returns a number of rows with suffix cells in a table.
     * @returns {number} A number of rows with suffix cells.
     */
  get suffixRowQty () {
    if (!this.columns) {
      throw new Error('Columns are not populated yet.')
    }
    return this.columns[0].length
  }

    /**
     * Returns true if an ending grammatical feature defined by featureType has a value that is listed in a featureValues array.
     * This function is for use with Array.prototype.filter().
     * @param {string} featureType - a grammatical feature type we need to filter on.
     * @param {string | string[]} featureValues - a list of possible values of a type specified by featureType that
     * this ending should have.
     * @param {Suffix} suffix - an ending we need to filter out.
     * @returns {boolean} True if suffix has a value of a grammatical feature specified.
     */
  static filter (featureType, featureValues, suffix) {
    'use strict'

        // If not an array, convert it to array for uniformity
    if (!Array.isArray(featureValues)) {
      featureValues = [featureValues]
    }
    for (const value of featureValues) {
      if (suffix.features[featureType] === value) {
        return true
      }
    }

    return false
  };

    /**
     * Groups all suffixes into a tree according to their grammatical features. There are several levels in this tree.
     * Each level corresponds to a one grouping feature. The order of items in GroupingFeatures List object
     * defines an order of those levels.
     * Nodes on each level are values of a grammatical feature that forms this level. An order of those values
     * is determined by the order of values within a GroupFeatureType object of each feature.
     * This is a recursive function.
     * @param {Suffix[]} suffixes - Suffixes to be grouped.
     * @param {Feature[]} ancestorFeatures - A list of feature values on levels above the current.
     * @param {number} currentLevel - At what level in a tree we are now. Used to stop recursion.
     * @returns {NodeGroup} A top level group of suffixes that contain subgroups all way down to the last group.
     */
  groupByFeature (suffixes, ancestorFeatures = [], currentLevel = 0) {
    let group = new NodeGroup()
    group.groupFeatureType = this.features.items[currentLevel]
    group.ancestorFeatures = ancestorFeatures.slice()

        // Iterate over each value of the feature
    for (const featureValue of group.groupFeatureType.getOrderedFeatures(ancestorFeatures)) {
      if (ancestorFeatures.length > 0 && ancestorFeatures[ancestorFeatures.length - 1].type === group.groupFeatureType.type) {
                // Remove previously inserted feature of the same type
        ancestorFeatures.pop()
      }
      ancestorFeatures.push(featureValue)

            // Suffixes that are selected for current combination of feature values
      let selectedSuffixes = suffixes.filter(Table.filter.bind(this, group.groupFeatureType.type, featureValue.value))

      if (currentLevel < this.features.length - 1) {
                // Divide to further groups
        let subGroup = this.groupByFeature(selectedSuffixes, ancestorFeatures, currentLevel + 1)
        group.subgroups.push(subGroup)
        group.cells = group.cells.concat(subGroup.cells)
      } else {
                // This is the last level. This represent a cell with suffixes
                // Split result has a list of suffixes in a table cell. We need to combine items with same endings.
        if (selectedSuffixes.length > 0) {
          if (this.suffixCellFilter) {
            selectedSuffixes = selectedSuffixes.filter(this.suffixCellFilter)
          }

          selectedSuffixes = Lib.Suffix.combine(selectedSuffixes)
        }

        let cell = new Cell(selectedSuffixes, ancestorFeatures.slice())
        group.subgroups.push(cell)
        group.cells.push(cell)
        this.cells.push(cell)
        cell.index = this.cells.length - 1
      }
    }
    ancestorFeatures.pop()
    return group
  }

    /**
     * Create columns out of a suffixes organized into a tree.
     * This is a recursive function.
     * @param {NodeGroup} tree - A tree of suffixes.
     * @param {Column[]} columns - An array of columns to be constructed.
     * @param {number} currentLevel - Current recursion level.
     * @returns {Array} An array of columns of suffix cells.
     */
  constructColumns (tree = this.tree, columns = [], currentLevel = 0) {
    let currentFeature = this.features.items[currentLevel]

    let groups = []
    for (let [index, featureValue] of currentFeature.getOrderedValues(tree.ancestorFeatures).entries()) {
      let cellGroup = tree.subgroups[index]

            // Iterate until it is the last row feature
      if (!currentFeature.isSameType(this.features.lastRowFeature)) {
        let currentResult = this.constructColumns(cellGroup, columns, currentLevel + 1)
        if (currentFeature.formsRow) {
                    // TODO: Avoid creating extra cells

          let group = {
            titleText: featureValue,
            groups: currentResult,
            titleCell: currentFeature.createTitleCell(featureValue, this.features.firstColumnFeature.size)
          }
          group.groups[0].titleCell.parent = group.titleCell
          groups.push(group)
        } else if (currentFeature.isSameType(this.features.lastColumnFeature)) {
          let column = new Column(cellGroup.cells)
          column.groups = currentResult
          column.header = featureValue
          column.index = columns.length
          columns.push(column)
          column.headerCell = this.headers[this.headers.length - 1].cells[columns.length - 1]
        }
      } else {
                // Last level
        cellGroup.titleCell = currentFeature.createTitleCell(featureValue, this.features.firstColumnFeature.size)
        let group = {
          titleText: featureValue,
          cell: cellGroup,
          titleCell: cellGroup.titleCell
        }
        groups.push(group)
      }
    }
    if (currentFeature.formsRow) {
      return groups
    }
    return columns
  }

    /**
     * Creates an array of header cell rows.
     * This is a recursive function.
     * @param {NodeGroup} tree - A tree of suffixes.
     * @param {Row[]} headers - An array of rows with header cells.
     * @param {number} currentLevel - Current recursion level.
     * @returns {Array} A two-dimensional array of header cell rows.
     */
  constructHeaders (tree = this.tree, headers = [], currentLevel = 0) {
    let currentFeature = this.features.columnFeatures[currentLevel]

    let cells = []
    for (let [index, featureValue] of currentFeature.getOrderedValues(tree.ancestorFeatures).entries()) {
      let cellGroup = tree.subgroups[index]

            // Iterate over all column features (features that form columns)
      if (currentLevel < this.features.columnFeatures.length - 1) {
        let subCells = this.constructHeaders(cellGroup, headers, currentLevel + 1)

        let columnSpan = 0
        for (let cell of subCells) {
          columnSpan += cell.span
        }

        let headerCell = new HeaderCell(featureValue, currentFeature, columnSpan)
        headerCell.children = subCells
        for (let cell of subCells) {
          cell.parent = headerCell
        }

        if (!headers[currentLevel]) {
          headers[currentLevel] = new Row()
        }
        headers[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size)

        headers[currentLevel].add(headerCell)
        cells.push(headerCell)
      } else {
                // Last level
        let headerCell = new HeaderCell(featureValue, currentFeature)

        if (!headers[currentLevel]) {
          headers[currentLevel] = new Row()
        }

        headers[currentLevel].add(headerCell)
        headers[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size)
        cells.push(headerCell)
      }
    }
    if (currentLevel === 0) {
      return headers
    } else {
      return cells
    }
  }

    /**
     * Creates an array of rows by parsing an array of columns.
     * @returns {Row[]} An array of rows.
     */
  constructRows () {
    let rows = []
    for (let rowIndex = 0; rowIndex < this.suffixRowQty; rowIndex++) {
      rows[rowIndex] = new Row()
      rows[rowIndex].titleCell = this.columns[0].cells[rowIndex].titleCell
      for (let columnIndex = 0; columnIndex < this.suffixColumnQty; columnIndex++) {
        rows[rowIndex].add(this.columns[columnIndex].cells[rowIndex])
      }
    }
    return rows
  }

    /**
     * Adds event listeners to each cell object.
     */
  addEventListeners () {
    for (let cell of this.cells) {
      cell.addEventListener('mouseenter', this.highlightRowAndColumn.bind(this))
      cell.addEventListener('mouseleave', this.clearRowAndColumnHighlighting.bind(this))
    }
  }

    /**
     * Highlights a row and a column this cell is in.
     * @param {Event} event - An event that triggers this function.
     */
  highlightRowAndColumn (event) {
    let index = event.currentTarget.dataset.index
    this.cells[index].highlightRowAndColumn()
  }

    /**
     * Removes highlighting from row and a column this cell is in.
     * @param {Event} event - An event that triggers this function.
     */
  clearRowAndColumnHighlighting (event) {
    let index = event.currentTarget.dataset.index
    this.cells[index].clearRowAndColumnHighlighting()
  }

    /**
     * Hides empty columns in a table.
     */
  hideEmptyColumns () {
    for (let column of this.columns) {
      if (column.empty) {
        column.hide()
      }
    }
    this.emptyColumnsHidden = true
  }

    /**
     * Show all empty columns that were previously hidden.
     */
  showEmptyColumns () {
    for (let column of this.columns) {
      if (column.hidden) {
        column.show()
      }
    }
    this.emptyColumnsHidden = false
  }

    /**
     * Hide groups that have no suffix matches.
     */
  hideNoSuffixGroups () {
    for (let headerCell of this.headers[0].cells) {
      let matches = !!headerCell.columns.find(column => column.suffixMatches)
      if (!matches) {
        for (let column of headerCell.columns) {
          column.hide()
        }
      }
    }
    this.suffixMatchesHidden = true
  }

    /**
     * Show groups that have no suffix matches.
     */
  showNoSuffixGroups () {
    for (let column of this.columns) {
      column.show()
    }
    if (this.emptyColumnsHidden) {
      this.hideEmptyColumns()
    }
    this.suffixMatchesHidden = false
  }
}

/**
 * Represents a list of footnotes.
 */
class Footnotes {
    /**
     * Initialises a Footnotes object.
     * @param {Footnote[]} footnotes - An array of footnote objects.
     */
  constructor (footnotes) {
    this.footnotes = footnotes

    this.nodes = document.createElement('dl')
    this.nodes.id = Styles.footnotes.id
    this.nodes.classList.add(Styles.classNames.footnotesContainer)
    for (let footnote of footnotes) {
      let index = document.createElement('dt')
      index.innerHTML = footnote.index
      this.nodes.appendChild(index)
      let text = document.createElement('dd')
      text.innerHTML = footnote.text
      this.nodes.appendChild(text)
    }
  }

    /**
     * Returns an HTML representation of a Footnotes object.
     * @returns {HTMLElement} An HTML representation of a Footnotes object.
     */
  get html () {
    return this.nodes
  }
}

/**
 * Represents a single view.
 */
class View {
    /**
     * Initializes a View object with options. There is at least one view per part of speech,
     * but there could be several views for the same part of speech that show different table representation of a view.
     * @param {Object} viewOptions
     */
  constructor () {
        // this.options = viewOptions;
    this.pageHeader = {}

        // An HTML element where this view is rendered
    this.container = undefined

        // Must be implemented in a descendant
    this.id = 'baseView'
    this.name = 'base view'
    this.title = 'Base View'
    this.language = undefined
    this.partOfSpeech = undefined
  }

    /**
     * Converts a WordData, returned from inflection tables library, into an HTML representation of an inflection table
     * and inserts that HTML into a `container` HTML element. `messages` provides a translation for view's texts.
     * @param {HTMLElement} container - An HTML element where this view will be inserted.
     * @param {LexicalData} wordData - A result set from inflection tables library.
     * @param {MessageBundle} messages - A message bundle with message translations.
     */
  render (container, wordData, messages) {
    'use strict'

    this.messages = messages
    this.container = container
    this.wordData = wordData
    let selection = wordData[this.partOfSpeech]

    this.footnotes = new Footnotes(selection.footnotes)

        // this.table = new Table(selection.suffixes, this.groupingFeatures, messages);
        // this.table = new Table();
        // this.setTableData();
    this.table.messages = messages
    this.table.construct(selection.suffixes).constructViews()
    this.display()
  }

    /**
     * Renders a view's HTML representation and inserts it into `container` HTML element.
     */
  display () {
        // Clear the container
    this.container.innerHTML = ''

    let word = document.createElement('h2')
    word.innerHTML = this.wordData.homonym.targetWord
    this.container.appendChild(word)

    let title = document.createElement('h3')
    title.innerHTML = this.title
    this.container.appendChild(title)

    this.pageHeader = { nodes: document.createElement('div') }
    this.pageHeader.nodes.innerHTML = Styles.pageHeader.html
    this.pageHeader.hideEmptyColumnsBtn = this.pageHeader.nodes.querySelector(Styles.pageHeader.hideEmptyColumnsBtnSel)
    this.pageHeader.showEmptyColumnsBtn = this.pageHeader.nodes.querySelector(Styles.pageHeader.showEmptyColumnsBtnSel)
    this.pageHeader.hideNoSuffixGroupsBtn = this.pageHeader.nodes.querySelector(Styles.pageHeader.hideNoSuffixGroupsBtnSel)
    this.pageHeader.showNoSuffixGroupsBtn = this.pageHeader.nodes.querySelector(Styles.pageHeader.showNoSuffixGroupsBtnSel)
    this.container.appendChild(this.pageHeader.nodes)

        // Insert a wide view
    this.container.appendChild(this.table.wideView.render())
        // Insert narrow views
    this.container.appendChild(this.table.narrowView.render())

    this.table.addEventListeners()

    this.container.appendChild(this.footnotes.html)

    this.pageHeader.hideEmptyColumnsBtn.addEventListener('click', this.hideEmptyColumns.bind(this))
    this.pageHeader.showEmptyColumnsBtn.addEventListener('click', this.showEmptyColumns.bind(this))

    this.pageHeader.hideNoSuffixGroupsBtn.addEventListener('click', this.hideNoSuffixGroups.bind(this))
    this.pageHeader.showNoSuffixGroupsBtn.addEventListener('click', this.showNoSuffixGroups.bind(this))
  }

    /**
     * Hides all empty columns of the view.
     */
  hideEmptyColumns () {
    this.table.hideEmptyColumns()
    this.display()
    this.pageHeader.hideEmptyColumnsBtn.classList.add(Styles.classNames.hidden)
    this.pageHeader.showEmptyColumnsBtn.classList.remove(Styles.classNames.hidden)
  }

    /**
     * Displays all previously hidden columns.
     */
  showEmptyColumns () {
    this.table.showEmptyColumns()
    this.display()
    this.pageHeader.showEmptyColumnsBtn.classList.add(Styles.classNames.hidden)
    this.pageHeader.hideEmptyColumnsBtn.classList.remove(Styles.classNames.hidden)
  }

    /**
     * Hides groups (formed by first column feature) that have no suffix matches.
     */
  hideNoSuffixGroups () {
    this.table.hideNoSuffixGroups()
    this.display()
    this.pageHeader.hideNoSuffixGroupsBtn.classList.add(Styles.classNames.hidden)
    this.pageHeader.showNoSuffixGroupsBtn.classList.remove(Styles.classNames.hidden)
  }

    /**
     * Displays previously hidden groups with no suffix matches.
     */
  showNoSuffixGroups () {
    this.table.showNoSuffixGroups()
    this.display()
    this.pageHeader.hideNoSuffixGroupsBtn.classList.add(Styles.classNames.hidden)
    this.pageHeader.showNoSuffixGroupsBtn.classList.remove(Styles.classNames.hidden)
  }
}

export {Cell, RowTitleCell, HeaderCell, Column, Row, GroupFeatureType, GroupFeatureList,
    WideView, NarrowView, NarrowViewGroup, Table, Footnotes, View}

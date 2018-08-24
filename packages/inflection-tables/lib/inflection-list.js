import { Feature } from 'alpheios-data-models'

export default class InflectionList {
  constructor (type) {
    this.type = type
    this.items = [] // Suffixes or forms
    this.footnotesMap = new Map() // Footnotes (if any)
  }

  /**
   * Adds an individual item to the `items` array.
   * @param {Object} item
   */
  addItem (item) {
    if (!item) {
      throw new Error(`Inflection item cannot be empty`)
    }
    this.items.push(item)
  }

  /**
   * Adds suffix of form items
   * @param {Suffix[] | Form[] | Paradigm[]} items
   */
  addItems (items) {
    if (!items) {
      throw new Error(`Inflection items cannot be empty`)
    }
    if (!Array.isArray(items)) {
      throw new Error(`Inflection items must be in an array`)
    }
    if (items.length === 0) {
      throw new Error(`Inflection items array must not be empty`)
    }
    // Store only new items, avoid duplicates
    for (const item of items) {
      if (!this.hasItem(item)) {
        this.items.push(item)
      }
    }
  }

  /**
   * Adds a singe footnote object. If a footonte with the same index exists, it will be rewritten.
   * @param {string} index - A footnote index
   * @param {Footnote} footnote - A footnote object
   */
  addFootnote (index, footnote) {
    this.footnotesMap.set(index, footnote)
  }

  /**
   * Checks if item with the same ID is already stored in array of inflection data.
   * @param {Suffix | Form | Paradigm} morpheme - An item to be checked against stored in inflection data.
   * @return {boolean} True if this item is stored in inflection data, false otherwise.
   */
  hasItem (morpheme) {
    return this.items.some(i => i.id === morpheme.id)
  }

  /**
   * Checks if an array of items has at least one element that matches an inflection.
   *  A match is determined as a result of item's `match` function.
   * @param {Inflection[]} inflections - One or several inflection to match against.
   * @return {boolean} - True if there is at least one match, false otherwise
   */
  hasMatches (inflections) {
    return this.items.some(i => i.matches(inflections))
  }

  /**
   * Returns an array of items that `matches` an inflection. A match is determined as a result of item's `match`
   * function. Returned value is determined by item's `match` function as well.
   * @param {Inflection[]} inflections - An inflection to match against.
   * @return {Suffix[]|Form[]|Paradigm[]} An array of objects. Each object is returned by a `match` function of an individual item.
   * Its format is dependent on the `match` function implementation.
   */
  getMatches (inflections) {
    return this.items.filter(i => i.matches(inflections))
  }

  /**
   * Returns a sorted (as numbers) array of footnote indexes that are used by items within an `items` array
   * @return {number[]}
   */
  get footnotesInUse () {
    let set = new Set()
    // Scan all selected morphemes to build a unique set of footnote indexes
    for (const item of this.items) {
      if (item.hasOwnProperty(Feature.types.footnote)) {
        // Footnote indexes are stored in an array
        for (let index of item[Feature.types.footnote]) {
          set.add(index)
        }
      }
    }
    return Array.from(set).sort((a, b) => parseInt(a) - parseInt(b))
  }
}

import InflectionList from './inflection-list.js'

/**
 * Stores inflections data of different types {such as `Suffix`, `Form`, or `Paradigm`} in a `types` map. Items are grouped by type.
 * May also store inflections that corresponds to stored inflection data.
 */
export default class InflectionSet {
  constructor (partOfSpeech, languageID) {
    this.languageID = languageID
    this.partOfSpeech = partOfSpeech

    // Stores inflections (i.e. a form of a word with grammatical features as returned by a morph analyzer
    this.inflections = []

    // Stores inflections data (suffixes, forms, and paradigms) for inflections
    this.types = new Map()
  }

  /**
   * Checks if an `InflectionSet` has any types stored. If it does not, it means that an `InflectionSet` is empty.
   * @return {boolean}
   */
  get hasTypes () {
    return this.types.size !== 0
  }

  /**
   * Return a list of item types this set contains.
   * @return {Function<Morpheme>[]}
   */
  get inflectionTypes () {
    return Array.from(this.types.keys())
  }

  /**
   * Checks whether an inflection set has any items of certain type that matches an inflection.
   * @param {Function<Suffix> | Function<Form> | Function<Paradigm>} itemType - A type of an item.
   * @param {Inflection[]} inflections - One or several inflections to match.
   * @return {boolean} True if there are matches, false otherwise
   */
  hasMatchingItems (itemType, inflections) {
    return (this.types.has(itemType) && this.types.get(itemType).hasMatches(inflections))
  }

  /**
   * Returns an array of items of certain type that matches an inflection.
   * @param {Function<Suffix> | Function<Form> | Function<Paradigm>} itemType - A type of an item.
   * @param {Inflection[]} inflections - One or several inflections to match.
   * @return {Suffix[] | Form[] | Paradigm[] | []} Array of items of a particular type if any matches found.
   * An empty array otherwise.
   */
  getMatchingItems (itemType, inflections) {
    return this.types.has(itemType) ? this.types.get(itemType).getMatches(inflections) : []
  }

  /**
   * Adds a single inflection item to the set
   * @param {Suffix | Form | Paradigm} inflection
   */
  addInflectionItem (inflection) {
    this.addInflectionItems([inflection])
  }

  /**
   * Adds an array of inflection items of the same type.
   * @param {Suffix[] | Form[] | Paradigm[]} items
   */
  addInflectionItems (items) {
    // We assume all inflection items have the same type
    let classType = items[0].constructor

    if (!this.types.has(classType)) {
      this.types.set(classType, classType.createList())
    }

    this.types.get(classType).addItems(items)
  }

  /**
   * Adds an InflectionSet to the existing one. All inflections of a foreign inflection set
   * will be added to the current one. Inflection data items (Suffixes, Forms, Paradigms) will
   * be added only if they do not exist in the current InflectionSet.
   * @param inflectionSet
   */
  addInflectionSet (inflectionSet) {
    if (this.languageID === inflectionSet.languageID && this.partOfSpeech === inflectionSet.partOfSpeech) {
      this.inflections.push(...inflectionSet.inflections)
      for (const items of this.types.values()) {
        this.addInflectionItems(items)
      }
    } else {
      console.warn(`Cannot add inflectionSet [languageID=${inflectionSet.languageID.toString()}, POFS=${inflectionSet.partOfSpeech}]` +
        ` to [languageID=${this.languageID.toString()}, POFS=${this.partOfSpeech}]`)
    }
  }

  /**
   * Adds a footnote object to inflection data of a specific class type.
   * @param {Suffix | Form | Paradigm} classType.
   * @param {number} index - A footnote index.
   * @param {Footnote} footnote - A Footnote object.
   */
  addFootnote (classType, index, footnote) {
    if (!this.types.has(classType)) {
      this.types.set(classType, new InflectionList(classType))
    }
    this.types.get(classType).addFootnote(index, footnote)
  }
}

import Inflections from './inflections.js'
import Paradigm from './paradigm.js'

/**
 * Stores inflections of different types {such as `Suffix`, `Form`, or `Paradigm`} in a `types` map. Items are grouped by type.
 */
export default class InflectionSet {
  constructor (partOfSpeech) {
    this.partOfSpeech = partOfSpeech
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
   * @return {Function<Object>[]}
   */
  get inflectionTypes () {
    return Array.from(this.types.keys())
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
   * @param {Suffix[] | Form[] | Paradigm[]} inflections
   */
  addInflectionItems (inflections) {
    let classType = inflections[0].constructor.ClassType
    if (!this.types.has(classType)) {
      this.types.set(classType, new Inflections(classType))
    }
    this.types.get(classType).addItems(inflections)
  }

  /**
   * Adds an `Inflections` group of certain type.
   * @param {Inflections} inflectionsObject
   */
  addInflectionsObject (inflectionsObject) {
    if (!inflectionsObject) {
      throw new Error(`Inflection items object must not be empty`)
    }
    if (!(inflectionsObject instanceof Inflections)) {
      throw new Error(`Inflection items object must be of InflectionItems type`)
    }
    const type = inflectionsObject.type
    if (!type) {
      throw new Error(`Inflection items must have a valid type`)
    }

    this.types.set(type, inflectionsObject)
  }

  addFootnote (classType, index, footnote) {
    if (!this.types.has(classType)) {
      this.types.set(classType, new Inflections(classType))
    }
    this.types.get(classType).addFootnote(index, footnote)
  }

  getMatchingParadigms (inflection) {
    console.log(`Matching paradigms`)
    if (this.types.has(Paradigm)) {
      const paradigms = this.types.get(Paradigm)
      return paradigms.getMatches(inflection).map(o => o.paradigm)
    }
    return []
  }
}

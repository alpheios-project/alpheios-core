/**
 * An interface for comparing simple objects
 * when those objects are used as keys in Maps or Sets.
 */
export default class Comparable {
  /**
   * Creates a unique comparison key for a simple object.
   * @param {Object} object - A simple object
   * @return {string} - A unique object key
   */
  static key (object) {
    return `Key: ${Object.values(object).join(' ')}`
  }
}

import Morpheme from './morpheme.js'

export default class Suffix extends Morpheme {
  /**
   * Initializes a Suffix object.
   * @param {string | null} suffixValue - A suffix text or null if suffix is empty.
   */
  constructor (suffixValue) {
    super(suffixValue, Suffix)
  }
}

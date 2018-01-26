import Morpheme from './morpheme.js'

/**
 * Suffix is an ending of a word with none or any grammatical features associated with it.
 * Features are stored in properties whose names are type of a grammatical feature (i.e. case, gender, etc.)
 * Each feature can have a single or multiple values associated with it (i.e. gender can be either 'masculine',
 * a single value, or 'masculine' and 'feminine'. That's why all values are stored in an array.
 */
export default class Form extends Morpheme {
  /**
   * Initializes a Suffix object.
   * @param {string | null} suffixValue - A suffix text or null if suffix is empty.
   */
  constructor (suffixValue) {
    super(suffixValue, Suffix)
  }
}

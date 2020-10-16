import Sha1 from './sha1.js'

/**
 * Creates an SHA-1 hash digest. The generating code is not suitable for cryptographic purposes,
 * but is good enough for rendering unique IDs of strings and objects.
 */
export default class Digest {
  /**
   * Creates an SHA-1 hash digest from a string.
   * Based on the code example from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
   *
   * @param {string} string - A text of a message whose digest will be calculated.
   * @returns {string} - A digest string.
   */
  static fromString (string) {
    return Sha1.hash(string)
  }

  /**
   * Creates an SHA-1 hash digest  from an object.
   * Based on the code example from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
   *
   * @param {object} object - An object for hash calculation.
   * @returns {string} - A digest string.
   */
  static fromObject (object) {
    const string = JSON.stringify(object)
    return this.fromString(string)
  }
}

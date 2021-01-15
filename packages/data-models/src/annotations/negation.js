import User from '@dmodels/user-identity/user.js'
import IRIProvider from '@dmodels/iri/iri-provider.js'

export default class Negation {
  /**
   * @param {User} author - A user who made an negation.
   * @param {object} options - Optional parameters.
   * @param {number} [options.confidence] - A level of confidence, a whole number.
   * @param {Date} [options.dateTime] - When an negation was made.
   */
  constructor (author, { confidence = 1, dateTime = new Date() } = {}) {
    if (!confidence) { throw new Error(Negation.errMsgs.CONFIDENCE_IS_MISSING) }
    if (!author) { throw new Error(Negation.errMsgs.AUTHOR_IS_MISSING) }
    if (!(author instanceof User)) { throw new Error(Negation.errMsgs.AUTHOR_TYPE_MISMATCH) }
    if (!dateTime) { throw new Error(Negation.errMsgs.DATETIME_IS_MISSING) }
    if (!(dateTime instanceof Date)) { throw new Error(Negation.errMsgs.DATETIME_TYPE_MISMATCH) }

    /** @type {User} */
    this._author = author
    /** @type {number} */
    this._confidence = confidence
    /** @type {Date} */
    this._dateTime = dateTime
    /** @type {string} */
    this._ID = IRIProvider.getIRI()
  }

  get author () {
    return this._author
  }

  get confidence () {
    return this._confidence
  }

  get dateTime () {
    return this._dateTime
  }

  get ID () {
    return this._ID
  }
}

Negation.errMsgs = {
  CONFIDENCE_IS_MISSING: 'The required confidence argument is not provided',
  AUTHOR_IS_MISSING: 'The required author argument is not provided',
  AUTHOR_TYPE_MISMATCH: 'The author argument is not of the User type',
  DATETIME_IS_MISSING: 'The required dateTime argument is not provided',
  DATETIME_TYPE_MISMATCH: 'The dateTime argument is not of the Date type'
}

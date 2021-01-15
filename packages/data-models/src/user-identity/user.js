export default class User {
  /**
   * @param {string} ID - A user ID.
   * @param {object} options - Optional parameters.
   * @param {string} [options.name] - A name of the user.
   * @param {string} [options.nickname] - A user nickname.
   */
  constructor (ID, { name, nickname } = {}) {
    if (!ID) { throw new Error(User.errMsgs.ID_IS_MISSING) }

    /** @type {string} */
    this._ID = ID
    /** @type {string} */
    this._name = name
    /** @type {string} */
    this._nickname = nickname
  }

  get ID () {
    return this._ID
  }

  get name () {
    return this._name
  }

  get nickname () {
    return this._nickname
  }
}

User.errMsgs = {
  ID_IS_MISSING: 'The required ID argument is not provided'
}

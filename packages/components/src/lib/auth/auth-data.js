/**
 * Definition of an AuthData class.
 *
 * @module AuthData
 */

/**
 * A class representing an authentication data in a format that is provider agnostic.
 *
 * Not all props must necessarily be populated all the time. What props data is present depends
 * on the state of the authentication and on what data is available and what data
 * was presented by the holder of auth data.
 */
export default class AuthData {
  constructor () {
    /**
     * Whether a user has been authenticated or not.
     *
     * @type {boolean}
     * @public
     */
    this.isAuthenticated = false

    /**
     * An access token string
     *
     * @type {string}
     * @public
     */
    this.accessToken = undefined

    /**
     * An expiration date and time of an access token.
     *
     * @type {Date}
     * @public
     */
    this.expirationDateTime = undefined

    /**
     * A user id (in Auth0 it is `sub`).
     *
     * @type {string}
     * @public
     */
    this.userId = undefined

    /**
     * A user name.
     *
     * @type {string}
     * @public
     */
    this.userName = undefined

    /**
     * A user nickname.
     *
     * @type {string}
     * @public
     */
    this.userNickname = undefined
  }

  /**
   * Creates an instance of an AuthData object out of a serializable one.
   *
   * @param {object} serializable - A serializable version of an AuthData object.
   * @returns {AuthData} - An AuthData object populated with data from serializable.
   */
  static fromSerializable (serializable) {
    let authData = new AuthData() // eslint-disable-line prefer-const
    Object.assign(authData, serializable)
    authData.expirationDateTime = serializable.expirationDateTime ? new Date(serializable.expirationDateTime) : undefined
    return authData
  }

  /**
   * Creates a serializable copy of an AuthData object.
   *
   * @returns {object} - A serializable copy of an AuthData object.
   */
  serializable () {
    let serializable = Object.assign({}, this) // eslint-disable-line prefer-const
    serializable.expirationDateTime = this.expirationDateTime.toJSON()
    return serializable
  }

  /**
   * Sets an authentication status
   *
   * @param {boolean} authStatus - Authentication status: true if user is authenticated, false otherwise.
   * @returns {AuthData} - A self reference for chaining.
   */
  setAuthStatus (authStatus) {
    this.isAuthenticated = authStatus
    return this
  }

  /**
   * Sets an expiration date and time from a duration provided.
   *
   * @param {number} interval - An expiration interval, in milliseconds.
   * @returns {AuthData} - A self reference for chaining.
   */
  setSessionDuration (interval) {
    this.expirationDateTime = new Date(Date.now() + interval)
    return this
  }

  /**
   * Checks if the user session has been expired.
   *
   * @returns {boolean} - True if expired, false otherwise.
   */
  get isExpired () {
    return (this.expirationDateTime.getTime() <= Date.now())
  }

  /**
   * Returns a remaining duration of a user session.
   *
   * @returns {number} - Remaining duration of user session, in milliseconds, or zero if session has been expired.
   */
  get expirationInterval () {
    return !this.isExpired ? this.expirationDateTime.getTime() - Date.now() : 0
  }
}

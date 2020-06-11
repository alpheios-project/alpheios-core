import AuthData from './auth-data'
/**
 * Encapsulates Authentication Functionality For a Client Side Application
 */
export default class SessionAuthenticator {
  /**
   * @constructor
   * @param {Object} env - environment object with the following properties
   *    LOGIN_URL - login url
   *    LOGOUT_URL - logout url
   *    SESSION_URL - session url
   *    TOKEN_URL - token url
   *    ENDPOINTS - Alpheios user api endpoints
   */
  constructor (env) {
    this.sessionUrl = env.SESSION_URL
    this.tokenUrl = env.TOKEN_URL
    this.endpoints = env.ENDPOINTS
    this._loginUrl = env.LOGIN_URL
    this._logoutUrl = env.LOGOUT_URL
    this._authData = new AuthData()
  }

  /**
   * Login link for server
   * @return {String} login link from config
   */
  loginUrl () {
    return this._loginUrl
  }

  /**
   * Logout link for server
   * @return {String} logout link from config
   */
  logoutUrl () {
    return this._logoutUrl
  }

  session () {
    return new Promise((resolve, reject) => {
      window.fetch(this.sessionUrl).then((resp) => {
        if (!resp.ok) {
          reject(resp.code)
        } else {
          resp.json().then(data => {
            /*
            The following data will be provided by the server:
            sub - A user ID
            name - A user name
            nickname - A user nickname
            expires_in - A user session expiration interval, in seconds
             */
            this._authData.setAuthStatus(true).setSessionDuration(data.expires_in * 1000)
            this._authData.userId = data.sub
            this._authData.userName = data.name
            this._authData.userNickname = data.nickname
            resolve(this._authData)
          }).catch(e => {
            reject(new Error('Unable to decode a session response from a remote server'))
          })
        }
      }).catch((error) => {
        reject(new Error(`Session request failed ${error}`))
      })
    })
  }

  authenticate () {
    // TODO we should check to see if we already have a valid idToken before
    // initiating authentication
    return new Promise((resolve, reject) => {
      reject(new Error('Server Side Authenticator'))
    })
  }

  getUserData () {
    return new Promise((resolve, reject) => {
      window.fetch(this.tokenUrl).then((resp) => {
        if (!resp.ok) {
          reject(resp.code)
        } else {
          resolve(resp.json())
        }
      }).catch((error) => {
        reject(new Error(`token request failed ${error}`))
      })
    })
  }

  /**
   * Retrieves the list of configured endpoints for the environment
   * @return {Object}
   */
  getEndPoints () {
    return this.endpoints
  }

  /**
   * Respond to a logout request
   */
  async logout () {
    this._authData.setAuthStatus(false)
    this._authData.userId = ''
    this._authData.name = ''
    this._authData.nickname = ''
  }
}

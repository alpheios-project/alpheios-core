import Module from '@/vue/vuex-modules/module.js'
import Platform from '@/lib/utility/platform.js'
import AuthData from '@/lib/auth/auth-data.js'

export default class AuthModule extends Module {
  /**
   * @param {Object} config - A module's configuration object.
   *        {Object} auth - A background or app authenticator object.
   */
  constructor (store, api, config) {
    super(store, api, config)
    this._auth = this.config.auth
    this._authData = new AuthData()
    this._expirationTimeoutId = null
    this._externalLoginUrl = null
    this._externalLogoutUrl = null
    if (this._auth) {
      try {
        this._externalLoginUrl = this._auth.loginUrl()
        this._externalLogoutUrl = this._auth.logoutUrl()
      } catch (e) {
        // fail quietly
      }
    }
    store.registerModule(this.constructor.moduleName, this.constructor.store(this))
    api[this.constructor.moduleName] = this.constructor.api(this, store)
  }

  updateAuthData (authData, store) {
    this._authData = authData

    if (this.config.queryParams && this.config.queryParams.sessionDuration) {
      const customSessionDuration = this.config.queryParams.sessionDuration
      // Do not allow to override session duration to values higher than set by the auth server
      if (customSessionDuration && Number(customSessionDuration) * 1000 < this._authData.expirationInterval) {
        this._authData.setSessionDuration(Number(customSessionDuration) * 1000)
      }
    }

    store.commit('auth/setIsAuthenticated', this._authData)

    if (!this._authData.isExpired) {
      if (!this._expirationTimeoutId) {
        this._expirationTimeoutId = window.setTimeout(() => {
          store.commit('auth/expireSession')
          store.commit('auth/setNotification', { text: 'AUTH_SESSION_EXPIRED_MSG' })
          this._expirationTimeoutId = null
        }, this._authData.expirationInterval)
      }
    }
  }
}

AuthModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      userId: '',
      userNickName: '',
      isAuthenticated: false,
      isSessionExpired: false,
      expirationDateTime: null, // A date and time when an access token expires
      notification: {
        visible: false,
        hideLoginPrompt: false,
        showLogin: false,
        count: 0,
        text: null
      },
      externalLoginUrl: moduleInstance._externalLoginUrl,
      externalLogoutUrl: moduleInstance._externalLogoutUrl,
      enableLogin: Boolean(moduleInstance._auth) // don't enable login if we have no auth object
    },
    mutations: {
      setIsAuthenticated: (state, authData) => {
        state.isAuthenticated = true
        state.expirationDateTime = authData.expirationDateTime
        state.userId = authData.userId
        state.userNickName = authData.userNickname
      },

      setIsNotAuthenticated: (state) => {
        state.isAuthenticated = false
        state.isSessionExpired = false
        state.expirationDateTime = null
        state.userId = ''
        state.userNickName = ''
      },

      expireSession: (state) => {
        state.isAuthenticated = false
        state.isSessionExpired = true
      },

      /**
       * set a UI notification
       *
       * @param {Object} state current state Object
       * @param {Object} data notification object with the following properties:
       *   { showLogin: Boolean - set to true if the notification is a prompt for login
       *     count: int - a counter for the number of times the notification has been issued
       *     text: String - the text of the notification message
       *   }
       */
      setNotification (state, data) {
        // don't show login notifications if they have been hidden
        if (data.showLogin && state.notification.hideLoginPrompt) {
          state.notification.visible = false
        } else {
          state.notification.visible = true
        }
        state.notification.showLogin = data.showLogin || false
        state.notification.count = data.count || 0
        state.notification.text = data.text || data
      },
      /**
       * reset the notification state
       * @param {Object} state current state object
       */
      resetNotification (state) {
        state.notification.visible = false
        state.notification.showLogin = false
        state.notification.text = null
        state.notification.count = 0
      },
      /**
       * set the hideLoginPrompt state
       * @param {Object} state current state Object
       * @param {Boolean} data value for state.notification.hideLoginPrompt
       *                       true if login prompt is to be hidden, false if not
       */
      setHideLoginPrompt (state, data) {
        state.notification.hideLoginPrompt = data
        // if we are responding to a request to hide the login prompt
        // set any current login notification to invisible
        if (data && state.notification.showLogin) {
          state.notification.visible = false
          state.notification.showLogin = false
          state.notification.text = null
          state.notification.count = 0
        }
      }
    }
  }
}

AuthModule.api = (moduleInstance, store) => {
  return {
    session: () => {
      if (!moduleInstance._auth) {
        // fail quietly
        return
      }
      moduleInstance._auth.session().then((data) => {
        moduleInstance.updateAuthData(data, store)
      }).catch((error) => { // eslint-disable-line handle-callback-err
        // a session being unavailable is not necessarily an error
        // user might not have authenticated or it might be client-side auth
        // fail quietly
      })
    },

    /**
     * Logs the user in.
     * @param {object} authData - Data that may be required for user authentication.
     * It is passed to the `authenticate()` method of the Authenticator object.
     * Its format of this data is dependent on what type of Authenticator is used in the environment
     * in which AuthModule operates. Please see an environment-specific Authenticator
     * implementation for more details (i.e. BgAuthenticator, SafariAuthenticator, etc.).
     */
    authenticate: (authData) => {
      if (!moduleInstance._auth) {
        // fail quietly
        return
      }
      store.commit('auth/setNotification', { text: 'AUTH_LOGIN_PROGRESS_MSG' })

      moduleInstance._auth.authenticate(authData).then(() => {
        return moduleInstance._auth.getProfileData()
      }).then((profileData) => {
        // `profileData` is an AuthData object
        if (!profileData.userId) {
          throw new RangeError('UserId is empty!')
        }

        moduleInstance.updateAuthData(profileData, store)
        store.commit('auth/setNotification', { text: 'AUTH_LOGIN_SUCCESS_MSG' })
      }).catch((error) => {
        console.error('Alpheios authentication failed', error)
        return store.commit('auth/setNotification', { text: 'AUTH_LOGIN_AUTH_FAILURE_MSG' })
      })
    },

    /**
     * Logs the user out
     */
    logout: () => {
      if (!moduleInstance._auth) {
        return
      }
      moduleInstance._auth.logout().then(() => {
        store.commit('auth/setIsNotAuthenticated')
        return store.commit('auth/setNotification', { text: 'AUTH_LOGOUT_SUCCESS_MSG' })
      }).catch((error) => {
        console.error('Alpheios logout failed', error)
      })
    },

    getUserData: () => {
      return new Promise((resolve, reject) => {
        if (moduleInstance._auth) {
          let accessToken
          moduleInstance._auth.getUserData().then((token) => {
            accessToken = token
            return moduleInstance._auth.getEndPoints()
          }).then((endpoints) => {
            resolve({
              accessToken: accessToken,
              userId: store.state.auth.userId,
              endpoints: endpoints
            })
          }).catch((error) => {
            console.error('Unexpected error retrieving Alpheios user profile data', error)
          })
        } else {
          reject(new Error('Authentication is not enabled'))
        }
      })
    }
  }
}

AuthModule._configDefaults = {
  _moduleName: 'auth',
  _moduleType: Module.types.DATA,
  _supportedDeviceTypes: [Platform.deviceTypes.ANY],
  auth: null
}

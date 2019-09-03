import Module from '@/vue/vuex-modules/module.js'
import Platform from '@/lib/utility/platform.js'

export default class AuthModule extends Module {
  /**
   * @param {Object} config - A module's configuration object.
   *        {Object} auth - A background or app authenticator object.
   */
  constructor (store, api, config) {
    super(store, api, config)
    this._auth = this.config.auth
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

    if (this._auth) {
      console.info(`Authenticator is available`)
      // If authenticator publishes any events
      if (this._auth.constructor.evt) {
        console.info(`Authenticator does publish events`)
        if (this._auth.constructor.evt.LOGGED_IN) {
          console.info(`Authenticator does publish a LOGGED_IN event`)
          this._auth.constructor.evt.LOGGED_IN.sub(api[this.constructor.moduleName].logUserIn)
        }
        if (this._auth.constructor.evt.LOGGED_OUT) {
          console.info(`Authenticator does publish a LOGGED_OUT event`)
          this._auth.constructor.evt.LOGGED_OUT.sub(api[this.constructor.moduleName].logUserOut)
        }
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
      setIsAuthenticated: (state, profile) => {
        state.isAuthenticated = true
        state.userId = profile.sub
        state.userNickName = profile.nickname
      },
      setIsNotAuthenticated: (state) => {
        state.isAuthenticated = false
        state.userId = ''
        state.userNickName = ''
      },
      /**
       * set a UI notification
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
        store.commit('auth/setIsAuthenticated', data)
      }).catch((error) => { // eslint-disable-line handle-callback-err
        // a session being unavailable is not necessarily an error
        // user might not have authenticated or it might be client-side auth
        // fail quietly
      })
    },
    authenticate: () => {
      if (!moduleInstance._auth) {
        // fail quietly
        return
      }
      store.commit(`auth/setNotification`, { text: 'AUTH_LOGIN_PROGRESS_MSG' })
      moduleInstance._auth.authenticate().then(() => {
        return moduleInstance._auth.getProfileData()
      }).then((data) => {
        // TODO: Switch to using setAuthenticatedState to avoid code duplication
        if (!data.sub) {
          throw new RangeError('UserId is empty!')
        }
        store.commit('auth/setIsAuthenticated', data)
        store.commit(`auth/setNotification`, { text: 'AUTH_LOGIN_SUCCESS_MSG' })
      }).catch((error) => {
        console.error('Alpheios authentication failed', error)
        return store.commit(`auth/setNotification`, { text: 'AUTH_LOGIN_AUTH_FAILURE_MSG' })
      })
    },

    logUserIn: (userData) => {
      console.info(`logUserIn`)
      if (!userData.id) {
        throw new RangeError('UserId is empty!')
      }
      store.commit('auth/setIsAuthenticated', {
        sub: userData.userId,
        nickname: userData.nickname
      })
      store.commit(`auth/setNotification`, { text: 'AUTH_LOGIN_SUCCESS_MSG' })
    },

    logout: () => {
      if (!moduleInstance._auth) {
        return
      }
      moduleInstance._auth.logout().then(() => {
        // TODO: Switch to using setLogoutState to avoid code duplication
        store.commit('auth/setIsNotAuthenticated')
        return store.commit(`auth/setNotification`, { text: 'AUTH_LOGOUT_SUCCESS_MSG' })
      }).catch((error) => {
        console.error('Alpheios logout failed', error)
      })
    },

    logUserOut: () => {
      console.info(`logUserOut`)
      store.commit('auth/setIsNotAuthenticated')
      store.commit(`auth/setNotification`, { text: 'AUTH_LOGOUT_SUCCESS_MSG' })
    },

    getUserData: () => {
      if (moduleInstance._auth && moduleInstance._auth.hasUserData) {
        // User data has already been obtained, as with a Safari authentication schema
        return new Promise((resolve, reject) => {
          console.info(`Returning a user data from getUserData()`)
          resolve({
            accessToken: moduleInstance._auth.accessToken,
            userId: moduleInstance._auth.userId,
            endpoints: moduleInstance._auth.endpoints
          })
        })
      }
      // The following is for data retrieval workflow initiated from within the
      // AuthModule as opposed to the one initiated from the outside (i.e. within Safari)
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

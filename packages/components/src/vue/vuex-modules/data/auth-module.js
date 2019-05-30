import Module from '@comp-src/vue/vuex-modules/module.js'
import Platform from '@comp-src/lib/utility/platform.js'

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
        console.warn('AuthModule is missing loginUrl/logoutUrl methods')
      }
    }
    store.registerModule(this.constructor.moduleName, this.constructor.store(this))
    api[this.constructor.moduleName] = this.constructor.api(this, store)
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
      setNotification (state, data) {
        state.notification.visible = true
        state.notification.showLogin = data.showLogin || false
        state.notification.count = data.count || 0
        state.notification.text = data.text || data
      },
      resetNotification (state) {
        state.notification.visible = false
        state.notification.showLogin = false
        state.notification.text = null
        state.notification.count = 0
      }
    }
  }
}

AuthModule.api = (moduleInstance, store) => {
  return {
    session: () => {
      moduleInstance._auth.session().then((data) => {
        store.commit('auth/setIsAuthenticated', data)
      }).catch((error) => {
        // a session being unavailable is not necessarily an error
        // user might not have authenticated or it might be client-side auth
        console.warn('Session unavailable', error)
      })
    },
    authenticate: () => {
      store.commit(`auth/setNotification`, { text: 'AUTH_LOGIN_PROGRESS_MSG' })
      moduleInstance._auth.authenticate().then(() => {
        return moduleInstance._auth.getProfileData()
      }).then((data) => {
        if (!data.sub) {
          throw new RangeError('UserId is empty!')
        }
        store.commit('auth/setIsAuthenticated', data)
        store.commit(`auth/setNotification`, { text: 'AUTH_LOGIN_SUCCESS_MSG' })
      }).catch((error) => {
        console.error('Authenticate failed', error)
        return store.commit(`auth/setNotification`, { text: 'AUTH_LOGIN_AUTH_FAILURE_MSG' })
      })
    },
    logout: () => {
      moduleInstance._auth.logout().then(() => {
        store.commit('auth/setIsNotAuthenticated')
        return store.commit(`auth/setNotification`, { text: 'AUTH_LOGOUT_SUCCESS_MSG' })
      }).catch((error) => {
        console.error('Logout failed', error)
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
            console.error('Error retrieving user data', error)
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

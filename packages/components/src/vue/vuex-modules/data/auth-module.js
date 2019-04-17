import Module from '@/vue/vuex-modules/module.js'
import HTMLPage from '@/lib/utility/html-page.js'

export default class AuthModule extends Module {
  /**
   * @param {Object} config - A module's configuration object.
   *        {Object} auth - A background or app authenticator object.
   */
  constructor (store, api, config) {
    super(store, api, config)
    this._auth = this.config.auth
    // enable ui in initial unauthenticated state only if we have an auth object that allows login
    this._showUIDefault = !!this._auth && this._auth.enableLogin()
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
      showUI: moduleInstance._showUIDefault,
      enableLogin: moduleInstance._showUIDefault, // this doesn't change based upon auth
      promptLogin: !!moduleInstance._auth // don't prompt for login if we have no auth object
    },
    mutations: {
      setIsAuthenticated: (state, profile) => {
        state.isAuthenticated = true
        state.userId = profile.sub
        state.userNickName = profile.nickname
        state.showUI = true
      },
      setIsNotAuthenticated: (state) => {
        state.isAuthenticated = false
        state.userId = ''
        state.userNickName = ''
        state.showUI = moduleInstance._showUIDefault
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
  _supportedPlatforms: [HTMLPage.platforms.ANY],
  auth: null
}

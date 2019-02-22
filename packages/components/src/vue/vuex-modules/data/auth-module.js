import Module from '@/vue/vuex-modules/module.js'

export default class AuthModule extends Module {
  /**
   * @param {Object} auth - A background or app authenticator object
   */
  constructor (store, api, auth) {
    super()
    this._auth = auth
    this.store = {
      // All stores of modules are namespaced
      namespaced: true
    }
    store.registerModule(this.constructor.moduleName, this.store)

    this.api = () => {
      return {
        authenticate: this._auth.authenticate.bind(this._auth),
        getProfileData: this._auth.getProfileData.bind(this._auth),
        getUserData: this._auth.getUserData.bind(this._auth),
        logout: this._auth.logout.bind(this._auth)
      }
    }
    api[this.constructor.moduleName] = this.api()
  }
}

AuthModule.moduleName = 'auth'

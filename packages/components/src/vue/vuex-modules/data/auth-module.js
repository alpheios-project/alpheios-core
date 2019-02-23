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
    store.registerModule(this.constructor.moduleName, this.constructor.store())

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

AuthModule._configDefaults = {
  _moduleName: 'auth',
  _moduleType: Module.types.DATA,
  _supportedPlatforms: [HTMLPage.platforms.ANY],
  auth: null
}

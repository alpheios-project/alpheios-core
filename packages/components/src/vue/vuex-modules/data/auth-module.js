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
    store.registerModule(this.constructor.moduleName, this.constructor.store(this))
    api[this.constructor.moduleName] = this.constructor.api(this)
  }
}

AuthModule.api = (moduleInstance) => {
  return {
    authenticate: moduleInstance._auth.authenticate.bind(moduleInstance._auth),
    getProfileData: moduleInstance._auth.getProfileData.bind(moduleInstance._auth),
    getUserData: moduleInstance._auth.getUserData.bind(moduleInstance._auth),
    logout: moduleInstance._auth.logout.bind(moduleInstance._auth)
  }
}

AuthModule._configDefaults = {
  _moduleName: 'auth',
  _moduleType: Module.types.DATA,
  _supportedPlatforms: [HTMLPage.platforms.ANY],
  auth: null
}

import { Logger, Options } from 'alpheios-data-models'
import FeatureOptionsDefaults from '@comp/settings/feature-options-defaults.json'
import UIOptionsDefaults from '@comp/settings/ui-options-defaults.json'
import ResourcesOptionsDefaults from '@comp/settings/language-options-defaults.json'
import SiteOptionsDefaults from '@comp/settings/site-options.json'

/** @typedef {string} LexiconKeys */

// eslint-disable-next-line no-unused-vars
/** @enum {string} LexiconKeys */
const LexiconKeys = {
  LEXICONS: 'lexicons',
  LEXICON_SHORT: 'lexiconsShort'
}

/**
 * @typedef {object} LexiconList - an object that contains URLs of sources that can be used to retrieve the lexicon data.
 * @property {string[]} allow - an array of URLs of sources that are allowed to be used for the lexicon data retrieval.
 */

export default class SettingsController {
  constructor () {
    this._storageAdapter = null

    this._featureOptions = null
    this._resourceOptions = null
    this._uiOptions = null
    this._siteOptions = null

    /**
     * Holds a shard app-wide API object
     *
     * @type {object}
     * @private
     */
    this._api = {}

    // A shared Vuex store object
    this._store = null

    // An object that stores config settings of a controller
    this._config = {
    }
  }

  async init ({ api, store, configServiceUrl, clientId, appName, appVersion, branch, buildNumber, storageAdapter } = {}) {
    if (!api) {
      throw new Error('API object is required for a settings controller initialization')
    }
    if (!store) {
      throw new Error('Vuex store is required for a settings controller initialization')
    }

    // TODO: Eliminate dependency on the AppController's API
    this._api = api
    // TODO: Eliminate the need to use the Vuex store
    this._store = store
    this._storageAdapter = storageAdapter

    this._configServiceUrl = configServiceUrl
    this._clientId = clientId
    this._appName = appName
    this._appVersion = appVersion
    this._branch = branch
    this._buildNumber = buildNumber

    try {
      const appConfigPromise = this.requestAppOptions()
      const initOptionsPromise = this.initOptions()
      /*
      We do not allow user to configure siteOptions currently.
      Because of this, they are initialized separately from the rest of the options.
      `initOptions()` will be called several times during the app's lifetime,
      after a user has been logged in, as one example.
      `initNonConfigurableOptions()` will be called only once,
      during an initialization of the Settings Controller.
       */
      this.initNonConfigurableOptions()
      const [appConfigResponse] = await Promise.all([appConfigPromise, ...initOptionsPromise])
      this._appConfig = await appConfigResponse.json() // Parse an app config's response into JSON
    } catch (err) {
      Logger.getInstance().error(`Unable to retrieve an app configuration from ${this._configServiceUrl}: ${err.message}`)
      this._appConfig = this._appConfig || {}
    }

    // region Public API of a settings controller
    // A public API must be defined before modules are created because modules may use it
    this._api.settings = {
      initOptions: this.initOptions.bind(this),
      getLexisOptions: this.getLexisOptions.bind(this),
      getLogeionOptions: this.getLogeionOptions.bind(this),
      getLexiconsOptions: this.getLexiconsOptions.bind(this),
      getFeatureOptions: this.getFeatureOptions.bind(this),
      getResourceOptions: this.getResourceOptions.bind(this),
      getUiOptions: this.getUiOptions.bind(this),
      // we don't offer UI to change to siteOptions
      // so they remain out of dynamic state for now - should eventually refactor
      siteOptions: this._siteOptions, // Site options seems to be not used right now
      isInVerboseMode: () => this._uiOptions.items.verboseMode.currentValue === 'verbose',
      featureOptionChange: this.featureOptionChange.bind(this),
      resourceOptionChange: this.resourceOptionChange.bind(this),
      uiOptionChange: this.uiOptionChange.bind(this),
      resetAllOptions: this.resetAllOptions.bind(this),
      getLexiconOptions: this.getLexiconOptions.bind(this),
      getShortLexiconOptions: this.getShortLexiconOptions.bind(this)
    }
    // endregion Public API of a settings controller

    // region Vuex store module
    this._store.registerModule('settings', {
      // All stores of modules are namespaced
      namespaced: true,
      state: {
        // these counters are used to enable the settings ui components
        // to redraw themselves when settings are reset or reloaded
        // it might be better if all settings were made into
        // state variables but for now state is monitored at the domain level
        uiResetCounter: 0,
        featureResetCounter: 0,
        resourceResetCounter: 0
      },
      mutations: {
        incrementUiResetCounter (state) {
          state.uiResetCounter += 1
        },

        incrementFeatureResetCounter (state) {
          state.featureResetCounter += 1
        },

        incrementResourceResetCounter (state) {
          state.resourceResetCounter += 1
        }
      }
    })
  }

  /**
   * Loads an application wide configuration file in a JSON format.
   *
   * @returns {Promise<object>} - A promise that is resolved with an app config response.
   */
  async requestAppOptions () {
    const configUrl = `${this._configServiceUrl}?clientId=${encodeURIComponent(this._clientId)}&appName=${encodeURIComponent(this._appName)}` +
      `&appVersion=${encodeURIComponent(this._appVersion)}&buildBranch=${encodeURIComponent(this._branch)}` +
      `&buildNumber=${encodeURIComponent(this._buildNumber)}`
    const request = new Request(configUrl)
    return fetch(request)
  }

  /**
   * initialize the options using the supplied storage adapter class
   *
   * @param {Function<StorageAdapter>} StorageAdapter the adapter class to instantiate
   * @param {object} authData optional authentication data if the adapter is one that requires it
   * @returns Promise[] an array of promises to load the options data from the adapter
   */
  initOptions (StorageAdapter = this._storageAdapter, authData = null) {
    this._featureOptions = new Options(FeatureOptionsDefaults, new StorageAdapter(FeatureOptionsDefaults.domain, authData))
    this._resourceOptions = new Options(ResourcesOptionsDefaults, new StorageAdapter(ResourcesOptionsDefaults.domain, authData))
    this._uiOptions = new Options(UIOptionsDefaults, new StorageAdapter(UIOptionsDefaults.domain, authData))
    return [this._featureOptions.load(), this._resourceOptions.load(), this._uiOptions.load()]
  }

  initNonConfigurableOptions () {
    this._siteOptions = [] // eslint-disable-line prefer-const
    for (const site of SiteOptionsDefaults) {
      for (const domain of site.options) {
        const siteOpts = new Options(domain, new this._storageAdapter(domain.domain)) // eslint-disable-line new-cap
        this._siteOptions.push({ uriMatch: site.uriMatch, resourceOptions: siteOpts })
      }
    }
  }

  getLexisOptions () {
    return this._appConfig && this._appConfig['lexis-cs'] ? this._appConfig['lexis-cs'] : {}
  }

  getLexiconsOptions () {
    return this._appConfig && this._appConfig.lexicons ? this._appConfig.lexicons : {}
  }

  getLogeionOptions () {
    return this._appConfig && this._appConfig.logeion ? this._appConfig.logeion : {}
  }

  getFeatureOptions () {
    return this._featureOptions
  }

  getResourceOptions () {
    return this._resourceOptions
  }

  getUiOptions () {
    return this._uiOptions
  }

  /**
   * Handle a change to a single feature option
   *
   * @param {string} name the setting name
   * @param {string} value the new value
   */
  featureOptionChange (name, value) {
    // TODO we need to refactor handling of boolean options
    const nonTextFeatures = ['enableLemmaTranslations', 'enableWordUsageExamples', 'wordUsageExamplesMax', 'wordUsageExamplesAuthMax',
      'enableMouseMove', 'wordlistMaxFlashcardExport', 'enableLogeionAutoComplete', 'showBetaCodesInfo', 'useBetaCodes']
    if (nonTextFeatures.includes(name)) {
      this._featureOptions.items[name].setValue(value)
    } else {
      this._featureOptions.items[name].setTextValue(value)
    }
  }

  /**
   * Handle a change to a single resource option
   *
   * @param {string} name - A name of an option.
   * @param {string | value} value - A new value of an options.
   */
  resourceOptionChange (name, value) {
    // grouped setting are referenced under Options object
    // by the parsed name but each individual setting in a group is referenced
    // by its fullname (with version and groupname appended)
    // multivalued settings are handled in the Options.setTextValue method which can take
    // an array or an individual text value
    const baseKey = Options.parseKey(name)
    this._resourceOptions.items[baseKey.name].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
  }

  /**
   * Handles a change of a single option from UI options.
   *
   * @param {string} name - A name of an option.
   * @param {string | value} value - A new value of an options.
   */
  uiOptionChange (name, value) {
    // TODO this should really be handled within OptionsItem
    // the difference between value and textValues is a little confusing
    // see issue #73
    const nonTextFeatures = [
      'fontSize',
      'hideLoginPrompt',
      'maxPopupWidth',
      'mouseMoveDelay',
      'mouseMoveAccuracy',
      'enableMouseMoveLimitedByIdCheck',
      'mouseMoveLimitedById',
      'forceMouseMoveGoogleDocs'
    ]
    if (nonTextFeatures.includes(name)) {
      this._uiOptions.items[name].setValue(value)
    } else {
      this._uiOptions.items[name].setTextValue(value)
    }
    // TODO: Eliminate this circular dependency on the AppController's API
    this._api.app.applyUIOption(name, this._uiOptions.items[name].currentValue)
  }

  /**
   * Resets all configurable options to the defaults, replacing user preferences
   */
  async resetAllOptions () {
    await this._featureOptions.reset()
    await this._resourceOptions.reset()
    await this._uiOptions.reset()
    // we don't reload siteOptions
    // because we don't currently allow user configuration of these
  }

  /**
   * Returns a list of lexicon URLs from where lexicons can be retrieved.
   *
   * @private
   * @param {object} options - Method's options object.
   * @param {LexiconKeys} options.lexiconKey - For what type of lexicon URLs should be retrieved.
   * @param {string} options.langCode - A language code in ISO 639-3 format.
   * @param {string} options.location - A URL of a client that uses an application. It may affect what lexicon URLs will
   *                            be retrieved.
   * @returns {LexiconList} - A list of lexicon URLs build for the parameters specified.
   */
  _getLexiconOptionsList ({ lexiconKey, langCode, location } = {}) {
    /** @type {LexiconList} */
    let lexiconList = { // eslint-disable-line prefer-const
      allow: []
    }

    let allOptions
    const siteMatch = this._siteOptions.filter((s) => location.match(new RegExp(s.uriMatch)))
    if (siteMatch.length > 0 && siteMatch[0].resourceOptions.items[lexiconKey]) {
      allOptions = [...siteMatch[0].resourceOptions.items[lexiconKey], ...this._resourceOptions.items[lexiconKey]]
    } else {
      allOptions = this._resourceOptions.items[lexiconKey] || []
    }
    lexiconList.allow = allOptions.filter((l) => Options.parseKey(l.name).group === langCode
    ).map((l) => {
      // TODO: Remove options from the Vuex store
      // If currentValue is observable by Vuex it will be an array where the current value item is the first element
      return Array.isArray(l.currentValue) ? l.currentValue[0] : l.currentValue
    })
    return lexiconList
  }

  /**
   * Retrieves lexicon options for full definition lexicons.
   *
   * @param {object} options - Method's options object.
   * @param {string} options.langCode - A language code in ISO 639-3 format.
   * @param {string} options.location - A URL of a client that uses an application. It may affect what lexicon URLs will
   *                            be retrieved.
   * @returns {LexiconList} - A list of lexicon URLs build for the parameters specified.
   */
  getLexiconOptions (langCode, location) {
    return this._getLexiconOptionsList({ lexiconKey: LexiconKeys.LEXICONS, langCode, location })
  }

  /**
   * Retrieves lexicon options for short definition lexicons.
   *
   * @param {object} options - Method's options object.
   * @param {string} options.langCode - A language code in ISO 639-3 format.
   * @param {string} options.location - A URL of a client that uses an application. It may affect what lexicon URLs will
   *                            be retrieved.
   * @returns {LexiconList} - A list of lexicon URLs build for the parameters specified.
   */
  getShortLexiconOptions (langCode, location) {
    return this._getLexiconOptionsList({ lexiconKey: LexiconKeys.LEXICON_SHORT, langCode, location })
  }
}

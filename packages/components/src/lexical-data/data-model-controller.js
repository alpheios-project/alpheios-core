import SettingsController from '@comp/lexical-data/settings/settings-controller.js'
import GqlEndpoint from '@comp/lexical-data/endpoints/gql-endpoint.js'

export default class DataModelController {
  constructor ({ platform }) {
    this._stC = new SettingsController({
      platform
    })
    this.gqlEndpoint = new GqlEndpoint()
  }

  async init ({ api, store, configServiceUrl, clientId, appName, appVersion, branch, buildNumber, storageAdapter } = {}) {
    // Initialize options
    await this._stC.init({
      api,
      store,
      configServiceUrl,
      clientId,
      appName,
      appVersion,
      branch,
      buildNumber,
      storageAdapter
    })
    this.gqlEndpoint.init({
      getLexiconsFn: this._stC.getLexiconOptions.bind(this._stC),
      getShortLexiconsFn: this._stC.getShortLexiconOptions.bind(this._stC),
      appName,
      appVersion,
      branch,
      buildNumber
    })
  }
}

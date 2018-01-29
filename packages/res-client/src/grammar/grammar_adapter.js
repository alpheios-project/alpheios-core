import BaseResourceAdapter from '../base_adapter.js'
import papaparse from 'papaparse'
import { ResourceProvider } from 'alpheios-data-models'
import DefaultConfig from './config.json'

class GrammarResAdapter extends BaseResourceAdapter {
  /**
   * A Client Adapter for the Alpheios V1 Lexicon service
   * @constructor
   * @param {string} resid - the idenitifer code for the grammar this instance
   *                         provides access to
   * @param {Object} config - JSON configuration object override
   */
  constructor (resid = null, config = null) {
    super()
    this.resid = resid
    this.index = null
    // this is a bit of a hack to enable inclusion of a JSON config file
    // in a way that works both pre and post-rollup. Our rollup config
    // will stringify the file and then we can parse it but if we want to
    // run unit tests on pre-rolled up code, then we need to have a fallback
    // which works with the raw ES6 import
    if (config == null) {
      try {
        let fullconfig = JSON.parse(DefaultConfig)
        this.config = fullconfig[resid]
      } catch (e) {
        this.config = DefaultConfig[resid]
      }
    } else {
      this.config = config
    }
    this.provider = new ResourceProvider(this.resid, this.config.rights)
  }

  /**
   * @override BaseResourceAdapter#getResources
   * @param {Feature} keyObj - receives a feature and returns a list of resources
   */
  async getResources (keyObj) {
    // TODO figure out the best way to handle initial reading of the data file
    if (this.index === null && this.getConfig('index_url')) {
      let url = this.getConfig('index_url')
      let unparsed = await this._loadData(url)
      let parsed = papaparse.parse(unparsed, {})
      this.index = this._fillMap(parsed.data)
    }

    let found = []
    let key = keyObj.type
    if (keyObj.value) {
      key = `${key}-${keyObj.value}`
    }
    if (this.index) {
      found = this._lookupInDataIndex(this.index, key)
    }
    let baseUrl = this.getConfig('base_url')
    let resources = []
    for (let url of found) {
      let res = {}
      if (baseUrl) {
        res.url = `${baseUrl}${url}`
      } else {
        res.url = url
      }
      resources.push(ResourceProvider.getProxy(this.provider, res))
    }
    return resources
  }

  /**
   * Lookup a Lemma object in an Alpheios v1 data index
   * @param {Map} data the data index
   * @param {string} key the key  to lookup
   * @return {string} the index entry as a text string
   */
  _lookupInDataIndex (data, key) {
    let found = data.get(key)
    // legacy , look for key preceded by alph-
    if (!found) {
      key = `alph-${key}`
      found = data.get(key)
    }
    // final fallback try for an index
    if (!found) {
      key = `alph-general-index`
      found = data.get(key)
    }
    if (found) {
      return [found]
    } else {
      return []
    }
  }

  /**
   * Loads a data file from a URL
   * @param {string} url - the url of the file
   * @returns {Promise} a Promise that resolves to the text contents of the loaded file
   */
  _loadData (url) {
    // TODO figure out best way to load this data
    return new Promise((resolve, reject) => {
      window.fetch(url).then(
          function (response) {
            let text = response.text()
            resolve(text)
          }
        ).catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * fills the data map with the rows from the parsed file
   * we need a method to do this because there may be homonyms in
   * the files
   * @param {string[]} rows
   * @return {Map} the filled map
   */
  _fillMap (rows) {
    let data = new Map()
    for (let row of rows) {
      if (data.has(row[0])) {
        data.get(row[0]).push(row[1])
      } else {
        data.set(row[0], [ row[1] ])
      }
    }
    return data
  }

  /**
   * Get a configuration setting for this lexicon client instance
   * @param {string} property
   * @returns {string} the value of the property
   */
  getConfig (property) {
    return this.config[property]
  }

  /**
   * @override BaseAdapter#getProviders
   */
  static getProviders (language) {
    let fullconfig
    let grammars = new Map()
    try {
      fullconfig = JSON.parse(DefaultConfig)
    } catch (e) {
      fullconfig = DefaultConfig
    }
    for (let l of Object.keys(fullconfig)) {
      if (fullconfig[l].langs.source === language) {
        grammars.set(l, fullconfig[l].description)
      }
    }
    return grammars
  }
}
export default GrammarResAdapter

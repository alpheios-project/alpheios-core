import { LanguageModelFactory as LMF, Definition, ResourceProvider } from 'alpheios-data-models'
import papaparse from 'papaparse'

import BaseAdapter from '@/adapters/base-adapter'
import DefaultConfig from '@/adapters/lexicons/config.json'

let cachedDefinitions = new Map()

class AlpheiosLexiconsAdapter extends BaseAdapter {
  /**
  * Lexicons adapter uploads config data, defines default options and inits data
  * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.options = { timeout: this.config.timeout ? this.config.timeout : 0 }
  }

  /**
  * This method retrieves short definitions for given homonym
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} options - options
  */
  async fetchShortDefs (homonym, options = {}) {
    await this.fetchDefinitions(homonym, options, 'short')
  }

  /**
  * This method retrieves full definitions for given homonym
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} options - options
  */
  async fetchFullDefs (homonym, options = {}) {
    await this.fetchDefinitions(homonym, options, 'full')
  }

  /**
  * This method creates Promise for getting short definitions, for being able to parallel requests
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {String} urlKey - urlIndex for geting data from config
  */
  prepareShortDefPromise (homonym, urlKey) {
    let url = this.config[urlKey].urls.short
    let requestType = 'shortDefs'

    let resCheckCached = this.checkCachedData(url)
    return resCheckCached.then(
      async (result) => {
        if (result) {
          await this.updateShortDefs(cachedDefinitions.get(url), homonym, this.config[urlKey])
          this.prepareSuccessCallback(requestType, homonym)
        }
      },
      error => {
        this.addError(this.l10n.messages['LEXICONS_FAILED_CACHED_DATA'].get(error.message))
        this.prepareFailedCallback(requestType, homonym)
      }
    )
  }

  /**
  * This method creates Promise for getting full definitions, for being able to parallel requests
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {String} urlKey - urlIndex for geting data from config
  */
  prepareFullDefPromise (homonym, urlKey) {
    let url = this.config[urlKey].urls.index
    let requestType = 'fullDefs'

    let resCheckCached = this.checkCachedData(url)
    return resCheckCached.then(
      async (result) => {
        if (result) {
          let fullDefsRequests = this.collectFullDefURLs(cachedDefinitions.get(url), homonym, this.config[urlKey])
          let resFullDefs = this.updateFullDefs(fullDefsRequests, this.config[urlKey], homonym)
          resFullDefs.catch(error => {
            this.addError(this.l10n.messages['LEXICONS_FAILED_CACHED_DATA'].get(error.message))
            this.prepareFailedCallback(requestType, homonym)
          })
        }
      },
      error => {
        this.addError(this.l10n.messages['LEXICONS_FAILED_CACHED_DATA'].get(error.message))
        this.prepareFailedCallback(requestType, homonym)
      }
    )
  }

  /**
  * This method checks if there is a callBackEvtSuccess defined and publish it if exists
  * @param {String} requestType - name of the request - shortDef and fullDef
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  prepareSuccessCallback (requestType, homonym) {
    if (this.config.callBackEvtSuccess) {
      this.config.callBackEvtSuccess.pub({
        requestType: requestType,
        homonym: homonym
      })
    }
  }

  /**
  * This method checks if there is a callBackEvtFailed defined and publish it if exists
  * @param {String} requestType - name of the request - shortDef and fullDef
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  prepareFailedCallback (requestType, homonym) {
    if (this.config.callBackEvtFailed) {
      this.config.callBackEvtFailed.pub({
        requestType: requestType,
        homonym: homonym
      })
    }
  }

  /**
  * This is a generic method that retrieves definitions for homonym
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} options - options
  * @param {Object} lookupFunction - type of definitions - short, full
  * @return {Boolean} - result of fetching
  */
  async fetchDefinitions (homonym, options, lookupFunction) {
    Object.assign(this.options, options)
    if (!this.options.allow || this.options.allow.length === 0) {
      this.addError(this.l10n.messages['LEXICONS_NO_ALLOWED_URL'])
      return
    }
    let languageID = homonym.lexemes[0].lemma.languageID
    let urlKeys = this.getRequests(languageID).filter(url => this.options.allow.includes(url))

    for (let urlKey of urlKeys) {
      if (lookupFunction === 'short') {
        this.prepareShortDefPromise(homonym, urlKey, lookupFunction)
      }
      if (lookupFunction === 'full') {
        this.prepareFullDefPromise(homonym, urlKey, lookupFunction)
      }
    }
  }

  /**
  * This method checks if data from url is already cached and if not - it uploads data from url to cache
  * @param {String} url - url from what we need to cache data
  * @return {Boolean} - true - if cached is successed
  */
  async checkCachedData (url) {
    if (!cachedDefinitions.has(url)) {
      try {
        let unparsed = await this.fetch(url, { type: 'xml', timeout: this.options.timeout })
        let parsed = papaparse.parse(unparsed, { quoteChar: '\u{0000}', delimiter: '|' })
        let data = this.fillMap(parsed.data)
        cachedDefinitions.set(url, data)
      } catch (error) {
        this.addError(this.l10n.messages['LEXICONS_FAILED_CACHED_DATA'].get(error.message))
        return false
      }
    }
    return true
  }

  /**
  * This method searches for definitions in cached text, creates definitions and updates lexemes
  * @param {Map} data - cached data from definition's url
  * @param {Homonym} homonym - homonym we search definitions for
  * @param {Object} config - config data for url
  */
  async updateShortDefs (data, homonym, config) {
    let languageID = homonym.lexemes[0].lemma.languageID
    let model = LMF.getLanguageModel(languageID)

    for (let lexeme of homonym.lexemes) {
      let deftexts = this.lookupInDataIndex(data, lexeme.lemma, model)

      if (deftexts) {
        for (let d of deftexts) {
          try {
            let provider = new ResourceProvider(config.urls.short, config.rights)
            let def = new Definition(d, config.langs.target, 'text/plain', lexeme.lemma.word)
            let definition = await ResourceProvider.getProxy(provider, def)
            lexeme.meaning['appendShortDefs'](definition)
          } catch (error) {
            this.addError(this.l10n.messages['LEXICONS_FAILED_APPEND_DEFS'].get(error.message))
            continue
          }
        }
      } else {
        let url = config.urls.short
        this.addError(this.l10n.messages['LEXICONS_NO_DATA_FROM_URL'].get(url))
        this.prepareFailedCallback('shortDefs', homonym)
      }
    }
  }

  /**
  * This method creates requests to full definitions url for each lexeme and given config
  * @param {Map} data - cached data from definition's index url
  * @param {Homonym} homonym - homonym we search definitions for
  * @param {Object} config - config data for url
  * @return {[String]} - array of urls for retrieving data
  */
  collectFullDefURLs (data, homonym, config) {
    let languageID = homonym.lexemes[0].lemma.languageID
    let model = LMF.getLanguageModel(languageID)
    let urlFull = config.urls.full

    if (!urlFull) {
      this.addError(this.l10n.messages['LEXICONS_NO_FULL_URL'])
      return
    }

    let requests = []
    for (let lexeme of homonym.lexemes) {
      let ids = this.lookupInDataIndex(data, lexeme.lemma, model)
      if (urlFull && ids) {
        for (let id of ids) {
          requests.push({ url: `${urlFull}&n=${id}`, lexeme: lexeme })
        }
      } else if (urlFull) {
        requests.push({ url: `${urlFull}&l=${encodeURIComponent(lexeme.lemma.word)}`, lexeme: lexeme })
      }
    }
    return requests
  }

  /**
  * This method fetches data from request and update homonym with full definition - it is made as Promises with calback to make it parallel
  * @param {[String]} fullDefsRequests - array of full definitions url
  * @param {Object} config - config data for url
  * @param {Homonym} homonym - homonym we search definitions for
  */
  async updateFullDefs (fullDefsRequests, config, homonym) {
    for (let request of fullDefsRequests) {
      let fullDefDataRes = this.fetch(request.url, { type: 'xml' })

      fullDefDataRes.then(
        async (fullDefData) => {
          if (fullDefData && fullDefData.match(/alph:error|alpheios-lex-error/)) {
            let error = fullDefData.match(/no entries found/i) ? 'No entries found.' : fullDefData
            this.addError(this.l10n.messages['LEXICONS_FAILED_CACHED_DATA'].get(error))
            this.prepareFailedCallback('fullDefs', homonym)
          } else {
            let provider = new ResourceProvider(config.urls.full, config.rights)
            let def = new Definition(fullDefData, config.langs.target, 'text/plain', request.lexeme.lemma.word)
            let definition = await ResourceProvider.getProxy(provider, def)
            request.lexeme.meaning['appendFullDefs'](definition)
            this.prepareSuccessCallback('fullDefs', homonym)
          }
        },
        error => {
          this.addError(this.l10n.messages['LEXICONS_FAILED_APPEND_DEFS'].get(error.message))
        }
      )
    }
  }

  /*
  * This method retrieves urls from config for given languageCode
  * @param {Symbol} languageID
  */
  getRequests (languageID) {
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    return Object.keys(this.config).filter(url => this.config[url] && this.config[url].langs && this.config[url].langs.source === languageCode)
  }

  /**
   * fills the data map with the rows from the parsed file
   * we need a method to do this because there may be homonyms in
   * the files
   * @param {string[]} rows
   * @return {Map} the filled map
   */
  fillMap (rows) {
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
   * Lookup a Lemma object in an Alpheios v1 data index
   * @param {Map} data the data inddex
   * @param {Lemma} lemma the lemma to lookupInDataIndex
   * @param {LanguageModel} model a language model for language specific methods
   * @return {string} the index entry as a text string
   */
  lookupInDataIndex (data, lemma, model) {
    // legacy behavior from Alpheios lemma data file indices
    // first look to see if we explicitly have an instance of this lemma
    // with capitalization retained
    let found

    let alternatives = []
    let altEncodings = []
    for (let l of [lemma.word, ...lemma.principalParts]) {
      alternatives.push(l)
      for (let a of model.alternateWordEncodings(l)) {
        // we gather altEncodings separately because they should
        // be tried last after the lemma and principalParts in their
        // original form
        altEncodings.push(a)
      }
      let nosense = l.replace(/_?\d+$/, '')
      if (l !== nosense) {
        alternatives.push(nosense)
      }
    }
    alternatives = [...alternatives, ...altEncodings]

    for (let lookup of alternatives) {
      found = data.get(lookup.toLocaleLowerCase())
      if (found && found.length === 1 && found[0] === '@') {
        found = data.get(`@${lookup}`)
      }
      if (found) {
        break
      }
    }
    return found
  }
}

export default AlpheiosLexiconsAdapter

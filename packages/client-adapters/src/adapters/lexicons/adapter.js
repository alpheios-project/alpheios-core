import { LanguageModelFactory as LMF, Definition, ResourceProvider } from 'alpheios-data-models'
import papaparse from 'papaparse'

import BaseAdapter from '@clAdapters/adapters/base-adapter'
import DefaultConfig from '@clAdapters/adapters/lexicons/config.json'

let cachedDefinitions = new Map() // eslint-disable-line prefer-const
let uploadStarted = new Map() // eslint-disable-line prefer-const

class AlpheiosLexiconsAdapter extends BaseAdapter {
  /**
  * Lexicons adapter uploads config data, defines default options and inits data
  * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.options = { timeout: this.config.timeout ? this.config.timeout : 0 }
    this.async = Boolean(this.config.callBackEvtSuccess)
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
    const url = this.config[urlKey].urls.short
    const requestType = 'shortDefs'

    const resCheckCached = this.checkCachedData(url)
    return resCheckCached.then(
      async (result) => {
        if (result) {
          const res = cachedDefinitions.get(url)
          await this.updateShortDefs(res, homonym, this.config[urlKey])
          this.prepareSuccessCallback(requestType, homonym)
        }
      },
      error => {
        this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error.message }))
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
    const url = this.config[urlKey].urls.index
    const requestType = 'fullDefs'

    const resCheckCached = this.checkCachedData(url)
    return resCheckCached.then(
      async (result) => {
        if (result) {
          const fullDefsRequests = this.collectFullDefURLs(cachedDefinitions.get(url), homonym, this.config[urlKey])
          const resFullDefs = this.updateFullDefsAsync(fullDefsRequests, this.config[urlKey], homonym)
          resFullDefs.catch(error => {
            this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error.message }))
            this.prepareFailedCallback(requestType, homonym)
          })
        }
      },
      error => {
        this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error.message }))
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
      this.addError(this.l10n.getMsg('LEXICONS_NO_ALLOWED_URL'))
      return
    }

    if (this.async) {
      return this.fetchDefsAsync(homonym, lookupFunction)
    } else {
      if (lookupFunction === 'short') {
        return this.fetchShortDefsSync(homonym)
      } else if (lookupFunction === 'full') {
        return this.fetchFullDefsSync(homonym)
      }
    }
  }

  /**
  * This is a sync method that retrieves short definitions for homonym synchronously
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  async fetchShortDefsSync (homonym) {
    try {
      const languageID = homonym.lexemes[0].lemma.languageID
      const urlKeys = this.getRequests(languageID).filter(url => this.options.allow.includes(url))

      for (const urlKey of urlKeys) {
        const url = this.config[urlKey].urls.short
        const result = await this.checkCachedData(url)

        if (result) {
          const res = cachedDefinitions.get(url)
          await this.updateShortDefs(res, homonym, this.config[urlKey])
        }
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error.message }))
    }
  }

  /**
  * This is a sync method that retrieves full definitions for homonym synchronously
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  async fetchFullDefsSync (homonym) {
    const languageID = homonym.lexemes[0].lemma.languageID
    const urlKeys = this.getRequests(languageID).filter(url => this.options.allow.includes(url))

    for (const urlKey of urlKeys) {
      const url = this.config[urlKey].urls.index
      const result = await this.checkCachedData(url)

      if (result) {
        const fullDefsRequests = this.collectFullDefURLs(cachedDefinitions.get(url), homonym, this.config[urlKey])
        await this.updateFullDefs(fullDefsRequests, this.config[urlKey], homonym)
      }
    }
  }

  /**
  * This is an async method that retrieves definitions for homonym with getting result inside callbacks
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} lookupFunction - type of definitions - short, full
  * @return {Boolean} - result of fetching
  */

  fetchDefsAsync (homonym, lookupFunction) {
    const languageID = homonym.lexemes[0].lemma.languageID
    const urlKeys = this.getRequests(languageID).filter(url => this.options.allow.includes(url))

    for (const urlKey of urlKeys) {
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
  * @param {Null|Map|String} externalData - data that would be used as fixture for the url
  * @param {Boolean} skipFetch - when this check is true, then fetch would not be execute in any case, it is used for Full Definitions
  * @return {Boolean} - true - if cached is successed
  */
  async checkCachedData (url, externalData = null, skipFetch = false) {
    if (!externalData && skipFetch) {
      return false
    }
    if (!cachedDefinitions.has(url) && !uploadStarted.has(url)) {
      try {
        uploadStarted.set(url, true)

        let data = externalData
        if (!externalData) {
          const unparsed = await this.fetch(url, { type: 'xml', timeout: this.options.timeout })
          const parsed = papaparse.parse(unparsed, { quoteChar: '\u{0000}', delimiter: '|' })
          data = this.fillMap(parsed.data)
        }

        cachedDefinitions.set(url, data)
        uploadStarted.set(url, false)
      } catch (error) {
        this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error.message }))
        uploadStarted.set(url, false)
        return false
      }
    } else if (uploadStarted.has(url) && uploadStarted.get(url)) {
      setTimeout(() => {
        this.checkCachedData(url)
      }, this.options.timeout)
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
    const languageID = homonym.lexemes[0].lemma.languageID
    const model = LMF.getLanguageModel(languageID)

    for (let lexeme of homonym.lexemes) { // eslint-disable-line prefer-const
      const deftexts = this.lookupInDataIndex(data, lexeme.lemma, model)
      if (deftexts) {
        for (const d of deftexts) {
          const text = d.field1
          const providerCode = d.field2
          const format = config.format && config.format.short ? config.format.short : 'text/plain'
          try {
            let rightsText = config.rights
            let rightsUri = config.urls.short
            if (providerCode && config.rights_keys && config.rights_keys[providerCode]) {
              rightsUri = rightsUri + `#${providerCode}`
              rightsText = config.rights_keys[providerCode]
            }
            const provider = new ResourceProvider(rightsUri, rightsText)
            const def = new Definition(text, config.langs.target, format, lexeme.lemma.word)
            const definition = ResourceProvider.getProxy(provider, def)
            lexeme.meaning.appendShortDefs(definition)
          } catch (error) {
            this.addError(this.l10n.getMsg('LEXICONS_FAILED_APPEND_DEFS', { message: error.message }))
            continue
          }
        }
      } else {
        const url = config.urls.short
        this.addError(this.l10n.getMsg('LEXICONS_NO_DATA_FROM_URL', { url: url }))
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
    const languageID = homonym.lexemes[0].lemma.languageID
    const model = LMF.getLanguageModel(languageID)
    const urlFull = config.urls.full

    if (!urlFull) {
      this.addError(this.l10n.getMsg('LEXICONS_NO_FULL_URL'))
      return
    }

    let requests = [] // eslint-disable-line prefer-const
    for (const lexeme of homonym.lexemes) {
      const ids = this.lookupInDataIndex(data, lexeme.lemma, model)
      if (urlFull && ids) {
        for (const id of ids) {
          requests.push({ url: `${urlFull}&n=${id.field1}`, lexeme: lexeme })
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
  async updateFullDefsAsync (fullDefsRequests, config, homonym) {
    for (let request of fullDefsRequests) { // eslint-disable-line prefer-const
      let fullDefDataRes
      if (cachedDefinitions.has(request.url)) {
        fullDefDataRes = new Promise((resolve, reject) => resolve(cachedDefinitions.get(request.url)))
      } else {
        fullDefDataRes = this.fetch(request.url, { type: 'xml' })
      }

      fullDefDataRes.then(
        async (fullDefData) => {
          if (fullDefData && fullDefData.match(/alph:error|alpheios-lex-error/)) {
            const error = fullDefData.match(/no entries found/i) ? 'No entries found.' : fullDefData
            this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error }))
            this.prepareFailedCallback('fullDefs', homonym)
          } else {
            const provider = new ResourceProvider(config.urls.full, config.rights)
            const def = new Definition(fullDefData, config.langs.target, 'text/plain', request.lexeme.lemma.word)
            const definition = ResourceProvider.getProxy(provider, def)
            request.lexeme.meaning.appendFullDefs(definition)
            this.prepareSuccessCallback('fullDefs', homonym)
          }
        },
        error => {
          this.addError(this.l10n.getMsg('LEXICONS_FAILED_APPEND_DEFS', { message: error.message }))
        }
      )
    }
  }

  /**
  * This method fetches data from request and update homonym with full definition synchronously
  * @param {[String]} fullDefsRequests - array of full definitions url
  * @param {Object} config - config data for url
  * @param {Homonym} homonym - homonym we search definitions for
  */
  async updateFullDefs (fullDefsRequests, config, homonym) {
    for (let request of fullDefsRequests) { // eslint-disable-line prefer-const
      let fullDefData
      if (cachedDefinitions.has(request.url)) {
        fullDefData = cachedDefinitions.get(request.url)
      } else {
        fullDefData = await this.fetch(request.url, { type: 'xml' })
      }

      try {
        if (fullDefData && fullDefData.match(/alph:error|alpheios-lex-error/)) {
          const error = fullDefData.match(/no entries found/i) ? 'No entries found.' : fullDefData
          this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error }))
        } else {
          const provider = new ResourceProvider(config.urls.full, config.rights)
          const def = new Definition(fullDefData, config.langs.target, 'text/plain', request.lexeme.lemma.word)
          const definition = ResourceProvider.getProxy(provider, def)
          request.lexeme.meaning.appendFullDefs(definition)
        }
      } catch (error) {
        this.addError(this.l10n.getMsg('LEXICONS_FAILED_APPEND_DEFS', { message: error.message }))
      }
    }
  }

  /*
  * This method retrieves urls from config for given languageCode
  * @param {Symbol} languageID
  */
  getRequests (languageID) {
    const languageCode = LMF.getLanguageCodeFromId(languageID)
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
    let data = new Map() // eslint-disable-line prefer-const
    for (const row of rows) {
      const def = { field1: row[1], field2: null }
      if (row.length > 2) {
        def.field2 = row[2]
      }
      if (data.has(row[0])) {
        data.get(row[0]).push(def)
      } else {
        data.set(row[0], [def])
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
    let altEncodings = [] // eslint-disable-line prefer-const
    for (const l of [lemma.word, ...lemma.principalParts]) {
      alternatives.push(l)
      for (const a of model.alternateWordEncodings({ word: l, preserveCase: true })) {
        // we gather altEncodings separately because they should
        // be tried last after the lemma and principalParts in their
        // original form
        altEncodings.push(a)
      }
      const nosense = l.replace(/_?\d+$/, '')
      if (l !== nosense) {
        alternatives.push(nosense)
      }
    }
    alternatives = [...alternatives, ...altEncodings]
    for (const lookup of alternatives) {
      // let's first just look for the word in its supplied case
      found = false
      if (data && lookup) {
        found = data.get(lookup)

        // and if we don't find it, then try lower case
        if (!found) {
          found = data.get(lookup.toLocaleLowerCase())
        }

        if (found) {
          found = this._lookupSpecial(data, lookup, found)
        }
        if (found) {
          break
        }
      }
    }

    // if we still don't have a match, we can do a last ditch check without
    // any diacritics at all in those languages that support it
    if (!found) {
      let lastAlt = [] // eslint-disable-line prefer-const
      for (const l of [lemma.word, ...lemma.principalParts]) {
        const strippedAll = model.alternateWordEncodings({
          word: l,
          encoding: 'strippedAll',
          preserveCase: true
        })
        if (strippedAll.length > 0) {
          lastAlt.push(strippedAll[0])
        }
      }
      if (lastAlt.length > 0) {
        for (const l of lastAlt) {
          for (let entry of data.entries()) { // eslint-disable-line prefer-const
            // a normal lookup in the dataset map would only return
            // an entry preceding with '@' as a result of the _lookupSpecial
            // test but because we are looping through and testing each entry
            // the test on case without any diacritics will find those matches
            // and we need to remove the @ flag to make sure it doesn't fail them
            const originalKey = entry[0].replace(/^@/, '')
            const value = entry[1]
            const strippedKey = model.alternateWordEncodings({
              word: originalKey,
              encoding: 'strippedAll',
              preserveCase: true
            })
            if (strippedKey.length > 0 && strippedKey[0] === l) {
              found = this._lookupSpecial(data, originalKey, value)
              if (found) {
                break
              }
            }
          }
          if (found) {
            break
          }
        }
      }
    }
    return found
  }

  /**
   * When we created the lexicon indices we normalized the lemmas
   * as all lower case and applied some additional character normalizations
   * in the case of homonyms however, sometimes the normalization meant 1
   * index entry for two distinct words. In these cases, we created a "special"
   * syntax, whereby we set the value of the normalized index entry to '@'
   * which mean to look for the word under it's pre-normalized entry,
   * which was kept and made available in an entry prefixed with '@'
   * @param {Map} data the dataset to search in
   * @param {lookup} lookup the original pre-normalized lemma
   * @param {lemmas} the value returned by the lookup on the normalized lemma
   **/
  _lookupSpecial (data, lookup, lemmas) {
    if (lemmas.length === 1 && lemmas[0].field1 === '@') {
      return data.get(`@${lookup}`)
    } else {
      return lemmas
    }
  }
}

export default AlpheiosLexiconsAdapter

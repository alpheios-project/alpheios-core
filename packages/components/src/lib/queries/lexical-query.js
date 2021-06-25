import { LanguageModelFactory as LMF, Lexeme, Lemma, Homonym, PsEvent, Constants, Logger } from 'alpheios-data-models'
import Query from './query.js'
import Options from '@/lib/options/options.js'
import { ClientAdapters, RemoteError } from 'alpheios-client-adapters'
import { ResponseMessage } from 'alpheios-messaging'

export default class LexicalQuery extends Query {
  constructor (name, selector, options) {
    super(name)
    this.selector = selector
    this.clientId = options.clientId
    this.langData = options.langData
    this.langOpts = options.langOpts || []
    this.resourceOptions = options.resourceOptions || []
    this.siteOptions = options.siteOptions || []
    this.lemmaTranslations = options.lemmaTranslations
    this.wordUsageExamples = options.wordUsageExamples
    this.checkContextForward = options.checkContextForward || ''
    this.cedictServiceUrl = options.cedictServiceUrl
    this.lexiconsConfig = options.lexiconsConfig
    this._annotatedHomonyms = options.annotatedHomonyms
    this._source = options.source

    const langID = this.selector.languageID
    this.canReset = (this.langOpts[langID] && this.langOpts[langID].lookupMorphLast)
    this.startedDefinitionsQueries = new Map()

    // Suppress events that will trigger UI messages if source is wordlist
    if (this.selector.textQuoteSelector && this._source !== LexicalQuery.sources.WORDLIST) {
      LexicalQuery.evt.TEXT_QUOTE_SELECTOR_RECEIVED.pub(this.selector.textQuoteSelector)
    }
    this.logger = Logger.getInstance()
  }

  static create (selector, options) {
    return Query.create(LexicalQuery, selector, options)
  }

  static async getWordUsageData (homonym, wordUsageExamples, params) {
    if (wordUsageExamples) {
      // the default query for usage examples should be to request all examples
      // for all authors, with user pagination preference for max number of examples
      // per author applied. Total max across all authors will be enforced on the
      // client adapter side. Different pagination options may apply when working
      // directly with the usage examples display
      try {
        let paginationParams = {}

        if (params.author) {
          paginationParams = {
            property: 'max',
            value: wordUsageExamples.paginationMax
          }
        } else {
          paginationParams = {
            property: 'authmax',
            value: wordUsageExamples.paginationAuthMax
          }
        }

        const adapterConcordanceRes = await ClientAdapters.wordusageExamples.concordance({
          method: 'getWordUsageExamples',
          clientId: this.clientId,
          params: {
            homonym: homonym,
            pagination: paginationParams,
            filters: {
              author: params.author,
              textWork: params.textWork
            }
          }
        })

        if (adapterConcordanceRes.errors.length > 0) {
          adapterConcordanceRes.errors.forEach(error => this.logger.log(error))
        }
        LexicalQuery.evt.WORD_USAGE_EXAMPLES_READY.pub(adapterConcordanceRes.result)
      } catch (error) {
        this.logger.log('Some strange error inside getWordUsageData', error)
      }
    }
  }

  static async getAuthorsForWordUsage () {
    try {
      const adapterConcordanceRes = await ClientAdapters.wordusageExamples.concordance({
        method: 'getAuthorsWorks',
        params: {}
      })

      if (adapterConcordanceRes.errors.length > 0) {
        adapterConcordanceRes.errors.forEach(error => this.logger.log(error))
      }

      return adapterConcordanceRes.result
    } catch (error) {
      this.logger.log('Some strange eror inside getAuthorsForWordUsage', error)
    }
  }

  async getData () {
    this.languageID = this.selector.languageID
    const iterator = this.iterations()

    let result = iterator.next()
    while (true) {
      if (!this.active) { this.finalize() }
      if (Query.isPromise(result.value)) {
        try {
          const resolvedValue = await result.value
          result = iterator.next(resolvedValue)
        } catch (error) {
          iterator.return()
          this.finalize(error)
          break
        }
      } else {
        result = iterator.next(result.value)
      }
      if (result.done) { break }
    }
  }

  * iterations () {
    const formLexeme = new Lexeme(new Lemma(this.selector.normalizedText, this.selector.languageID), [])
    if (!this.canReset) {
      // if we can't reset, proceed with full lookup sequence
      let adapterMorphRes

      if (this.selector.languageID === Constants.LANG_CHINESE) {
        adapterMorphRes = yield ClientAdapters.morphology.chineseloc({
          method: 'getHomonym',
          clientId: this.clientId,
          serviceUrl: this.cedictServiceUrl,
          params: {
            languageID: this.selector.languageID,
            word: this.selector.normalizedText,
            checkContextForward: this.checkContextForward
          }
        })
      } else {
        adapterMorphRes = yield ClientAdapters.morphology.tufts({
          method: 'getHomonym',
          clientId: this.clientId,
          params: {
            languageID: this.selector.languageID,
            word: this.selector.normalizedText
          }
        })
      }

      if (adapterMorphRes.errors.length > 0) {
        adapterMorphRes.errors.forEach(error => {
          if (error instanceof RemoteError) {
            // There is an error returned from a CEDICT service
            if (error.errorCode === ResponseMessage.errorCodes.SERVICE_UNINITIALIZED) {
              LexicalQuery.evt.CEDICT_SERVICE_UNINITIALIZED.pub()
              return
            }
          }
          this.logger.log(error.message)
        })
      }

      if (adapterMorphRes.result) {
        this.homonym = adapterMorphRes.result
        if (this._annotatedHomonyms && this._annotatedHomonyms.hasHomonyms) {
          this.homonym = Homonym.disambiguate(this.homonym, this._annotatedHomonyms.homonyms)
        }
        // Suppress events that will trigger UI messages if source is wordlist
        if (this._source !== LexicalQuery.sources.WORDLIST) {
          LexicalQuery.evt.MORPH_DATA_READY.pub()
        }
      } else {
        if (this._annotatedHomonyms && this._annotatedHomonyms.hasHomonyms) {
          // If there is no results from a morhpological analyzer, a resulting homonym should always be disambiguated
          this.homonym = this._annotatedHomonyms.toHomonym(this.selector.normalizedText, { disambiguated: true })
          // Suppress events that will trigger UI messages if source is wordlist
          if (this._source !== LexicalQuery.sources.WORDLIST) {
            LexicalQuery.evt.MORPH_DATA_READY.pub()
          }
        } else {
          this.homonym = new Homonym([formLexeme], this.selector.normalizedText)
          // Suppress events that will trigger UI messages if source is wordlist
          if (this._source !== LexicalQuery.sources.WORDLIST) {
            LexicalQuery.evt.MORPH_DATA_NOTAVAILABLE.pub({
              targetWord: this.selector.normalizedText,
              languageId: this.selector.languageID
            })
          }
        }
      }
    } else {
      // if we can reset then start with definitions of the unanalyzed form
      if (this._annotatedHomonyms && this._annotatedHomonyms.hasHomonyms) {
        this.homonym = this._annotatedHomonyms.toHomonym(this.selector.normalizedText)
        // Suppress events that will trigger UI messages if source is wordlist
        if (this._source !== LexicalQuery.sources.WORDLIST) {
          LexicalQuery.evt.MORPH_DATA_READY.pub()
        }
      } else {
        this.homonym = new Homonym([formLexeme], this.selector.normalizedText)
        // Suppress events that will trigger UI messages if source is wordlist
        if (this._source !== LexicalQuery.sources.WORDLIST) {
          LexicalQuery.evt.MORPH_DATA_NOTAVAILABLE.pub({
            targetWord: this.selector.normalizedText,
            languageId: this.selector.languageID
          })
        }
      }
    }

    const lexiconFullOpts = this.getLexiconOptions('lexicons')
    const lexiconShortOpts = this.getLexiconOptions('lexiconsShort')

    // if lexicon options are set for short definitions, we want to override any
    // short definitions provided by the maAdapter
    if (lexiconShortOpts.allow && lexiconShortOpts.allow.length > 0) {
      if (!lexiconShortOpts.allow.includes('empty')) {
        this.homonym.lexemes.forEach((l) => { l.meaning.clearShortDefs() })
      }

      if (this._source !== LexicalQuery.sources.WORDLIST) {
        LexicalQuery.evt.HOMONYM_READY.pub(this.homonym)
      } else {
        LexicalQuery.evt.WORDLIST_UPDATE_HOMONYM_READY.pub(this.homonym)
      }
    } else {
      // we won't have any remaining valid short definition requests
      // so go ahead and publish the SHORT_DEFS_READY event so that the UI
      // can update itself
      // but issue the HOMONYM_READY event first otherwise we get errors
      // from the wordlist which expects to see the homonym before definitions

      if (this._source !== LexicalQuery.sources.WORDLIST) {
        LexicalQuery.evt.HOMONYM_READY.pub(this.homonym)
        LexicalQuery.evt.SHORT_DEFS_READY.pub({
          requestType: 'short',
          homonym: this.homonym,
          word: this.homonym.lexemes.length > 0 ? this.homonym.lexemes[0].lemma.word : ''
        })
      } else {
        LexicalQuery.evt.WORDLIST_UPDATE_HOMONYM_READY.pub(this.homonym)
        LexicalQuery.evt.WORDLIST_UPDATE_SHORT_DEFS_READY.pub({
          requestType: 'short',
          homonym: this.homonym,
          word: this.homonym.lexemes.length > 0 ? this.homonym.lexemes[0].lemma.word : ''
        })
      }
    }

    if (this.lemmaTranslations) {
      const adapterTranslationRes = yield ClientAdapters.lemmatranslation.alpheios({
        method: 'fetchTranslations',
        clientId: this.clientId,
        params: {
          homonym: this.homonym,
          browserLang: this.lemmaTranslations.locale
        }
      })
      if (adapterTranslationRes.errors.length > 0) {
        adapterTranslationRes.errors.forEach(error => this.logger.log(error.message))
      }
      // Suppress events that will trigger UI messages if source is wordlist
      if (this._source !== LexicalQuery.sources.WORDLIST) {
        LexicalQuery.evt.LEMMA_TRANSL_READY.pub(this.homonym)
      } else {
        LexicalQuery.evt.WORDLIST_UPDATE_LEMMA_TRANSL_READY.pub(this.homonym)
      }
    }

    if (this.wordUsageExamples) {
      // the default query for usage examples should be to request all examples
      // for all authors, with user pagination preference for max number of examples
      // per author applied. Total max across all authors will be enforced on the
      // client adapter side. Different pagination options may apply when working
      // directly with the usage examples display
      const adapterConcordanceRes = yield ClientAdapters.wordusageExamples.concordance({
        method: 'getWordUsageExamples',
        clientId: this.clientId,
        params: {
          homonym: this.homonym,
          pagination: {
            property: 'authmax',
            value: this.wordUsageExamples.paginationAuthMax
          }
        }
      })

      if (adapterConcordanceRes.errors.length > 0) {
        adapterConcordanceRes.errors.forEach(error => this.logger.log(error))
      }

      LexicalQuery.evt.WORD_USAGE_EXAMPLES_READY.pub(adapterConcordanceRes.result)
    }

    yield 'Retrieval of lemma translations completed'

    if (!this.startedDefinitionsQueries.has(this.homonym.targetWord)) {
      this.startedDefinitionsQueries.set(this.homonym.targetWord, true)

      let params = {
        opts: lexiconShortOpts,
        homonym: this.homonym
      }

      if (this._source !== LexicalQuery.sources.WORDLIST) {
        params = Object.assign(params, {
          callBackEvtSuccess: LexicalQuery.evt.SHORT_DEFS_READY,
          callBackEvtFailed: LexicalQuery.evt.SHORT_DEFS_NOT_FOUND
        })
      }

      const adapterLexiconResShort = yield ClientAdapters.lexicon.alpheios({
        method: 'fetchShortDefs',
        clientId: this.clientId,
        config: this.lexiconsConfig,
        params
      })

      if (adapterLexiconResShort.errors.length > 0) {
        adapterLexiconResShort.errors.forEach(error => this.logger.log(error.message))
      } else if (this._source === LexicalQuery.sources.WORDLIST) {
        LexicalQuery.evt.WORDLIST_UPDATE_SHORT_DEFS_READY.pub({
          requestType: 'short',
          homonym: this.homonym,
          word: this.homonym.lexemes.length > 0 ? this.homonym.lexemes[0].lemma.word : ''
        })
      }

      let adapterLexiconResFull = {}
      // Do not retrieve full definition for wordlist requests
      if (this._source !== LexicalQuery.sources.WORDLIST) {
        adapterLexiconResFull = yield ClientAdapters.lexicon.alpheios({
          method: 'fetchFullDefs',
          clientId: this.clientId,
          config: this.lexiconsConfig,
          params: {
            opts: lexiconFullOpts,
            homonym: this.homonym,
            callBackEvtSuccess: LexicalQuery.evt.FULL_DEFS_READY,
            callBackEvtFailed: LexicalQuery.evt.FULL_DEFS_NOT_FOUND
          }
        })

        if (adapterLexiconResFull.errors.length > 0) {
          adapterLexiconResFull.errors.forEach(error => this.logger.log(error))
        }
      }

      yield 'Finalizing'
      if (adapterLexiconResShort.result || adapterLexiconResFull.result) {
        this.finalize('Success')
      }
      if (!adapterLexiconResShort.result && !adapterLexiconResFull.result) {
        this.finalize('Success-NoDefs')
      }
    } else {
      yield 'Finalizing'
      this.finalize('Success-NoDefs')
    }
  }

  finalize (result) {
    let resultStatus
    if (this.active) {
      // if we can reset the query and we don't have ahy valid results yet
      // then reset and try again
      if (this.canReset &&
        (!this.homonym ||
        !this.homonym.lexemes ||
        this.homonym.lexemes.length < 1 ||
        this.homonym.lexemes.filter((l) => l.isPopulated()).length < 1)) {
        this.canReset = false // only reset once
        this.getData()
        return
      }
      if (typeof result === 'object' && result instanceof Error) {
        resultStatus = LexicalQuery.resultStatus.FAILED
      } else {
        resultStatus = LexicalQuery.resultStatus.SUCCEEDED
      }
    } else {
      resultStatus = LexicalQuery.resultStatus.CANCELED
    }
    // Suppress events that will trigger UI messages if source is wordlist
    if (this._source !== LexicalQuery.sources.WORDLIST) {
      LexicalQuery.evt.LEXICAL_QUERY_COMPLETE.pub({
        resultStatus: resultStatus,
        homonym: this.homonym
      })
    }
    Query.destroy(this)
    return result
  }

  getLexiconOptions (lexiconKey) {
    let allOptions
    const languageCode = LMF.getLanguageCodeFromId(this.selector.languageID)
    const siteMatch = this.siteOptions.filter((s) => this.selector.location.match(new RegExp(s.uriMatch)))
    if (siteMatch.length > 0 && siteMatch[0].resourceOptions.items[lexiconKey]) {
      allOptions = [...siteMatch[0].resourceOptions.items[lexiconKey], ...this.resourceOptions.items[lexiconKey]]
    } else {
      allOptions = this.resourceOptions.items[lexiconKey] || []
    }
    let lexiconOpts = allOptions.filter((l) => Options.parseKey(l.name).group === languageCode
    ).map((l) => { return { allow: l.currentValue } }
    )
    if (lexiconOpts.length > 0) {
      lexiconOpts = lexiconOpts[0]
    } else {
      lexiconOpts = {}
    }
    return lexiconOpts
  }
}

/**
 * Designates an originator of a lexical query.
 *
 * @type {{LOOKUP: string, WORDLIST: string, PAGE: string}}
 */
LexicalQuery.sources = {
  // Request originated from a page, where user selected some text
  PAGE: 'page',
  // Request originated from a lookup components, a word was entered into a lookup component's input field
  LOOKUP: 'lookup',
  // Request was originated from a wordlist code, it is a machine originated query
  WORDLIST: 'wordlist'
}

/**
 * This is a description of a LexicalQuery event interface.
 */
LexicalQuery.evt = {
  /**
   * Published when a new LexicalQuery data processing is complete.
   * Data: {
   *  {symbol} resultStatus - A lexical query result status,
      {Homonym} homonym - A homonym data
   * }
   */
  LEXICAL_QUERY_COMPLETE: new PsEvent('Lexical Query Complete', LexicalQuery),

  /**
   * Published when morphological data becomes available.
   * Data: an empty object.
   */
  MORPH_DATA_READY: new PsEvent('Morph Data Ready', LexicalQuery),

  /**
   * Published when no morphological data has been found.
   * Data: an empty object.
   */
  MORPH_DATA_NOTAVAILABLE: new PsEvent('Morph Data Not Found', LexicalQuery),

  /**
   * Published when morphological data has been found.
   * Data: {Homonym} homonym - A homonym object.
   */
  HOMONYM_READY: new PsEvent('Homonym Ready', LexicalQuery),

  /**
   * Published when we need only update existed worditem.
   * Data: {Homonym} homonym - A homonym object.
   */
  WORDLIST_UPDATE_HOMONYM_READY: new PsEvent('Homonym Ready', LexicalQuery),

  /**
   * Published when lemma translations becomes available.
   * Data: {Homonym} homonym - A homonym object.
   */
  LEMMA_TRANSL_READY: new PsEvent('Lemma Translations Ready', LexicalQuery),

  /**
   * Published when lemma translations becomes available (only to update existed worditem).
   * Data: {Homonym} homonym - A homonym object.
   */
  WORDLIST_UPDATE_LEMMA_TRANSL_READY: new PsEvent('Lemma Translations Ready', LexicalQuery),

  /**
   * Published when short definitions data becomes available.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word,
   *   homonym: this.homonym
   * }
   */
  SHORT_DEFS_READY: new PsEvent('Short Definitions Data is Ready', LexicalQuery),

  /**
   * Published when short definitions data becomes available (only to update existed worditem).
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word,
   *   homonym: this.homonym
   * }
   */
  WORDLIST_UPDATE_SHORT_DEFS_READY: new PsEvent('Short Definitions Data is Ready', LexicalQuery),

  /**
   * Published when full definitions data becomes available.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word,
   *   homonym: this.homonym
   * }
   */
  FULL_DEFS_READY: new PsEvent('Full Definitions Data is Ready', LexicalQuery),

  /**
   * Published when short definitions data has been not found.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word
   * }
   */
  SHORT_DEFS_NOT_FOUND: new PsEvent('Short Definitions Data is Not Found', LexicalQuery),

  /**
   * Published when full definitions data has been not found.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word
   * }
   */
  FULL_DEFS_NOT_FOUND: new PsEvent('Full Definitions Data is Not Found', LexicalQuery),

  /**
   * Published when Lexical Query is created and TextQuoteSelector is passed inside TextSelector.
   * Data: {
   *    textQuoteSelector
   * }
   */
  TEXT_QUOTE_SELECTOR_RECEIVED: new PsEvent('TextQuoteSelector recieved for the target word', LexicalQuery),
  WORD_USAGE_EXAMPLES_READY: new PsEvent('Word usage examples ready', LexicalQuery),
  CEDICT_SERVICE_UNINITIALIZED: new PsEvent('CEDICT service is uninitialized', LexicalQuery)
}

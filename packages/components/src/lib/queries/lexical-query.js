import { LanguageModelFactory as LMF, Lexeme, Lemma, Homonym, PsEvent } from 'alpheios-data-models'
import Query from './query.js'
import Options from '@/lib/options/options.js'
import { ClientAdapters } from 'alpheios-client-adapters'
import Logger from '@/lib/log/logger.js'

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
    const langID = this.selector.languageID
    this.canReset = (this.langOpts[langID] && this.langOpts[langID].lookupMorphLast)

    if (this.selector.textQuoteSelector) {
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
          params: { homonym: homonym,
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
        this.logger.log('Some strange eror inside getWordUsageData', error)
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
    if (this.selector.data.treebank && this.selector.data.treebank.word) {
      const adapterTreebankRes = yield ClientAdapters.morphology.alpheiosTreebank({
        method: 'getHomonym',
        clientId: this.clientId,
        params: {
          languageID: this.selector.languageID,
          wordref: this.selector.data.treebank.word.ref
        }
      })
      if (adapterTreebankRes.result) {
        this.annotatedHomonym = adapterTreebankRes.result
      }

      if (adapterTreebankRes.errors.length > 0) {
        adapterTreebankRes.errors.forEach(error => this.logger.log(error.message))
      }
    }

    if (!this.canReset) {
      // if we can't reset, proceed with full lookup sequence
      const adapterTuftsRes = yield ClientAdapters.morphology.tufts({
        method: 'getHomonym',
        clientId: this.clientId,
        params: {
          languageID: this.selector.languageID,
          word: this.selector.normalizedText
        }
      })

      if (adapterTuftsRes.errors.length > 0) {
        adapterTuftsRes.errors.forEach(error => this.logger.log(error.message))
      }

      if (adapterTuftsRes.result) {
        this.homonym = adapterTuftsRes.result
        if (this.annotatedHomonym) {
          this.homonym = Homonym.disambiguate(this.homonym, [this.annotatedHomonym])
        }
        LexicalQuery.evt.MORPH_DATA_READY.pub()
      } else {
        if (this.annotatedHomonym) {
          this.homonym = this.annotatedHomonym
          LexicalQuery.evt.MORPH_DATA_READY.pub()
        } else {
          this.homonym = new Homonym([formLexeme], this.selector.normalizedText)
          LexicalQuery.evt.MORPH_DATA_NOTAVAILABLE.pub({
            targetWord: this.selector.normalizedText,
            languageId: this.selector.languageID
          })
        }
      }
    } else {
      // if we can reset then start with definitions of the unanalyzed form
      if (this.annotatedHomonym) {
        this.homonym = this.annotatedHomonym
        LexicalQuery.evt.MORPH_DATA_READY.pub()
      } else {
        this.homonym = new Homonym([formLexeme], this.selector.normalizedText)
        LexicalQuery.evt.MORPH_DATA_NOTAVAILABLE.pub({
          targetWord: this.selector.normalizedText,
          languageId: this.selector.languageID
        })
      }
    }

    const lexiconFullOpts = this.getLexiconOptions('lexicons')
    const lexiconShortOpts = this.getLexiconOptions('lexiconsShort')

    // if lexicon options are set for short definitions, we want to override any
    // short definitions provided by the maAdapter
    if (lexiconShortOpts.allow) {
      this.homonym.lexemes.forEach((l) => { l.meaning.clearShortDefs() })
    }

    LexicalQuery.evt.HOMONYM_READY.pub(this.homonym)

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

      LexicalQuery.evt.LEMMA_TRANSL_READY.pub(this.homonym)
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
        params: { homonym: this.homonym,
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

    const adapterLexiconResShort = yield ClientAdapters.lexicon.alpheios({
      method: 'fetchShortDefs',
      clientId: this.clientId,
      params: {
        opts: lexiconShortOpts,
        homonym: this.homonym,
        callBackEvtSuccess: LexicalQuery.evt.SHORT_DEFS_READY,
        callBackEvtFailed: LexicalQuery.evt.SHORT_DEFS_NOT_FOUND
      }
    })

    if (adapterLexiconResShort.errors.length > 0) {
      adapterLexiconResShort.errors.forEach(error => this.logger.log(error.message))
    }

    const adapterLexiconResFull = yield ClientAdapters.lexicon.alpheios({
      method: 'fetchFullDefs',
      clientId: this.clientId,
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

    yield 'Finalizing'
    if (adapterLexiconResShort.result || adapterLexiconResFull.result) {
      this.finalize('Success')
    }
    if (!adapterLexiconResShort.result && !adapterLexiconResFull.result) {
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
    LexicalQuery.evt.LEXICAL_QUERY_COMPLETE.pub({
      resultStatus: resultStatus,
      homonym: this.homonym
    })
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
  MORPH_DATA_READY: new PsEvent(`Morph Data Ready`, LexicalQuery),

  /**
   * Published when no morphological data has been found.
   * Data: an empty object.
   */
  MORPH_DATA_NOTAVAILABLE: new PsEvent(`Morph Data Not Found`, LexicalQuery),

  /**
   * Published when no morphological data has been found.
   * Data: {Homonym} homonym - A homonym object.
   */
  HOMONYM_READY: new PsEvent(`Homonym Ready`, LexicalQuery),

  /**
   * Published when lemma translations becomes available.
   * Data: {Homonym} homonym - A homonym object.
   */
  LEMMA_TRANSL_READY: new PsEvent(`Lemma Translations Ready`, LexicalQuery),

  /**
   * Published when short definitions data becomes available.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word,
   *   homonym: this.homonym
   * }
   */
  SHORT_DEFS_READY: new PsEvent(`Short Definitions Data is Ready`, LexicalQuery),

  /**
   * Published when full definitions data becomes available.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word,
   *   homonym: this.homonym
   * }
   */
  FULL_DEFS_READY: new PsEvent(`Full Definitions Data is Ready`, LexicalQuery),

  /**
   * Published when short definitions data has been not found.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word
   * }
   */
  SHORT_DEFS_NOT_FOUND: new PsEvent(`Short Definitions Data is Not Found`, LexicalQuery),

  /**
   * Published when full definitions data has been not found.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word
   * }
   */
  FULL_DEFS_NOT_FOUND: new PsEvent(`Full Definitions Data is Not Found`, LexicalQuery),

  /**
   * Published when Lexical Query is created and TextQuoteSelector is passed inside TextSelector.
   * Data: {
   *    textQuoteSelector
   * }
   */
  TEXT_QUOTE_SELECTOR_RECEIVED: new PsEvent(`TextQuoteSelector recieved for the target word`, LexicalQuery),
  WORD_USAGE_EXAMPLES_READY: new PsEvent(`Word usage examples ready`, LexicalQuery)
}

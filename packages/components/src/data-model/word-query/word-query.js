import { Language, LanguageModelFactory as LMF, Logger, Lexeme, Lemma, Homonym, HomonymGroup } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'
import WordQueryResult from '@comp/data-model/word-query/word-query-result.js'
import WordQueryError from '@comp/data-model/word-query/word-query-error.js'

/**
 * Contains all the business logic that is necessary to resolve the GraphQL word query.
 */
export default class WordQuery {
  constructor (options = {}, queryParams = {}) {
    this._context = {
      queryParams,
      options: {
        language: Language.fromJsonObject({ code: queryParams.language }),
        clientID: options.clientID,
        lexicons: options.lexicons,
        shortLexicons: options.shortLexicons
      },
      cancelled: false,
      result: undefined
    }
  }

  start (result) {
    this._context.result = result
    this._context.result.loadingStarted()
    if (this._context.queryParams.getLexemes) { this._context.result.state.lexemes.loading = true }
    if (this._context.queryParams.getShortDefs) { this._context.result.state.shortDefs.loading = true }
    const executionPath = WordQuery._createExecutionPath(this._context.queryParams)
    try {
      // Ignore result of an asynchronous operation and return immediately
      // Result will be tracked via the proxied `result` variable
      this._context = WordQuery._execute(executionPath, this._context)
    } catch (err) {
      Logger.getInstance().error(err)
    }
    return result
  }

  cancel () {
    this._context.cancelled = true
  }

  // Creates a set of methods to be executed in order to fulfil the request.
  static _createExecutionPath (queryParams) {
    /*
     Execution path consists of several batches. Batches are execution sequentially: each next batch
     is executed after the previous one is completed.
     Each batch consist of one or several jobs. Jobs within a batch can be executed in parallel.
     */
    let path = [] // eslint-disable-line prefer-const

    let getLexemesBatch = [] // eslint-disable-line prefer-const
    if (queryParams.getLexemes) {
      if (queryParams.useMorphService) {
        getLexemesBatch.push('_getTuftsMorphology')
      }
      if (queryParams.useTreebankData) {
        getLexemesBatch.push('_getTreebankData')
      }
      if (queryParams.useWordAsLexeme) {
        getLexemesBatch.push('_getWordAsLexeme')
      }
    }
    if (getLexemesBatch.length > 0) {
      path.push(getLexemesBatch)
    }
    path.push(['_disambiguate'])

    if (queryParams.getShortDefs) {
      path.push(['_getShortDefs'])
    }
    return path
  }

  // Runs all the jobs within the execution path.
  static async _execute (executionPath, context) {
    try {
      for (const batch of executionPath) {
        if (!context.cancelled) {
          const jobs = batch.map(job => WordQuery[job](context))
          await Promise.all(jobs)
        }
      }
    } catch (err) {
      Logger.getInstance().error(err)
    }
    WordQueryResult.loadingStopped(context.result.state)
    context.result.state = Object.assign({}, context.result.state)
    return context
  }

  // Retrieves morphological data from Tufts
  static async _getTuftsMorphology (context) {
    context.result.state.lexemes.loading = true
    const langAttrs = LMF.getLegacyLanguageCodeAndId(context.options.language)
    // If succeeds, request returns a Homonym in its `result` field
    const adapterMorphRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      clientID: context.options.clientID,
      params: {
        languageID: langAttrs.languageID,
        word: context.queryParams.word
      }
    })

    let homonymGroup
    if (adapterMorphRes.errors.length === 0) {
      // Request succeeded
      if (!context.queryParams.getShortDefs) {
        // Clear the short defs data if query did not request short definitions but we have them in the homonym, clear their data
        adapterMorphRes.result.lexemes.forEach((l) => { l.meaning.clearShortDefs() })
      }

      homonymGroup = new HomonymGroup([adapterMorphRes.result])
    } else {
      // Request failed
      adapterMorphRes.errors.forEach(error => {
        context.result.errors = [
          ...context.result.errors,
          new WordQueryError(
            error.message,
            WordQueryError.errorCodes.TUFTS_ERROR,
            {
              path: [error.methodName, error.adapter]
            })
        ]
        Logger.getInstance().log(error.message)
      })
      homonymGroup = new HomonymGroup([])
    }

    context.tuftsMorphology = {
      state: {
        loading: false,
        available: (adapterMorphRes.errors.length === 0),
        failed: (adapterMorphRes.errors.length > 0)
      },
      data: homonymGroup
    }
    return context
  }

  // Creates a 'fake' homonym group object out of a word (will be used until dictionary search is implemented)
  static async _getWordAsLexeme (context) {
    context.result.state.lexemes.loading = true
    const formLexeme = new Lexeme(new Lemma(context.queryParams.word, context.options.language), [])
    const homonym = new Homonym([formLexeme], context.queryParams.word)
    const homonymGroup = new HomonymGroup([homonym])

    context.wordAsLexeme = {
      state: {
        loading: false,
        available: true,
        failed: false
      },
      data: homonymGroup
    }
    return context
  }

  // Retrieves data from the treebank adapter
  static async _getTreebankData (context) {
    context.result.state.lexemes.loading = true
    const langAttrs = LMF.getLegacyLanguageCodeAndId(context.options.language)
    let failed = false
    let homonyms = await Promise.all(context.queryParams.treebankWordIDs.map(async (wordId) => {
      const adapterTreebankRes = await ClientAdapters.morphology.arethusaTreebank({
        method: 'getHomonym',
        clientID: context.options.clientID,
        params: {
          languageID: langAttrs.languageID,
          word: context.queryParams.word,
          provider: context.queryParams.treebankProvider,
          sentenceId: context.queryParams.treebankSentenceID,
          wordId: wordId
        }
      })

      if (adapterTreebankRes.errors.length > 0) {
        failed = true
        adapterTreebankRes.errors.forEach(error => {
          context.result.errors = [
            ...context.result.errors,
            new WordQueryError(
              error.message,
              WordQueryError.errorCodes.TREEBANK_ERROR,
              {
                path: [error.methodName, error.adapter]
              })
          ]
          Logger.getInstance().log(error.message)
        })
      }
    }))

    // Filter out incorrect and empty responses
    homonyms = homonyms.filter(homonym => Boolean(homonym))
    const homonymGroup = new HomonymGroup(homonyms)

    context.treebankData = {
      state: {
        loading: false,
        available: !failed,
        failed
      },
      data: homonymGroup
    }
    return context
  }

  // Disambiguates results of lexical queries, has some limitations for now
  static async _disambiguate (context) {
    context.result.state.lexemes.loading = false
    // For now we expect first disambiguation source to be either the Tufts morphology or the word as lexeme
    const availableSources = [context.tuftsMorphology, context.wordAsLexeme, context.treebankData].filter(r => r && r.state.available).map(r => r.data)
    if (availableSources.length > 1) {
      // There are results from more than one source, we need to disambiguate the results
      if (availableSources.length > 2) {
        Logger.getInstance().log('Disambiguation of more than two sources is non supported. Will use first two results only')
      }
      // Disambiguate the data
      const disambiguationBase = availableSources[0]
      // For now we support a single homonym only as a disambiguation base
      if (disambiguationBase.homonyms.length > 1) {
        Logger.getInstance().log(`Disambiguation base with more than one homonym is currently not supported. Extra ${disambiguationBase.homonyms.length - 1} homonyms will be ignored`)
      }
      const homonym = disambiguationBase.homonyms[0]
      const disambiguatedHomonym = Homonym.disambiguate(homonym, availableSources[1].homonyms)
      context.result.homonymGroup = new HomonymGroup([disambiguatedHomonym])
      context.result.state.lexemes.available = true
    } else if (availableSources.length === 1) {
      context.result.homonymGroup = availableSources[0]
      context.result.state.lexemes.available = true
    } else {
      // Retrieval of morphological data failed
      context.result.homonymGroup = new HomonymGroup([])
      context.result.state.lexemes.available = false
      context.result.state = Object.assign({}, context.result.state)
      // Throw an error to interrupt the execution path
      throw new Error('Retrieval of morphological data failed')
    }
    context.result.state = Object.assign({}, context.result.state)
    return context
  }

  // Retrieves short definitions
  static async _getShortDefs (context) {
    if (!context.result.state.lexemes.available) {
      // Lexemes are not available, skip the short definition retrieval
      context.result.state.shortDefs.available = false
      context.result.state.shortDefs.loading = false
      context.result.state = Object.assign({}, context.result.state)
      return context
    }

    let failed = false
    if (context.options.shortLexicons.allow && context.options.shortLexicons.allow.length > 0) {
      let homonyms = [] // eslint-disable-line prefer-const
      for (let homonym of context.result.homonymGroup.homonyms) { // eslint-disable-line prefer-const
        if (homonym.hasShortDefs) {
          // Short definitions has already been retrieved along with the lexemes
          // Clear the short defs data if query did not request short definitions but we have them in the homonym, clear their data
          homonym.lexemes.forEach((l) => {
            l.meaning.clearShortDefs()
          })
        }

        const adapterLexiconResShort = await ClientAdapters.lexicon.alpheios({
          method: 'fetchShortDefs',
          clientId: context.options.clientID,
          params: {
            opts: context.options.shortLexicons,
            homonym: homonym
          }
        })

        if (adapterLexiconResShort.errors.length === 0) {
          if (adapterLexiconResShort.result) {
            homonyms.push(adapterLexiconResShort.result)
          } else {
            // If client adapters returned no homonym keep the original homonym object instead
            homonyms.push(homonym)
          }
        } else {
          failed = true
          adapterLexiconResShort.errors.forEach(error => {
            context.result.errors = [
              ...context.result.errors,
              new WordQueryError(
                error.message,
                WordQueryError.errorCodes.LEXICONS_ERROR,
                {
                  path: [error.methodName, error.adapter]
                })
            ]
            Logger.getInstance().log(error.message)
          })
          // Push the unmodified Homonym object f retrieval of short definitions failed
          homonyms.push(homonym)
        }
      }
      context.result.homonymGroup = new HomonymGroup(homonyms)
    }

    context.result.state.shortDefs.available = context.result.homonymGroup.homonyms.some((h) => h.hasShortDefs)
    context.result.state.shortDefs.loading = false
    context.result.state.shortDefs.failed = failed
    context.result.state = Object.assign({}, context.result.state)
    return context
  }
}

export const wordQueryResolver = WordQuery.wordQueryReadHandler

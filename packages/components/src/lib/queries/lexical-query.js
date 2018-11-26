import { LanguageModelFactory as LMF, Lexeme, Lemma, Homonym } from 'alpheios-data-models'
import Event from '@/lib/events/event.js'
import Query from './query.js'

export default class LexicalQuery extends Query {
  constructor (name, selector, options) {
    super(name)
    this.selector = selector
    this.htmlSelector = options.htmlSelector
    this.maAdapter = options.maAdapter
    this.tbAdapter = options.tbAdapter
    this.langData = options.langData
    this.lexicons = options.lexicons
    this.langOpts = options.langOpts || []
    this.resourceOptions = options.resourceOptions || []
    this.siteOptions = options.siteOptions || []
    this.lemmaTranslations = options.lemmaTranslations
    const langID = this.selector.languageID
    this.canReset = (this.langOpts[langID] && this.langOpts[langID].lookupMorphLast)
  }

  static create (selector, options) {
    return Query.create(LexicalQuery, selector, options)
  }

  async getData () {
    this.languageID = this.selector.languageID
    let iterator = this.iterations()

    let result = iterator.next()
    while (true) {
      if (!this.active) { this.finalize() }
      if (Query.isPromise(result.value)) {
        try {
          let resolvedValue = await result.value
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
    let formLexeme = new Lexeme(new Lemma(this.selector.normalizedText, this.selector.languageID), [])
    if (this.tbAdapter && this.selector.data.treebank && this.selector.data.treebank.word) {
      this.annotatedHomonym = yield this.tbAdapter.getHomonym(this.selector.languageID, this.selector.data.treebank.word.ref)
    }
    if (!this.canReset) {
      // if we can't reset, proceed with full lookup sequence
      this.homonym = yield this.maAdapter.getHomonym(this.selector.languageID, this.selector.normalizedText)
      if (this.homonym) {
        if (this.annotatedHomonym) {
          this.homonym = Homonym.disambiguate(this.homonym, [this.annotatedHomonym])
        }
        LexicalQuery.evt.MORPH_DATA_READY.pub()
      } else {
        if (this.annotatedHomonym) {
          this.homonym = this.annotatedHomonym
        } else {
          LexicalQuery.evt.MORPH_DATA_NOT_FOUND.pub()
          this.homonym = new Homonym([formLexeme], this.selector.normalizedText)
        }
      }
    } else {
      // if we can reset then start with definitions of the unanalyzed form
      if (this.annotatedHomonym) {
        this.homonym = this.annotatedHomonym
      } else {
        this.homonym = new Homonym([formLexeme], this.selector.normalizedText)
      }
    }

    let lexiconFullOpts = this.getLexiconOptions('lexicons')
    let lexiconShortOpts = this.getLexiconOptions('lexiconsShort')

    // if lexicon options are set for short definitions, we want to override any
    // short definitions provided by the maAdapter
    if (lexiconShortOpts.allow) {
      this.homonym.lexemes.forEach((l) => { l.meaning.clearShortDefs() })
    }

    LexicalQuery.evt.HOMONYM_READY.pub(this.homonym)

    let definitionRequests = []

    let lemmaList = []

    for (let lexeme of this.homonym.lexemes) {
      // Short definition requests
      let requests = this.lexicons.fetchShortDefs(lexeme.lemma, lexiconShortOpts)
      definitionRequests = definitionRequests.concat(requests.map(request => {
        return {
          request: request,
          type: 'Short definition',
          lexeme: lexeme,
          appendFunction: 'appendShortDefs',
          complete: false
        }
      }))
      // Full definition requests
      requests = this.lexicons.fetchFullDefs(lexeme.lemma, lexiconFullOpts)
      definitionRequests = definitionRequests.concat(requests.map(request => {
        return {
          request: request,
          type: 'Full definition',
          lexeme: lexeme,
          appendFunction: 'appendFullDefs',
          complete: false
        }
      }))

      lemmaList.push(lexeme.lemma)
    }

    if (this.lemmaTranslations) {
      const languageCode = LMF.getLanguageCodeFromId(this.selector.languageID)
      yield this.lemmaTranslations.adapter.fetchTranslations(lemmaList, languageCode, this.lemmaTranslations.locale)
      LexicalQuery.evt.LEMMA_TRANSL_READY.pub(this.homonym)
    }

    yield 'Retrieval of lemma translations completed'

    // Handle definition responses
    if (definitionRequests.length > 0) {
      for (let definitionRequest of definitionRequests) {
        definitionRequest.request.then(
          definition => {
            console.log(`${definitionRequest.type}(s) received:`, definition)
            definitionRequest.lexeme.meaning[definitionRequest.appendFunction](definition)
            definitionRequest.complete = true
            if (this.active) {
              LexicalQuery.evt.DEFS_READY.pub({
                requestType: definitionRequest.type,
                word: definitionRequest.lexeme.lemma.word,
                homonym: this.homonym
              })
            }
            if (definitionRequests.every(request => request.complete)) {
              this.finalize('Success')
            }
          },
          error => {
            console.error(`${definitionRequest.type}(s) request failed: ${error}`)
            definitionRequest.complete = true
            if (this.active) {
              LexicalQuery.evt.DEFS_NOT_FOUND.pub({
                requestType: definitionRequest.type,
                word: definitionRequest.lexeme.lemma.word
              })
            }
            if (definitionRequests.every(request => request.complete)) {
              this.finalize(error)
            }
          }
        )
      }
      yield 'Retrieval of short and full definitions complete'
    } else {
      // need to finalize if there weren't any definition requests
      this.finalize('Success-NoDefs')
      yield 'No definitions to retrieve'
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
        console.error(`LexicalQuery failed: ${result.message}`)
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
    let siteMatch = this.siteOptions.filter((s) => this.selector.location.match(new RegExp(s.uriMatch)))
    if (siteMatch.length > 0 && siteMatch[0].resourceOptions.items[lexiconKey]) {
      allOptions = [...siteMatch[0].resourceOptions.items[lexiconKey], ...this.resourceOptions.items[lexiconKey]]
    } else {
      allOptions = this.resourceOptions.items[lexiconKey] || []
    }
    let lexiconOpts = allOptions.filter((l) => this.resourceOptions.parseKey(l.name).group === languageCode
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
  LEXICAL_QUERY_COMPLETE: new Event('Lexical Query Complete', LexicalQuery),

  /**
   * Published when morphological data becomes available.
   * Data: an empty object.
   */
  MORPH_DATA_READY: new Event(`Morph Data Ready`, LexicalQuery),

  /**
   * Published when no morphological data has been found.
   * Data: an empty object.
   */
  MORPH_DATA_NOT_FOUND: new Event(`Morph Data Not Found`, LexicalQuery),

  /**
   * Published when no morphological data has been found.
   * Data: {Homonym} homonym - A homonym object.
   */
  HOMONYM_READY: new Event(`Homonym Ready`, LexicalQuery),

  /**
   * Published when lemma translations becomes available.
   * Data: {Homonym} homonym - A homonym object.
   */
  LEMMA_TRANSL_READY: new Event(`Lemma Translations Ready`, LexicalQuery),

  /**
   * Published when definitions data becomes available.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word,
   *   homonym: this.homonym
   * }
   */
  DEFS_READY: new Event(`Definitions Data Ready`, LexicalQuery),

  /**
   * Published when definitions data has been not found.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word
   * }
   */
  DEFS_NOT_FOUND: new Event(`Definitions Data Not Found`, LexicalQuery)
}

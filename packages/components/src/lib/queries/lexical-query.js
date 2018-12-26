import { LanguageModelFactory as LMF, Lexeme, Lemma, Homonym, PsEvent } from 'alpheios-data-models'
import Query from './query.js'
import { ClientAdapters } from 'alpheios-client-adapters'

export default class LexicalQuery extends Query {
  constructor (name, selector, options) {
    super(name)
    this.selector = selector
    this.htmlSelector = options.htmlSelector
    this.langData = options.langData
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
    if (this.selector.data.treebank && this.selector.data.treebank.word) {
      let adapterTreebankRes = yield ClientAdapters.morphology.alpheiosTreebank({
        method: 'getHomonym',
        params: {
          languageID: this.selector.languageID,
          wordref: this.selector.data.treebank.word.ref
        }
      })
      if (adapterTreebankRes.result) {
        this.annotatedHomonym = adapterTreebankRes.result
      }

      if (adapterTreebankRes.errors.length > 0) {
        adapterTreebankRes.errors.forEach(error => console.error(error))
      }
    }

    if (!this.canReset) {
      // if we can't reset, proceed with full lookup sequence
      let adapterTuftsRes = yield ClientAdapters.morphology.tufts({
        method: 'getHomonym',
        params: {
          languageID: this.selector.languageID,
          word: this.selector.normalizedText
        }
      })

      if (adapterTuftsRes.errors.length > 0) {
        adapterTuftsRes.errors.forEach(error => console.error(error))
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
          LexicalQuery.evt.MORPH_DATA_NOTAVAILABLE.pub()
        }
      }
    } else {
      // if we can reset then start with definitions of the unanalyzed form
      if (this.annotatedHomonym) {
        this.homonym = this.annotatedHomonym
        LexicalQuery.evt.MORPH_DATA_READY.pub()
      } else {
        this.homonym = new Homonym([formLexeme], this.selector.normalizedText)
        LexicalQuery.evt.MORPH_DATA_NOTAVAILABLE.pub()
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

    if (this.lemmaTranslations) {
      let adapterTranslationRes = yield ClientAdapters.lemmatranslation.alpheios({
        method: 'fetchTranslations',
        params: {
          homonym: this.homonym,
          browserLang: this.lemmaTranslations.locale
        }
      })
      if (adapterTranslationRes.errors.length > 0) {
        adapterTranslationRes.errors.forEach(error => console.error(error))
      }

      LexicalQuery.evt.LEMMA_TRANSL_READY.pub(this.homonym)
    }

    yield 'Retrieval of lemma translations completed'

    let adapterLexiconResShort = yield ClientAdapters.lexicon.alpheios({
      method: 'fetchShortDefs',
      params: {
        opts: lexiconShortOpts,
        homonym: this.homonym,
        callBackEvtSuccess: LexicalQuery.evt.DEFS_READY,
        callBackEvtFailed: LexicalQuery.evt.DEFS_NOT_FOUND
      }
    })

    if (adapterLexiconResShort.errors.length > 0) {
      adapterLexiconResShort.errors.forEach(error => console.error(error))
    }

    let adapterLexiconResFull = yield ClientAdapters.lexicon.alpheios({
      method: 'fetchFullDefs',
      params: {
        opts: lexiconFullOpts,
        homonym: this.homonym,
        callBackEvtSuccess: LexicalQuery.evt.DEFS_READY,
        callBackEvtFailed: LexicalQuery.evt.DEFS_NOT_FOUND
      }
    })

    if (adapterLexiconResFull.errors.length > 0) {
      adapterLexiconResFull.errors.forEach(error => console.error(error))
    }

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
   * Published when definitions data becomes available.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word,
   *   homonym: this.homonym
   * }
   */
  DEFS_READY: new PsEvent(`Definitions Data Ready`, LexicalQuery),

  /**
   * Published when definitions data has been not found.
   * Data: {
   *   requestType: definitionRequest.type,
   *   word: definitionRequest.lexeme.lemma.word
   * }
   */
  DEFS_NOT_FOUND: new PsEvent(`Definitions Data Not Found`, LexicalQuery)
}

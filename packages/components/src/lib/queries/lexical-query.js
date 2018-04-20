import { LanguageModelFactory as LMF, Lexeme, Lemma, Homonym } from 'alpheios-data-models'
import { LanguageDatasetFactory as LDF } from 'alpheios-inflection-tables'
import Query from './query.js'

export default class LexicalQuery extends Query {
  constructor (name, selector, options) {
    super(name)
    this.selector = selector
    this.htmlSelector = options.htmlSelector
    this.ui = options.uiController
    this.maAdapter = options.maAdapter
    this.langData = options.langData
    this.lexicons = options.lexicons

    this.lemmaTranslations = options.lemmaTranslations

    this.langOpts = options.langOpts
    this.resourceOptions = options.resourceOptions
    this.l10n = options.l10n
    let langID = LMF.getLanguageIdFromCode(this.selector.languageCode)
    if (this.langOpts[langID] && this.langOpts[langID].lookupMorphLast) {
      this.canReset = true
    } else {
      this.canReset = false
    }
  }

  static create (selector, options) {
    return Query.create(LexicalQuery, selector, options)
  }

  async getData () {
    this.languageID = LMF.getLanguageIdFromCode(this.selector.languageCode)
    this.ui.setTargetRect(this.htmlSelector.targetRect).newLexicalRequest().message(`Please wait while data is retrieved ...`)
    this.ui.showStatusInfo(this.selector.normalizedText, this.languageID)
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
    let formLexeme = new Lexeme(new Lemma(this.selector.normalizedText, this.selector.languageCode), [])
    if (!this.canReset) {
      // if we can't reset, proceed with full lookup sequence
      this.homonym = yield this.maAdapter.getHomonym(this.selector.languageCode, this.selector.normalizedText)
      if (this.homonym) {
        this.ui.addMessage(this.ui.l10n.messages.TEXT_NOTICE_MORPHDATA_READY)
      } else {
        this.ui.addImportantMessage(this.ui.l10n.messages.TEXT_NOTICE_MORPHDATA_NOTFOUND)
        this.homonym = new Homonym([formLexeme], this.selector.normalizedText)
      }
    } else {
      // if we can reset then start with definitions of just the form first
      this.homonym = new Homonym([formLexeme], this.selector.normalizedText)
    }

    this.ui.updateMorphology(this.homonym)
    this.ui.updateDefinitions(this.homonym)
    // Update status info with data from a morphological analyzer
    this.ui.showStatusInfo(this.homonym.targetWord, this.homonym.languageID)

    this.lexicalData = yield LDF.getInflectionData(this.homonym)
    this.ui.addMessage(this.ui.l10n.messages.TEXT_NOTICE_INFLDATA_READY)
    this.ui.updateInflections(this.lexicalData, this.homonym)

    let definitionRequests = []
    let lexiconOpts =
      this.resourceOptions.items.lexicons.filter(
        (l) => this.resourceOptions.parseKey(l.name).language === this.selector.languageCode
      ).map((l) => { return {allow: l.currentValue} }
      )
    if (lexiconOpts.length > 0) {
      lexiconOpts = lexiconOpts[0]
    } else {
      lexiconOpts = {}
    }

    let lemmaList = []

    for (let lexeme of this.homonym.lexemes) {
      // Short definition requests
      let requests = this.lexicons.fetchShortDefs(lexeme.lemma, lexiconOpts)
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
      requests = this.lexicons.fetchFullDefs(lexeme.lemma, lexiconOpts)
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

    // this.lemmaTranslations.fetchTranslations(lemmaList, 'eng')
    this.lemmaTranslations.fetchTranslations(lemmaList, 'eng')
      .then(res => {
        console.log('translations ready')
        this.ui.updateTranslations(this.homonym)
      })
    // Handle definition responses
    for (let definitionRequest of definitionRequests) {
      definitionRequest.request.then(
        definition => {
          console.log(`${definitionRequest.type}(s) received:`, definition)
          definitionRequest.lexeme.meaning[definitionRequest.appendFunction](definition)
          definitionRequest.complete = true
          if (this.active) {
            this.ui.addMessage(this.ui.l10n.messages.TEXT_NOTICE_DEFSDATA_READY.get(definitionRequest.type, definitionRequest.lexeme.lemma.word))
            this.ui.updateDefinitions(this.homonym)
          }
          if (definitionRequests.every(request => request.complete)) {
            this.finalize('Success')
          }
        },
        error => {
          console.error(`${definitionRequest.type}(s) request failed: ${error}`)
          definitionRequest.complete = true
          if (this.active) {
            this.ui.addMessage(this.ui.l10n.messages.TEXT_NOTICE_DEFSDATA_NOTFOUND.get(definitionRequest.type, definitionRequest.lexeme.lemma.word))
          }
          if (definitionRequests.every(request => request.complete)) {
            this.finalize(error)
          }
        }
      )
    }
    yield 'Retrieval of short and full definitions complete'
  }

  finalize (result) {
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
      this.ui.addMessage(this.ui.l10n.messages.TEXT_NOTICE_LEXQUERY_COMPLETE)
      if (typeof result === 'object' && result instanceof Error) {
        console.error(`LexicalQuery failed: ${result.message}`)
      } else {
        console.log('LexicalQuery completed successfully')
      }
      // we might have previous requests which succeeded so go ahead and try
      // to show language info. It will catch empty data.
      this.ui.showLanguageInfo(this.homonym)
    }
    Query.destroy(this)
    return result
  }
}

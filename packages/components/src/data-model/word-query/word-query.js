import { Logger } from 'alpheios-data-models'
import TuftsMorphologyData from '@comp/data-model/word-query/lexical-data/data-objects/tufts-morphology-data.js'
import TreebankData from '@comp/data-model/word-query/lexical-data/data-objects/treebank-data.js'
import WordAsLexemeData from '@comp/data-model/word-query/lexical-data/data-objects/word-as-lexeme-data.js'
import DisambiguatedData from '@comp/data-model/word-query/lexical-data/data-objects/disambiguated-data.js'
import ShortDefsData from '@comp/data-model/word-query/lexical-data/data-objects/short-defs-data.js'

/**
 * Contains all the business logic that is necessary to resolve the GraphQL word query.
 */
export default class WordQuery {
  constructor ({
    word,
    language,
    clientId,
    getLexemes,
    useMorphService,
    useTreebankData,
    useWordAsLexeme,
    getShortDefs,
    treebankProvider,
    treebankSentenceId,
    treebankWordIds,
    lexicons,
    shortLexicons,
    wordQueryResponse
  }) {
    /*
    Word query uses several parameters to specify what data should be returned.
    get parameters specify what information should be returned:
        getLexemes - specifies that the lexemes need to be retrieved:
        getShortDefs - indicates that short definitions are needed;
    use parameters specify what sources should be used:
        useMorphService - specifies that a "main" morphology service should be used (such as Tufts);
        useTreebankData - specifies that data from treebank should be use;
        useWordAsLexeme - indicates that we should construct a lexeme out of a word;
     Using different combination of parameters the client can configure the query to return exactly what is required.
     */
    this._queryData = {
      word,
      language,
      clientId,
      getLexemes,
      useMorphService,
      useTreebankData,
      useWordAsLexeme,
      getShortDefs,
      treebankProvider,
      treebankSentenceId,
      treebankWordIds,
      lexicons,
      shortLexicons,
      clearShortDefs: !getShortDefs
    }

    this._wordQueryResponse = wordQueryResponse
    this._executionPath = this.createExecutionPath()
    this._cancelled = false
  }

  createExecutionPath () {
    /*
     The job is a set of self sufficient operations such as retrieval of short definitions or of data
     from the Tufts adapter. Jobs are represented by their own data retrieval classes.

     Jobs are grouped into batches. All jobs within one batch are executed in parallel.

     A set of batches comprises an execution path. All batches are executed strictly one after the other.
     */
    let path = [] // eslint-disable-line prefer-const

    let getLexemesBatch = [] // eslint-disable-line prefer-const
    if (this._queryData.getLexemes) {
      if (this._queryData.useMorphService) {
        getLexemesBatch.push(new TuftsMorphologyData({
          word: this._queryData.word,
          language: this._queryData.language,
          clientId: this._queryData.clientId,
          clearShortDefs: this._queryData.clearShortDefs
        }))
      }
      if (this._queryData.useTreebankData) {
        getLexemesBatch.push(new TreebankData({
          word: this._queryData.word,
          language: this._queryData.language,
          clientId: this._queryData.clientId,
          treebankProvider: this._queryData.treebankProvider,
          treebankSentenceId: this._queryData.treebankSentenceId,
          treebankWordIds: this._queryData.treebankWordIds
        }))
      }
      if (this._queryData.useWordAsLexeme) {
        getLexemesBatch.push(new WordAsLexemeData({
          word: this._queryData.word,
          language: this._queryData.language
        }))
      }
    }
    if (getLexemesBatch.length > 0) {
      path.push(getLexemesBatch)
    }
    path.push([new DisambiguatedData()])

    if (this._queryData.getShortDefs) {
      path.push([new ShortDefsData({
        clientId: this._queryData.clientId,
        shortLexicons: this._queryData.shortLexicons
      })])
    }
    return path
  }

  /**
   * Starts the process of obtaining the lexical data.
   *
   * @returns {undefined}
   */
  async start () {
    this._wordQueryResponse.state.loading = true
    if (this._queryData.getLexemes) { this._wordQueryResponse.state.lexemes.loading = true }
    if (this._queryData.getShortDefs) { this._wordQueryResponse.state.shortDefs.loading = true }
    this._wordQueryResponse.notify()
    /*
    Jobs may use information from the previous jobs stored within the context.
    For example, a disambiguate job may use Tufts and treebank adapter data from the context
    to produce a disambiguated homonym. The data about the results of previous jobs
    is stored in a lexical data map where keys are the job data types.
     */
    let lexicalData = new Map() // eslint-disable-line prefer-const
    try {
      for (const batch of this._executionPath) {
        if (!this._cancelled) {
          const jobResults = await Promise.all(batch.map(d => d.retrieve(lexicalData)))
          jobResults.forEach(jobResult => {
            lexicalData.set(jobResult.dataType, jobResult)
            if (jobResult.errors.length > 0) {
              // Copy errors from all jobs into the query response
              this._wordQueryResponse.errors.push(...jobResult.errors)
            }
            if (jobResult.dataType === DisambiguatedData.dataType) {
              this._wordQueryResponse.state.lexemes = jobResult.state
              this._wordQueryResponse.homonymGroup = jobResult.data
              if (jobResult.state.failed) {
                // Skip other steps if disambiguation failed
                this.cancel()
                return
              }
              this._wordQueryResponse.notify()
            }
            if (jobResult.dataType === ShortDefsData.dataType) {
              this._wordQueryResponse.state.shortDefs = jobResult.state
              this._wordQueryResponse.homonymGroup = jobResult.data
              this._wordQueryResponse.notify()
            }
          })
        }
      }
      this.finalize()
    } catch (err) {
      // Execution was interrupted due to an error, finalize the query
      Logger.getInstance().error(err)
      this.finalize()
    }
  }

  finalize () {
    this._wordQueryResponse.state.loading = false
    this._wordQueryResponse.state.lexemes.loading = false
    this._wordQueryResponse.state.shortDefs.loading = false
    this._wordQueryResponse.notify()
  }

  cancel () {
    this._cancelled = true
  }
}

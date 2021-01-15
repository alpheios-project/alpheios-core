import { Logger } from 'alpheios-data-models'
import TuftsMorphologyData from '@comp/lexical-data/word-query/lexical-data/data-objects/tufts-morphology-data.js'
import TreebankData from '@comp/lexical-data/word-query/lexical-data/data-objects/treebank-data.js'
import WordAsLexemeData from '@comp/lexical-data/word-query/lexical-data/data-objects/word-as-lexeme-data.js'
import DisambiguatedData from '@comp/lexical-data/word-query/lexical-data/data-objects/disambiguated-data.js'
import ShortDefsData from '@comp/lexical-data/word-query/lexical-data/data-objects/short-defs-data.js'

/**
 * A class representing treebank options.
 *
 * @typedef {object} TreebankDataOptions
 * @property {string} treebankProvider - The URL of a treebank data provider.
 * @property {string} treebankSentenceId - An ID of a sentence in the treebank.
 * @property {string[]} treebankWordIds - An array of word IDs.
 */

/**
 * A class representing options for lexemes retrieval.
 *
 * @typedef {object} GetLexemesOptions
 * @property {boolean} useMorphService - The URL of a treebank data provider.
 * @property {TreebankDataOptions} useTreebankData - An ID of a sentence in the treebank.
 * @property {boolean} useWordAsLexeme - An array of word IDs.
 */

/**
 * A class representing options for retrieval of short definitions.
 *
 * @typedef {object} GetShortDefsOptions
 * @property {object} lexicons - The object holding options for lexicons (i.e. for full definitions).
 * @property {object} shortLexicons - The object holding options for short definitions lexicons.
 */

/**
 * A class representing options of the word query.
 *
 * @typedef {object} WordQueryOptions
 * @param {string} word - A word for which lexical data to be retrieved.
 * @param {Language} language - A language of a word.
 * @param {string} clientId - A client ID of an application.
 * @param {GetLexemesOptions} [getLexemes] - Get lexemes options.
 * @param {GetLexemesOptions} [getShortDefs] - Get short definitions options.
 */

/**
 * Contains all the business logic that is necessary to resolve the GraphQL word query.
 */
export default class WordQuery {
  /**
   * Creates an instance of a WordQuery class.
   *
   * @param {WordQueryOptions} options - A word for which lexical data to be retrieved.
   * @param {import('./word-query-response.js').WordQueryResponse} wordQueryResponse - A response object
   *        that will be updated dynamically.
   */
  constructor ({
    word,
    language,
    clientId,
    getLexemes,
    getShortDefs
  }, wordQueryResponse) {
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
      getShortDefs,
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
      if (this._queryData.getLexemes.useMorphService) {
        getLexemesBatch.push(new TuftsMorphologyData({
          word: this._queryData.word,
          language: this._queryData.language,
          clientId: this._queryData.clientId,
          clearShortDefs: this._queryData.clearShortDefs
        }))
      }
      if (this._queryData.getLexemes.useTreebankData) {
        getLexemesBatch.push(new TreebankData({
          word: this._queryData.word,
          language: this._queryData.language,
          clientId: this._queryData.clientId,
          treebankProvider: this._queryData.getLexemes.useTreebankData.treebankProvider,
          treebankSentenceId: this._queryData.getLexemes.useTreebankData.treebankSentenceId,
          treebankWordIds: this._queryData.getLexemes.useTreebankData.treebankWordIds
        }))
      }
      if (this._queryData.getLexemes.useWordAsLexeme) {
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
        shortLexicons: this._queryData.getShortDefs.shortLexicons
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

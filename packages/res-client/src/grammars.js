import {LanguageModelFactory} from 'alpheios-data-models'
import GrammarResAdapter from './grammar/grammar_adapter'

let grammars = new Map() // Maps a language ID into an array of grammars

export default class Grammars {
  /**
   * Default request parameters
   * @return {{timeout: number}}
   */
  static get defaults () {
    return {
      timeout: 0 // If zero, no timeout will be used
    }
  }

  /**
   * Send request to a grammar index
   * @param {GrmFeature} feature - A feature to lookup
   * @param {Object} requestOptions - With what options run a request.
   * @return {Promise[]} Array of Promises, one for each request. They will be either fulfilled with
   * a Definition object or resolved with an error if request cannot be made/failed/timeout expired.
   */
  static fetchResources (feature, requestOptions) {
    let options = Object.assign(Grammars.defaults, requestOptions)

    let requests = []
    try {
      let adapters = Grammars.getGrammarAdapters(feature.languageID)
      if (!adapters || adapters.length === 0) { return [] } // No adapters found for this language
      requests = adapters.map(adapter => {
        console.log(`Preparing a request to "${adapter.config.description}"`)
        return new Promise((resolve, reject) => {
          let timeout = 0
          if (options.timeout > 0) {
            timeout = window.setTimeout(() => {
              reject(new Error(`Timeout of ${options.timeout} ms has been expired for a request to "${adapter.config.description}"`))
            }, options.timeout)
          }

          try {
            adapter.getResources(feature)
              .then(value => {
                console.log(`A url has been returned from "${adapter.config.description}"`, value)
                if (timeout) { window.clearTimeout(timeout) }
                // value is a Definition object wrapped in a Proxy
                resolve(value)
              }).catch(error => {
                if (timeout) { window.clearTimeout(timeout) }
                reject(error)
              })
          } catch (error) {
            reject(error)
          }
        })
      })

      return requests
    } catch (error) {
      console.log(`Unable to fetch resources due to: ${error}`)
      return []
    }
  }

  /**
   * Returns a list of suitable lexicon adapters for a given language ID.
   * @param {Symbol} languageID - A language ID of adapters returned.
   * @return {BaseLexiconAdapter[]} An array of lexicon adapters for a given language.
   */
  static getGrammarAdapters (languageID) {
    if (!grammars.has(languageID)) {
      // As getLexicons need a language code, let's convert a language ID to a code
      let languageCode = LanguageModelFactory.getLanguageCodeFromId(languageID)

      let grammarsList = GrammarResAdapter.getProviders(languageCode)
      grammars.set(languageID, Array.from(grammarsList.keys()).map(id => new GrammarResAdapter(id)))
    }
    return grammars.get(languageID)
  }
}

import { Logger, Homonym, HomonymGroup } from 'alpheios-data-models'
import LexicalDataResult from '@comp/data-model/word-query/lexical-data/result/lexical-data-result.js'
import TuftsMorphologyData from '@comp/data-model/word-query/lexical-data/data-objects/tufts-morphology-data.js'
import TreebankData from '@comp/data-model/word-query/lexical-data/data-objects/treebank-data.js'
import WordAsLexemeData from '@comp/data-model/word-query/lexical-data/data-objects/word-as-lexeme-data.js'

export default class DisambiguatedData {
  async retrieve (lexicalData) {
    let result = new LexicalDataResult(DisambiguatedData.dataType) // eslint-disable-line prefer-const
    result.state.loading = true
    // For now we expect first disambiguation source to be either the Tufts morphology or the word as lexeme
    const availableSources = [
      lexicalData.get(TuftsMorphologyData.dataType), lexicalData.get(WordAsLexemeData.dataType), lexicalData.get(TreebankData.dataType)
    ].filter(r => r && r.state.available).map(r => r.data)
    if (availableSources.length > 1) {
      // There are results from more than one source, we need to disambiguate the results
      if (availableSources.length > 2) {
        Logger.getInstance().log('Disambiguation of more than two sources is non supported. Will use first two results only')
      }
      // Disambiguate the data
      const disambiguationBase = availableSources[0]
      // For now we support a single homonym only as a disambiguation base
      if (disambiguationBase.homonyms.length > 1) {
        Logger.getInstance().log('Disambiguation base with more than one homonym is currently not supported.' +
        `Extra ${disambiguationBase.homonyms.length - 1} homonyms will be ignored`)
      }
      const homonym = disambiguationBase.homonyms[0]
      const disambiguatedHomonym = Homonym.disambiguate(homonym, availableSources[1].homonyms)
      result.data = new HomonymGroup([disambiguatedHomonym])
      result.state.available = true
    } else if (availableSources.length === 1) {
      result.data = availableSources[0]
      result.state.available = true
    } else {
      // Retrieval of morphological data failed
      result.data = new HomonymGroup([])
      result.state.available = false
      result.state.failed = true
    }
    result.state.loading = false
    return result
  }
}

DisambiguatedData.dataType = 'disambiguated'

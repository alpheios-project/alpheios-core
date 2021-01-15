import LexicalDataResult from '@comp/lexical-data/word-query/lexical-data/result/lexical-data-result.js'
import DisambiguatedData from '@comp/lexical-data/word-query/lexical-data/data-objects/disambiguated-data.js'
import { Logger, HomonymGroup } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'
import ErrorCodes from '@comp/lexical-data/constants/error-codes.js'
import ErrorMapper from '@comp/lexical-data/word-query/error/error-mapper.js'
import LexicalDataTypes from '@comp/lexical-data/word-query/lexical-data/types/lexical-data-types.js'

export default class ShortDefsData {
  constructor ({ clientId, shortLexicons } = {}) {
    this._clientId = clientId
    this._shortLexicons = shortLexicons
  }

  async retrieve (lexicalData) {
    let result = new LexicalDataResult(ShortDefsData.dataType) // eslint-disable-line prefer-const
    result.state.loading = true

    let homonyms = [] // eslint-disable-line prefer-const
    const disambiguatedData = lexicalData.get(DisambiguatedData.dataType)
    const hasDisambiguatedData = disambiguatedData && disambiguatedData.state.available
    const hasShortLexicons = this._shortLexicons.allow && this._shortLexicons.allow.length > 0
    if (hasDisambiguatedData && hasShortLexicons) {
      for (let homonym of disambiguatedData.data.homonyms) { // eslint-disable-line prefer-const
        if (homonym.hasShortDefs) {
          // Short definitions has already been retrieved along with the lexemes
          // Clear the short defs data if query did not request short definitions but we have them in the homonym, clear their data
          homonym.lexemes.forEach((l) => {
            l.meaning.clearShortDefs()
          })
        }

        const adapterLexiconResShort = await ClientAdapters.lexicon.alpheios({
          method: 'fetchShortDefs',
          clientId: this._clientId,
          params: {
            opts: this._shortLexicons,
            homonym
          }
        })

        if (adapterLexiconResShort.errors.length === 0) {
          if (adapterLexiconResShort.result) {
            result.state.available = true
            homonyms.push(adapterLexiconResShort.result)
          } else {
            // If client adapters returned no homonym keep the original homonym object instead
            homonyms.push(homonym)
          }
        } else {
          result.state.failed = true
          adapterLexiconResShort.errors.forEach(error => {
            result.errors.push(ErrorMapper.clientAdaptersToWordQuery(
              error,
              { errCode: ErrorCodes.SHORT_DEFS_ERROR }
            ))
            Logger.getInstance().log(error.message)
          })
          // Push the unmodified Homonym object f retrieval of short definitions failed
          homonyms.push(homonym)
        }
      }
    } else if (hasDisambiguatedData) {
      // Short definitions cannot be retrieved, short definitions will not be added to the homonyms
      homonyms = disambiguatedData.data.homonyms
    }

    result.state.loading = false
    result.data = new HomonymGroup(homonyms)
    return result
  }
}

/** @type {import('../types/lexical-data-types.js').LexicalDataTypes | string} */
ShortDefsData.dataType = LexicalDataTypes.SHORT_DEFS
